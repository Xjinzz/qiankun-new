<template>
  <div>
    <div>
      <div style="width:16.7%;float:left;background:#fff;min-height: 913px;">
        <menu-tree :url="url" :title="title" :menuKey="menuKey" @menuSelect="menuSelect"></menu-tree>
      </div>
      <div style="width:82%;float:right;">
        <serviceList ref="serviceList" @selectKey="selectKey"></serviceList>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import serviceList from './OpenServiceList'
import path from '@/iop-drms/api'
import menuTree from '@/iop-drms/components/menu'
export default {
  components: { serviceList, menuTree },
  data () {
    return {
      url: path.server.openData.servTree,
      menuKey: '0',
      title: '接口服务'
    }
  },
  methods: {
    menuSelect (key) {
      this.$refs.serviceList.getTreeList(key)
    },
    selectKey (key) {
      this.menuKey = key
    }
  }
}
</script>
