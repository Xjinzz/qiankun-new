<template>
  <a-modal
    title="文件详情查看"
    :visible="visible"
    width="1000px"
    @cancel="handleCancel"
  >
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="文件信息" :forceRender="true">
        <basics ref="basics" :fileId="fileId" :mode="mode"></basics>
      </a-tab-pane>
      <a-tab-pane key="2" tab="关联文件" :forceRender="true">
        <refed ref="refed" :fileId="fileId"></refed>
      </a-tab-pane>
      <a-tab-pane key="3" tab="生命周期记录" :forceRender="true">
        <lifecycle ref="lifecycle" :fileId="fileId"></lifecycle>
      </a-tab-pane>
    </a-tabs>
    <template slot="footer">
      <div style="text-align: center">
        <a-button key="back" @click="handleCancel">
          关闭
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import basics from './basics/BasicsForm'
import refed from './refed/RefedList'
import lifecycle from './lifecycle/LifecycleList'
export default {
  name: 'BusinessForm',
  components: { basics, lifecycle, refed },
  data () {
    return {
      visible: false,
      fileId: ''
    }
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    show (id = '') {
      this.fileId = id
      this.visible = true
      this.$nextTick(() => {
        this.$refs.basics.show()
      })
    },
    callback (key) {
      if (key === '1') this.$refs.basics.show()
      else if (key === '2') {
        this.$nextTick(() => {
          this.$refs.refed.show()
        })
      } else if (key === '3') this.$refs.lifecycle.show(this.fileId)
    },
    handleCancel () {
      this.visible = false
      this.submitSuccess()
    },
    submitSuccess () {
      this.$emit('submitSuccess')
    }
  }
}
</script>
