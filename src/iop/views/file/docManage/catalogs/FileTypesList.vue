<template>
  <div>
    <iop-data-table
      ref="fileTypesList"
      :table="table"
      :permission="permission"
      :hiddenTop="true"
      @onAction="onAction"
    >
      <template #beforeRemoveSelectedButton>
        <a-button type="primary" @click="correlation">关联</a-button>
      </template>
      <template #afterRemoveButton="data">
        <a @click="unCorrelation(data.record)">取消关联</a>
      </template>
    </iop-data-table>
    <FileTypesForm
      ref="fileTypesForm"
      :mode="formMode"
    />
    <a-modal title="关联文档类型" v-model="correlationFlag" @cancel="cancel" :afterClose="cancel" :destroyOnClose="true">
      <a-form>
        <a-form-item>
          <!-- <a-tree-select
            v-model="parentId"
            style="width: 100%"
            :tree-data="treeData"
            tree-checkable
            tree-check-strictly
            :load-data="onLoadData"
            url=""
            @change="changeVal"
          /> -->
          <a-tree
            checkable
            checkStrictly
            :treeData="treeData"
            :loadData="onLoadData"
            v-model="parentId"
            @check="onCheck"
          />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button @click="cancel">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { Tree } from 'ant-design-vue'
import { IopDataTable } from '@/iop/components'
import { iopCatalogsService } from '@/iop/service/index'
import BasicsForm from '../../types/basics/Basics'
import path from '@/iop/api/index'

export default {
  name: 'FileTypesList',
  components: {
    IopDataTable,
    FileTypesForm: BasicsForm,
    ATree: Tree
  },
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    const fileTypesListVo = [
      {
        title: '文档类型',
        dataIndex: 'typeName',
        align: 'center',
        sorter: false
      },
      {
        title: '文档类型编码',
        align: 'center',
        dataIndex: 'typeCode',
        sorter: false
      },
      {
        title: '是否有效',
        align: 'center',
        dataIndex: 'isValid',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isValid === '0') {
            return '否'
          } else if (row.isValid === '1') {
            return '是'
          }
        }
      },
      {
        title: '父级文档',
        align: 'center',
        dataIndex: 'parentName',
        sorter: false
      },
      {
        title: '是否版本管理',
        align: 'center',
        dataIndex: 'isVersion',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isVersion === '0') {
            return '否'
          } else if (row.isVersion === '1') {
            return '是'
          }
        }
      },
      {
        title: '是否存储加密',
        align: 'center',
        dataIndex: 'isEncrypt',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isEncrypt === '0') {
            return '否'
          } else if (row.isEncrypt === '1') {
            return '是'
          }
        }
      },
      {
        title: '是否执行归档',
        align: 'center',
        dataIndex: 'isArchive',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isArchive === '0') {
            return '否'
          } else if (row.isArchive === '1') {
            return '是'
          }
        }
      }
    ]
    return {
      table: {
        /** 列表查询地址 */
        url: `${path.file.fileTypes.index}/${this.id}`,
        /** rowKey，必填 */
        rowKey: 'typeId',
        /** 不显示序号列 */
        serial: true,
        selectable: false,
        /** 列定义 */
        columns: fileTypesListVo
      },
      /** 表格组件按钮权限 */
      permission: ['view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      typeId: '',
      correlationFlag: false,
      parentId: [],
      treeData: [],
      replaceFields: {
        title: 'name',
        key: 'id',
        children: 'children',
        disabled: 'disabled',
        disableCheckbox: 'disableCheckbox',
        selectable: 'selectable',
        isLeaf: 'leaf'
      }
    }
  },
  mounted () {
    this.getTree('0', this.id)
  },
  methods: {
    // tree数据格式转换
    convertor (value) {
      if (value instanceof Array) {
        const result = []
        value.map((item) => {
          const record = {}
          const { replaceFields } = this
          for (const attr of Object.keys(replaceFields)) {
            const prop = replaceFields[attr]
            record[attr] = item[prop]
          }
          record.data = item
          result.push(record)
          return item
        })
        return result
      } else {
        console.error('coonvert error! value should be array')
        return []
      }
    },
    // 获取树
    getTree (parId = '0', cId) {
      iopCatalogsService.getFileTypesTreeData(parId, cId).then(res => {
        this.treeData = this.convertor(res)
        for (var key of res) {
          key.isLeaf = key.leaf
          if (key.checked === true) {
            this.parentId.push(key.id)
          }
        }
      })
    },
    // 异步加载树
    onLoadData (treeNode) {
      return new Promise(resolve => {
        const selectId = treeNode.dataRef.key
        if (treeNode.dataRef.children) { // 有值了直接渲染
          resolve()
          return
        }
        // 没有值根据当前父节点获取下面子节点并挂在树节点中，添加到对应父节点的children中
        iopCatalogsService.getFileTypesTreeData(selectId, this.id).then(res => {
          treeNode.dataRef.children = this.convertor(res)
          for (var key of res) {
            key.isLeaf = key.leaf
            if (key.checked === true) {
              this.parentId.push(key.id)
            }
          }
          this.treeData = [...this.treeData]
        })
        resolve()
      })
    },
    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据id
     */
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.typeId)
          break
      }
    },
    // 关联
    correlation () {
      this.correlationFlag = true
      this.getTree('0', this.id)
    },
    // 取消关联
    unCorrelation (data) {
      this.$confirm({
        title: '提示',
        content: '确定要取消该关联吗 ?',
        onOk: async () => {
          const unData = {
            checked: 0,
            fileTypeId: data.typeId,
            ctlgId: this.id
          }
          iopCatalogsService.saveTypes(unData).then(res => {
            this.$refs.fileTypesList.reload()
          })
        }
      })
    },
    // 关联弹窗取消
    cancel () {
      this.$refs.fileTypesList.reload()
      this.correlationFlag = false
      this.parentId = []
      this.treeData = []
    },
    onCheck (checkedKeys, e) {
      this.parentId = checkedKeys.checked
      if (e.checked) {
        const data = {
          checked: 1,
          fileTypeId: e.node.eventKey,
          ctlgId: this.id
        }
        iopCatalogsService.saveTypes(data).then(res => {})
      } else {
        const data = {
          checked: 0,
          fileTypeId: e.node.eventKey,
          ctlgId: this.id
        }
        iopCatalogsService.saveTypes(data).then(res => {})
      }
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (typeId) {
      this.formMode = 'view'
      this.typeId = typeId
      this.$refs.fileTypesForm.show(this.formMode, this.typeId, true)
    }
  }
}
</script>
