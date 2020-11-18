<template>
  <div>
    <div>
      <div style="width:16.7%;float:left;background:#fff;min-height: 913px;">
        <menu-tree :url="url" :title="title" :menuKey="menuKey" @menuSelect="menuSelect"></menu-tree>
      </div>
      <div style="width:82%;float:right;">
        <objectList ref="objectList" @selectKey="selectKey"></objectList>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import objectList from './OpenObjectList'
import path from '@/iop-drms/api'
import menuTree from '@/iop-drms/components/menu'
export default {
  components: { objectList, menuTree },
  data () {
    return {
      url: path.server.openData.tree,
      menuKey: '0',
      title: '数据集'
    }
  },
  methods: {
    menuSelect (key) {
      this.$refs.objectList.getTreeList(key)
    },
    selectKey (key) {
      this.menuKey = key
    }
  }
}
</script>
