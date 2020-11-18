<template>
  <div>
    <iop-data-table
      ref="appNoThroughList"
      :table="table"
      :permission="permission"
      :autoLoad="false"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="系统编码">
              <a-input @pressEnter="search" placeholder="请输入系统编码" :maxLength="100" v-decorator="['appCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="系统名称">
              <a-input @pressEnter="search" placeholder="请输入系统名称" :maxLength="100" v-decorator="['appName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
    </iop-data-table>

    <app-detail-form ref="appDetailForm" :appId="appId" showType="modal" mode="view" />
  </div>
</template>
<script>
import appListVo from './vo/app-list-vo'
import AppDetailForm from './form/AppDetailForm'
import { IopDataTable } from '@/iop/components'
import { IOP_SERV_APP_STATUS } from '@/iop/constants'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'AppNoThroughList',
  components: { IopDataTable, AppDetailForm },
  data () {
    return {
      table: {
        url: path.serv.app.index,
        query: { status: IOP_SERV_APP_STATUS.NOTHROUGH },
        rowKey: 'appId',
        columns: appListVo,
        selectable: false
      },
      permission: ['view'],
      appId: ''
    }
  },
  methods: {
    async search () {
      try {
        await this.$refs.appNoThroughList.search()
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    resetSearchForm () {
      this.$refs.appNoThroughList.resetSearch()
      this.$refs.appNoThroughList.reload()
    },

    handleView (data = {}) {
      this.appId = data.appId
      this.$refs.appDetailForm.show()
    }

  }
}
</script>
