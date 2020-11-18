<template>
  <iop-data-tree
    maxHeight="500px"
    ref="authTrackTree"
    :url="url"
    @onSelect="onSelect"
    :searchable="true"
    :rootNode="{ show: false }"
  >
    <template #buttons>
      <a-select v-model="appId" style="width: 100%" @change="changeApp">
        <a-select-option v-for="(item, ind) in appOpt" :value="item.appId" :key="ind" >{{ item.appName }}</a-select-option>
      </a-select>
    </template>
  </iop-data-tree>
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'
import { iopAppService } from '@/iop/service/index'

export default {
  name: 'AuthTrackTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.permit.authTrack.tree,
      appOpt: iopAppService.getAllApps(),
      appId: iopAppService.getCurrentApp().appId
    }
  },
  watch: {
    appId (val) {
      this.url = `${path.permit.authTrack.tree}?currentLoginAppId=${val}`
      this.reload()
    }
  },
  methods: {
    changeApp (val) {
      this.appId = val
    },
    /**
     * 选中树节点
     */
    onSelect ({ key }) {
      this.$emit('onSelect', { key }, this.appId)
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.authTrackTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.authTrackTree.reload()
    }
  }
}
</script>
