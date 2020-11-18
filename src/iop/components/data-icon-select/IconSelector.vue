<template>
  <div style="width: 100%">
    <a-icon v-if="selectedIcon" :type="selectedIcon" :style="{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.65)' }"/>
    <a-button @click="showIcon" style="float: right; line-height: 32px;">选择</a-button>
    <a-modal
      title="选择图标"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <div :class="prefixCls">
        <a-tabs v-model="currentTab" @change="handleTabChange">
          <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
            <ul>
              <li v-for="(icon, key) in v.icons" :key="`${v.key}-${key}`" :class="{ 'active': selectedIcon==icon }" @click="handleSelectedIcon(icon)" >
                <a-icon :type="icon" :style="{ fontSize: '36px' }" />
              </li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script>
import icons from './icons'

export default {
  name: 'IconSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    }
  },
  watch: {
    value (newValue) {
      this.selectedIcon = newValue
    },
    selectedIcon (icon) {
      this.$emit('input', icon)
      this.$emit('change', icon)
    }
  },
  data () {
    return {
      selectedIcon: this.value || '',
      currentTab: 'directional',
      icons,
      visible: false,
      show: false
    }
  },
  methods: {
    setSelected (selectedIcon = '') {
      this.selectedIcon = selectedIcon
    },
    showIcon () {
      this.visible = true
      if (this.value) {
        this.autoSwitchTab()
      }
    },
    handleOk () {
      this.visible = false
      // this.$emit('changeIcon', this.selectedIcon)
    },
    handleCancel () {
      this.visible = false
    },
    handleSelectedIcon (icon) {
      this.selectedIcon = icon
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
    },
    autoSwitchTab () {
      // icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./index.less";

  ul{
    list-style: none;
    padding: 0;
    overflow-y: scroll;
    height: 250px;

    li{
      display: inline-block;
      padding: @padding-sm;
      margin: 3px 0;
      border-radius: @border-radius-base;

      &:hover, &.active{
        // box-shadow: 0px 0px 5px 2px @primary-color;
        cursor: pointer;
        color: @white;
        background-color: @primary-color;
      }
    }
  }
</style>
