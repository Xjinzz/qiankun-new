<template>
  <div>
    <a-modal
      title="关联逻辑库"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="500px"
    >
      <template slot="footer">
        <div style="width: 100%;text-align: center;">
          <a-button key="back" @click="handleCancel">
            关闭
          </a-button>
        </div>
      </template>
      <a-tree
        v-if="showTree"
        checkable
        checkStrictly
        :treeData="storeTreeData"
        :loadData="onLoadFunData"
        :replaceFields="replaceFields"
        v-model="checkedKeys"
        @check="onCheck"
      />
    </a-modal>
  </div>
</template>
<script>
import { Tree } from 'ant-design-vue'
import files from '@/iop/service/file/types'
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
      typeId: '',
      storeTreeData: [],
      checkedKeys: [],
      showTree: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
      this.clearData()
      this.showTree = false
      this.$emit('search')
    },
    onCheck (checkedKeys, e) {
      this.checkedKeys = checkedKeys.checked
      const data = {
        checked: e.checked ? '1' : '0',
        ctlgId: e.node.eventKey,
        fileTypeId: this.typeId
      }
      files.ctlgsTreeCheck(data).then((res) => {
      })
    },
    getDeptTree () {
      const params = {
        id: 0,
        fileTypeId: this.typeId
      }
      files.ctlgsTree(params).then((res) => {
        this.storeTreeData = res
        for (var key of res) {
          key.isLeaf = key.leaf
          if (key.checked === true) {
            this.checkedKeys.push(key.id)
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
            id: treeNode.dataRef.id,
            fileTypeId: this.typeId
          }
          files.ctlgsTree(params).then((res) => {
            treeNode.dataRef.children = res
            for (var key of res) {
              key.isLeaf = key.leaf
              if (key.checked === true) {
                this.checkedKeys.push(key.key)
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
    show (id) {
      this.typeId = id
      this.visible = true
      this.showTree = true
      this.getDeptTree()
    }
  }
}
</script>
