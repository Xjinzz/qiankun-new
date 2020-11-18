<template>
  <div>
    <a-modal destroyOnClose v-model="visible" title="Token">
      <a-textarea v-model="token" :autosize="{ minRows: 4 }" :disabled="type"/>
      <template #footer>
        <div style="text-align:center;">
          <a-button @click="hide">关闭</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { iopServService, iopServCallService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'

export default {
  props: {
    /** 权限id */
    authId: {
      type: String,
      required: false,
      default: ''
    },
    /** 系统id */
    appId: {
      type: String,
      required: false,
      default: ''
    },
    /** 服务id */
    serviceId: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: Boolean,
      required: false,
      default: false
    },
    /** 申请单id */
    applyId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 }
      },
      token: ''
    }
  },
  methods: {
    show () {
      if (this.type) {
        this.info()
      } else {
        this.create()
      }
      this.visible = true
    },
    hide () {
      this.visible = false
      this.token = ''
    },
    create () {
      iopServService.createToken(this.authId).then(res => {
        this.token = res.token
      })
    },
    info (id) {
      try {
        const data = {
          authId: this.authId,
          applyId: this.applyId,
          appId: this.appId
        }
        iopServCallService.tokenInfo(data).then(res => {
          this.token = res.token
        })
      } catch (error) {
        MessageUtils.error(error)
      }
    }
  }

}

</script>
<style>
</style>
