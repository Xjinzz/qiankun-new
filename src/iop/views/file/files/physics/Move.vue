<template>
  <a-modal
    title="移动文件夹"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    width="600px"
  >
    <div style="width:500px;border: 1px solid #D9D9D9;border-radius: 4px;margin: 0 auto;">
      <iop-data-tree
        :queryName="queryName"
        :rootNode="rootNode"
        :replaceFields="replaceFields"
        ref="storesTree"
        :url="url"
        @onSelect="onSelect"
        style="margin:0 auto; height: 300px"
      />
    </div>
  </a-modal>
</template>
<script>
import files from '@/iop/service/file/files'
import path from '@/iop/api/index'
import { IopDataTree } from '@/iop/components'
export default {
  name: 'Move',
  components: { IopDataTree },
  data () {
    return {
      visible: false,
      queryName: 'path',
      rootNode: {
        id: '/'
      },
      url: path.file.files.filesTree,
      selectedRowKeys: [],
      selectTreeKey: '',
      replaceFields: {
        title: 'name',
        key: 'code'
      }
    }
  },
  methods: {
    show (selectedRowKeys = []) {
      selectedRowKeys.map((item) => {
        this.selectedRowKeys.push(item)
      })
      this.visible = true
    },
    onSelect ({ key, data }) {
      this.selectTreeKey = data.code
    },
    handleOk () {
      const data = {
        sourceFilePaths: this.selectedRowKeys,
        targetFilePath: this.selectTreeKey === undefined ? '/' : this.selectTreeKey
      }
      files.filesMove(data).then((res) => {
        this.selectTreeKey = ''
        this.$emit('search')
        this.clearData()
        this.$message.success('移动成功')
        this.visible = false
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handleCancel () {
      this.visible = false
      this.clearData()
    },
    clearData () {
      this.selectTreeKey = ''
      this.selectedRowKeys = []
    }
  }
}
</script>
