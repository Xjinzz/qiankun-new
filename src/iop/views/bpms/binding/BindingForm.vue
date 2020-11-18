<template>
  <iop-data-form
    ref="bindingForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="bindingId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onModalHide="onModalHide"
  >
    <template #form="{ record }">
      <a-form-item label="功能名称" v-bind="formItemLayout">
        <iop-data-tree-select
          ref="programTree"
          :url="programUrl"
          :loadQuery="loadQuery"
          @onSelect="onProgramSelect"
          v-decorator="['programId', { rules: [{ required: true, whitespace: true, message: '请选择应用单位' }] }]"/>
        <!-- <a-input :maxLength="100" v-model="programName" disabled/> -->
      </a-form-item>
      <a-form-item label="应用单位" v-bind="formItemLayout">
        <iop-data-tree-select
          ref="levelgroupTree"
          :url="levelgroupUrl"
          :loadQuery="loadQuery"
          @onSelect="onLevelgroupSelect"
          v-decorator="['levelgroupId', { rules: [{ required: true, whitespace: true, message: '请选择应用单位' }] }]"/>
      </a-form-item>
      <a-form-item label="业务类型" v-bind="formItemLayout">
        <a-input v-decorator="['busiType', {rules: [{ max: 100, message: '业务类型最多100位' }]}]" />
      </a-form-item>
      <a-form-item label="流程定义" v-bind="formItemLayout">
        <iop-data-tree-select
          ref="workflowDefTree"
          :url="workflowDefUrl"
          @onSelect="onWorkflowDefSelect"
          v-decorator="['workflowDefId', { rules: [{ required: true, whitespace: true, message: '请选择流程定义' }] }]"/>
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注最多500位' }]}]" />
      </a-form-item>
      <input id="levelgroupName" type="hidden" :value="record.levelgroupName" />
      <input id="workflowDefName" type="hidden" :value="record.workflowDefName" />
      <input id="appCode" type="hidden" :value="appId" />

    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataTreeSelect } from '@/iop/components/index'
import bindingFormVO from './vo/binding-form-vo'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'
import { iopProgramService } from '@/iop/service'
export default {
  name: 'BindingForm',
  components: { IopDataForm, IopDataTreeSelect },
  data () {
    return {
      /** 显示类型 默认弹框 */
      showType: 'modal',
      /** 表单加载、提交地址 */
      url: path.bpms.workflow.table,
      /** 表单定义 */
      vo: bindingFormVO,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
      },
      /** 功能名称地址 */
      programUrl: path.system.program.tree,
      /** 应用地址 */
      levelgroupUrl: path.system.dept.tree,
      /** 流程地址 */
      workflowDefUrl: path.bpms.definfo.info.getTree,
      /** 下拉树多个参数 */
      loadQuery: {
        currentLoginAppId: ''
      },
      levelgroupName: '',
      workflowDefName: '',
      programName: '',
      /** 树选中的id */
      selectId: ''
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    bindingId: {
      type: String,
      required: false,
      default: null
    },
    /** 系统菜单 */
    programId: {
      type: String,
      required: false,
      default: null
    },
    /** 应用id */
    appId: {
      type: String,
      required: false,
      default: null
    }
  },
  watch: {
    /**
     * 系统菜单
     */
    programId (value) {
      this.$refs.bindingForm.setInitValue({ programId: value })
    }
  },
  methods: {
    /**
     * 功能名称选中的时候
     */
    onProgramSelect ({ key, data }) {
      data && (this.programName = data.name)
    },
    /**
     * 流程树选中
     */
    onWorkflowDefSelect ({ key, data }) {
      data && (this.workflowDefName = data.name)
    },
    /**
     * 应用树选中
     */
    onLevelgroupSelect ({ key, data }) {
      data && (this.levelgroupName = data.name)
    },
    onModalHide () {
      this.$refs.levelgroupTree.resetData()
      this.$refs.workflowDefTree.resetData()
      this.$refs.programTree.resetData()
    },
    /**
     * 显示弹窗
     */
    show (appId, selectId) {
      this.selectId = selectId
      this.loadQuery.currentLoginAppId = appId
      this.$refs.bindingForm.showModal()
      this.$nextTick(() => {
        this.$refs.levelgroupTree.cleanSelected()
        this.$refs.workflowDefTree.cleanSelected()
        this.$refs.programTree.cleanSelected()
      })
    },
    /**
     * 加载前
     */
    loadConvertor (value) {
      if (this.mode !== 'create') {
        this.$nextTick(() => {
          value.programId && this.$refs.programTree.setSelected({ title: value.programName, value: value.programId })
          value.levelgroupId && this.$refs.levelgroupTree.setSelected({ title: value.levelgroupName, value: value.levelgroupId })
          value.workflowDefId && this.$refs.workflowDefTree.setSelected({ title: value.workflowDefName, value: value.workflowDefId })
        })
      } else {
        // 选中的不是全部
        if (this.selectId !== '0') {
          try {
            iopProgramService.getListId(this.selectId).then(res => {
              this.$nextTick(() => {
                this.$refs.programTree.setSelected({ title: res.programName, value: this.selectId })
              })
            })
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      }
      return value
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'create') {
        Object.assign(value, { programId: this.programId })
      }
      value.appCode = this.appId
      value.levelgroupName = this.levelgroupName
      value.workflowDefName = this.workflowDefName
      value.programName = this.programName
      return value
    }
  }
}
</script>
