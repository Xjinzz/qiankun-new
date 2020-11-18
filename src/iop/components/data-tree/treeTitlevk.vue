<template>
  <div class="treeTitle ant-tree-switcher ant-tree-switcher-noop">
    <span>
      <a-icon
        v-if="showIcon && isIcon"
        :type="fileIcon"
        class="ant-tree-switcher-line-icon treeTitleIcon"
        :class="'_title_icon-'+(folder ? 'folder' : 'file')"
      />
      <span
        v-if="showIcon && isCustomIcon"
        class="ant-tree-switcher-line-icon treeTitleIcon icon-iconfont"
        :class="['_title_icon-'+(folder ? 'folder' : 'file'), 'icon-' + fileIcon]">
      </span>
      <slot name="default"/>
    </span>
  </div>
</template>
<script>
const defaultIconMap = {
  folder: 'folder',
  file: 'file-text'
}
const defaultCustomMap = {
  folder: 'shua',
  file: 'shub'
}
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    },
    folder: {
      type: Boolean,
      required: false
    },
    iconType: {
      type: String,
      required: false,
      default: 'icon'
    },
    // 扩展预留字段，控制是否隐藏icon 但是无法控制连接线
    showIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    // 仅局限设置folder 和 file 不建议后续扩展，确实需要扩展请将 Strategy.xxxx通过new defaultIconStrategy()
    // 并且通过getValue来做获取
    defaultIcon () {
      const key = this.folder ? 'folder' : 'file'
      const Strategy = {
        icon: defaultIconMap,
        custom: defaultCustomMap
      }
      return Strategy[this.iconType][key]
    },
    fileIcon () {
      return this.icon && this.icon !== '' ? this.icon : this.defaultIcon
    },
    isCustomIcon () {
      return this.iconType === 'custom'
    },
    isIcon () {
      return this.iconType === 'icon'
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/font/iconfont.css';

.ant-tree /deep/ li span.ant-tree-switcher.ant-tree-switcher-noop.treeTitle {
  display: block!important;
}
// 正常样式
.treeTitle {
  display: flex!important;
  align-items: center!important;
  background:#fff;
  /deep/ ._title_icon-folder {
    font-size:15px!important;
    // margin-left: -5px!important;
  }
  /deep/ ._title_icon-file {
    font-size:15px!important;
    background: #fff;
    height:24px;
    line-height: 24px;
  }
}
</style>
