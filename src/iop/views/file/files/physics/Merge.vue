<template>
  <a-modal
    title="合并文件夹"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    width="600px"
  >
    <div style="font-size: 16px; margin: 0 0 10px 25px;">选择需要合并到的目录</div>
    <div class="div" style="border: 1px solid #D9D9D9;border-radius: 4px;">
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
    <div class="div" style="margin-top: 20px">
      <a-row>
        <a-col :span="6">
          需要合并文件夹：
        </a-col>
        <a-col :span="18">
          <template v-for="(tag, index) in tags">
            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag, index)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else :key="tag" :closable="index !== 0" @close="() => handleClose(tag, index)">
              {{ tag }}
            </a-tag>
          </template>
        </a-col>
      </a-row>
    </div>
    <div class="div" style="margin-top: 20px">
      <a-row>
        <a-col :span="6">
          是否在目标位置创建新文件夹：
        </a-col>
        <a-col :span="18">
          <a-input v-model="folderName" placeholder="如需在合并的目录下创建子目录请输入子目录名称"></a-input>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
import files from '@/iop/service/file/files'
import path from '@/iop/api/index'
import { IopDataTree } from '@/iop/components'
export default {
  name: 'Merge',
  components: { IopDataTree },
  data () {
    return {
      visible: false,
      queryName: 'path',
      rootNode: {
        id: '/'
      },
      url: path.file.files.filesTree,
      // selectedRowKeys: [],
      selectTreeKey: '',
      tags: [],
      folderName: '',
      replaceFields: {
        title: 'name',
        key: 'code'
      }
    }
  },
  methods: {
    show (selectedRowKeys = []) {
      selectedRowKeys.map((item) => {
        // this.selectedRowKeys.push(item)
        this.tags.push(item)
        return item
      })
      this.visible = true
    },
    handleClose (tag, index) {
      this.tags.splice(index, 1)
    },
    onSelect ({ key, data }) {
      this.selectTreeKey = data.code
    },
    handleOk () {
      const data = {
        sourceFilePaths: this.tags,
        targetFilePath: this.selectTreeKey,
        folderName: this.folderName
      }
      files.filesMerge(data).then((res) => {
        this.$emit('search')
        this.clearData()
        this.$message.success('合并成功')
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
      this.tags = []
      this.folderName = ''
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
