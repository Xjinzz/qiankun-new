<template>
  <a-modal :width="1200" :visible="visible" @cancel="hideModal" title="新建">
    <meta-model-form ref="form" mode="create" :catalogId="catalogId" :catalogType="catalogType" @onSubmitSuccess="onSubmitSuccess"/>
    <template #footer>
      <div style="text-align:center;">
        <a-button type="primary" @click="submitForm()">提交</a-button>
        <a-button @click="hideModal">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import MetaModelForm from './MetaModelForm'

export default {
  name: 'MetaModelCreateForm',
  components: { MetaModelForm },
  props: {
    catalogType: {
      type: String,
      required: true
    },
    catalogId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$refs.form && this.$refs.form.load()
    },

    hideModal () {
      this.visible = false
    },

    submitForm () {
      this.$refs.form.submit()
    },

    onSubmitSuccess () {
      this.hideModal()
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
