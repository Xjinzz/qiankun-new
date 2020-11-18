<template>
  <div>
    <a-modal title="系统设置" :visible="visible" @cancel="hide" width="900px">
      <a-form :form="form">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col>
            <a-form-item label="所属系统：" v-bind="formItemLayout">
              <iop-data-dict-select
                type="appSelect"
                ref="appSelect"
                v-decorator="['appId']" />
            </a-form-item>
            <!-- <a-form-item label="所属功能：" v-bind="formItemLayout">
              <a-input v-decorator="['programId']" disabled />
            </a-form-item> -->
            <a-form-item label="所属环境：" v-bind="formItemLayout">
              <iop-data-dict-select type="attrEnviro" ref="enviromentCode" v-decorator="['enviromentCode']" />
            </a-form-item>
            <a-form-item label="文件：" v-bind="formItemLayouttext" v-if="attrDataType === '文件类' ">
              <iop-upload-dragger ref="dragger" :id="localId" businessName="sysUserVal" attrName="attrVallist" />
            </a-form-item>
            <a-form-item label="设定值：" v-bind="formItemLayout" v-else>
              <a-input v-decorator="['userVal']" v-if="!attrVallist"/>
              <iop-data-dict-select :type="attrVallist" v-else ref="userVal" v-decorator="['userVal']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hide">取消</a-button>
          <a-button
            type="primary"
            @click="submit">提交</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopUploadDragger } from '@/iop/components'
import { iopUserAttrService } from '@/iop/service'
import MessageUtils from '@/utils/message'
// import path from '@/iop/api'
export default {
  name: 'SysUserSetUpForm',
  components: { IopDataForm, IopDataDictSelect, IopUploadDragger },
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
      localId: ''
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
    attrVallist: {
      type: String,
      required: true,
      default: null
    }
  },
  created () {
  },
  methods: {
    show () {
      this.attrDataType = ''
      this.localId = this.attrId
      this.visible = true
      this.$nextTick(() => {
        this.$refs.userVal && this.$refs.userVal.cleanSelected()
        this.$refs.enviromentCode && this.$refs.enviromentCode.cleanSelected()
        this.$refs.appSelect && this.$refs.appSelect.cleanSelected()
      })
    },
    hide () {
      this.visible = false
      this.$nextTick(() => {
        this.form.resetFields()
        this.$refs.enviromentCode && this.$refs.enviromentCode.cleanSelected()
        this.$refs.appSelect && this.$refs.appSelect.cleanSelected()
      })
    },
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          var data = Object.assign(values, { attrId: this.attrId })
          iopUserAttrService.setdefin(data)
            .then(res => {
              this.visible = false
              this.$emit('onSubmitSuccess')
              this.form.resetFields()
              this.$refs.enviromentCode && this.$refs.enviromentCode.cleanSelected()
              this.$refs.userVal && this.$refs.userVal.cleanSelected()
            })
            .catch(err => {
              MessageUtils.error(err)
            })
        }
      })
    }
  }
}
</script>
