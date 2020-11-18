<template>
  <div>
    <a-tree
      checkable
      disabled
      checkStrictly
      :treeData="funTreeData"
      :loadData="onLoadFunData"
      v-model="checkedKeys"
    />
  </div>
</template>
<script>
import { Tree } from 'ant-design-vue'
import iopRoleService from '@/iop/service/system/role'
export default {
  components: {
    ATree: Tree
  },
  props: {
    roleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      funTreeData: [],
      checkedKeys: [],
      showTree: false
    }
  },
  methods: {
    getDeptTree (id) {
      const progId = {
        programId: 0,
        roleId: id
      }
      iopRoleService.fun(progId).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
        for (var i = 0; i < data.length; i++) {
          data[i].value = data[i].key
        }
        this.funTreeData = data
        for (var key of data) {
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
          iopRoleService.fun(grodId).then((res) => {
            const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
            for (var i = 0; i < data.length; i++) {
              data[i].value = data[i].key
            }
            treeNode.dataRef.children = data
            for (var key of data) {
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
    }
  }
}
</script>
<style scoped>
</style>
