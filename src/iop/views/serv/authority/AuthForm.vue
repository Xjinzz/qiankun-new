<template>
  <iop-data-form
    ref="authForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onModalHide="onModalHide"
  >
    <template #form>
      <a-form-item label="授权方式" v-bind="formItemLayout">
        <iop-data-dict-radio type="authMode" ref="authMode" v-decorator="['openauthModeCond', { rules: [{ required: true, whitespace: true, message: '授权方式不能为空' }] }]" />
      </a-form-item>
      <a-form-item label="选择系统" v-bind="formItemLayout">
        <iop-data-dict-select ref="appSelect" type="appSelect" v-decorator="['appSelect', { rules: [{ required: true, whitespace: true, message: '选择系统不能为空' }] }]" :disabled="status=='99'||status=='88'" />
      </a-form-item>
      <a-form-item label="开放IP" v-bind="formItemLayout">
        <a-input placeholder="请输入开放IP" v-decorator="['openIp', { rules: [{ required: true, whitespace: true, message: '开放IP不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="授权类型" v-bind="formItemLayout">
        <iop-data-dict-checkbox type="suthType" v-decorator="['suthType']" @change="changeSuthType" />
      </a-form-item>
      <a-form-item v-show="timeFlag" label="起止时间" v-bind="formItemLayout">
        <!-- <a-range-picker @change="changeDate" v-model="Date"/> -->
        <a-date-picker @change="changeBeginDate" v-model="beginDate" /> -
        <a-date-picker @change="changeEndDate" v-model="endDate" />
      </a-form-item>
      <a-form-item v-show="timeFlag" label="授权时段" v-bind="formItemLayout">
        <a-time-picker v-model="beginTime" :minuteStep="60" :secondStep="60" @change="changeBeginTime" /> -
        <a-time-picker v-model="endTime" :minuteStep="60" :secondStep="60" @change="changeEndTime" />
      </a-form-item>
      <a-form-item v-show="maxNumFlag" label="最大次数" v-bind="formItemLayout">
        <a-input v-decorator="['maxNum',{ rules: [{ pattern: new RegExp(/^[1-9]\d{0,8}$/), message: '只能输入1-9位正整数' }] }]" addonAfter="次/天"> </a-input>
      </a-form-item>
      <a-form-item v-show="intervalFlag" label="频次" v-bind="formItemLayout">
        <a-input v-decorator="['interval',{ rules: [{ pattern: new RegExp(/^[1-9]\d{0,8}$/), message: '只能输入1-9位正整数' }] }]" addonAfter="次/s"> </a-input>
      </a-form-item>
    </template>
    <template #okButton>
      <a-button type="primary" @click="submitForm" >提交</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import {
  IopDataForm,
  IopDataDictSelect,
  IopDataDictRadio,
  IopDataDictCheckbox
} from '@/iop/components'
import path from '@/iop/api/index'
import authFormVO from './vo/auth-form-vo'
import moment from 'moment'

export default {
  name: 'ServForm',
  components: { IopDataForm, IopDataDictSelect, IopDataDictRadio, IopDataDictCheckbox },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.authIndex,
      /** 表单定义 */
      vo: authFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      endDate: null,
      beginDate: null,
      beginTime: null,
      endTime: null,
      forEndDate: '',
      forBeginDate: '',
      forEndTime: '',
      forBeginTime: '',
      timeFlag: false,
      maxNumFlag: false,
      intervalFlag: false,
      dateFormat: 'YYYY-MM-DD',
      id: ''
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
      default: () => {}
    },
    /** 数据主键 */
    serviceId: {
      type: [String, Array],
      required: false,
      default: null
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: null
    },
    authId: {
      type: String,
      required: false,
      default: null
    },
    createCont: {
      type: String,
      required: false,
      default: 'one'
    },
    onModalHide: {
      type: Function,
      required: false,
      default: () => {}
    },
    status: {
      type: String,
      required: false,
      default: ''
    },
    // 申请单id
    applyId: {
      type: String,
      required: false,
      default: null
    },
    // 系统id
    appId: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted () {
    if (this.mode === 'edit') {
      this.id = this.authId ? this.authId : ''
    } else {
      this.id = this.serviceId ? this.serviceId : ''
    }
  },
  watch: {
    'mode' () {
      if (this.mode === 'edit') {
        this.id = this.authId ? this.authId : ''
      } else {
        this.id = this.serviceId ? this.serviceId : ''
      }
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.authForm.showModal()
    },
    changeBeginDate (date, dates) {
      this.forBeginDate = new Date(dates).getTime()
    },
    changeEndDate (date, dates) {
      this.forEndDate = new Date(dates).getTime()
    },
    changeBeginTime (date, dates) {
      this.forBeginTime = dates
    },
    changeEndTime (date, dates) {
      this.forEndTime = dates
    },
    // 控制显示项
    changeSuthType (val) {
      this.timeFlag = val.includes('0')
      this.maxNumFlag = val.includes('1')
      this.intervalFlag = val.includes('2')
    },
    submitForm () {
      if (this.createCont === 'one') {
        this.$refs.authForm.submitForm()
      } else {
        this.$refs.authForm.submitForm(path.system.serv.batchAuth)
      }
    },
    rest () {
      this.endDate = null
      this.beginDate = null
      this.beginTime = null
      this.endTime = null
      this.timeFlag = false
      this.maxNumFlag = false
      this.intervalFlag = false
      this.$refs.appSelect.setSelected()
      this.$refs.authMode.onChange()
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { authId } = this
        Object.assign(value, { authId })
      }
      value.appId = value.appSelect
      value.beginDate = this.forBeginDate
      value.endDate = this.forEndDate
      value.beginTime = this.forBeginTime
      value.endTime = this.forEndTime
      value.authMode = value.openauthModeCond
      value.suthType = value.suthType ? value.suthType.join(',') : ''
      this.applyId && (value.applyId = this.applyId)
      if (this.createCont === 'more') {
        const createData = {
          dto: value,
          serviceIds: this.serviceId
        }
        value = createData
      } else {
        value.serviceId = this.serviceId
      }
      this.rest()
      return value
    },
    loadConvertor (value) {
      this.appId && (value.appSelect = this.appId) && (value.appId = this.appId)
      this.applyId && (value.applyId = this.applyId)
      this.$nextTick(() => {
        this.appId && this.$refs.appSelect.setSelected(value.appId)
      })
      if (this.mode !== 'create') {
        this.$nextTick(() => {
          value.appId && this.$refs.appSelect.setSelected(value.appId)
          value.authMode && this.$refs.authMode.onChange(value.authMode)
        })
        this.beginDate = value.beginDate ? moment(value.beginDate, this.dateFormat) : null
        this.endDate = value.endDate ? moment(value.endDate, this.dateFormat) : null
        this.beginTime = value.beginTime ? moment(value.beginTime, 'HH:mm:ss') : null
        this.endTime = value.endTime ? moment(value.endTime, 'HH:mm:ss') : null
        value.suthType = value.suthType ? value.suthType.split(',') : []
        this.timeFlag = value.suthType.includes('0')
        this.maxNumFlag = value.suthType.includes('1')
        this.intervalFlag = value.suthType.includes('2')
      } else {
        this.$nextTick(() => {
          this.$refs.appSelect.setSelected('')
        })
      }
      return value
    }
  }
}
</script>
