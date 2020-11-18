<template>
  <a-modal title="审核" :visible="visible" @cancel="hide">
    <a-spin :spinning="loading">
      <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-model="contentValue" placeholder="请填写审核意见" />
    </a-spin>
    <template #footer>
      <div style="text-align:center;">
        <a-button
          type="primary"
          @click="submitForm"
          :disabled="loading"
          :loading="loading"
        >提交</a-button>
        <a-button @click="hide">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { iopServApplyService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'ApplyApprovalModal',
  data () {
    return {
      loading: false,
      visible: false,
      contentValue: '',
      applyId: ''
    }
  },
  methods: {
    show (applyId = '') {
      this.visible = true
      this.contentValue = ''
      this.applyId = applyId
    },

    hide () {
      this.visible = false
    },

    submitForm () {
      if (!this.contentValue) {
        MessageUtils.warn('请填写审核意见')
        return
      }

      if (this.contentValue.length > 500) {
        MessageUtils.warn('最多只能输入500位')
        return
      }
      this.$confirm({
        title: '确定提交吗',
        onOk: () => {
          this.loading = true
          iopServApplyService.approval(this.applyId, this.contentValue)
            .then(() => {
              this.$emit('submitSuccess')
              this.hide()
              this.$message.success('操作成功')
              this.reload()
            })
            .catch((err) => MessageUtils.error(err))
            .finally(() => { this.loading = false })
        }
      })
    },

    reload () {
      this.$parent.resetSearchForm()
    }
  }
}
</script>
