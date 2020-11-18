<template>
  <a-card :bordered="false" class="topSearch">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <slot />
      </a-form>
    </div>
  </a-card>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    getFieldsValue () {
      return this.form.getFieldsValue()
    },
    setFieldsValue (data) {
      this.form.setFieldsValue(data)
    },
    resetSearch () {
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less">
.topSearch {
  /deep/ .ant-card-body {
    padding: 20px 20px;
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
