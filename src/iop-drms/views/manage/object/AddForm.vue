<template>
  <iop-data-form
    ref="basicForm"
    mode="create"
    :url="url"
    :submitQuery="submitQuery"
    :vo="vo"
    id=""
    :width="1200"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    @onSubmitSuccess="onSubmitSuccess"
  >
    <template #form>
      <div style="border-bottom:1px solid #e8e8e8">
        <div style="width:100%;heigth:100px;padding:0px 20px 20px 25px;font-size: 16px;">
          <div style="display:inline-block;font-size: 18px;">目录属性</div>
          <a @click="cataClick" style="display:inline-block;float:right;">
            {{ cataShow ? '收缩' : '展开' }}
            <a-icon :type="cataShow ? 'up' : 'down'" />
          </a>
        </div>
        <div id="cata" style="margin-top:20px;" v-show="cataShow">
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
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="third">
            <a-col :md="12" :sm="24">
              <a-form-item label="所属系统" v-bind="formItemLayout">
                <iop-service-app-select ref="appId" type="appSelect" v-decorator="['appId', { rules: [{ required: true, whitespace: true, message: '所属系统不能为空' }] }]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-else>
            <a-col :md="12" :sm="24">
              <a-form-item label="所属系统" v-bind="formItemLayout">
                <iop-data-dict-select ref="appId" type="appSelect" v-decorator="['appId', { rules: [{ required: true, whitespace: true, message: '所属系统不能为空' }] }]"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="资源分类" v-bind="formItemLayout">
                <iop-data-tree-select ref="catalogId" :url="cataUrl" query="parentId" v-decorator="['catalogId', { rules: [{ required: true, whitespace: true, message: '所属资源分类不能为空' }] }]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="发布状态" v-bind="formItemLayout">
                <a-switch :checked="userStatus" @change="onSwitchChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="发布时间" v-bind="formItemLayout">
                <a-date-picker format="YYYY-MM-DD" style="width:100%;" v-decorator="['releaseTime', { rules: [{ required: userStatus, message: '发布时间不能为空' }] }]"/>
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
              <a-form-item label="授权权限" v-bind="formItemLayout">
                <iop-data-dict-select ref="ResAccessRights" type="ResAccessRights" v-decorator="['accessRights']"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="资源格式" v-bind="formItemLayout">
                <iop-data-dict-select ref="objectFormat" type="objectFormat" v-decorator="['objectFormat']"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="更新周期" v-bind="formItemLayout">
                <a-input v-decorator="['renewalCycle', { rules: [{ max: 100, message: '周期长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="数据范围" v-bind="formItemLayout">
                <a-input v-decorator="['objectRange', { rules: [{ max: 100, message: '范围长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="资源标签" v-bind="remLayout">
            <a-input v-decorator="['objectLabel', { rules: [{ max: 100, message: '标签长度不能超过100'}] }]" />
          </a-form-item>
          <a-form-item label="资源摘要" v-bind="remLayout">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '摘要长度不能超过500'}] }]" />
          </a-form-item>
        </div>
      </div>
      <div style="margin-top:10px">
        <div style="width:100%;heigth:100px;padding:10px 20px 0px 25px;font-size: 16px;">
          <div style="display:inline-block;font-size: 18px;">系统属性</div>
          <a @click="sysClick" style="display:inline-block;float:right;">
            {{ sysShow ? '收缩' : '展开' }}
            <a-icon :type="sysShow ? 'up' : 'down'" />
          </a>
        </div>
        <div style="margin-top:20px;" v-show="sysShow">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="展示方式" v-bind="formItemLayout">
                <iop-data-dict-select ref="objectNat" type="objectNat" v-decorator="['objectNat', { rules: [{ required: true, whitespace: true, message: '请选择展示方式' }] }]"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24" v-if="!third">
              <a-form-item label="数据来源" v-bind="formItemLayout">
                <iop-data-dict-select ref="objectSource" type="objectSource" v-decorator="['objectSource', { rules: [{ required: true, whitespace: true, message: '请选择数据来源' }] }]"/>
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
                <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}] }]" style="width: 100%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="前缀字符" v-bind="formItemLayout">
                <a-input v-decorator="['objectPre', { rules: [{ max: 100, message: '前缀字符长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="显示图标" v-bind="formItemLayout">
                <a-input v-decorator="['objectIcon', { rules: [{ max: 100, message: '显示图标长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="父级名称" v-bind="formItemLayout">
                <iop-data-tree-select ref="parentTree" :url="parentUrl" query="parentId" v-decorator="['parentId']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="填充字符" v-bind="formItemLayout">
                <a-input v-decorator="['fullChar', { rules: [{ max: 100, message: '填充字符长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="表单布局" v-bind="formItemLayout">
                <iop-data-dict-select ref="layoutType" type="layoutType" v-decorator="['pageUrl']"/>
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
                <a-input v-decorator="['scrollX', { rules: [{ max: 100, message: '列表宽度长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="列表高度" v-bind="formItemLayout">
                <a-input v-decorator="['scrollY', { rules: [{ max: 100, message: '列表高度长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopServiceAppSelect } from '@/iop/components'
