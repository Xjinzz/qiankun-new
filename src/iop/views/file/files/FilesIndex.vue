<template>
  <a-row :gutter="8">
    <div
      style="position:absolute; top: 10px; left: 15px;z-index:999"
      @click="triggerTreeHidden()"
    >
      <a-icon style="color:#000" :type="hideTree ? 'menu-fold' : 'menu-unfold'" />
    </div>
    <a-col :span="hideTree ? 5 : 0">
      <a-card>
        <iop-data-tree
          maxHeight="935px"
          :queryName="queryName"
          :rootNode="rootNode"
          ref="storesTree"
          :url="url"
          :replaceFields="replaceFields"
          @onSelect="onSelect"
        />
      </a-card>
    </a-col>
    <a-col :span="hideTree ? 19 : 24" style="background:#fff;padding-top: 24px;">
      <!-- <span style="display: block;font-family: PingFangSC-Medium;font-size: 16px;color: #333333;">非结构化数据统计</span>
      <div v-for="(item, i) in filesData" :key="i" style="width: 33%;margin-top: 20px;display: inline-block">
        <a-card style="width: 90%;margin: 0 auto" :hoverable="true" @click="jumpList(item)">
          <div class="title">
            <div>
              <a-icon type="folder" style="fontSize: 30px"/>
            </div>
            <div>
              {{ item.defiName }}
            </div>
          </div>
          <div style="margin-top:10px">
            <a-row :gutter="24">
              <a-col :span="12">
                使用容量：{{ item.dirCount }}
              </a-col>
              <a-col :span="12">
                文件夹数量：{{ item.dirCount }}个
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                文件数量：{{ item.dirCount }}个
              </a-col>
            </a-row>
          </div>
        </a-card>
      </div> -->
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="物理视图" :forceRender="true">
          <physics ref="physics" @reloadNode="reloadNode"></physics>
        </a-tab-pane>
        <a-tab-pane key="2" tab="业务视图" :forceRender="true">
          <business ref="business" @reloadNode="reloadNode"></business>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'
import physics from './physics/PhysicsList'
import business from './business/BusinessList'
export default {
  /** 数据发布组件 */
  name: 'FilesIndex',
  data () {
    return {
      hideTree: true,
      url: path.file.files.filesTree,
      queryName: 'path',
      rootNode: {
        id: '/'
      },
      replaceFields: {
        title: 'name',
        key: 'code'
      },
      selectTreeKey: '',
      selKey: '1'
    }
  },
  components: { IopDataTree, physics, business },
  methods: {
    triggerTreeHidden () {
      this.hideTree = !this.hideTree
    },
    callback (key) {
      this.selKey = key
      if (key === '1') this.$refs.physics.show(this.selectTreeKey)
      else this.$refs.business.show(this.selectTreeKey)
    },

    /**
     * 选中树节点
     */
    onSelect ({ key, data }) {
      this.selectTreeKey = key === undefined ? '/' : key
      if (this.selKey === '1') this.$refs.physics.show(key === undefined ? '/' : key)
      else this.$refs.business.show(key === undefined ? '/' : key)
      this.$emit('onSelect', { key })
    },

    /**
     * 刷新节点
     */
    reloadNode () {
      if (this.selectTreeKey === '/') this.$refs.storesTree.reload()
      else this.$refs.storesTree.reloadNode(this.selectTreeKey)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.storesTree.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  height: 30px;
  div {
    font-family: 'PingFangSC-Medium';
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    height: 30px;
    line-height: 30px;
    float: left;
    margin-right: 10px
  }
}
.ant-card-wider-padding .ant-card-body {
}
</style>
