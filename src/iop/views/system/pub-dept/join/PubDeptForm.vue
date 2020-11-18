<template>
  <div>
    <pub-dept-form
      ref="pubDeptForm"
      mode="create"
      showType="page"
      :url="url"
      :initValues="deptIds"
      @onSubmitSuccess="submitSuccess"
      :showPageHeader="false"
      :submitQuery="deptIds"
    />
    <div style="text-align: center;">
      <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      <a-divider type="vertical" />
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>
<script>
import PubDeptForm from '../PubDeptForm'
import path from '@/iop/api'

export default {
  name: 'PubDeptInfo',
  components: { PubDeptForm },
  data () {
    return {
      url: path.system.pubDept.merge
    }
  },
  props: {
    deptIds: {
      type: Object,
      required: true
    }
  },
  methods: {
    reset () {
      this.$refs.pubDeptForm.load()
    },

    submitSuccess () {
      this.$emit('nextStep')
    },

    submit () {
      this.$refs.pubDeptForm.submit()
    },

    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>
