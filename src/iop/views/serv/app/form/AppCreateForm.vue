<template>
  <app-detail-form mode="create" v-if="refersh"/>
</template>
<script>
import AppDetailForm from './AppDetailForm'

export default {
  name: 'AppCreateForm',
  components: { AppDetailForm },
  data () {
    return {
      refersh: true
    }
  },
  activated () {
    this.refersh = false
    this.$nextTick(() => {
      this.refersh = true
    })
  }
}
</script>
