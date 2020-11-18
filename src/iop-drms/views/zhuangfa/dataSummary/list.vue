<template>
  <iop-data-table
    ref="dataSummary"
    :table="table"
    tree
    :permission="permission"
    @onAction="onAction"
  >
    <template #top>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="8">
          <a-form-item label="版本号">
            <a-input @pressEnter="search" :maxLength="100" v-model="searchModel.versionNum" placeholder="请输入版本号" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="8"></a-col>
        <a-col :span="8" class="search-buttons">
          <a-button type="primary" @click="search()">查询</a-button>
          <a-button @click="resetSearchForm()">重置</a-button>
        </a-col>
      </a-row>
    </template>
    <template #tree>
      <iop-data-tree ref="dataSummaryTree" :url="urlStore.tree" :loadQuery="getTreeLoadQuery" @onSelect="treeSelect" />
    </template>
  </iop-data-table>
</template>
<script>
import { IopDataTable, IopDataTree } from '@/iop/components/index'
import API from '@/iop-drms/api/index'
import { objectTool } from 'mwutil'
const Define = {
  searchModel: {
    versionNum: ''
  }
}
export default {
  components: {
    IopDataTable,
    IopDataTree
  },
  data () {
    return {
      permission: [
        'view'
      ],
      urlStore: {
        tree: API.zhuangfa.dataSummaryTree
      },
      searchModel: objectTool.deepClone(Define.searchModel),
      selectedId: '',
      table: {
        url: API.zhuangfa.table,
        rowKey: 'id',
        columns: [
          {
            title: '指标名称',
            dataIndex: 'indexName'
          },
          {
            title: '版本号',
            dataIndex: 'versionNum'
          },
          {
            title: '单位名称',
            dataIndex: 'deptId'
          },
          {
            title: '2015',
            dataIndex: 'item1'
          },
          {
            title: '2020',
            dataIndex: 'item2'
          },
          {
            title: '量纲',
            dataIndex: 'lg'
          },
          {
            title: '超额实现',
            dataIndex: 'cesx'
          },
          {
            title: '实现',
            dataIndex: 'sx'
          },
          {
            title: '未实现',
            dataIndex: 'wsx'
          },
          {
            title: '未实现原因',
            dataIndex: 'wsxyy'
          }
        ]
      }
    }
  },
  computed: {
    getTreeLoadQuery () {
      return {
        deptId: this.getUrlParams('deptId'),
        deptName: this.getUrlParams('name')
      }
    }
  },
  methods: {
    // 获取url参数，解决菜单配置query不生效的问题
    getUrlParams (queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      const url = window.location.href.split('?')
      const href = this.$route.meta.para || url[url.length - 1]
      if (!href) {
        return null
      }
      const search = href
      var r = search.match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return null
      }
    },
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onView':
          this.handleView(data.original.id)
          break
      }
    },
    treeSelect ({ key, data }) {
      this.selectedId = key
      this.search()
    },
    handleView (id) {
      this.$goPage('zhuangfa/dataSummary/view', {
        id: id
      })
    },
    search () {
      this.$refs.dataSummary.reload(Object.assign({
        page: 1,
        size: 10
      }, this.searchModel, {
        parentId: this.selectedId
      }))
    },
    resetSearchForm () {
      this.searchModel = objectTool.deepClone(Define.searchModel)
      this.search()
    }
  }
}
</script>
