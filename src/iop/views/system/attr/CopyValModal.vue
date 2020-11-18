<template>
  <a-modal title="复制参数" :visible="visible" @cancel="hide">
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
        <a-row>
          <a-col :span="16" :offset="1">
            <a-form-item label="将">
              <div style="border: 1px;">
                <template v-for="val in selectedVals">
                  <a-tag :key="val.attrId" :closable="true" :afterClose="() => handleClose(val.attrId)">
                    {{ val.attrName }}
                  </a-tag>
                </template>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6" :offset="1">
            <a-form-item label="从">
              <span>{{ sourceEnCode.name }}</span>
            </a-form-item>
          </a-col>
          <a-col :span="15">
            <a-form-item label="复制到">
              <a-radio-group v-decorator="['targetEnCode', { rules: [{ required: true, whitespace: true, message: '目标环境不能为空' }] }]">
                <template v-for="env in attrEnviroValues">
                  <a-radio v-if="env.code !== sourceEnCode.code" :value="env.code" :key="env.code">{{ env.name }}</a-radio>
                </template>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { iopUserAttrService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'CopyValModal',
  data () {
    return {
      visible: false,
      loading: false,
      valsMap: new Map(),
      selectedVals: []
    }
  },
  props: {
    attrEnviroValues: {
      type: Array,
      required: true
    },
    sourceEnCode: {
      type: Object,
      required: true
    },
    vals: {
      type: Array,
      required: true
    }
  },
  created () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleClose (attrId) {
      this.valsMap.delete(attrId)
      this.selectedVals = this.valsMap.values()
    },

    show () {
      this.visible = true
      this.valsMap.clear()
      const vals = new Map()
      this.vals.map(val => {
        vals.set(val.attrId, val)
      })
      this.valsMap = vals
      this.selectedVals = this.vals
      // this.form.resetFields()
    },

    hide () {
      this.visible = false
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (this.valsMap.size > 0) {
          if (!err) {
            const { targetEnCode } = { ...values }
            this.loading = true
            try {
              await iopUserAttrService.copyAttr([...this.valsMap.keys()], this.sourceEnCode.code, targetEnCode)
              this.hide()
              MessageUtils.success()
              this.$emit('submitSuccess')
            } catch (err) {
              MessageUtils.error(err)
            } finally {
              this.loading = false
            }
          }
        } else {
          MessageUtils.warn('已选择的参数个数为0，请重新选择')
        }
      })
    }
  }
}
</script>
