<template>
  <div>
    <iop-data-table
      ref="actList"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      @onAction="onAction"
      :autoConfig="false"
    >
      <template #beforeRemoveSelectedButton="{ record }">
        <a-button
          type="primary"
          @click="handleDelect(record)"
          :disabled="seleckIds.length === 0"
        >删除</a-button>
      </template>
      <!-- 行删除 -->
      <template #beforeRemoveButton="{ record }" >
        <a @click="handleDelect(record.id,'coulmn')">删除</a>
      </template>
    </iop-data-table>
    <act-form
      ref="actForm"
      :id="id"
      :defId="defId"
      :mode="formMode"
      :submitSuccess="resetSearchForm"
    />
  </div>
</template>

<script>
import { IopDataTable, IopDataTreeSelect } from '@/iop/components'
import { iopBpmsDefInfoService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import actListVo from './vo/act-list-vo'
import ActForm from './ActForm'
export default {
  /** 数据发布组件 */
  name: 'ActList',
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'id',
        /** 列定义 */
        columns: actListVo,
        actionsWidth: 170
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'selectedChange'],
      formMode: 'create',
      /** 表单主键id */
      id: '',
      /** 流程定义id */
      defId: '',
      /** 多选中的数组 */
      seleckIds: ''
    }
  },
  components: { IopDataTable, IopDataTreeSelect, ActForm },
  methods: {
    /**
     * 点击删除按钮事件
     * @param {string} id 选中的id
     */
    async handleDelect (id, type) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            if (type === undefined) {
              await iopBpmsDefInfoService.delActAll(this.seleckIds)
            } else {
              await iopBpmsDefInfoService.delActAll([id])
            }
            this.resetSearchForm()
            MessageUtils.success()
          } catch (error) {
            this.handleError(error)
          }
        }
      })
    },
    /**
     * 列表复选框选中的事件
     *
     * @param {string} selectedRowKeys 选中的ids
     */
    handleSelectedChange (selectedRowKeys = []) {
      this.seleckIds = selectedRowKeys
    },
    /**
     * 加载页面
     */
    load (id) {
      id ? this.defId = id : this.defId = this.$route.query.defid
      this.table.url = `${path.bpms.definfo.act.index}?defId=${this.defId}`
      this.$nextTick(() => {
        this.$refs.actList.init()
      })
    },
    /**
     * 查询
     */
    async search () {
      try {
        await this.$refs.actList.search()
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件并刷新
     */
    resetSearchForm () {
      this.$refs.actList.resetSearch()
      this.$refs.actList.reload()
      this.seleckIds = ''
      this.$nextTick(() => {
        this.$refs.storeList && this.$refs.storeList.cleanSelected()
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
        case 'onEdit':
          this.handleEdit(data.original.id)
          break
        case 'onSelectedChange':
          this.handleSelectedChange(data.original.selectedRowKeys)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.id = ''
      // 先赋值，后显示
      this.$refs.actForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} actId 主键
     */
    handleEdit (id = '') {
      this.formMode = 'edit'
      this.id = id
      this.$refs.actForm.show()
    }

  }

}

</script>
<style>
</style>
