<template>
  <div>
    <iop-data-form
      ref="appForm"
      :showType="showType"
      :title="showType === 'modal' ? '': '系统基本信息'"
      :mode="mode"
      :url="url"
      :vo="vo"
      :id="appId"
      :width="900"
      :loadConvertor="loadConvertor"
      @onSubmitSuccess="submitSuccess"
    >
      <template #form>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="10" :offset="2">
            <a-form-item label="系统编码" v-bind="formItemLayout">
              <a-input placeholder="请输入系统编码" v-decorator="['appCode', { rules: [{ required: true, whitespace: true, message: '系统编码不能为空' }, { max: 100, message: '系统编码最多100位' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="系统名称" v-bind="formItemLayout">
              <a-input placeholder="请输入系统名称" v-decorator="['appName', { rules: [{ required: true, whitespace: true, message: '系统名称不能为空' }, { max: 100, message: '系统名称最多100位' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="10" :offset="2">
            <a-form-item label="上下文根" v-bind="formItemLayout">
              <a-input placeholder="请输入上下文根" v-decorator="['appContext', { rules: [{ required: true, whitespace: true, message: '上下文根不能为空' }, { max: 100, message: '上下文根最多100位' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="首页地址" v-bind="formItemLayout">
              <a-input placeholder="请输入首页地址" v-decorator="['indexUrl', { rules: [{ required: true, whitespace: true, message: '首页地址不能为空' }, { max: 200, message: '首页地址最多200位' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="10" :offset="2">
            <a-form-item label="登录地址" v-bind="formItemLayout">
              <a-input placeholder="请输入登录地址" v-decorator="['loginUrl', {rules: [{ max: 200, message: '登录地址最多200位' }]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="排序号" v-bind="formItemLayout">
              <a-input-number style="width:100%;" v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }, { initialValue : 0 }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="22" :offset="1">
            <a-form-item label="系统介绍" v-bind="textAreaformItemLayout">
              <a-textarea placeholder="请输入系统介绍" v-decorator="['remark', {rules: [{ max: 500, message: '系统介绍最多500位' }]}]" :autosize="{ minRows: 4, maxRows: 6 }" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #beforResetButton v-if="showType === 'page'">
        <a-button @click="goBack">返回</a-button>
        <a-divider type="vertical"/>
      </template>
    </iop-data-form>
  </div>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import { iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import appFormVO from '../vo/app-form-vo'
import path from '@/iop/api/index'

export default {
  name: 'AppDetailForm',
  components: { IopDataForm },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 20 },
          sm: { span: 18 }
        }
      },
      url: path.serv.app.index,
      vo: appFormVO,
      localMode: this.mode,
      localAppId: this.appId
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    appId: {
      type: String,
      required: false,
      default: ''
    },
    showType: {
      type: String,
      required: false,
      default: 'page'
    }
  },
  mounted () {
    if (this.showType === 'page') {
      this.$refs.appForm.load()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    submitSuccess () {
      this.$emit('onSubmitSuccess')
    },

    load () {
      this.localAppId = this.appId
      this.$refs.appForm.load()
      // this.$refs.applicationList && this.$refs.applicationList.load(this.appId)
    },

    async loadConvertor (values = {}) {
      if (this.mode === 'create') {
        const res = await iopServApplyService.access()
        if (!res || !res.accessName) {
          MessageUtils.warn('请先保存接入者信息')
          this.$emit('noInformation')
        }
      }
      return values
    },

    show () {
      this.$refs.appForm.showModal()
    }
  }
}
</script>
