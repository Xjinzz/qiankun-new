<template>
  <iop-data-form
    ref="defInfoForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :width="800"
    :id="defId"
    :showType="showType"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="流程名称" v-bind="formItemLayout">
            <a-input placeholder="请输入流程名称" :maxLength="100" v-decorator="['defName', { rules: [{ required: true, whitespace: true, message: '流程名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="流程编码" v-bind="formItemLayout">
            <a-input placeholder="请输入流程编码" :maxLength="100" v-decorator="['defCode', { rules: [{ required: true, whitespace: true, message: '流程编码不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="节点类型" v-bind="formItemLayout">
            <a-radio-group v-decorator="['nodeType', { rules: [{ required: true, whitespace: true, message: '请选择节点类型' }] }]">
              <a-radio value="1">流程</a-radio>
              <a-radio value="0">目录</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="表单打开地址" v-bind="formItemLayout">
            <a-input placeholder="请输入表单打开地址" :maxLength="200" v-decorator="['url']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="版本号" v-bind="formItemLayout">
            <a-input placeholder="请输入版本号" :maxLength="100" v-decorator="['version']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="流程定义文件标识" v-bind="formItemLayout">
            <a-input placeholder="请输入流程定义文件标识" :maxLength="100" v-decorator="['defContentId']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="上一版本标识" v-bind="formItemLayout">
            <a-input placeholder="请输入上一版本标识" :maxLength="100" v-decorator="['previousVersionId']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="是否锁定" v-bind="formItemLayout">
            <a-switch :checked="lock" @change="onLock"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="排序号：" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern:new RegExp('^[0-9]{1,9}$'), message: '请输入整数，最多输入9位数' }] }]" style="width:100%;"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="自由流程" v-bind="formItemLayout">
            <a-switch :checked="freeFlow" @change="onFreeFlow"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <a-form-item label="导入配置信息" v-bind="formItemLayout">
            <!-- TODO -->
            <!-- <iop-upload-dragger ref="tmp" :mode="mode" :id="uuid" businessName="BpmsDefInfoTmplStore" attrName="TMPL_FILE" /> -->
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="发布状态" v-bind="formItemLayout">
            <a-switch :checked="public_" @change="onPublic" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="22" :sm="24">
          <a-form-item label="有效时间：" v-bind="formItemLayout24" >
            <a-range-picker @change="onChange" :value="dateData" :disabled="false" style="width:100%;">
            </a-range-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="22" :sm="22">
          <a-form-item label="备注" v-bind="formItemLayout24">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注说明最多500位' }]}]" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
    <template >

    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopUploadDragger } from '@/iop/components/index'
import defInfoFormVO from './vo/def-info-form-vo'
import path from '@/iop/api/index'
import moment from 'moment'
import UUIDUtils from '@/utils/uuid'

export default {
  name: 'DefInfoForm',
  components: { IopDataForm, IopDataDictSelect, IopUploadDragger },
  data () {
    return {
      /** 显示类型 默认弹框 */
      showType: 'modal',
      /** 表单加载、提交地址 */
      url: path.bpms.definfo.info.add,
      /** 表单定义 */
      vo: defInfoFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      formItemLayout24: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      /** 是否锁定 */
      lock: false,
      /** 是否是发布状态 */
      public_: false,
      /** 是否自由流程 */
      freeFlow: false,
      /** 导入配置信息 */
      uuid: '',
      tmplId: '',
      /** 时间 */
      dateFormat: 'YYYY-MM-DD',
      dateData: []
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
    defId: {
      type: String,
      required: false,
      default: null
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: null
    }
  },
  watch: {
    /**
     * 上级行政区域
     */
    parentId (value) {
      this.$refs.defInfoForm.setInitValue({ parentId: value })
    }
  },
  methods: {
    // 重置
    reset (cb) {
      cb()
      const value = this.$refs.defInfoForm.record
      if (this.mode === 'create') {
        // 默认发布
        this.public_ = true
        this.lock = false
        this.freeFlow = false
        this.dateData = []
      } else {
        value.lock === '1' ? this.lock = true : this.lock = false
        value.public_ === '1' ? this.public_ = true : this.public_ = false
        value.freeFlow === '1' ? this.freeFlow = true : this.freeFlow = false
        // 有效时间转换格式
        this.onChange([moment(new Date(value.validStarttime), this.dateFormat), moment(new Date(value.validEndtime), this.dateFormat)])
      }
    },
    /**
     * 时间改变事件
     */
    onChange (date, dateString) {
      this.dateData = date
    },
    /**
     * 是否自由流程
     */
    onFreeFlow (checked) {
      this.freeFlow = checked
    },

    /**
     * 是否是发布状态
     */
    onPublic (checked) {
      this.public_ = checked
    },

    /**
     * 是否锁定
     */
    onLock (checked) {
      this.lock = checked
    },

    /**
     * 显示弹窗
     */
    show (mode, tmplId) {
      this.tmplId = tmplId
      mode && (this.mode = mode)
      // TODO 暂时没有tmplId
      this.uuid = UUIDUtils.generate()

      if (this.mode === 'create') {
        // 弹框
        this.showType = 'modal'
        // this.uuid = UUIDUtils.generate()
        this.$refs.defInfoForm.showModal()
      } else if (this.mode === 'view') {
        this.showType = 'modal'
        // this.uuid = this.tmplId
        this.$refs.defInfoForm.showModal()
      } else {
        // 页面
        this.showType = 'page'
        // this.uuid = this.tmplId
        this.$nextTick(() => {
          this.$refs.defInfoForm.load()
        })
      }
    },
    /**
     * 加载前
     */
    loadConvertor (value) {
      if (this.mode === 'create') {
        // 默认发布
        this.public_ = true
        this.lock = false
        this.freeFlow = false
        this.dateData = []
      } else {
        value.lock === '1' ? this.lock = true : this.lock = false
        value.public_ === '1' ? this.public_ = true : this.public_ = false
        value.freeFlow === '1' ? this.freeFlow = true : this.freeFlow = false
        this.onChange([moment(new Date(value.validStarttime), this.dateFormat), moment(new Date(value.validEndtime), this.dateFormat)])
      }
      // 有效时间转换格式
      return value
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'create') {
        value.tmplId = this.tmplId
        Object.assign(value, { parentId: this.parentId })
      }
      if (this.mode === 'edit') {
        const { defId } = this
        Object.assign(value, { defId })
      }
      value.validStarttime = new Date(this.dateData[0]).getTime()
      value.validEndtime = new Date(this.dateData[1]).getTime()
      value.lock = this.lock ? '1' : '0'
      value.public_ = this.public_ ? '1' : '0'
      value.freeFlow = this.freeFlow ? '1' : '0'
      return value
    }
  }
}
</script>
