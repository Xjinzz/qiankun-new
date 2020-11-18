<template>
  <div style="display:flex">
    <div style="width: 200px;height:45px;line-height:45px">
      <label style="margin-right:10px;">{{ title }}</label>
      <a-switch v-model="state.status"/>
    </div>
    <div v-if="state.status" style="flex: 1;text-align:right;height:45px;line-height:45px">
      <label style="margin-right:10px;">{{ formTitle }}</label>
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    formTitle: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    value (newVal) {
      this.state.status = newVal
    },
    'state.status' (newVal) {
      this.$emit('onChange', newVal)
      this.$emit('input', newVal)
    }
  },
  data () {
    return {
      state: {
        status: false
      }
    }
  },
  methods: {
    getData () {
      return this.state.status
    }
  }
}
</script>
<style lang="less">
</style>
