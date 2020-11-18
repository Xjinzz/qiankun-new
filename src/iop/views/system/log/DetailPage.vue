<template>
  <a-modal title="查看" :visible="showViewModal" @cancel="handleViewCancel" :footer="null">
    <a-form layout="horizontal">
      <a-spin :spinning="loading">
        <a-form-item label="操作人名称" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.operateUser }}</span>
        </a-form-item>
        <a-form-item label="功能名称" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.appName }}</span>
        </a-form-item>
        <a-form-item label="操作URL" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.url }}</span>
        </a-form-item>
        <a-form-item label="操作时间" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.logTime }}</span>
        </a-form-item>
        <a-form-item label="IP地址" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.logIp }}</span>
        </a-form-item>
        <a-form-item label="操作类型" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.operateType }}</span>
        </a-form-item>
        <a-form-item label="详细信息" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.logNote }}</span>
        </a-form-item>
      </a-spin>
    </a-form>
  </a-modal>
</template>
<script>

export default {
  name: 'SkinDetailPage',
  data () {
    return {
      showViewModal: false,
      /** 默认数据 */
      record: {},
      /** 加载状态 */
      loading: false
    }
  },
  methods: {
    /**
     * 取消
     */
    handleViewCancel () {
      this.toggle()
    },
    /**
     * 关闭状态
     */
    toggle () {
      this.showViewModal = !this.showViewModal
    },
    /**
     * 加载数据
     * @param {string} id 主键
     */
    async load (data = {}) {
      this.toggle()
      this.loading = true
      try {
        // this.record = await LogService.getListId(id)
        this.record = data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
