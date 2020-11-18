<template>
  <!-- a-dropdown -->
  <a-dropdown placement="bottomCenter">
    <span class="action ant-dropdown-link user-dropdown-menu">
      {{ currentApp.appName }}
      <a-icon type="down" />
    </span>
    <a-menu slot="overlay" @click="switchApp" style="max-height:450px;overflow-y:scroll;">
      <a-menu-item v-for="app of apps" :key="app.appCode">
        <span style="display:flex;align-items:center">
          <iop-preview v-model="app.iconBig" :options="preViewOption">
            <img style="display:block;width:20px;height:20px" src="@/assets/logo.png" alt="logo" />
          </iop-preview>
          <span style="margin-left:15px">
            {{ app.appName }}
          </span>
        </span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { iopAuthService, iopAppService } from '@/iop/service/index'
import { IopPreview } from '@/iop/components'
import config from '@/config/defaultSettings'
export default {
  name: 'AppSelector',
  components: {
    IopPreview
  },
  data () {
    return {
      currentApp: iopAppService.getCurrentApp(),
      apps: [],
      preViewOption: {
        width: '20px',
        height: '20px',
        circle: true
      },
      intervId: 0
    }
  },
  mounted () {
    this.updateApps()
    this.$event.on('updateAppSelector', () => {
      this.updateApps()
    })
    if (config.oldToken) {
      this.getOldTokens()
      this.intervId = setInterval(this.getOldTokens, 600000)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervId)
  },
  methods: {
    async switchApp ({ key }) {
      if (this.currentApp.appCode !== key) {
        await iopAuthService.switchToken(key)
      }
    },
    updateApps () {
      this.apps = iopAppService.getAllApps()
    },
    getOldTokens () {
      iopAuthService.getOldTokens()
    }
  }
}
</script>
<style lang="less" scoped>
  .user-dropdown-menu-wrapper {
    width:100px
  }
</style>
