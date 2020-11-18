<template>
  <app-detail-form mode="edit" :appId="appId" v-if="refersh"/>
</template>
<script>
import AppDetailForm from './AppDetailForm'

export default {
  name: 'AppEditForm',
  components: { AppDetailForm },
  data () {
    return {
      refersh: true
    }
  },
  computed: {
    appId () {
      return this.$route.query.id
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
