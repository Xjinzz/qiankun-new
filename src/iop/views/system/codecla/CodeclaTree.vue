<template>
  <div>
    <a-spin :spinning="loading">
      <iop-data-tree
        ref="baseCodeClaTree"
        :rootNode="{ show: false }"
        :url="url"
        :async="false"
        rightClick
        :dragger="dragger"
        @onSelect="onSelect">
        <template #actions="{ node }">
          <template v-if="node.id !== '0'">
            <a-menu-item @click="handleCreate(node.id)">
              <a-icon type="plus" />新建子节点
            </a-menu-item>
            <a-menu-item @click="handleEdit(node.id)">
              <a-icon type="edit" />编辑
            </a-menu-item>
            <a-menu-item @click="handleRemove(node.id)" v-show="node.isLeaf">
              <a-icon type="delete"/>删除
            </a-menu-item>
          </template>
        </template>
      </iop-data-tree>
    </a-spin>
    <codecla-form ref="claForm" :parentId="parentId" :mode="formMode" :claId="claId" @onSubmitSuccess="reload" />
  </div>
</template>
<script>
import { IopDataTree } from '@/iop/components'
import { iopCodeclaService } from '@/iop/service'
import CodeclaForm from './CodeclaForm'
import MessageUtils from '@/utils/message'
import path from '@/iop/api'

export default {
  name: 'BaseCodeClaTree',
  components: { IopDataTree, CodeclaForm },
  data () {
    return {
      url: path.system.codecla.allTree,
      dragger: {
        enable: true,
        url: path.system.codecla.moveTree
      },
      loading: false,
      claId: '',
      formMode: 'create',
      parentId: '0'
    }
  },
  methods: {
    /**
     * 选中树节点
     */
    onSelect ({ key }) {
      this.$emit('onSelect', { key })
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.reload()
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.baseCodeClaTree.reload()
    },

    handleEdit (id = '') {
      this.claId = id
      this.formMode = 'edit'
      this.$refs.claForm.show()
    },

    handleRemove (id = '') {
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          this.loading = true
          iopCodeclaService.remove(id)
            .then(() => this.reload())
            .catch((err) => MessageUtils.error(err))
            .finally(() => { this.loading = false })
        }
      })
    },

    handleCreate (parentId = '0') {
      this.claId = ''
      this.formMode = 'create'
      this.parentId = parentId
      this.$refs.claForm.show()
    },

    handleView (id = '') {
      this.claId = id
      this.formMode = 'view'
      this.$refs.claForm.show()
    }
  }
}
</script>
