<template>
  <div>
    <a-modal
      title="授权菜单"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="500px"
    >
      <a-tree
        v-if="showTree"
        checkable
        checkStrictly
        :treeData="funTreeData"
        :loadData="onLoadFunData"
        v-model="checkedKeys"
        @check="onCheck"
      />
      <template #footer>
        <a-button @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { Tree } from 'ant-design-vue'
import roles from '@/iop/service/system/role'
export default {
  components: {
    ATree: Tree
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      roleId: '',
      funTreeData: [],
      checkedKeys: [],
      showTree: false
    }
  },
  methods: {
    handleOk () {
      this.visible = false
      this.clearData()
      this.showTree = false
    },
    handleCancel () {
      this.visible = false
      this.clearData()
      this.showTree = false
    },
    onCheck (checkedKeys, e) {
      this.checkedKeys = checkedKeys.checked
      const data = {
        checked: e.checked ? '1' : '0',
        programId: e.node.eventKey,
        roleId: this.roleId
      }
      roles.roleFunData(data).then((res) => {
      })
    },
    getDeptTree (id) {
      const progId = {
        programId: 0,
        roleId: id
      }
      roles.fun(progId).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
        for (var i = 0; i < data.length; i++) {
          data[i].value = data[i].key
        }
        this.funTreeData = data
        for (var key of data) {
          key.isLeaf = key.leaf
          if (key.checked === true) {
            this.checkedKeys.push(key.key)
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
          const grodId = {
            programId: treeNode.dataRef.key,
            roleId: this.roleId
          }
          roles.fun(grodId).then((res) => {
            const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
            for (var i = 0; i < data.length; i++) {
              data[i].value = data[i].key
            }
            treeNode.dataRef.children = data
            for (var key of data) {
              key.isLeaf = key.leaf
              if (key.checked === true) {
                this.checkedKeys.push(key.key)
              }
            }
            this.funTreeData = [...this.funTreeData]
          })
          resolve()
        }, 1000)
      })
    },
    clearData () {
      this.checkedKeys = []
    },
    show (roleId) {
      this.roleId = roleId
      this.visible = true
      this.showTree = true
      this.getDeptTree(roleId)
    }
  }
}
</script>
<style scoped>
</style>
