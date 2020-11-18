<template>
  <div>
    <iop-data-form
      ref="encodeForm"
      :mode="mode"
      :url="url"
      showType="page"
      title=" "
      :vo="vo"
      :id="id"
      :submitConvertor="submitConvertor"
      :submitSuccess="submitSuccess">
      <template #form>
        <a-form-item label="选择类型：" v-bind="formItemLayout">
          <iop-data-dict-select
            type="TOOLS_CODETYPE"
            ref="encodeSelect"
            v-decorator="['codeType', { rules: [{ required: true, message: '类型未选择' }] }]"
            style="width:30%"
            @change="typeChange"
          />
          <span style="margin-left:10px;color:#f00">选择条码时，信息内容不能包含汉字，否则生成失败</span>
        </a-form-item>
        <a-form-item label="输入信息：" v-bind="formItemLayout">
          <a-textarea
            placeholder="类型为条形码时请输入正整数"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-decorator="['codeData', { rules: [{ required: true, whitespace: true, message: '输入信息不能为空' }, { max: lengthVeri, message: `信息最多${lengthVeri}位` }] }]" />
        </a-form-item>
        <a-form-item label="宽度：" v-bind="formItemLayout">
          <a-input-number v-decorator="['width', { rules: [{ required: true, message: '宽度不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '宽度最多七位'}] }]" />
          像素
        </a-form-item>
        <a-form-item label="高度：" v-bind="formItemLayout">
          <a-input-number v-decorator="['height', { rules: [{ required: true, message: '高度不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '高度最多七位'}] }]" />
          像素
        </a-form-item>
        <a-form-item label="生成码图：" v-bind="formItemLayout">
          <a-button type="primary" @click="submit">
            生成码图
          </a-button>
        </a-form-item>
        <a-form-item label="下载码图：" v-bind="formItemLayout">
          <img ref="codeImg" :src="codeBase" alt="" crossOrigin="anonymous">
          <div v-if="loadImged">
            <a-button type="primary" @click="downloadIamge">
              下载图片
            </a-button>
          </div>
        </a-form-item>
      </template>
      <template #pageHeader>
        <a-button type="primary" @click="reLoad">清空</a-button>
      </template>
    </iop-data-form>
  </div>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import encodeFormVO from './vo/encode-form-vo'
import path from '@/iop/api/index'
const Define = {
  CODETTYPE: {
    BARCODE: 'CODE_128'
  }
}
export default {
  name: 'EncodeForm',
  components: { IopDataForm, IopDataDictSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.tools.dimcode.encode,
      /** 表单定义 */
      vo: encodeFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      mode: 'create',
      /** 码图 */
      codeBase: '',
      id: '',
      loadImged: false,
      lengthVeri: 80
    }
  },
  methods: {
    typeChange (sel) {
      sel === 'CODE_128' ? this.lengthVeri = 80 : this.lengthVeri = 300
    },
    downloadIamge () {
      const imgDom = this.$refs['codeImg']
      // 创建canvas virtual box
      const virtualBox = document.createElement('canvas')
      const size = {
        width: imgDom.width,
        height: imgDom.height
      }
      virtualBox.width = size.width
      virtualBox.height = size.height
      const instance = virtualBox.getContext('2d')
      instance.drawImage(imgDom, 0, 0, size.width, size.height)
      // 获取下载url
      const downloadUrl = virtualBox.toDataURL('image/png')
      // 创建download tag
      const downloadDom = document.createElement('a')
      const trigger = new MouseEvent('click')
      // 标题
      downloadDom.download = '码图下载'
      // 设置a下载地址
      downloadDom.href = downloadUrl
      // 触发
      downloadDom.dispatchEvent(trigger)
    },
    reLoad () {
      this.codeBase = ''
      this.$nextTick(() => {
        this.resetForm()
      })
    },
    resetForm () {
      this.$refs.encodeForm.resetFormValues()
      this.$refs.encodeSelect.cleanSelected()
    },
    submit () {
      this.$refs.encodeForm.submitForm()
    },
    /**
     * 表单提交之前
     */
    submitConvertor (value) {
      // this.codeBase = ''
      // 条形码不能为汉字
      if (value.codeType === Define.CODETTYPE.BARCODE) {
        const reg = /\p{Unified_Ideograph}/u
        if (reg.test(value.codeData)) {
          this.$message.warning('条形码不能输入汉字！')
          return false
        }
      }
      return value
    },
    /**
     * 表单成功后
     */
    submitSuccess (value) {
      this.loadImged = true
      this.codeBase = value
      this.resetForm()
    }
  }
}
</script>
