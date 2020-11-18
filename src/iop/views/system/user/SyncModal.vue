<template>
  <a-modal title="同步" :visible="visible" @cancel="hide">
    <template #footer>
      <div style="text-align:center;" >
        <a-button @click="hide">关闭</a-button>
        <a-button
          type="primary"
          :disabled="loading"
          :loading="loading"
          @click="submit">确定</a-button>
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
                  'pubDept'
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
import { iopUserService } from '@/iop/service'
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
      })
    },

    hide () {
      this.visible = false
    },

    async submit () {
      const pubDept = this.form.getFieldValue('pubDept')
      if (!pubDept) {
        MessageUtils.warn('请选择组织')
        return
      }

      try {
        await iopUserService.syncPubDept(pubDept)
        this.hide()
        MessageUtils.success()
        this.$emit('success')
      } catch (err) {
        MessageUtils.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
