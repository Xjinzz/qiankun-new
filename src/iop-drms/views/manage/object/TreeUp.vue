<template>
  <div>
    <a-modal
      title="修改分类"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="500px"
    >
      所属分类：<iop-data-tree-select ref="catalogId" style="width:80%" :url="cataUrl" query="parentId" @onSelect="onSelect"/>
    </a-modal>
  </div>
</template>
<script>
import { IopDataTreeSelect } from '@/iop/components'
import objects from '@/iop-drms/service/server/object'
export default {
  components: { IopDataTreeSelect },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      catalogId: '',
      objectIds: [],
      cataUrl: '/iop/drms/catalog/tree'
    }
  },
  methods: {
    handleOk () {
      if (this.catalogId) {
        objects.cataChange(this.objectIds, { catalogId: this.catalogId }).then((res) => {
          this.$message.success('修改成功')
          this.visible = false
          this.catalogId = ''
          this.objectIds = []
          this.$emit('onSubmitSuccess')
        })
      } else {
        this.$message.warning('请选择要修改的分类')
      }
    },
    handleCancel () {
      this.visible = false
      this.catalogId = ''
      this.objectIds = []
      this.$emit('onSubmitSuccess')
    },
    onSelect (key, data) {
      this.catalogId = key.key
    },
    show (data) {
      this.visible = true
      this.objectIds = data
      this.$nextTick(() => {
        this.$refs.catalogId && this.$refs.catalogId.cleanSelected()
      })
    }
  }
}
</script>
