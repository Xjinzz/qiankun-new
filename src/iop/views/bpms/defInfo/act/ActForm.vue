<template>
  <iop-data-form
    ref="actForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :width="800"
    :id="id"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="活动名称" v-bind="formItemLayout">
            <a-input placeholder="请输入活动名称" :maxLength="100" v-decorator="['actName', { rules: [{ required: true, whitespace: true, message: '活动名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="活动编码" v-bind="formItemLayout">
            <a-input placeholder="请输入活动编码" :maxLength="100" v-decorator="['actCode', { rules: [{ required: true, whitespace: true, message: '活动编码不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="打开地址" v-bind="formItemLayout">
            <a-input placeholder="请输入打开地址" :maxLength="200" v-decorator="['url', { rules: [{ required: true, whitespace: true, message: '打开地址不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="活动类型" v-bind="formItemLayout">
            <iop-data-dict-select ref="actType" type="BPMS_NODE_TYPE" v-decorator="['actType', { rules: [{ required: true, whitespace: true, message: '请选择活动类型' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="应用提供者" v-bind="formItemLayout">
            <a-input placeholder="请输入应用提供者" :maxLength="100" v-decorator="['appProvider']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="排序号" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width:100%;"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="范围类型" v-bind="formItemLayout">
            <a-input placeholder="请输入范围类型" :maxLength="100" v-decorator="['firstItem']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="范围值" v-bind="formItemLayout">
            <a-input placeholder="请输入范围值" :maxLength="100" v-decorator="['secondItem']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="业务状态" v-bind="formItemLayout">
            <a-input :maxLength="100" v-decorator="['busiState']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="24" :sm="24">
          <a-form-item label="备注" v-bind="formItemLayout24">
            <a-textarea placeholder="请输入备注" :maxLength="500" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark']" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopUploadDragger } from '@/iop/components/index'
import actFormVo from './vo/act-form-vo'
import path from '@/iop/api/index'
export default {
  name: 'ActForm',
  components: { IopDataForm, IopDataDictSelect, IopUploadDragger },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.bpms.definfo.act.add,
      /** 表单定义 */
      vo: actFormVo,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      formItemLayout24: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
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
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    id: {
      type: String,
      required: false,
      default: null
    },
    defId: {
      type: String,
      required: false,
      default: null
    }

  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.actForm.showModal()
      // this.$refs.actType.cleanSelected()
      this.$nextTick(() => {
        this.$refs.actType && this.$refs.actType.cleanSelected()
      })
    },
    /**
     * 加载前
     */
    loadConvertor (value) {
      this.$nextTick(() => {
        value.actType && this.$refs.actType.setSelected(value.actType)
      })
      return value
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      if (this.mode === 'edit') {
        const { id } = this
        Object.assign(value, { id })
      }
      // 流程定义id必需加上
      const { defId } = this
      Object.assign(value, { defId })

      return value
    }
  }
}
</script>
