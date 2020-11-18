<template>
  <a-modal title="划转" :visible="visible" @cancel="hide">
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hide">关闭</a-button>
        <a-button
          type="primary"
          :disabled="loading"
          :loading="loading"
          @click="submit">确定</a-button>
      </div>
    </template>
    <div style="margin:-24px;margin-bottom: 20px;">
      <a-alert
        type="warning"
        showIcon
        banner
        message="机构被划转后将被标记为注销状态，并将机构下的人员转移到被划转机构中"
      />
    </div>
    <br/>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="vertical">
        <a-row>
          <a-col :span="15" :offset="5">
            <a-form-item>
              <iop-data-tree-select
                ref="deptIdFrom"
                :url="treeUrl"
                selectLeafOnly
                v-decorator="[
                  'deptIdFrom',
                  { rules: [{ required: true, whitespace: true, message: '机构不能为空' }] },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="11">
            <a-avatar shape="square" icon="arrow-down" style="margin-top: -17px;margin-bottom: 10px;"/>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="15" :offset="5">
            <a-form-item>
              <iop-data-tree-select
                ref="deptIdTo"
                :url="treeUrl"
                selectLeafOnly
                v-decorator="[
                  'deptIdTo',
                  { rules: [{ required: true, whitespace: true, message: '机构不能为空' }] },
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { IopDataTreeSelect } from '@/iop/components'
import { iopPubDeptService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import path from '@/iop/api'

export default {
  name: 'PubDeptTransfer',
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
        this.$refs.deptIdFrom.cleanSelected()
        this.$refs.deptIdTo.cleanSelected()
        this.form.resetFields()
      })
    },

    hide () {
      this.visible = false
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { deptIdTo, deptIdFrom } = { ...values }
          if (deptIdTo !== deptIdFrom) {
            this.loading = true
            try {
              await iopPubDeptService.transfer(deptIdFrom, deptIdTo)
              this.hide()
              MessageUtils.success()
            } catch (err) {
              MessageUtils.error(err)
            } finally {
              this.loading = false
            }
          } else {
            MessageUtils.error('不能是同一个部门')
          }
        }
      })
    }
  }
}
</script>
