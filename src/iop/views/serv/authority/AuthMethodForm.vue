<template>
  <iop-data-form
    ref="authMethodForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :title="title"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onModalHide="onModalHide"
  >
    <template #form>
      <a-form-item label="授权方式" v-bind="formItemLayout">
        <iop-data-dict-radio ref="authMode" type="authMode" v-decorator="['openauthModeCond']" @change="changeAuthMode"/>
      </a-form-item>
      <a-form-item label="选择系统" v-bind="formItemLayout">
        <iop-data-dict-select ref="appSelect" type="appSelect" v-decorator="['appSelect']" />
      </a-form-item>
      <a-form-item :label="authModeFlag ? '开放IP:' : '限制IP:'" v-bind="formItemLayout">
        <a-input placeholder="请输入IP" v-decorator="['openIp']" maxLength="100"/>
      </a-form-item>
      <a-form-item label="授权类型:" v-bind="formItemLayout">
        <iop-data-dict-checkbox type="suthType" v-decorator="['suthType']" @change="changeSuthType" />
      </a-form-item>
      <a-form-item v-show="timeFlag" label="开放起止时间:" v-bind="formItemLayout">
        <a-date-picker @change="changeBeginDate" v-model="beginDate" /> - <a-date-picker @change="changeEndDate" v-model="endDate" />
      </a-form-item>
      <a-form-item v-show="timeFlag" label="开放授权时段:" v-bind="formItemLayout">
        <a-time-picker v-model="beginTime" :minuteStep="60" :secondStep="60" @change="changeBeginTime" /> -
        <a-time-picker v-model="endTime" :minuteStep="60" :secondStep="60" @change="changeEndTime" />
      </a-form-item>
      <a-form-item v-if="authModeFlag" v-show="maxNumFlag" label="最大次数:" v-bind="formItemLayout">
        <a-input v-decorator="['maxNum',{ rules: [{ pattern: new RegExp(/^[1-9]\d{0,9}$/), message: '只能输入1-10位正整数' }] }]" addonAfter="次/天"> </a-input>
      </a-form-item>
      <a-form-item v-if="authModeFlag" v-show="intervalFlag" label="最小间隔:" v-bind="formItemLayout">
        <a-input v-decorator="['interval',{ rules: [{ pattern: new RegExp(/^[1-9]\d{0,9}$/), message: '只能输入1-10位正整数' }] }]" addonAfter="次/s"> </a-input>
      </a-form-item>
      <a-form
        ref="paramAuthForm"
        :model="paramAuthForm"
      >
        <a-row>
          <a-col>
            <h2>参数授权</h2>
          </a-col>
        </a-row>
        <template v-if="paramAuthForm.domains">
          <div v-for="(item, ind) in paramAuthForm.domains" :key="ind">
            <a-form-item
              :key="item.paramLabel + ind"
              v-bind="formItemLayout"
              :label="item.paramLabel"
            >
              <a-row type="flex" justify="space-between">
                <a-col :span="18">
                  <a-select @change="(value, option)=> handleChange(value, option, ind)" :value="item.paraId">
                    <a-select-option v-for="(val, index) in domainOption" :key="index" :value="val.paraId">{{ val.paraName }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">
                  <a-button v-if="ind === domainCount" type="dashed" icon="plus" @click="add">新增</a-button>
                  <a-button v-else icon="delete" type="dashed" @click="minus(ind)">删除</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item
              :key="item.authLabel + ind"
              v-bind="formItemLayout"
              :label="item.authLabel"
            >
              <iop-data-dict-select :ref="item.paramAuthType" :value="item.authParaVal" @change="(value, option)=> changeAuthParaVal(value, option, ind)" :type="item.paramAuthType" v-decorator="[item.paramAuthType]" />
            </a-form-item>
          </div>
        </template>
      </a-form>
      <a-form v-if="mode !== 'create'">
        <a-row>
          <a-col>
            <h2>Token</h2>
          </a-col>
        </a-row>
        <a-form-item label="生成token:" v-bind="formItemLayout">
          <a-button type="dashed" @click="createToken">生成</a-button>
        </a-form-item>
        <a-form-item label="token展示:" v-bind="formItemLayout">
          <a-textarea v-model="token" :autoSize="{ minRows: 3, maxRows: 6 }" maxLength="500"/>
        </a-form-item>
      </a-form>
    </template>
    <template #cancelButton>
      <a-button @click="cancel">取消</a-button>
    </template>
    <template #resetButton>
      <a-button @click="rest">重置</a-button>
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
import authMethodFormVO from './vo/auth-method-form-vo'
import path from '@/iop/api/index'
import { iopServService } from '@/iop/service/index'
import moment from 'moment'

export default {
  name: 'AuthMethodForm',
  components: { IopDataForm, IopDataDictSelect, IopDataDictRadio, IopDataDictCheckbox },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.authIndex,
      /** 表单定义 */
      vo: authMethodFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      title: '授权基本信息',
      timeFlag: false,
      intervalFlag: false,
      maxNumFlag: false,
      authModeFlag: false,
      endDate: null,
      beginDate: null,
      beginTime: null,
      endTime: null,
      forEndDate: '',
      forBeginDate: '',
      forEndTime: '',
      forBeginTime: '',
      token: '',
      id: '',
      paramAuthForm: {
        domains: [
          {
            paramLabel: '选择参数',
            paraId: '',
            authLabel: '授权',
            paramAuthType: '',
            authParaVal: ''
          }
        ]
      },
      domainCount: 0,
      domainOption: []
    }
  },
  props: {
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
    onModalHide: {
      type: Function,
      required: false,
      default: () => {}
    },
    /** 数据主键 */
    methodId: {
      type: String,
      required: false,
      default: ''
    },
    serviceId: {
      type: String,
      required: false,
      default: ''
    },
    authId: {
      type: String,
      required: false,
      default: null
    }
  },
  watch: {
    'methodId' () {
      iopServService.paramList(this.methodId).then(res => {
        this.domainOption = res.data
      })
    },
    'mode' () {
      if (this.mode === 'edit') {
        this.id = this.authId
      } else {
        this.id = this.serviceId
      }
    }
  },
  mounted () {
    iopServService.paramList(this.methodId).then(res => {
      this.domainOption = res.data
    })
    if (this.mode === 'edit') {
      this.id = this.authId
    } else {
      this.id = this.serviceId
    }
  },
  methods: {
    show () {
      this.$refs.authMethodForm.showModal()
    },
    // 切换授权方式
    changeAuthMode (e) {
      if (e && e.target) {
        this.authModeFlag = e.target.value === '0'
      }
    },
    //  切换授权类型
    changeSuthType (val) {
      this.timeFlag = val.includes('0')
      this.maxNumFlag = val.includes('1')
      this.intervalFlag = val.includes('2')
    },
    /**
     * 时间选择器
     */
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
    /**
     * 参数授权
     */
    handleChange (value, opt, ind) {
      this.paramAuthForm.domains[ind].paraId = value
      iopServService.paramDetail(value).then(res => {
        this.paramAuthForm.domains[ind].paramAuthType = res.paraPage
      })
    },
    changeAuthParaVal (val, opt, ind) {
      this.paramAuthForm.domains[ind].authParaVal = val
    },
    add () {
      this.domainCount++
      this.paramAuthForm.domains.push({
        paramLabel: '选择参数',
        paraId: '',
        authLabel: '授权',
        paramAuthType: '',
        authParaVal: ''
      })
    },
    minus (ind) {
      this.domainCount--
      this.paramAuthForm.domains.splice(ind, 1)
    },
    // 生成token
    createToken () {
      iopServService.createToken(this.id).then(res => {
        this.token = res.token
      })
    },
    //  取消
    cancel (formName) {
      this.domainCount = 0
      this.timeFlag = false
      this.maxNumFlag = false
      this.intervalFlag = false
      this.endDate = null
      this.beginDate = null
      this.beginTime = null
      this.endTime = null
      this.token = ''
      this.paramAuthForm.domains = [
        {
          paramLabel: '选择参数',
          paraId: '',
          authLabel: '授权',
          paramAuthType: '',
          authParaVal: ''
        }
      ]
      this.$refs.authMode.cleanChecked()
      this.$refs.appSelect.cleanSelected()
      this.$refs.authMethodForm.resetFormValues()
      this.$refs.authMethodForm.hideModal()
    },
    //  重置
    rest () {
      this.domainCount = 0
      this.timeFlag = false
      this.maxNumFlag = false
      this.intervalFlag = false
      this.endDate = null
      this.beginDate = null
      this.beginTime = null
      this.endTime = null
      this.token = ''
      this.paramAuthForm.domains = [
        {
          paramLabel: '选择参数',
          paraId: '',
          authLabel: '授权',
          paramAuthType: '',
          authParaVal: ''
        }
      ]
      this.$refs.authMode.cleanChecked()
      this.$refs.appSelect.cleanSelected()
      this.$refs.authMethodForm.resetFormValues()
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { methodId } = this
        Object.assign(value, {
          methodId: methodId,
          token: this.token
        })
      }
      value.authMode = value.openauthModeCond
      value.appId = value.appSelect
      value.beginDate = this.forBeginDate
      value.endDate = this.forEndDate
      value.endDate = this.forEndDate
      value.beginTime = this.forBeginTime
      value.endTime = this.forEndTime
      value.serviceId = this.serviceId
      value.methodId = this.methodId
      value.suthType = value.suthType ? value.suthType.join(',') : ''
      const servAuthParaDTOList = []
      this.paramAuthForm.domains && this.paramAuthForm.domains.forEach((v, i) => {
        servAuthParaDTOList.push({
          authParaVal: v.authParaVal,
          paraId: v.paraId
        })
      })
      value.servAuthParaDTOList = servAuthParaDTOList
      this.rest()
      return value
    },

    loadConvertor (value) {
      if (this.mode !== 'create') {
        value.appId && this.$refs.appSelect.setSelected(value.appId)
        value.authMode && this.$refs.authMode.onChange(value.authMode)
        this.authModeFlag = value.authMode === '0'
        this.beginDate = value.beginDate ? moment(value.beginDate, this.dateFormat) : null
        this.endDate = value.endDate ? moment(value.endDate, this.dateFormat) : null
        this.beginTime = value.beginTime ? moment(value.beginTime, 'HH:mm:ss') : null
        this.endTime = value.endTime ? moment(value.endTime, 'HH:mm:ss') : null
        value.suthType = value.suthType ? value.suthType.split(',') : []
        this.timeFlag = value.suthType.includes('0')
        this.maxNumFlag = value.suthType.includes('1')
        this.intervalFlag = value.suthType.includes('2')
        this.token = value.token
        this.domainCount = value.servAuthParaDTOList ? value.servAuthParaDTOList.length - 1 : 0
        value.servAuthParaDTOList && value.servAuthParaDTOList.forEach((v, i) => {
          this.paramAuthForm.domains[i] = {
            paramLabel: '选择参数',
            paraId: value.servAuthParaDTOList[i].paraId,
            authLabel: '授权',
            paramAuthType: value.servAuthParaDTOList[i].paraPage,
            authParaVal: value.servAuthParaDTOList[i].authParaVal
          }
        })
      }
      return value
    }
  }
}
</script>
