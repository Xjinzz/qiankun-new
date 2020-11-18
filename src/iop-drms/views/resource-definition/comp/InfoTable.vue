<template>
  <div>
    <iop-data-table
      :ref="tableState.tableId"
      :table="tableState.tableConfig"
      :hiddenTop="true"
      v-if="isLoaded"
      :permission="tableState.permission"
      @onAction="onAction"
      :autoLoad="false"
      :autoConfig="false"
      class="infoTable"
    >
      <template #removeButton="{ record }">
        <a @click="doRemove(record)">删除</a>
      </template>
    </iop-data-table>
    <save-dialog
      ref="saveDialog"
      :id="id"
      :code="code"
      :relationValue="relationValue"
      :attrCode="attrCode"
      @save="search"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import _idSeed from '../tool/idSeed'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import getuuid from '@/utils/uuid.js'
import tableMixins from './tableMixins'
import Define from '../tool/define'
import { arrayTool } from 'mwutil'
import SaveDialog from './SaveDialog'
export default {
  mixins: [tableMixins],
  components: {
    IopDataTable,
    SaveDialog
  },
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    code: {
      type: String,
      default: '',
      required: true
    },
    attrCode: {
      type: String,
      default: '',
      required: true
    },
    relationValue: {
      type: String,
      default: '',
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoaded: false,
      tableState: {
        tableId: _idSeed.newId(),
        tableConfig: {},
        permission: []
      },
      api: {}
    }
  },
  computed: {
    relationVal () {
      return this.relationValue !== '' ? this.relationValue : getuuid.generate()
    }
  },
  mounted () {
    this.isLoaded = false
    this.getPageInfo()
  },
  methods: {
    onAction ({ name = '', data = {} }) {
      switch (name) {
        case 'onEdit':
          this.doEdit(data.original)
          break
        case 'onView':
          this.doView(data.original)
          break
        case 'onCreate':
          this.doCreate()
          break
      }
    },
    // 根据item获取表格主键的value
    getRowKeyByItem (item) {
      return item[this.tableState.tableConfig['rowKey']]
    },
    doRemove (item) {
      this.$confirm({
        title: '确定删除吗?',
        onOk: () => {
          Service.doRemove(this.api.deleteUrl + this.getRowKeyByItem(item))
            .then((x) => {
              this.$message.success('删除成功')
              this.search()
            })
        }
      })
    },
    doEdit (item) {
      this.$refs.saveDialog.show(Define.MODE.EDIT, {
        detailId: this.getRowKeyByItem(item)
      })
    },
    doView (item) {
      this.$refs.saveDialog.show(Define.MODE.DETAIL, {
        detailId: this.getRowKeyByItem(item)
      })
    },
    doCreate () {
      this.$refs.saveDialog.show(Define.MODE.CREATE)
    },
    // 获取页面信息
    getPageInfo () {
      Service.getConstructList(this.id, {
        objectCode: this.code
      })
        .then(x => {
          const config = {}
          // TODO: 需要和searchGaine一样进行拆分
          if (this.mode === Define.MODE.EDIT) {
            this.tableState.permission = arrayTool.getSimpleValuesByField(x.button, 'code').filter(item => {
              return (item === Define.TABLEBUTTON.VIEW || item === Define.TABLEBUTTON.CREATE || item === Define.TABLEBUTTON.REMOVE || item === Define.TABLEBUTTON.EDIT)
            })
            // 获取table行内按钮组合
            const tableInlineBtnList = arrayTool.deepClone(this.tableState.permission).filter(item => {
              return (item === Define.TABLEBUTTON.VIEW || item === Define.TABLEBUTTON.REMOVE || item === Define.TABLEBUTTON.EDIT)
            })
            const actionsWidthList = {
              1: '80px',
              2: '125px',
              3: '150px'
            }
            if (tableInlineBtnList.length > 0) {
              // 设置宽度
              config['actionsWidth'] = actionsWidthList[tableInlineBtnList.length]
            } else {
              config['actions'] = false
              // 隐藏actions
            }
          } else {
            config['actions'] = false
            this.tableState.permission = []
          }
          this.tableState.tableConfig = this.mx_dealTableConfig({
            ...config,
            url: x.api.listDataUrl + '?' + this.attrCode + '=' + this.relationVal
          }, x)
          this.api = x.api
          this.isLoaded = true
          this.$nextTick(() => {
            this.$refs[this.tableState.tableId].init()
            this.search()
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs[this.tableState.tableId].reload()
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    }
  }
}
</script>
<style scoped>
  .infoTable >>> .ant-card-wider-padding .ant-card-body {
    padding:0
  }
</style>
<style lang="less" scoped>
  .__tableItemtd{
    word-break: break-all;
  }
  .ellipsis {
    display: block;
    max-width:200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
