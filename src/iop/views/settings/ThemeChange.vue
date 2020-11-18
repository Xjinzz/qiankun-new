<template>
  <div>
    <a-card title="设置皮肤主题" :bordered="false">
      <a-tabs
        v-model="state.currentThemeId"
        :style="{ height: '100%' }"
        @change="changeHandle"
      >
        <a-tab-pane v-for="item in dataSource.themeList" :key="item.skinId" :tab="item.skinName"></a-tab-pane>
      </a-tabs>
      <h3>皮肤预览</h3>
      <iop-sys-skin-preview
        style="border:1px solid #c8c8c8;vertical-align:center"
        :multi-tab="state.currentPlugin.multiTab"
        :layout-mode="state.currentPlugin.layoutMode"
        :color="state.currentPlugin.primaryColorKey"
        :color-weak="state.currentPlugin.colorWeak"
        :theme="state.currentPlugin.navTheme"
      />
      <a-row style="text-align:center;padding-top:10px">
        <a-button type="primary" @click="saveUserSkin">提交</a-button>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import Service from '@/iop/service/settings/settings'
import { IopSysSkinPreview } from '@/iop/components'
import { mapActions } from 'vuex'
export default {
  components: {
    IopSysSkinPreview
  },
  data () {
    return {
      state: {
        currentThemeId: '',
        currentPlugin: {
          navTheme: 'dark',
          primaryColor: '#1890FF',
          primaryColorKey: 'dawn',
          layoutMode: 'sidemenu',
          contentWidth: 'Fixed',
          fixedHeader: false,
          fixSiderbar: false,
          colorWeak: false,
          autoHideHeader: false,
          multiTab: false
        }
      },
      dataSource: {
        themeList: []
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions({
      setSkinByJson: 'SetSkinByJson'
    }),
    // 切换当前需要触发修改预览
    changeHandle (activeKey) {
      this.state.currentPlugin = this.findCurrentJsonByKey(activeKey)
    },
    // 根据id获取当前json
    findCurrentJsonByKey (skinId) {
      const result = this.dataSource.themeList.filter(item => {
        if (item.skinId === skinId) return true
      })
      const resultTheme = result[0] || this.dataSource.themeList[0]
      return JSON.parse(resultTheme.json)
    },
    getList () {
      Service.getThemeList()
        .then(x => {
          this.dataSource.themeList = x
          x.forEach(item => {
            if (item.isTrue === '1') {
              this.state.currentThemeId = item.skinId
              this.changeHandle(item.skinId)
            }
          })
        })
    },
    saveUserSkin () {
      Service.saveUserTheme({
        skinId: this.state.currentThemeId
      })
        .then(x => {
          this.setSkinByJson(this.state.currentPlugin)
          this.$nextTick(() => {
            this.$message.success('设置皮肤成功')
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    }
  }
}
</script>
