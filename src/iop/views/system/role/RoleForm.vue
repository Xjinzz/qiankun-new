<template>
  <iop-data-form
    ref="roleForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :width="width"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-form-item label="角色名称" v-bind="formItemLayout">
        <a-input placeholder="请输入角色名称" v-decorator="['roleName', { rules: [{ required: true, whitespace: true, message: '角色名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="角色分组" v-bind="formItemLayout">
        <a-input placeholder="请输入分组" v-decorator="['roleGroup', { rules: [{ max: 100, message: '分组长度不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="角色类型" v-bind="formItemLayout">
        <iop-data-dict-select ref="roleTypes" type="roleType" v-decorator="['roleType']"></iop-data-dict-select>
      </a-form-item>
      <a-form-item label="角色说明" v-bind="formItemLayout">
        <a-textarea placeholder="请输入角色说明" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '说明长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import roleFormVO from './vo/role-form-vo'
import path from '@/iop/api'

// TODO 下拉树组件
export default {
  name: 'BasicsForm',
  components: { IopDataForm, IopDataDictSelect },
  data () {
    return {
      width: 650,
      /** 表单加载、提交地址 */
      url: path.system.role.table,
      /** 表单定义 */
      vo: roleFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    id: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: false,
      default: ''
    },
    selectedNode: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.roleForm.showModal()
    },
    reset (cb) {
      cb && cb()
    },
    /**
     * 加载前
     */
    loadConvertor (values) {
      this.$nextTick(() => {
        this.$refs.roleTypes && this.$refs.roleTypes.cleanSelected()
      })
      if (this.mode !== 'create') {
        this.$nextTick(() => {
          this.$refs.roleTypes.cleanSelected()
          this.$refs.roleTypes && this.$refs.roleTypes.setSelected(values.roleType)
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'create') {
        value.sysDeptId = this.selectedNode
      }
      if (this.mode === 'edit') {
        const { roleId } = this
        Object.assign(value, { roleId })
      }
      return value
    }
  }
}
</script>
