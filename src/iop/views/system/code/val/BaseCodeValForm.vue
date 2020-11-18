<template>
  <iop-data-form
    ref="codeValForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="valId"
    :loadConvertor="loadConvertor"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
  >
    <template #form>
      <a-form-item label="编码值名称" v-bind="formItemLayout">
        <a-input placeholder="请输入编码值名称" v-decorator="['valName', { rules: [{ required: true, whitespace: true, message: '编码值名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="编码存储值" v-bind="formItemLayout">
        <a-input placeholder="请输入编码存储值" v-decorator="['valCode', { rules: [{ required: true, whitespace: true, message: '编码存储值不能为空' }, { max: 100, message: '存储值长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="有效" v-bind="formItemLayout">
        <a-switch :checked="isValide" @change="onSwitchChange" checked-children="是" un-checked-children="否" default-checked/>
      </a-form-item>
      <a-form-item label="排序号" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width: 100%;"/>
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import baseCodeValForm from './vo/base-code-val-form-vo'
import path from '@/iop/api'

export default {
  name: 'BaseCodeValForm',
  components: { IopDataForm },
  data () {
    return {
      url: path.system.codeVla.index,
      vo: baseCodeValForm,
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      isValide: true
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    valId: {
      type: String,
      required: false,
      default: ''
    },
    parentId: {
      type: String,
      required: false,
      default: ''
    },
    codeId: {
      type: String,
      required: true
    }
  },
  methods: {
    show () {
      this.$refs.codeValForm.showModal()
      this.$nextTick(() => {
        this.$refs.codeValForm.load()
      })
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        this.isValide = true
      } else {
        this.isValide = (value.isValide === '1')
      }
      !value.orderNum && (value.orderNum = 1)
      return value
    },

    submitConvertor (value) {
      const { codeId } = this
      let { parentId } = this
      if (!parentId) {
        parentId = '0'
      }
      Object.assign(value, { codeId, parentId, isValide: this.isValide ? '1' : '0' })
      return value
    },

    onSwitchChange (checked) {
      this.isValide = checked
    }
  }
}
</script>
