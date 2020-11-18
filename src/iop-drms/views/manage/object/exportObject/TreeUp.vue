<template>
  <div>
    <a-modal
      title="导出"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="600px"
    >
      <template slot="footer">
        <div style="width: 100%;text-align: center;">
          <a-button key="ex" @click="handleExport">
            导出
          </a-button>
          <a-button key="back" @click="handleCancel">
            关闭
          </a-button>
        </div>
      </template>
      <div class="treeDiv">
        <a-tree
          checkable
          checkStrictly
          :treeData="storeTreeData"
          :loadData="onLoadFunData"
          :replaceFields="replaceFields"
          v-model="checkedKeys"
          @check="onCheck"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { Tree } from 'ant-design-vue'
import path from '@/iop-drms/api'
import { download } from '@/utils/util'
import objects from '@/iop-drms/service/server/object'
export default {
  components: {
    ATree: Tree
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      replaceFields: {
        children: 'children',
        title: 'name',
        key: 'id',
        value: 'id'
      },
      storeId: '',
      storeTreeData: [],
      checkedKeys: []
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
      this.clearData()
    },
    handleExport () {
      download(path.manage.object.exportObj, 'post', this.checkedKeys)
    },
    onCheck (checkedKeys, e) {
      this.checkedKeys = checkedKeys.checked
    },
    getDeptTree () {
      const params = {
        parentId: 0
      }
      objects.exportTree(params).then((res) => {
        this.storeTreeData = res
        for (var key of res) {
          key.isLeaf = key.leaf
          if (key.type === 'catalog') {
            key.disableCheckbox = true
          }
        }
      })
    },
    // 弹出框树形异步加载
    onLoadFunData (treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          const params = {
            parentId: treeNode.dataRef.id,
            type: treeNode.dataRef.type
          }
          objects.exportTree(params).then((res) => {
            treeNode.dataRef.children = res
            for (var key of res) {
              key.isLeaf = key.leaf
              if (key.type === 'catalog') {
                key.disableCheckbox = true
              }
            }
            this.storeTreeData = [...this.storeTreeData]
          })
          resolve()
        }, 1000)
      })
    },
    clearData () {
      this.checkedKeys = []
    },
    show () {
      this.visible = true
      this.getDeptTree()
    }
  }
}
</script>
<style scoped>
.treeDiv {
  width:500px;
  margin: 0 auto;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  height: 300px;
  overflow: auto;
}
</style>
