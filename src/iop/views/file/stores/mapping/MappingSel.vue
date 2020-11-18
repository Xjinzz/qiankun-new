<template>
  <a-modal
    title="文件库物理目录"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    width="600px"
  >
    <div class="div" style="border: 1px solid #D9D9D9;border-radius: 4px;">
      <iop-data-tree
        ref="mapCatalogTree"
        :queryName="queryName"
        :rootNode="rootNode"
        :replaceFields="replaceFields"
        :url="url"
        @onSelect="onSelect"
        style="margin:0 auto; height: 300px"
      />
    </div>
    <div class="div" style="margin-top: 20px">
      <a-row style="line-height: 32px;">
        <a-col :span="6">
          文件库物理目录：
        </a-col>
        <a-col :span="18">
          <a-input v-model="selectTreeKey"></a-input>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
import path from '@/iop/api/index'
import { IopDataTree } from '@/iop/components'
export default {
  name: 'MapCatalogTree',
  components: { IopDataTree },
  data () {
    return {
      visible: false,
      queryName: 'path',
      url: path.file.files.filesTree,
      selectTreeKey: '',
      replaceFields: {
        title: 'name',
        key: 'code'
      },
      rootNode: {
        show: false,
        id: ''
      },
      showSel: true
    }
  },
  methods: {
    show (path, name) {
      this.rootNode.id = path
      this.selectTreeKey = name
      this.visible = true
      this.$refs.mapCatalogTree && this.$refs.mapCatalogTree.configRootNode({ id: path })
      this.$refs.mapCatalogTree && this.$refs.mapCatalogTree.reload()
    },
    onSelect ({ key, data }) {
      this.selectTreeKey = ''
      if (data !== undefined) {
        const arr = key.split('/')
        for (const key in arr) {
          if (key >= 2) {
            this.selectTreeKey += `/${arr[key]}`
          }
        }
      }
    },
    handleOk () {
      if (this.selectTreeKey !== '') {
        this.$emit('selectCatalog', this.selectTreeKey)
        this.visible = false
        this.clearData()
      } else {
        this.$message.warning('请选择或输入目录')
      }
    },
    handleCancel () {
      this.visible = false
      this.clearData()
    },
    clearData () {
      this.selectTreeKey = ''
    }
  }
}
</script>
<style scoped>
.div {
  width:500px;
  margin: 0 auto;
}
</style>
