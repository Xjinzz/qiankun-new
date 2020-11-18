<template>
  <div>
    <iop-data-card-list ref="voucherList" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="凭证编号">
              <a-input @pressEnter="search" placeholder="请输入凭证编号" v-decorator="['voucherCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="凭证名称">
              <a-input @pressEnter="search" placeholder="请输入凭证名称" v-decorator="['voucherName']" allowClear />
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
          <a-avatar class="card-avatar" slot="avatar" icon="security-scan" />
          <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            <ellipsis :length="14">{{ record.voucherName }}</ellipsis>
          </span>
        </div>
        <div style="margin-top: 10px;">凭证编号： {{ record.voucherCode }}</div>
        <div>
          维护页面：<ellipsis :length="10">{{ record.voucherPage }}</ellipsis>
        </div>
      </template>
    </iop-data-card-list>

    <voucher-form ref="voucherForm" :mode="formMode" :voucherId="voucherId" @onSubmitSuccess="search"/>
  </div>
</template>
<script>
import { IopDataCardList, IopEllipsis } from '@/iop/components'
import path from '@/iop/api'
import VoucherForm from './VoucherForm'

export default {
  name: 'VouchList',
  components: { IopDataCardList, Ellipsis: IopEllipsis, VoucherForm },
  data () {
    return {
      table: {
        url: path.system.pubVoucher.index,
        rowKey: 'voucherId'
      },
      permission: ['create', 'edit', 'remove'],
      voucherId: '',
      formMode: ''
    }
  },
  methods: {
    async search () {
      this.$refs.voucherList.search()
    },

    resetForm () {
      this.$refs.voucherList.resetSearch()
      this.search()
    },

    handleCreate () {
      this.formMode = 'create'
      this.voucherId = ''
      this.$refs.voucherForm.show()
    },

    handleEdit (voucherId = '') {
      this.formMode = 'edit'
      this.voucherId = voucherId
      this.$refs.voucherForm.show()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original.voucherId)
          break
      }
    }
  }
}
</script>
