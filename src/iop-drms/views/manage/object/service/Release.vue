<template>
  <div>
    <a-modal
      title="服务发布"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="500px"
    >
      <a-row :gutter="24">
        <a-col :md="7" :sm="24" style="text-align: right;height: 30px;line-height: 30px;">
          选择服务：
        </a-col>
        <a-col :md="14" :sm="24">
          <a-tree-select
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择"
            treeDefaultExpandAll
            v-model="serviceId"
            :url="url"
          />
        </a-col>
      </a-row>
      <template slot="footer" style="text-align:center">
        <div style="text-align:center">
          <a-button key="back" @click="handleCancel">关闭</a-button>
          <a-button key="submit" type="primary" @click="handleOk">
            发布
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import objects from '@/iop-drms/service/server/object'
import { TreeSelect } from 'ant-design-vue'
export default {
  components: {
    ATreeSelect: TreeSelect
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      serviceId: '',
      treeData: [],
      isTrue: false,
      url: '',
      objectId: ''
    }
  },
  methods: {
    handleOk () {
      if (!this.serviceId) {
        this.$message.warning('请选择要发布的资源服务')
      } else {
        this.visible = false
        const data = `${this.objectId}/1`
        objects.servRele(data, { serviceId: this.serviceId }).then((res) => {
          this.$emit('resetSearchForm')
          this.visible = false
        })
        this.serviceId = ''
      }
    },
    handleCancel () {
      this.visible = false
    },
    getDeptTree () {
      objects.servTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.treeData = [data]
      })
    },
    show (id) {
      this.getDeptTree()
      this.visible = true
      this.objectId = id
    }
  }
}
</script>
