<template>
  <a-modal :width="900" :visible="visible" @cancel="hideModal" title="切换目录">
    <div>
      <directory-tree ref="directoryTree" @onSelect="onTreeSelect"/>
    </div>
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hideModal">取消</a-button>
        <a-button type="primary" @click="submitForm()">提交</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import DirectoryTree from './DirectoryTree'
import { iopServService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'
export default {
  name: 'DirectoryModal',
  components: { DirectoryTree },
  data () {
    return {
      visible: false,
      selectid: ''
    }
  },
  props: {
    ids: {
      type: Array,
      required: true
    }
  },
  methods: {
    /**
     * 点击树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectid = key
    },
    hideModal () {
      this.visible = false
      this.$refs.directoryTree.reload()
      this.$parent.reload()
    },

    show () {
      this.visible = true
    },

    async submitForm () {
      try {
        await iopServService.changeDir(
          { parentId: this.selectid }, this.ids
        )
        MessageUtils.success()
        this.hideModal()
      } catch (err) {
        MessageUtils.error(err)
      }
    },

    onSubmitSuccess () {
      this.hideModal()
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
<style scoped>
.marginTop {
  margin-top:-20px;
}
</style>
