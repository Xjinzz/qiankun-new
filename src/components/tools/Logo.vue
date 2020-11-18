<template>
  <div class="logo" style="display: flex;align-items:center">
    <iop-preview v-model="icon" :options="preViewOption" :class="!collapsed ? '' : 'lin'">
      <img style="display:block" src="@/assets/logo.png" alt="logo" />
    </iop-preview>
    <h1 :class="!collapsed ? '' : 'tit'" v-show="!collapsed" v-if="showTitle">{{ title }}</h1>
  </div>
</template>

<script>
import { iopAppService } from '@/iop/service'
import { IopPreview } from '@/iop/components'

export default {
  name: 'Logo',
  components: {
    IopPreview
  },
  data () {
    return {
      title: '',
      icon: '',
      preViewOption: {
        width: '32px',
        height: '32px'
      }
    }
  },
  mounted () {
    this.title = iopAppService.getCurrentAppName()
    this.updateIcon()
    this.$event.on('updateLogo', () => {
      this.updateIcon()
    })
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    collapsed: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    updateIcon () {
      this.icon = iopAppService.getCurrentApp().iconBig
    }
  }
}
</script>
<style lang="less" scoped>
  .lin {
    margin: 16px 0;
  }
  .tit {
    width: 0;
  }
</style>
