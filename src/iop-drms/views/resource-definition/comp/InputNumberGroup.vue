<template>
  <div style="width:100%;display:flex">
    <a-input-number :disabled="disabled" v-model="newValueStart" style="flex:1"/>
    <span style="padding-left:10px;padding-right:10px">~</span>
    <a-input-number :disabled="disabled" v-model="newValueEnd" style="flex:1"/>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line
    value: {
      type: Array
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      newValueStart: '',
      newValueEnd: ''
    }
  },
  computed: {
    newValue () {
      return [(this.newValueStart || ''), (this.newValueEnd || '')]
    }
  },
  watch: {
    value (value) {
      if (!value) {
        this.newValueStart = ''
        this.newValueEnd = ''
      } else {
        this.newValueStart = value[0] || ''
        this.newValueEnd = value[1] || ''
      }
    },
    newValue (value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>
