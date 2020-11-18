<template>
  <div>
    <iop-data-card-list ref="policeWayList" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="凭证编号">
              <a-input @pressEnter="search" placeholder="请输入凭证编号" v-decorator="['policyWayCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="凭证名称">
              <a-input @pressEnter="search" placeholder="请输入凭证名称" v-decorator="['policyWayName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #content="{ record }">
        <div>
          <a-avatar class="card-avatar" slot="avatar" icon="key" />
          <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            <ellipsis :length="14">{{ record.policyWayName }}</ellipsis>
          </span>
        </div>
        <div style="margin-top: 10px;">认证编码：<ellipsis :length="9">{{ record.policyWayCode }}</ellipsis></div>
        <div>
          实现类：<ellipsis :length="10">{{ record.policyWayClass }}</ellipsis>
        </div>
      </template>
    </iop-data-card-list>

    <pub-policy-way-form ref="wayForm" :mode="formMode" :wayId="wayId" @onSubmitSuccess="search" />
  </div>
</template>
<script>
import { IopDataCardList, IopEllipsis } from '@/iop/components'
import PubPolicyWayForm from './PubPolicyWayForm'
import path from '@/iop/api'

export default {
  name: 'PubPolicyWayList',
  components: { IopDataCardList, Ellipsis: IopEllipsis, PubPolicyWayForm },
  data () {
    return {
      table: {
        url: path.system.pubPolicyWay.table,
        rowKey: 'wayId'
      },
      permission: ['create', 'edit', 'remove'],
      wayId: '',
      formMode: ''
    }
  },
  methods: {
    async search () {
      this.$refs.policeWayList.search()
    },

    resetForm () {
      this.$refs.policeWayList.resetSearch()
      this.search()
    },

    handleCreate () {
      this.formMode = 'create'
      this.wayId = ''
      this.$refs.wayForm.show()
    },

    handleEdit (wayId = '') {
      this.formMode = 'edit'
      this.wayId = wayId
      this.$refs.wayForm.show()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original.wayId)
          break
      }
    }
  }
}
</script>
