
<template>
  <a-modal :width="900" :visible="visible" :title="title" @cancel="hideModal">
    <div class="marginTop">
      <apply-form
        ref="applyForm"
        mode="create"
        :initValue="{ ids: serviceIds }"
        :showPageHeader="false"
        :applyType="applyType"
        @onSubmitSuccess="onSubmitSuccess"
        @noInformation="noInformation" />
    </div>
    <slot name="table" />
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hideModal">取消</a-button>
        <a-button type="primary" @click="submitForm()">保存草稿</a-button>
        <a-button type="primary" @click="commit()" style="margin-left: -5px;">提交</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { IopServApplyForm } from '@/iop/views/index'

export default {
  name: 'ServCallApplyModal',
  components: { ApplyForm: IopServApplyForm },
  data () {
    return {
      visible: false
    }
  },
  props: {
    serviceIds: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    applyType: {
      type: String,
      required: true
    }
  },
  methods: {
    hideModal () {
      this.visible = false
    },

    show () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.applyForm.load()
      })
    },

    submitForm () {
      this.$refs.applyForm.submitForm()
    },

    onSubmitSuccess () {
      this.hideModal()
      this.$emit('onSubmitSuccess')
    },

    commit () {
      this.$refs.applyForm.commit()
    },

    noInformation () {
      this.hideModal()
    }
  }
}
</script>
<style scoped>
.marginTop {
  margin-top: -20px;
}
</style>
