<template>
  <div>
    <view-gaine
      :hideRealtion="mode==define.MODE.CREATE"
      :depeatId="id"
      :detailId="detailId"
      :mode="mode"
      :depeatCode="code"
      :treeSelectCode="treeSelectCode"
      :treeSelectId="treeSelectId"
    >
    </view-gaine>
  </div>
</template>
<script>
import ViewGaine from './comp/ViewGaine'
import Define from './tool/define'
export default {
  components: {
    ViewGaine
  },
  data () {
    return {
      define: Define
    }
  },
  computed: {
    id () {
      return this.$route.query.id || ''
    },
    detailId () {
      return this.$route.query.detailId || ''
    },
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    code () {
      return this.$route.query.code || ''
    },
    treeSelectCode () {
      return this.$route.query.treeSelectCode || ''
    },
    treeSelectId () {
      return this.$route.query.treeSelectId || ''
    }
  }
}
</script>
