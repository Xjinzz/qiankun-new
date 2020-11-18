<template>
  <a-modal
    title="资源服务"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="1200px"
  >
    <iop-data-table hiddenTop style="margin-top:-24px" ref="serviceList" :table="table" :permission="permission">
      <!--因为点击【资源数据管理】【资源定义】【资源对象】{服务}查询项无效，所以去掉
      <template #top>
      <a-form layout="inline">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <a-col :span="8">
      <a-form-item label="服务名称">
      <a-input v-model="queryParam.objectName" placeholder="请输入服务名称" />
      </a-form-item>
      </a-col>
      <a-col :span="8">
      <a-form-item label="服务方法名称">
      <a-input v-model="queryParam.objectServiceName" placeholder="请输入服务方法名称" />
      </a-form-item>
      </a-col>
      <a-col :span="8">
      <a-button type="primary" @click="search()">查询</a-button>
      <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
      </a-col>
      </a-row>
      </a-form>
      </template>
      -->

      <template #editButton="{ record }">
        <a @click="handleEdit(record.objectId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.objectId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">发布</a-button>
        <a-button type="primary" @click="cancleModal()">取消发布</a-button>
      </template>
    </iop-data-table>

    <release ref="releases" :formMode="formMode" @resetSearchForm="resetSearchForm"/>

    <template #footer>
      <div style="text-align:center;">
        <a-button @click="handleCancel">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import MessageUtils from '@/utils/message'
import Release from './Release'
import objects from '@/iop-drms/service/server/object'
import path from '@/iop-drms/api'
// 资源对象服务
export default {
  name: 'ServiceList',
  components: { IopDataTable, Release },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** rowKey，必填 */
        rowKey: 'objectId',
        /** 列定义 */
        columns: [
          {
            title: '服务名称',
            dataIndex: 'objectName',
            sorter: false
          },
          {
            title: '服务方法名称',
            dataIndex: 'objectServiceName',
            sorter: false
          },
          {
            title: '服务说明',
            dataIndex: 'remark',
            sorter: false
          },
          {
            title: '发布状态',
            dataIndex: 'releaseStatus',
            sorter: false
          }
        ],
        actions: false
      },
      /** 表格组件按钮权限 */
      permission: ['create'],
      /** 表单组件模式 */
      formMode: 'create',
      objectId: '',
      firstShow: true
    }
  },
  methods: {
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },

    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.serviceList.reload(this.queryParam)
      } catch (error) {
        MessageUtils.error(error || '请求错误，请稍后再试')
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
      this.$refs.releases.show(this.objectId)
    },
    handleCancel () {
      this.visible = false
    },
    show (objectId = '') {
      this.objectId = objectId
      this.table.url = `${path.manage.object.serv}/${objectId}`
      this.visible = true
      this.$nextTick(() => {
        // this.$refs.serviceList.resetSearch()
        this.resetSearchForm()
      })
    },

    cancleModal () {
      const that = this
      that.$confirm({
        title: '是否取消服务发布？',
        onOk () {
          const data = `${that.objectId}/0`
          objects.servRele(data).then((res) => {
            that.resetSearchForm()
          }).catch((err) => {
            that.$message.error(err)
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>
