<template>
  <div style="padding: 24px;background:#fff">
    <iop-data-table ref="segmentList" :table="table" :autoLoad="false" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="服务名称">
              <a-input v-model="queryParam.segmentStart" placeholder="请输入服务名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="服务方法名称">
              <a-input v-model="queryParam.segmentEnd" placeholder="请输入服务方法名称" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="码段类型">
                <iop-data-dict-select @change="onChange" ref="releaseStatus" type="segmentType"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record.segmentId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.segmentId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <segment-form ref="segmentForm" :mode="formMode" :segmentId="segmentId" :submitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop-drms/api'
import SegmentForm from './SegmentForm'
import segmentListVO from './vo/segment-list-vo'

export default {
  name: 'SegmentList',
  components: { IopDataTable, SegmentForm, IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.segment.allList,
        /** rowKey，必填 */
        rowKey: 'segmentId',
        /** 列定义 */
        columns: segmentListVO,
        query: { objectId: this.objectId }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      segmentId: '',
      objectId: ''
    }
  },
  methods: {
    onChange (value) {
      this.queryParam.segmentType = value
    },
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      if (this.advanced) {
        this.$refs.releaseStatus.cleanSelected()
      }
      this.search()
    },

    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.segmentList.reload(Object.assign(this.queryParam, { objectId: this.objectId }))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    },

    /**
     * 打开新建窗口
     */
    handleCreate () {
      // 改变弹出框标题
      this.formMode = 'create'
      this.$refs.segmentForm.objectId = this.objectId
      // 显示弹出框
      this.$refs.segmentForm.show('新增')
      // 清空表单项
      this.segmentId = ''
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} segmentId 主键
     */
    async handleEdit (segmentId = '') {
      this.formMode = 'edit'
      this.$refs.segmentForm.objectId = this.objectId
      this.$refs.segmentForm.show('编辑')
      this.segmentId = segmentId
    },

    /**
     * 打开查看窗口
     * @param {string} segmentId 主键
     */
    async handleView (segmentId = '') {
      this.formMode = 'view'
      this.$refs.segmentForm.show('查看')
      this.segmentId = segmentId
    },
    getList (objectId) {
      this.objectId = objectId
      this.$refs.segmentList.reload({ objectId: objectId })
    }
  }

}
</script>
