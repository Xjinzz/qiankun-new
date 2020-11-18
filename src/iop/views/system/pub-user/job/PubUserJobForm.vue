<template>
  <iop-data-form
    ref="pubUserJobForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="ryjgbs"
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
            <iop-data-dict-radio type="jobType" v-decorator="['gxbm', { rules: [{ required: true, whitespace: true, message: '请选择兼职类型' }]}]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="职务" v-bind="formItemLayout">
            <a-input placeholder="请输入职务" v-decorator="['jgzw', { rules: [{ required: true, whitespace: true, message: '职务不能为空' }, { max: 100, message: '职务长度不能超过100'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="排序号" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width:100%;" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="开始时间" v-bind="formItemLayout">
            <a-date-picker v-decorator="['rzkssj']" style="width:100%;" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="结束时间" v-bind="formItemLayout">
            <a-date-picker v-decorator="['rzjssj']" style="width:100%;" />
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
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 100, message: '备注长度不能超过500'}]}]"/>
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
import { IopDataDictSelect, IopDataTreeSelect, IopDataForm, IopDataDictRadio } from '@/iop/components'
import moment from 'moment'
import path from '@/iop/api'
import pubUserJobFormVO from './vo/pub-user-job-form-vo'

export default {
  name: 'PubUserJobForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      url: path.system.pubUser.job,
      deptTreeUrl: path.system.pubDept.tree,
      vo: pubUserJobFormVO,
      localDeptId: '',
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
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  methods: {
    show () {
      this.$refs.pubUserJobForm.showModal()
    },

    submit () {
      this.$refs.pubUserJobForm.submitForm()
    },

    load () {
      this.$refs.pubUserJobForm && this.$refs.pubUserJobForm.load()
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
      this.localDeptId = deptId

      const { rzkssj, rzjssj } = value
      if (rzkssj) {
        value.rzkssj = rzkssj.toDate().getTime()
      }
      if (rzjssj) {
        value.rzjssj = rzjssj.toDate().getTime()
      }

      Object.assign(value, { status: this.status ? '1' : '9', deptId, userId: this.userId, type: 0 })
      return value
    },

    onSwitchChange (checked) {
      this.status = checked
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    formSubmitSuccess () {
      this.$emit('onSubmitSuccess', this.localDeptId)
    }
  }
}
</script>
