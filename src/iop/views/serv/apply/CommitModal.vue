<template>
  <a-modal title="提交" :visible="visible" @cancel="hide">
    <a-form>
      <a-spin :spinning="loading">
        <a-form-item label="提交到" :label-col="{ span: 5, offset: 3 }" :wrapper-col="{ span: 8 }">
          <a-select ref="activities" v-model="activityId" :options="activityOptions" @change="activityChange"/>
        </a-form-item>
        <a-form-item label="审批人" :label-col="{ span: 5, offset: 3 }" :wrapper-col="{ span: 8 }">
          <a-select ref="users" v-model="toUser" :options="userOptions"/>
        </a-form-item>
      </a-spin>
    </a-form>
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
  name: 'CommitApplyModal',
  data () {
    return {
      loading: false,
      activityId: '',
      toUser: '',
      activityOptions: [],
      userOptions: [],
      userMap: new Map(),
      visible: false,
      applyId: ''
    }
  },
  methods: {
    show (applyId = '') {
      this.visible = true
      this.loading = true
      this.applyId = applyId
      iopServApplyService.prepare(applyId)
        .then(({ userMap, activityOptions }) => {
          this.userMap = userMap
          this.activityOptions = activityOptions
          this.$nextTick(() => {
            const activityId = activityOptions[0].value
            this.activityId = activityId
            this.activityChange(activityId)
          })
        })
        .catch((err) => MessageUtils.error(err))
        .finally(() => { this.loading = false })
    },

    hide () {
      this.visible = false
    },

    activityChange (value = '') {
      this.userOptions = []
      this.userOptions = this.userMap.get(value)
      this.$nextTick(() => {
        this.toUser = this.userOptions[0].value
      })
    },

    submitForm () {
      if (!this.activityId) {
        MessageUtils.error('请选择流程节点')
        return
      }
      if (!this.toUser) {
        MessageUtils.error('请选择审批人')
        return
      }
      this.$confirm({
        title: '确定提交吗',
        onOk: () => {
          this.loading = true
          iopServApplyService.commit(this.applyId, this.activityId, this.toUser)
            .then(() => {
              this.$emit('submitSuccess')
              this.hide()
            })
            .catch((err) => MessageUtils.error(err))
            .finally(() => { this.loading = false })
        }
      })
    }
  }
}
</script>
