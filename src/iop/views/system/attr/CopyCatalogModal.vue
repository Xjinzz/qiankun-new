<template>
  <a-modal title="复制目录" :visible="visible" @cancel="hide">
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
      <a-form :form="form" layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="15" :offset="2">
            <a-form-item label="将">
              <iop-data-tree-select
                ref="catalogId"
                :url="treeUrl"
                v-if="visible"
                v-decorator="[
                  'catalogId',
                  { rules: [{ required: true, whitespace: true, message: '目录不能为空' }] },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <br />
        <a-row>
          <a-col :span="10" :offset="2">
            <a-form-item label="从">
              <iop-data-dict-select
                ref="sourceEnCode"
                type="attrEnviro"
                v-if="visible"
                v-decorator="['sourceEnCode', { rules: [{ required: true, whitespace: true, message: '源环境不能为空' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="复制到">
              <iop-data-dict-select
                ref="targetEnCode"
                type="attrEnviro"
                v-if="visible"
                v-decorator="['targetEnCode',{ rules: [{ required: true, whitespace: true, message: '目标环境不能为空' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { IopDataTreeSelect, IopDataDictSelect } from '@/iop/components'
import { iopUserAttrService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import path from '@/iop/api'

export default {
  name: 'CopyCatalogModal',
  components: { IopDataTreeSelect, IopDataDictSelect },
  data () {
    return {
      treeUrl: path.system.userAttr.tree,
      visible: false,
      loading: false
    }
  },
  created () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    show () {
      this.visible = false
      this.$nextTick(() => {
        this.visible = true
        // this.$refs.catalogId.cleanSelected && this.$refs.catalogId.cleanSelected()
        // this.$refs.sourceEnCode && this.$refs.sourceEnCode.cleanSelected()
        // this.$refs.targetEnCode && this.$refs.targetEnCode.cleanSelected()
      })
    },

    hide () {
      this.visible = false
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { sourceEnCode, targetEnCode, catalogId } = { ...values }
          if (sourceEnCode !== targetEnCode) {
            this.loading = true
            try {
              await iopUserAttrService.copyCatalog(catalogId, sourceEnCode, targetEnCode)
              this.hide()
              MessageUtils.success()
            } catch (err) {
              MessageUtils.error(err)
            } finally {
              this.loading = false
            }
          } else {
            MessageUtils.error('源环境和目标环境不能相同')
          }
        }
      })
    }
  }
}
</script>
