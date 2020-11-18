<template>
  <a-modal :title="this.name" :visible="visible" @cancel="hide" width="900px">
    <a-form :form="form">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="19" :offset="1">
          <a-form-item label="所属系统：" v-bind="formItemLayout">
            <iop-data-dict-select
              type="appSelect"
              ref="appSelect"
              @change="changeOne"
              v-model="form.appId" />
          </a-form-item>
          <a-form-item label="所属环境：" v-bind="formItemLayout">
            <iop-data-dict-select type="attrEnviro" @change="changeTwo" ref="enviromentCode" v-model="form.enviromentCode" />
          </a-form-item>
          <a-form-item label="文件：" v-bind="formItemLayouttext" v-if="isUpload">
            <iop-upload-dragger :mode="mode" :id="localId" businessName="sysUserVal" attrName="attrVallist" />
          </a-form-item>
          <a-form-item label="设定值：" v-bind="formItemLayout" v-show="!isUpload">
            <a-input v-model="form.userVal" v-if="!isUserValSelect" />
            <iop-data-dict-select v-else ref="userVal" @change="changeUserVal" :type="codeType" v-model="form.userVal" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer v-if="isEditFooter">
      <div style="text-align:center;" >
        <a-button @click="hide">取消</a-button>
        <a-button
          type="primary"
          @click="submit">提交</a-button>
      </div>
    </template>
    <template #footer v-else>
      <div style="text-align:center;" >
        <a-button @click="hide">取消</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { IopDataDictSelect, IopUploadDragger } from '@/iop/components'
import { iopUserAttrService } from '@/iop/service'

export default {
  name: 'SysUserAttrEditForm',
  components: { IopDataDictSelect, IopUploadDragger },
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      formItemLayouttext: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      attrDataType: '',
      localId: '',
      name: '',
      isUpload: false,
      isEditFooter: false,
      isUserValSelect: false,
      codeType: ''
    }
  },
  props: {
    attrId: {
      type: String,
      required: true
    },
    attrValId: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: true
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        if (this.mode === 'view') {
          this.name = '查看'
          this.isEditFooter = false
        } else {
          this.name = '编辑'
          this.isEditFooter = true
        }
        this.localId = this.attrValId
        this.get()
      })
    },
    changeOne (val) {
      this.form.appId = val
    },
    changeTwo (val) {
      this.form.enviromentCode = val
    },
    changeUserVal (val) {
      this.form.userVal = val
    },
    get () {
      this.isUpload = false // 让其每次加载文件
      iopUserAttrService.getInfo(this.attrValId).then(res => {
        this.form = res
        this.codeType = res.attrVallist
        if (res.attrVallist === '') {
          this.isUserValSelect = false
        } else {
          this.isUserValSelect = true
        }
        if (res.attrDatatype === '5') {
          this.isUpload = true
        } else {
          this.isUpload = false
        }
        this.$refs.userVal && this.$refs.userVal.setSelected(this.form.userVal)
        this.$refs.enviromentCode && this.$refs.enviromentCode.setSelected(this.form.enviromentCode)
        this.$refs.appSelect && this.$refs.appSelect.setSelected(this.form.appId)
      }).catch(err => {
        console.log(err)
      })
    },
    hide () {
      this.visible = false
      // this.$refs.userVal && this.$refs.userVal.cleanSelected()
    },
    submit () {
      iopUserAttrService.save(this.attrValId, this.form).then(res => {
        this.visible = false
        this.$emit('onSubmitSuccess', res.parentId)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
