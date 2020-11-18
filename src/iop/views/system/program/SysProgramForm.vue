<template>
  <div>
    <iop-data-form
      ref="sysProgramForm"
      :mode="mode"
      :url="url"
      :vo="vo"
      :id="programId"
      :loadConvertor="loadConvertor"
      :submitSuccess="submitSuccess"
      :submitConvertor="submitConvertor"
    >
      <template #form="{ record }">
        <a-form-item label="功能类型" v-bind="formItemLayout">
          <data-radio type="programType" :disabled="showRedio" v-decorator="['programType']" @change="radioChange"></data-radio>
        </a-form-item>
        <div v-show="showInput === '0'">
          <a-form-item label="菜单名称" v-bind="formItemLayout">
            <a-input placeholder="请输入菜单名称" v-decorator="['programName', { rules: [{ required: true, whitespace: true, message: showInput === '3' ? '标签名称不能为空' : showInput === '9' ? '操作名称不能为空' : '菜单名称不能为空' }, { max: 100, message: '菜单名称不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="菜单编码" v-bind="formItemLayout">
            <a-input placeholder="请输入菜单编码" v-decorator="['programCode', { rules: [{ max: 100, message: '菜单编码不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="应用系统" v-bind="formItemLayout">
            <data-select ref="ownerAppId" type="appSelect" v-decorator="['ownerAppId']"></data-select>
          </a-form-item>
          <a-form-item label="路由地址" v-bind="formItemLayout">
            <a-input placeholder="以 / 开头" v-decorator="['routePath', { rules: [{ max: 100, message: '路由地址不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="组件地址" v-bind="formItemLayout">
            <a-input placeholder="请输入组件地址" v-decorator="['vuePath', { rules: [{ max: 100, message: '组件地址不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="调用服务" v-bind="formItemLayout">
            <a-input placeholder="请输入调用服务" v-decorator="['programUrl', { rules: [{ max: 250, message: '调用服务不能超过250'}] }]" />
          </a-form-item>
          <a-form-item label="参数配置" v-bind="formItemLayout">
            <a-input placeholder="请输入参数配置" v-decorator="['programPara', { rules: [{ max: 300, message: '参数配置不能超过300'}] }]" />
          </a-form-item>
          <a-form-item label="菜单图标" v-bind="formItemLayout">
            <iop-icon-selector ref="icon" v-model="icon"></iop-icon-selector>
          </a-form-item>
          <a-form-item label="排序号码" v-bind="formItemLayout">
            <a-input-number style="width: 100%" v-decorator="['orderNum', { rules: [{ required: true, message: '排序号码不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" />
          </a-form-item>
        </div>
        <div v-show="showInput === '9'">
          <a-form-item label="操作名称" v-bind="formItemLayout">
            <a-input placeholder="请输入操作名称" v-decorator="['programName', { rules: [{ required: true, message: showInput === '3' ? '标签名称不能为空' : showInput === '9' ? '操作名称不能为空' : '菜单名称不能为空' }, { max: 100, message: '操作名称不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="操作编码" v-bind="formItemLayout">
            <a-input placeholder="请输入操作编码" v-decorator="['programCode', { rules: [{ max: 100, message: '操作编码不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="调用服务" v-bind="formItemLayout">
            <a-input placeholder="请输入调用服务" v-decorator="['programUrl', { rules: [{ max: 250, message: '调用服务不能超过250'}] }]" />
          </a-form-item>
          <a-form-item label="操作类型" v-bind="formItemLayout">
            <data-select ref="buttonType" type="buttonType" v-decorator="['buttonType', { rules: [{ required: showInput === '9' ? true : false, message: '操作类型不能为空' }] }]"></data-select>
          </a-form-item>
          <a-form-item label="排序号码" v-bind="formItemLayout">
            <a-input-number style="width: 100%" v-decorator="['orderNum', { rules: [{ required: true, message: '排序号码不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" />
          </a-form-item>
        </div>
        <div v-show="showInput === '3'">
          <a-form-item label="标签名称" v-bind="formItemLayout">
            <a-input placeholder="请输入标签名称" v-decorator="['programName', { rules: [{ required: true, message: showInput === '3' ? '标签名称不能为空' : showInput === '9' ? '操作名称不能为空' : '菜单名称不能为空' }, { max: 100, message: '标签名称不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="标签编码" v-bind="formItemLayout">
            <a-input placeholder="请输入标签编码" v-decorator="['programCode', { rules: [{ max: 100, message: '标签编码不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="路由地址：" v-bind="formItemLayout">
            <a-input placeholder="以 / 开头" v-decorator="['routePath', { rules: [{ max: 100, message: '路由地址不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="组件地址" v-bind="formItemLayout">
            <a-input placeholder="请输入组件地址" v-decorator="['vuePath', { rules: [{ max: 100, message: '组件地址不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="调用服务" v-bind="formItemLayout">
            <a-input placeholder="请输入调用服务" v-decorator="['programUrl', { rules: [{ max: 250, message: '调用服务不能超过250'}] }]" />
          </a-form-item>
          <a-form-item label="标签图标" v-bind="formItemLayout">
            <iop-icon-selector ref="labIcon" v-model="icon"></iop-icon-selector>
          </a-form-item>
          <a-form-item label="排序号码：" v-bind="formItemLayout">
            <a-input-number style="width: 100%" v-decorator="['orderNum', { rules: [{ required: true, message: '排序号码不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" />
          </a-form-item>
        </div>
        <input id="logLevel" type="hidden" :value="record.logLevel" />
        <input id="appId" type="hidden" :value="record.appId" />
        <input id="programId" type="hidden" :value="record.programId" />
        <input id="parentId" type="hidden" :value="record.parentId" />
        <input id="levelCode" type="hidden" :value="record.levelCode" />
        <input id="helpUrl" type="hidden" :value="record.helpUrl" />
        <input id="isCa" type="hidden" :value="record.isCa" />
        <input id="accessType" type="hidden" :value="record.accessType" />
        <input id="ownerAppId" type="hidden" :value="record.ownerAppId" />
        <input id="remark" type="hidden" :value="record.remark" />
      </template>
    </iop-data-form>
  </div>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataDictRadio, IopIconSelector } from '@/iop/components'
