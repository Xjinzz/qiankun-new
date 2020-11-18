<template>
  <div>
    <div style="width:16.7%;float:left;background:#fff;min-height: 913px;">
      <menu-tree :url="url" :title="title" :menuKey="menuKey" @menuSelect="menuSelect"></menu-tree>
    </div>
    <div style="width:82%;float:right;">
      <catalogList ref="logList" @selectKey="selectKey"></catalogList>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
import catalogList from './OpenCatalogList'
import menuTree from '@/iop-drms/components/menu'
import path from '@/iop-drms/api'
export default {
  components: { catalogList, menuTree },
  data () {
    return {
      url: path.server.openData.tree,
      menuKey: '0',
      title: '数据目录'
    }
  },
  methods: {
    menuSelect (key) {
      this.$refs.logList.getTreeList(key)
    },
    selectKey (key) {
      this.menuKey = key
    }
  }
}
</script>
