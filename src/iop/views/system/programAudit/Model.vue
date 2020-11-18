<template>
  <a-modal
    title="查看"
    :visible="visible"
    @cancel="handleViewCancel"
    @ok="companyOk"
    :footer="null"
  >
    <a-form layout="horizontal">
      <a-spin v-if="showInput === '菜单'" :spinning="loading">
        <a-form-item label="功能类型" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programType }}</span>
        </a-form-item>
        <a-form-item label="菜单名称" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programName }}</span>
        </a-form-item>
        <a-form-item label="审计日志" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.logLevel }}</span>
        </a-form-item>
        <a-form-item label="排序号码" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.orderNum }}</span>
        </a-form-item>
        <a-form-item label="菜单图标" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.icon }}</span>
        </a-form-item>
        <a-form-item label="菜单路由" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programUrl }}</span>
        </a-form-item>
        <a-form-item label="组件地址" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programCode }}</span>
        </a-form-item>
      </a-spin>
      <a-spin v-if="showInput === '操作'" :spinning="loading">
        <a-form-item label="功能类型" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programType }}</span>
        </a-form-item>
        <a-form-item label="操作名称" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programName }}</span>
        </a-form-item>
        <a-form-item label="操作类型" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.buttonType }}</span>
        </a-form-item>
        <a-form-item label="排序号码" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.orderNum }}</span>
        </a-form-item>
        <a-form-item label="操作权限" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programUrl }}</span>
        </a-form-item>
      </a-spin>
      <a-spin v-if="showInput === '分组'" :spinning="loading">
        <a-form-item label="功能类型" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programType }}</span>
        </a-form-item>
        <a-form-item label="分组名称" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.programName }}</span>
        </a-form-item>
        <a-form-item label="排序号码" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.orderNum }}</span>
        </a-form-item>
        <a-form-item label="分组图标" :label-col="{ span: 7 }">
          <span class="ant-form-text">{{ record.icon }}</span>
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
      visible: false,
      /** 默认数据 */
      record: {},
      /** 加载状态 */
      loading: false,
      showInput: '菜单'
    }
  },
  methods: {
    /**
     * 取消
     */
    handleViewCancel () {
      this.visible = false
    },
    companyOk () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
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
