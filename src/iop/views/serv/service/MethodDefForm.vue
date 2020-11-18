<template>
  <iop-data-form
    ref="methodForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="$route.query.methodId || ''"
    :title="title"
    :showType="'page'"
    :width="1200"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="方法调用名">
            <a-input placeholder="请输入方法调用名" v-decorator="['methodName', {rules: [{required: true, message: '请输入方法调用名'}]}]" maxLength="100"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="方法中文名">
            <a-input placeholder="请输入方法中文名" v-decorator="['chName', {rules: [{required: true, message: '请输入方法调用名'}]}]" maxLength="100"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="支持格式">
            <a-input placeholder="请输入支持的格式" v-decorator="['format']" maxLength="100"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="请求方式">
            <iop-data-dict-radio type="requestMode" v-decorator="['requestMode', {rules: [{required: true, message: '请选择'}]}]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="方法授权界面">
            <a-input placeholder="请输入方法授权界面地址" v-decorator="['authPage',{ rules: [{required: true, message: '请输入方法授权界面'}]}]" maxLength="100"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="日志级别">
            <iop-data-dict-radio type="logLevel" v-decorator="['logLevel', {rules: [{required: true, message: '请选择'}]}]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="方法说明">
            <a-textarea placeholder="请输入方法说明" :autosize="{ minRows: 3, maxRows: 3 }" v-decorator="['remark']" maxLength="500"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="是否启用">
            <a-switch id="isUser" :checked="isValide" @change="changeValide"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start">
        <a-col :span="24">
          <a-form-item label="返回示例" v-bind="{ labelCol: { span: 3 }, wrapperCol: { span: 21 } }">
            <a-textarea :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['backTest']" maxLength="500"/>
          </a-form-item>
        </a-col>
      </a-row>
      <input id="parentId" type="hidden" :value="record.parentId" />
      <input id="levelCode" type="hidden" :value="record.levelCode" />
      <input id="lng" type="hidden" :value="record.lng" />
      <input id="lat" type="hidden" :value="record.lat" />
      <input id="servLevel" type="hidden" :value="record.servLevel" />
      <input id="orderNum" type="hidden" :value="record.orderNum" />
      <input id="secretLevel" type="hidden" :value="record.secretLevel" />
    </template>
    <template #closeButton>
      <a-button @click="goBack">返回</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio } from '@/iop/components'
import methodFormVo from './vo/method-form-vo'
import path from '@/iop/api/index'

// TODO 下拉树组件
export default {
  name: 'MethodForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.methodIndex,
      /** 表单定义 */
      vo: methodFormVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      isValide: true,
      title: '新建'
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
    }
  },
  watch: {
    'mode': {
      handler (newVal) {
        if (newVal) {
          switch (newVal) {
            case 'create':
              this.title = '新建'
              break
            case 'edit':
              this.title = '编辑'
              break
            case 'view':
              this.title = '查看'
              break
            default:
              console.error('invalid mode !!')
          }
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.mode !== 'create') {
      this.$refs.methodForm.load()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 启用按钮切换
    changeValide () {
      this.isValide = !this.isValide
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { methodId } = this
        Object.assign(value, { methodId: methodId })
      }
      value.isValide = this.isValide ? '1' : '0'
      Object.assign(value, { serviceId: this.$route.query.serviceId })
      console.log(value)
      return value
    },
    // 表单渲染前数据处理
    loadConvertor (val) {
      this.isValide = val.isValide === '1'
      return val
    }
  }
}
</script>
