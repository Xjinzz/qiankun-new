<template>
  <div>
    <a-modal
      title="目录发布"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="500px"
    >
      <a-row :gutter="24">
        <a-col :md="7" :sm="24" style="text-align: right;height: 30px;line-height: 30px;">
          选择目录：
        </a-col>
        <a-col :md="14" :sm="24">
          <a-tree-select
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择"
            treeDefaultExpandAll
            v-model="catalogId"
            :url="url"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top:20px">
        <a-col :md="7" :sm="24" style="text-align: right;height: 30px;line-height: 30px;">
          是否包含下级：
        </a-col>
        <a-col :md="14" :sm="24">
          <a-switch :checked="isTrue" @change="onSwitchChange"/>
        </a-col>
      </a-row>
      <template slot="footer" style="text-align:center">
        <div style="text-align:center">
          <a-button key="back" @click="releCancel">取消批量发布</a-button>
          <a-button key="submit" type="primary" @click="handleOk">
            批量发布
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import objects from '@/iop-drms/service/server/object'
import catalogs from '@/iop-drms/service/server/catalog'
import { TreeSelect } from 'ant-design-vue'
export default {
  components: {
    ATreeSelect: TreeSelect
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      catalogId: '',
      treeData: [],
      isTrue: false,
      url: ''
    }
  },
  methods: {
    handleOk () {
      if (!this.catalogId) {
        alert('请选择要发布或取消发布的目录')
      } else {
        this.visible = false
        const data = { status: this.isTrue ? '1' : '0', type: '1' }
        objects.releAll(this.catalogId, data).then((res) => {
          this.visible = false
          this.$parent.resetSearchForm()
        })
        this.catalogId = ''
        this.isTrue = false
      }
    },
    releCancel () {
      if (!this.catalogId) {
        alert('请选择要发布或取消发布的目录')
      } else {
        this.visible = false
        const data = { status: this.isTrue ? '1' : '0', type: '0' }
        objects.releAll(this.catalogId, data).then((res) => {
          this.visible = false
          this.$parent.resetSearchForm()
        })
        this.catalogId = ''
        this.isTrue = false
      }
    },
    handleCancel () {
      this.visible = false
    },
    getDeptTree () {
      catalogs.getTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.treeData = [data]
      })
    },
    show () {
      this.getDeptTree()
      this.visible = true
    },
    onSwitchChange (checked) {
      this.isTrue = checked
    }
  }
}
</script>
