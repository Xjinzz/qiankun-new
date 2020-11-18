<template>
  <div style="width:100%">
    <a-layout id="skinBox" :class="boxClassList">
      <a-layout-sider v-if="menuMode==='inline'" class="sider pre-inline-menus" style="height:780px">
        <h1 style="height:60px;display:inline-block;line-height:60px;">
          xxx平台
        </h1>
        <side-menus
          :theme="theme"
          :menuMode="menuMode"
        ></side-menus>
      </a-layout-sider>
      <div v-else class="pre-horizontal-menus" :style="theme!=='light' ? 'background:#001529' : 'background:#fff'">
        <h1>xxx平台</h1>
        <side-menus
          :theme="theme"
          :menuMode="menuMode"
        ></side-menus>
        <div class="pub-header-content" style="height:40px">
          <p style="font-size:14px;display:inline-block;margin-right:10px;line-height:40px">
            <span style="margin-right:5px">xxx平台</span>
            <a-icon style="font-size:12px" type="down" />
          </p>
          <a-icon style="font-size:14px;" type="bell" />
        </div>
      </div>
      <!-- 内容区域 -->
      <div style="flex:1;height:100px;width:100%;">
        <div v-if="menuMode==='inline'" class="pub-header-content" style="background:#fff;height:60px;text-align:right;padding-right:20px;box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);position:relative;line-height:60px">
          <p style="font-size:14px;display:inline-block;margin-right:10px;line-height:40px">
            <span style="margin-right:5px">xxx平台</span>
            <a-icon style="font-size:12px" type="down" />
          </p>
          <a-icon style="font-size:14px;" type="bell" />
        </div>
        <div class="skinpreview-content-header">
          <c-multitab v-if="multiTab"></c-multitab>
          <div class="pre-crumbs">
            <breadcrumb />
          </div>
        </div>
        <div class="skinpreview-content-continer">
          <continer-page />
        </div>
      </div>
    </a-layout>
  </div>
</template>
<script>
import SideMenus from './comp/SideMenus'
import CMultitab from './comp/Multitab'
import Breadcrumb from './comp/Breadcrumb'
import ContinerPage from './comp/ContinerCard'
export default {
  name: 'SysSkinPreview',
  components: {
    SideMenus,
    CMultitab,
    Breadcrumb,
    ContinerPage
  },
  props: {
    // light dark
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    // 色弱模式
    colorWeak: {
      type: Boolean,
      required: false,
      default: false
    },
    /*
     * @example dusk、volcano、nightfall、mingqing、auroraGreen、dawn（默认）、geekBlue、purple
     */
    color: {
      type: String,
      required: false,
      default: 'dawn'
    },
    // 可选 sidemenu topmenu
    layoutMode: {
      type: String,
      required: false,
      default: 'sidemenu'
    },
    multiTab: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    menuMode () {
      return this.layoutMode === 'topmenu' ? 'horizontal' : 'inline'
    },
    boxClassList () {
      const result = []
      result.push('pre-theme-' + this.theme)
      result.push('pre-color-' + this.color)
      result.push('pre-layout-' + this.menuMode)
      if (this.colorWeak) {
        result.push('pre-colorWeak')
      }
      return result
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  // 获取主题色方法注册
  @import "./tools/registerColorMethods.less";
  // 内容区域样式
  @import "./tools/content.less";
  // 主题色样式
  @import "./tools/color.less";
  #skinBox /deep/ {
    /deep/ p {
      margin-bottom: 0px;
    }
    background: rgb(240, 242, 245);
    display:flex;
    width:100%;
    height: 820px;
    // 纵向菜单
    &.pre-layout-inline{
      h1 {
        border:1px 1px 0px 0px #e8e8e8;
        font-size: 20px;
        font-weight: 600;
        vertical-align: middle;
        text-align:center;
        width:200px;
        margin-bottom: 0;
      }
      flex-direction:row;
      .sider {
        min-height: 820px;
        height:8200px;
      }
    }
    // 横向菜单
    &.pre-layout-horizontal{
      flex-direction:column;
      /deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        width: 100%;
      }
      .ant-menu-horizontal {
        border:0px #fff solid;
      }
    }
    .pre-horizontal-menus {
      width:100%;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      h1{
        display: inline-block;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 0px;
      }
    }
    // 色弱
    &.pre-colorWeak {
      filter: invert(80%)
    }
    // 浅色调
    &.pre-theme-light {
      .color-mixin(light);
      .sider {
        background: #fff
      }
      .pre-horizontal-menus {
        border-bottom:1px solid #efefef
      }
    }
    // 深色调
    &.pre-theme-dark {
      .color-mixin(dark);
    }
  }
</style>
