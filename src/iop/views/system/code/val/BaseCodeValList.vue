<template>
  <div>
    <div class="table-page-search-wrapper" style="margin-top: 15px;">
      <a-form layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6" >
            <a-input-search
              allowClear
              enter-button="查询"
              v-model="valName"
              @search="search"
              placeholder="请输入编码值名称" />
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-divider style="margin-bottom:15px;"/>
    <iop-data-table
      ref="codeValList"
      :table="table"
      :permission="permission"
      :tree="tree"
      hiddenTop
      @onAction="onAction"
    >
      <template #tree>
        <code-val-tree ref="codeValTree" @onSelect="onTreeSelect" :codeId="codeId" />
      </template>
    </iop-data-table>

    <code-val-form
      ref="codeValForm"
      :valId="valId"
      :parentId="parentId"
      :mode="formMode"
      :codeId="codeId"
      :submitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import CodeValTree from './BaseCodeValTree'
import CodeValForm from './BaseCodeValForm'
import path from '@/iop/api'
import baseCodeValListVO from './vo/base-code-val-list-vo'
import MessageUtils from '@/utils/message'

export default {
  name: 'BaseCodeValList',
  components: { IopDataTable, CodeValTree, CodeValForm },
  data () {
    return {
      valId: '',
      parentId: '',
      selectedNode: '',
      formMode: 'create',
      valName: '',
      table: {
        columns: baseCodeValListVO,
        url: path.system.codeVla.index,
        rowKey: 'valId'
      },
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      codeValId: ''
    }
  },
  props: {
    codeId: {
      type: String,
      required: true
    },
    tree: {
      type: Boolean,
      required: true
    }
  },
  created () {
    this.table.query = { codeId: this.codeId }
  },
  methods: {
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.valId)
          break
        case 'onEdit':
          this.handleEdit(data.original.valId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    reloadNode (valId) {
      if (this.tree) {
        if (!valId) {
        // 新建或者编辑的回调
          valId = this.codeValId
        }
        if (valId === '0') {
          this.$refs.codeValTree.reload()
          return
        }
        if (valId !== this.selectedNode) {
          this.$refs.codeValTree.reloadNode(this.selectedNode)
        } else {
          this.$refs.codeValTree.reload()
        }
      } else {
        this.search()
      }
    },

    search (valName = '') {
      try {
        if (this.tree) {
          this.$refs.codeValList.reload({ parentId: this.selectedNode, valName })
        } else {
          this.$refs.codeValList.reload({ valName })
        }
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    resetSearchForm () {
      this.valName = ''
      this.search()
    },

    handleCreate () {
      this.formMode = 'create'
      this.valId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : ''
      this.$refs.codeValForm.show()
    },

    handleView (valId = '') {
      this.formMode = 'view'
      this.valId = valId
      this.$refs.codeValForm.show()
    },

    handleEdit (valId = '') {
      this.formMode = 'edit'
      this.valId = valId
      this.$refs.codeValForm.show()
    },

    handleRemoveSelected (valIds = []) {
      if (this.tree) {
        let valId
        if (valIds.includes(this.selectedNode)) {
          valId = this.selectedNode
        } else {
          valId = valIds[0]
        }
        this.reloadNode(valId)
      } else {
        this.search()
      }
    },

    load () {
      this.table.query = { codeId: this.codeId }
      this.$nextTick(() => {
        this.valName = ''
        if (this.tree) {
          this.$refs.codeValTree.reload()
        } else {
          this.search()
        }
      })
    },

    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.codeValList.reload({ parentId: key })
    }
  }
}
</script>
