<template>
  <a-menu
    :default-selected-keys="['1']"
    :mode="menuMode"
    :theme="theme"
    :selected-keys="['1']"
    class="pre-menus"
    style="display:inline-block"
  >
    <a-menu-item key="1">
      <a-icon type="mail" />
      菜单1
    </a-menu-item>
    <a-menu-item key="2">
      <a-icon type="calendar" />
      菜单2
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title">
        <a-icon type="appstore" />
        菜单3
      </span>
      <a-menu-item key="3">
        <a-icon type="mail" />
        菜单3-1
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="calendar" />
        菜单3-2
      </a-menu-item>
      <a-sub-menu key="sub1-2">
        <span slot="title">
          <a-icon type="appstore" />
          菜单3-3
        </span>
        <a-menu-item key="5">
          <a-icon type="calendar" />
          菜单3-3-1
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="mail" />
          菜单3-3-2
        </a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title">
        <a-icon type="setting" />
        菜单4
      </span>
      <a-menu-item key="7">
        <a-icon type="mail" />
        菜单5
      </a-menu-item>
      <a-menu-item key="8">
        <a-icon type="appstore" />
        菜单6
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
export default {
  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    // 可选： horizontal inline
    menuMode: {
      type: String,
      required: false,
      default: 'inline'
    }
  }
}
</script>
