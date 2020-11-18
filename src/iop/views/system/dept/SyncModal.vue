<template>
  <a-modal title="同步" :visible="visible" @cancel="hide">
    <template #footer>
      <div style="text-align:center;" >
        <a-button
          type="primary"
          :disabled="loading"
          :loading="loading"
          @click="submit">确定</a-button>
        <a-button @click="hide">关闭</a-button>
      </div>
    </template>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="vertical">
        <a-row>
          <a-col :span="15" :offset="5">
            <a-form-item>
              <iop-data-tree-select
                ref="pubDept"
                :url="treeUrl"
                v-decorator="[
                  'pubDept',
                  { rules: [{ required: true, whitespace: true, message: '请选择机构' }] },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { IopDataTreeSelect } from '@/iop/components'
import { iopDeptService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import path from '@/iop/api'

export default {
  name: 'SyncPubDeptModal',
  components: { IopDataTreeSelect },
  data () {
    return {
      treeUrl: path.system.pubDept.tree,
      visible: false,
      loading: false
    }
  },
  created () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.pubDept && this.$refs.pubDept.cleanSelected()
        this.form.resetFields()
      })
    },

    hide () {
      this.visible = false
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { pubDept } = { ...values }
          this.loading = true
          try {
            await iopDeptService.syncPubDept(pubDept)
            this.hide()
            MessageUtils.success()
            this.$emit('success')
          } catch (err) {
            MessageUtils.error(err)
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
