<template>
  <a-tabs
    default-active-key="1"
    @change="changeTab"
  >
    <a-tab-pane
      v-for="item in dataSource.dbjndi"
      :key="item.jndiId"
      :tab="item.jndiName"
    >
      <div v-if="showTag(item.jndiId)" style="max-height:500px;overflow-y:scroll">
        <a-table
          ref="aTable"
          :dataSource="tableState.dataSource"
          :loading="!tableState.loaded"
          :pagination="false"
          rowKey="name"
          :rowSelection="tableState.rowSelection"
          :columns="tableState.columns"
        >
        </a-table>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import Service from '@/iop-drms/service/data-manage/data-manage'
import { objectTool } from 'mwutil'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dataSource: {
        dbjndi: []
      },
      tableState: {
        selectList: [],
        tableDealData: {},
        rowSelection: {
          type: 'checkbox',
          columnWidth: '50px',
          backgroundColor: '#cbf2ff',
          onChange: this.changeSelect
        },
        loaded: false,
        columns: [
          {
            align: 'left',
            title: '序号',
            dataIndex: 'dataIndex'
          },
          {
            align: 'left',
            title: '表名称',
            dataIndex: 'name'
          },
          {
            align: 'left',
            title: '表说明',
            dataIndex: 'comment'
          },
          {
            align: 'left',
            title: '表数据条数',
            dataIndex: 'rows'
          }
        ],
        currentTag: '',
        permission: [
        ]
      }
    }
  },
  methods: {
    init () {
      this.dataSource.dbjndi = []
      this.tableState.currentTag = ''
      this.getDataSourceList()
    },
    getDataSourceList () {
      Service.getList()
        .then(x => {
          this.dataSource.dbjndi = x
          if (this.dataSource.dbjndi[0]) {
            this.changeTab(this.dataSource.dbjndi[0])
          } else {
            this.tableState.currentTag = ''
          }
        })
    },
    changeTab (row) {
      this.tableState.currentTag = row.jndiId
      this.$nextTick(() => {
        this.getTableDataSource(row.jndiId)
      })
    },
    changeSelect (selectList) {
      const _selectList = []
      selectList.map(item => {
        _selectList.push(this.tableState.tableDealData[item])
      })
      this.tableState.selectList = _selectList
    },
    showTag (tag) {
      return this.tableState.currentTag === tag
    },
    // 获取table数据源
    getTableDataSource (id) {
      this.tableState.loaded = false
      Service.getTableDataSource({
        jndiId: id
      })
        .then(x => {
          this.tableState.tableDealData = {}
          x.map((item, index) => {
            this.tableState.tableDealData[item.name] = objectTool.deepClone(item)
            item.dataIndex = index + 1
          })
          this.tableState.dataSource = x
          this.tableState.loaded = true
        })
    },
    save (catalogId) {
      const data = {
        catalogId,
        jndiId: this.tableState.currentTag,
        objectCode: this.code,
        objectId: this.id,
        tableList: this.tableState.selectList
      }
      return Service.importTablesMeta(data)
    }
  }
}
</script>
