<template>
  <iop-data-form
    ref="areaForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="areaId"
    @onSubmitSuccess="submitSuccess"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
  >
    <template #form="{ record }">
      <a-form-item label="区域编码" v-bind="formItemLayout">
        <a-input placeholder="请输入区域编码" v-decorator="['areaCode', { rules: [{ required: true, whitespace: true, message: '区域编码不能为空' }, { max: 100, message: '编码长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="行政级别" v-bind="formItemLayout">
        <iop-data-dict-select ref="areaLevel" type="areaLevel" v-decorator="['areaLevel', { rules: [{ required: true, whitespace: true, message: '请选择行政级别' }] }]" />
      </a-form-item>
      <a-form-item label="区域全称" v-bind="formItemLayout">
        <a-input placeholder="请输入区域全称" v-decorator="['fullName', { rules: [{ required: true, whitespace: true, message: '区域全称不能为空' }, { max: 100, message: '区域全称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="区域简称" v-bind="formItemLayout">
        <a-input placeholder="请输入区域简称" v-decorator="['shortName', { rules: [{ required: true, whitespace: true, message: '区域简称不能为空' }, { max: 100, message: '区域简称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="排序号码" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width:100%;" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
      <input id="parentId" type="hidden" :value="record.parentId" />
      <input id="levelCode" type="hidden" :value="record.levelCode" />
      <input id="lng" type="hidden" :value="record.lng" />
      <input id="lat" type="hidden" :value="record.lat" />
      <input id="secretLevel" type="hidden" :value="record.secretLevel" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import areaFormVO from './vo/area-form-vo'
import path from '@/iop/api/index'

export default {
  name: 'AreaForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.area.index,
      treeUrl: path.system.area.tree,
      /** 表单定义 */
      vo: areaFormVO,
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    /** 数据主键 */
    areaId: {
      type: String,
      required: false,
      default: null
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: '0'
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.areaForm.showModal()
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        value.orderNum = 1
        this.$nextTick(() => {
          this.$refs.areaLevel.cleanSelected()
        })
      }
      return value
    },

    submitConvertor (value) {
      if (this.mode === 'create') {
        value.parentId = this.parentId
      }
      return value
    },

    submitSuccess (record = {}) {
      this.$emit('onSubmitSuccess', record)
    }
  }
}
</script>