import { DRMS_SERV_OBJECT_AUDIT_STATUS } from '@/iop-drms/constants'
import { DatePicker } from 'ant-design-vue'
import addFormVO from './vo/add-form-vo'
import path from '@/iop-drms/api'

export default {
  name: 'AddForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, ADatePicker: DatePicker, IopServiceAppSelect },
  data () {
    return {
      cataUrl: '/iop/drms/catalog/tree',
      parentUrl: '/iop/drms/object/tree-other',
      url: path.manage.object.form,
      vo: addFormVO,
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
      relaTime: 0,
      userStatus: true,
      isConfirm: false,
      isFull: false,
      isValid: true,
      submitQuery: {}
    }
  },
  props: {
    catalogType: {
      type: String,
      required: false,
      default: ''
    },
    third: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created () {
    if (this.third) {
      this.submitQuery = { third: 1 }
    }
  },
  methods: {
    loadConvertor (values) {
      const dictSelectArray = ['catalogId', 'appId', 'ResAccessRights', 'accessRights', 'objectTrade', 'objectFormat', 'objectSource', 'objectNat', 'layoutType', 'relationLayout']
      this.$nextTick(() => {
        dictSelectArray.map(name => {
          this.$refs[name] && this.$refs[name].setSelected('')
        })
        this.isConfirm = false
        this.isFull = false
        this.isValid = true
      })
      return values
    },
    show () {
      this.$refs.basicForm.showModal()
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      this.userStatus ? value.releaseStatus = '1' : value.releaseStatus = '0'
      this.isConfirm ? value.isConfirm = '1' : value.isConfirm = '0'
      this.isFull ? value.isFull = '1' : value.isFull = '0'
      this.isValid ? value.isValid = '1' : value.isValid = '0'
      if (this.third) value.objectSource = ''
      if (!this.userStatus) {
        value.releaseTime = null
      } else {
        value.releaseTime = value.releaseTime.toDate().getTime()
      }

      value.catalogType = this.catalogType

      if (this.third) {
        value.auditStatus = DRMS_SERV_OBJECT_AUDIT_STATUS.REGISTERED
        value.catalogId = '0'
      } else {
        value.auditStatus = DRMS_SERV_OBJECT_AUDIT_STATUS.AUDITED
      }
      return value
    },
    cataClick () {
      this.cataShow = !this.cataShow
      if (this.cataText === '收缩') {
        this.cataText = '展开'
      } else {
        this.cataText = '收缩'
      }
    },
    sysClick () {
      this.sysShow = !this.sysShow
      if (this.sysText === '收缩') {
        this.sysText = '展开'
      } else {
        this.sysText = '收缩'
      }
    },
    onSwitchChange (checked) {
      this.userStatus = checked
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
    }
  }
}
</script>
