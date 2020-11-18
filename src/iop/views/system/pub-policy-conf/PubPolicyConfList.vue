<template>
  <div>
    <iop-data-card-list ref="policyConfList" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="策略编号">
              <a-input @pressEnter="search" placeholder="请输入策略编号" v-decorator="['policyCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="策略名称">
              <a-input @pressEnter="search" placeholder="请输入策略名称" v-decorator="['policyName']" allowClear />
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
          <a-avatar class="card-avatar" slot="avatar" icon="code" />
          <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            <ellipsis :length="14">{{ record.policyName }}</ellipsis>
          </span>
        </div>
        <div style="margin-top: 10px;">策略编号：<ellipsis :length="9">{{ record.policyCode }}</ellipsis></div>
        <div>
          实现类：<ellipsis :length="10">{{ record.policyClass }}</ellipsis>
        </div>
      </template>
    </iop-data-card-list>

    <pub-policy-conf-form ref="pubPolicyConfForm" :mode="formMode" :policyConfId="policyConfId" @onSubmitSuccess="search" />
  </div>
</template>
<script>
import { IopDataCardList, IopEllipsis } from '@/iop/components'
import PubPolicyConfForm from './PubPolicyConfForm'
import path from '@/iop/api'

export default {
  name: 'PubPolicyConfList',
  components: { IopDataCardList, Ellipsis: IopEllipsis, PubPolicyConfForm },
  data () {
    return {
      table: {
        url: path.system.pubPolicyConf.table,
        rowKey: 'policyConfId'
      },
      permission: ['create', 'edit', 'remove'],
      policyConfId: '',
      formMode: ''
    }
  },
  methods: {
    async search () {
      this.$refs.policyConfList.search()
    },

    resetForm () {
      this.$refs.policyConfList.resetSearch()
      this.search()
    },

    handleCreate () {
      this.formMode = 'create'
      this.policyConfId = ''
      this.$refs.pubPolicyConfForm.show()
    },

    handleEdit (policyConfId = '') {
      this.formMode = 'edit'
      this.policyConfId = policyConfId
      this.$refs.pubPolicyConfForm.show()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original.policyConfId)
          break
      }
    }
  }
}
</script>
