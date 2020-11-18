<template>
  <iop-data-form
    ref="publishCfgForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="cfgId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onModalHide="modalHide"
    :reset="reset"
  >
    <template #form="{ record }">
      <a-form-item label="配置名称" v-bind="formItemLayout">
        <a-input placeholder="请输入配置名称" :maxLength="100" v-decorator="['cfgName', { rules: [{ required: true, whitespace: true, message: '配置名称不能为空' }, { max: 100, message: '配置名称最多100位' }] }]" />
      </a-form-item>
      <a-form-item label="源文件库" v-bind="formItemLayout">
        <iop-data-tree-select
          :url="storesTree"
          query="id"
          ref="storeList"
          v-decorator="['storeId', { rules: [{ required: true, whitespace: true, message: '请选择源文件库' }] }]"/>
      </a-form-item>
      <a-form-item label="发布规则" v-bind="formItemLayout">
        <iop-data-dict-select ref="publishRule" type="FILE_PUB_RULE" v-decorator="['publishRule', { rules: [{ required: true, whitespace: true, message: '请选择发布规则' }] }]" />
      </a-form-item>
      <a-form-item label="目标目录：" v-bind="formItemLayout">
        <!-- TODO 暂时没有 -->
        <iop-data-tree-select
          :url="fileTree"
          query="id"
          ref="ctlgList"
          v-decorator="['ctlgId', { rules: [{ required: true, whitespace: true, message: '请选择目标目录' }] }]"/>
      </a-form-item>
      <a-form-item label="规则实现接口" v-bind="formItemLayout">
        <a-input placeholder="请输入规则实现接口" v-decorator="['ruleClass', {rules: [{ max: 100, message: '规则实现接口最多100位' }]}]" />
      </a-form-item>
      <a-form-item label="任务调度表达式" v-bind="formItemLayout">
        <a-input placeholder="请输入任务调度表达式" v-decorator="['cronExpress', {rules: [{ max: 100, message: '任务调度表达式最多100位' }]}]" />
      </a-form-item>
      <a-form-item label="备注说明" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注说明" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注说明最多500位' }]}]"/>
      </a-form-item>
      <input id="cfgId" type="hidden" :value="record.cfgId" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import publishCfgFormVO from './vo/pubilsh-cfg-form-vo'
import path from '@/iop/api/index'
export default {
  name: 'PublishCfgForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.file.publishCfg.index,
      /** 表单定义 */
      vo: publishCfgFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      /** 源文件库地址 */
      storesTree: path.file.publishCfg.storesTree,
      /** 目录地址 */
      fileTree: path.file.catalogs.fileTree
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
    cfgId: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    /**
     * 隐藏弹窗
     */
    modalHide () {
      this.nextTick()
    },
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.publishCfgForm.showModal()
    },
    /** 清空下拉 */
    nextTick () {
      this.$nextTick(() => {
        this.$refs.publishRule && this.$refs.publishRule.cleanSelected()
        this.$refs.storeList && this.$refs.storeList.cleanSelected()
        this.$refs.ctlgList && this.$refs.ctlgList.cleanSelected()
      })
    },
    loadConvertor (val) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.publishRule && this.$refs.publishRule.cleanSelected()
          this.$refs.storeList && this.$refs.storeList.cleanSelected()
          this.$refs.ctlgList && this.$refs.ctlgList.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          // 有数据库标识 的时候赋值
          val.storeId && this.$refs.storeList.setSelected({ title: val.storeName, value: val.storeId })
          // 有目录标识 的时候赋值
          val.ctlgId && this.$refs.ctlgList.setSelected({ title: val.ctlgName, value: val.ctlgId })
          // 发布规则
          val.publishRule && this.$refs.publishRule.setSelected(val.publishRule)
        })
      }
      return val
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { cfgId } = this
        Object.assign(value, { cfgId })
      }
      return value
    },
    // 重置
    reset (cb) {
      cb()
      const values = this.$refs.publishCfgForm.record
      if (this.mode === 'create') {
        this.$refs.publishRule && this.$refs.publishRule.cleanSelected()
        this.$refs.storeList && this.$refs.storeList.cleanSelected()
        this.$refs.ctlgList && this.$refs.ctlgList.cleanSelected()
      } else {
        // 有数据库标识 的时候赋值
        values.storeId && this.$refs.storeList.setSelected({ title: values.storeName, value: values.storeId })
        // 有目录标识 的时候赋值
        values.ctlgId && this.$refs.ctlgList.setSelected({ title: values.ctlgName, value: values.ctlgId })
        // 发布规则
        values.publishRule && this.$refs.publishRule.setSelected(values.publishRule)
      }
    }
  }
}
</script>
