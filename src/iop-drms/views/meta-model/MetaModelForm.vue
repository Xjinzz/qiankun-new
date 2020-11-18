<template>
  <iop-data-form
    ref="basicForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="objectId"
    title="目录属性"
    showType="page"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onSubmitSuccess="onSubmitSuccess"
  >
    <template #pageHeader>
      <a-button @click="cataClick">
        {{ cataShow ? '收缩' : '展开' }}
        <a-icon :type="cataShow ? 'up' : 'down'" />
      </a-button>
      <slot name="afterCataClick" />
    </template>
    <template #form>
      <div v-show="cataShow">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="12" :sm="24">
            <a-form-item label="资源编号" v-bind="formItemLayout">
              <a-input v-decorator="['objectCode', { rules: [{ required: true, whitespace: true, message: '资源对象编号不能为空' }, { max: 100, message: '编号长度不能超过100'}] }]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="对象名称" v-bind="formItemLayout">
              <a-input v-decorator="['objectName', { rules: [{ required: true, whitespace: true, message: '资源对象名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="12" :sm="24">
            <a-form-item label="所属系统" v-bind="formItemLayout">
              <iop-data-dict-select ref="appId" type="appSelect" v-decorator="['appId', { rules: [{ required: true, whitespace: true, message: '请选择所属系统' }] }]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="授权权限" v-bind="formItemLayout">
              <iop-data-dict-select ref="accessRights" type="ResAccessRights" v-decorator="['accessRights']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="12" :sm="24">
            <a-form-item label="资源领域" v-bind="formItemLayout">
              <iop-data-dict-select ref="objectDomain" type="objectDomain" v-decorator="['objectDomain']"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="行业分类" v-bind="formItemLayout">
              <iop-data-dict-select ref="objectTrade" type="objectTrade" v-decorator="['objectTrade']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="12" :sm="24">
            <a-form-item label="资源格式" v-bind="formItemLayout">
              <iop-data-dict-select ref="objectFormat" type="objectFormat" v-decorator="['objectFormat']"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="更新周期" v-bind="formItemLayout">
              <a-input v-decorator="['renewalCycle', { rules: [{ max: 100, message: '字符位数度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="12" :sm="24">
            <a-form-item label="数据范围" v-bind="formItemLayout">
              <a-input v-decorator="['objectRange', { rules: [{ max: 100, message: '字符位度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="资源标签" v-bind="remLayout">
          <a-input v-decorator="['objectLabel', { rules: [{ max: 100, message: '标签长度不能超过100'}]}]" />
        </a-form-item>
        <a-form-item label="资源摘要" v-bind="remLayout">
          <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '摘要长度不能超过500'}]}]" />
        </a-form-item>
      </div>
    </template>
    <template #additional>
      <a-card title="系统属性" :bordered="false" style="margin-top:-60px;">
        <template #extra>
          <a-button @click="sysClick">
            {{ sysShow ? '收缩' : '展开' }}
            <a-icon :type="sysShow ? 'up' : 'down'" />
          </a-button>
        </template>
        <div v-show="sysShow">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="展示方式" v-bind="formItemLayout">
                <iop-data-dict-radio ref="objectNat" type="objectNat" v-decorator="['objectNat', { rules: [{ required: true, whitespace: true, message: '请选择展示方式' }] }]"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="数据来源" v-bind="formItemLayout">
                <iop-data-dict-radio ref="objectSource" type="objectSource" v-decorator="['objectSource', { rules: [{ required: true, whitespace: true, message: '请选择数据来源' }] }]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否有效" v-bind="formItemLayout">
                <a-switch :checked="isValid" @change="onIsValid"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="是否定长" v-bind="formItemLayout">
                <a-switch :checked="isFull" @change="onIsFull"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="人工确认" v-bind="formItemLayout">
                <a-switch :checked="isConfirm" @change="onIsConfirm"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="排序号码" v-bind="formItemLayout">
                <a-input-number style="width: 100%;" v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="前缀字符" v-bind="formItemLayout">
                <a-input v-decorator="['objectPre', { rules: [{ max: 100, message: '字符长度不能超过100'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="显示图标" v-bind="formItemLayout">
                <a-input v-decorator="['objectIcon']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="表单布局" v-bind="formItemLayout">
                <iop-data-dict-select ref="pageUrl" type="layoutType" v-decorator="['pageUrl']"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="关联布局" v-bind="formItemLayout">
                <iop-data-dict-select ref="relationLayout" type="relationLayout" v-decorator="['relationLayout']"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="列表宽度" v-bind="formItemLayout">
                <a-input v-decorator="['scrollX', { rules: [{ max: 100, message: '字符长度不能超过100'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="列表高度" v-bind="formItemLayout">
                <a-input v-decorator="['scrollY', { rules: [{ max: 100, message: '字符长度不能超过100'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="填充字符" v-bind="formItemLayout">
                <a-input v-decorator="['fullChar', { rules: [{ max: 100, message: '字符长度不能超过100'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-card>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopServiceAppSelect } from '@/iop/components'
import { DRMS_SERV_OBJECT_AUDIT_STATUS } from '@/iop-drms/constants'
import metaModelFormVO from './vo/meta-model-form-vo'
import path from '@/iop-drms/api'

export default {
  name: 'MetaModelForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopServiceAppSelect },
  data () {
    return {
      url: path.manage.object.form,
      vo: metaModelFormVO,
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
      },
      remLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      cataShow: true,
      sysShow: true,
      isConfirm: false,
      isFull: false,
      isValid: true
    }
  },
  props: {
    catalogType: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: false,
      default: 'create'
    },
    catalogId: {
      type: String,
      required: true
    },
    objectId: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    loadConvertor (values) {
      const dictSelectArray = ['appId', 'accessRights', 'objectTrade', 'objectFormat', 'pageUrl', 'relationLayout']
      if (this.mode === 'create') {
        this.isConfirm = false
        this.isFull = false
        this.isValid = true
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name] && this.$refs[name].setSelected('')
          })
        })
      } else {
        this.isConfirm = (values.isConfirm === '1')
        this.isFull = (values.isFull === '1')
        this.isValid = (values.isValid === '1')
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name] && this.$refs[name].setSelected(values[name])
          })
        })
      }
      return values
    },

    load () {
      this.$nextTick(() => {
        this.$refs.basicForm && this.$refs.basicForm.load()
      })
    },

    submitConvertor (value) {
      this.isConfirm ? value.isConfirm = '1' : value.isConfirm = '0'
      this.isFull ? value.isFull = '1' : value.isFull = '0'
      this.isValid ? value.isValid = '1' : value.isValid = '0'

      value.catalogType = this.catalogType
      value.catalogId = this.catalogId
      value.auditStatus = DRMS_SERV_OBJECT_AUDIT_STATUS.AUDITED
      return value
    },
    cataClick () {
      this.cataShow = !this.cataShow
    },
    sysClick () {
      this.sysShow = !this.sysShow
    },
    onIsValid (checked) {
      this.isValid = checked
    },
    onIsFull (checked) {
      this.isFull = checked
    },
    onIsConfirm (checked) {
      this.isConfirm = checked
    },

    onSubmitSuccess () {
      this.$emit('onSubmitSuccess')
    },

    submit () {
      this.$refs.basicForm.submitForm()
    }
  }
}
</script>
