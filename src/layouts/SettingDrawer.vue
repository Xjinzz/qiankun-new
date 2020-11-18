<template>
  <div class="setting-drawer" ref="settingDrawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
      :handle="handle"
    >
      <iop-setting-layout />
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon type="setting" v-if="!visible" />
        <a-icon type="close" v-else />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { IopSettingLayout } from '@/iop/views'

export default {
  components: {
    IopSettingLayout
  },
  data () {
    return {
      visible: false,
      handle: <div />
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less" scoped>
.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
