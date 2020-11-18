<template>
  <iop-data-form
    ref="userJobForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="ryjgbs"
    :loadQuery="{type: 1}"
    @onSubmitSuccess="formSubmitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="兼职机构" v-bind="formItemLayout">
            <iop-data-tree-select
              ref="deptTree"
              :url="deptTreeUrl"
              v-decorator="['deptId', { rules: [{ required: true, whitespace: true, message: '机构不能为空' }] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="兼职类型" v-bind="formItemLayout">
            <a-input placeholder="请输入兼职类型" v-decorator="['gxbm', { rules: [{ required: true, whitespace: true, message: '类型不能为空' }, { max: 100, message: '兼职类型不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="职务" v-bind="formItemLayout">
            <a-input placeholder="请输入职务" v-decorator="['jgzw', { rules: [{ required: true, whitespace: true, message: '职务不能为空' }, { max: 100, message: '职务不能超过100'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="排序号" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum',{ rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}] }]" style="width: 100%;" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="开始时间" v-bind="formItemLayout">
            <a-date-picker v-decorator="['rzkssj']" style="width: 100%;" :disabled-date="disabledStartDate"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="结束时间" v-bind="formItemLayout">
            <a-date-picker v-decorator="['rzjssj']" style="width: 100%;" :disabled-date="disabledEndDate"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="状态" v-bind="formItemLayout">
            <a-switch :checked="status" @change="onSwitchChange" checked-children="启用" un-checked-children="禁用" default-checked />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="23" :offset="2">
          <a-form-item label="备注" v-bind="textAreaformItemLayout">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 职务编码，暂时不用 -->
      <input type="hidden" id="bm" :value="record.bm" />
      <!-- 届号,暂时不用 -->
      <input type="hidden" id="jh" :value="record.jh" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataDictSelect, IopDataTreeSelect, IopDataForm } from '@/iop/components'
import moment from 'moment'
import path from '@/iop/api'
import pubUserJobFormVO from './vo/user-job-form-vo'

export default {
  name: 'UserJobForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      url: path.system.pubUser.job,
      deptTreeUrl: path.system.dept.tree,
      vo: pubUserJobFormVO,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      },
      status: true
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    userId: {
      type: String,
      required: false,
      default: ''
    },
    ryjgbs: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    disabledStartDate (current) {
      const end = this.$refs.userJobForm.getFieldValue('rzjssj')
      if (end) {
        return current && current >= moment(end).endOf('day')
      }
      return false
    },
    disabledEndDate (current) {
      const start = this.$refs.userJobForm.getFieldValue('rzkssj')
      if (start) {
        return current && current <= moment(start).endOf('day')
      }
      return false
    },
    show () {
      this.$refs.userJobForm.showModal()
    },

    submit () {
      this.$refs.userJobForm.submitForm()
    },

    load () {
      this.$refs.userJobForm && this.$refs.userJobForm.load()
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        this.status = true
        value.orderNum = '1'
        this.$nextTick(() => {
          this.$refs.deptTree.cleanSelected()
        })
      } else {
        this.status = (value.status === '1')
        this.$nextTick(() => {
          this.$refs.deptTree.setSelected({ title: value.deptName, value: value.deptId })

          if (value.rzkssj) {
            value.rzkssj = moment(value.rzkssj)
          }
          if (value.rzjssj) {
            value.rzjssj = moment(value.rzjssj)
          }
        })
      }
      return value
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      let { deptId } = value
      if (!deptId) {
        deptId = '0'
      }

      const { rzkssj, rzjssj } = value
      if (rzkssj) {
        value.rzkssj = rzkssj.toDate().getTime()
      }
      if (rzjssj) {
        value.rzjssj = rzjssj.toDate().getTime()
      }

      Object.assign(value, { status: this.status ? '1' : '9', deptId, userId: this.userId, type: 1 })
      return value
    },

    onSwitchChange (checked) {
      this.status = checked
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    formSubmitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