import sysProgramFormVO from './vo/sys-program-form-vo'
import path from '@/iop/api'

export default {
  name: 'SysProgramForm',
  components: { IopDataForm, DataSelect: IopDataDictSelect, DataRadio: IopDataDictRadio, IopIconSelector },
  data () {
    return {
      select: '0',
      /** 表单加载、提交地址 */
      url: path.system.program.index,
      /** 表单定义 */
      vo: sysProgramFormVO,
      /** 新建表单的初始值，设置上级对象 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      showInput: '0',
      logDis: true,
      data: {},
      showRedio: false,
      id: '',
      icon: ''
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
    programId: {
      type: String,
      required: false,
      default: ''
    },
    /** 上级对象 */
    parentId: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    /**
     * 上级对象
     */
    parentId (value) {
      this.$refs.sysProgramForm.setInitValue({ parentId: value, programType: '0' })
      this.id = value
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.sysProgramForm.showModal()
    },
    onIconSelect (icon) {
      this.icon = icon
    },
    /**
     * 恢复单选值
     */
    radioData (value) {
      this.$refs.sysProgramForm.setInitValue({
        programType: value.programType === '菜单' ? this.showInput = '0' : value.programType === '操作' ? this.showInput = '9' : this.showInput = '3',
        icon: value.icon,
        programCode: value.programCode,
        ownerAppId: value.ownerAppId,
        helpUrl: value.helpUrl,
        orderNum: value.orderNum,
        parentId: value.parentId,
        accessType: value.accessType,
        levelCode: value.levelCode,
        buttonType: value.buttonType,
        logLevel: value.logLevel === '不记日志' ? '0' : value.logLevel === '记变更日志' ? '9' : '3',
        programName: value.programName,
        appId: value.appId,
        isCa: value.isCa,
        programUrl: value.programUrl,
        programId: value.programId,
        routePath: value.routePath,
        vuePath: value.vuePath
      })
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.icon = this.icon
      if (this.$parent.formMode === 'create') {
        value.parentId = this.id
        value.logLevel = '0'
      } else {
        switch (this.data.logLevel) {
          case '不记日志':
            value.logLevel = '0'
            break
          case '记变更日志':
            value.logLevel = '9'
            break
          case '记操作日志':
            value.logLevel = '3'
            break
        }
      }
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { programId } = this
        Object.assign(value, { programId })
      }
      return value
    },
    /**
     * 单选事件
     */
    radioChange (e) {
      this.showInput = `${e.target.value}`
      console.log(this.showInput)
      console.log(e.target.value)
      this.icon = ''
      this.$refs.icon.setSelected()
      this.$refs.labIcon.setSelected()
      this.$refs.sysProgramForm.setInitValue({ programType: `${e.target.value}` })
      if (this.mode === 'edit') {
        this.$refs.sysProgramForm.setInitValue({
          programType: `${e.target.value}`,
          appId: this.data.appId,
          parentId: this.parentId,
          programName: this.data.programName,
          icon: this.data.icon,
          orderNum: this.data.orderNum,
          logLevel: this.data.logLevel
        })
      }
      if (this.mode === 'edit' && e.target.value === this.data.programType) {
        this.$refs.sysProgramForm.setInitValue({
          programType: this.data.programType === '菜单' ? '0' : this.data.programType === '操作' ? '9' : '3',
          icon: this.data.icon,
          programCode: this.data.programCode,
          ownerAppId: this.data.ownerAppId,
          helpUrl: this.data.helpUrl,
          orderNum: this.data.orderNum,
          parentId: this.data.parentId,
          accessType: this.data.accessType,
          levelCode: this.data.levelCode,
          buttonType: this.data.buttonType,
          logLevel: this.data.logLevel,
          programName: this.data.programName,
          appId: this.data.appId,
          isCa: this.data.isCa,
          programUrl: this.data.programUrl,
          programId: this.data.programId,
          routePath: this.data.routePath,
          vuePath: this.data.vuePath
        })
      }
    },
    loadConvertor (values) {
      this.$nextTick(() => {
        this.$refs.sysProgramForm.resetFormValues()
        if (this.mode === 'create') {
          this.icon = ''
          this.$refs.ownerAppId && this.$refs.ownerAppId.cleanSelected()
          this.$refs.icon && this.$refs.icon.setSelected()
          this.$refs.labIcon && this.$refs.labIcon.setSelected()
        } else {
          this.icon = values.icon
          if (values.programType === '0') {
            this.$refs.icon && this.$refs.icon.setSelected(values.icon)
          } else {
            this.$refs.labIcon && this.$refs.labIcon.setSelected(values.icon)
          }
          this.$refs.ownerAppId && this.$refs.ownerAppId.setSelected(values.ownerAppId === null ? '' : values.ownerAppId)
        }
      })
      return values
    },
    /**
     * 新建数据初始化
     */
    setIn (id) {
      this.showInput = '0'
      this.$refs.sysProgramForm.setInitValue({ programType: '0', parentId: id })
    }
  }
}
</script>
