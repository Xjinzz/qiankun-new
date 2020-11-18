<template>
  <div>
    <iop-data-table
      ref="voucherList"
      :table="table"
      :hiddenTop="true">
      <template #rowButtons="{ record }">
        <a @click="handleSetting(record)" :disabled="holdEdit(record)">凭证设置</a>
        <template v-if="showReset(record)">
          <a-divider type="vertical" />
          <a @click="handleReset(record)">重置凭证</a>
        </template>
      </template>
    </iop-data-table>

    <pad-modal
      ref="padModal"
      title="pad凭证设置"
      :userId="userId"
      :voucherId="voucherId"
      :mode="formMode"
      :voucherUserId="voucherUserId"
      :submitSuccess="search" />

    <phone-modal
      ref="phoneModal"
      title="手机号设置"
      :userId="userId"
      :voucherId="voucherId"
      :mode="formMode"
      :voucherUserId="voucherUserId"
      :submitSuccess="search" />

    <login-name-modal
      ref="loginNameModal"
      title="登录凭证设置"
      :userId="userId"
      :voucherId="voucherId"
      :mode="formMode"
      :voucherUserId="voucherUserId"
      :isPerson="isPerson"
      :submitSuccess="search" />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import { IOP_VOUCHER_TYPE } from '@/iop/constants'
import { iopUserService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'
import pubUserVoucherListVO from './vo/pub-user-voucher-list-vo'
import path from '@/iop/api'
import PadModal from './voucher/PadModel'
import PhoneModal from './voucher/PhoneModal'
import LoginNameModal from './voucher/LoginNameModal'

export default {
  name: 'PubUserVoucherList',
  components: { IopDataTable, PadModal, PhoneModal, LoginNameModal },
  data () {
    return {
      table: {
        columns: pubUserVoucherListVO,
        filterable: false,
        rowKey: 'voucherId',
        selectable: false
      },
      voucherId: '',
      voucherName: '',
      userId: '',
      voucherUserId: '',
      formMode: 'create',
      isPerson: false
    }
  },
  props: {
    pubUserId: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: [String, Number],
      required: false,
      default: '0'
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  created () {
    if (this.isAdmin) {
      this.table.query = { userId: this.pubUserId }
      this.table.url = `${path.system.pubUser.voucher.index}?type=${this.type}`
      this.userId = this.pubUserId
    } else {
      this.table.url = `${path.settings.voucher}`
      this.isPerson = true
    }

    this.table.title = this.title
  },
  methods: {
    load () {
      if (this.isAdmin) {
        this.table.query = { userId: this.pubUserId }
        this.userId = this.pubUserId
      }
      this.resetSearchForm()
    },

    search () {
      this.$refs.voucherList.reload()
    },

    resetSearchForm () {
      this.search()
    },

    handleSetting (record = {}) {
      this.voucherId = record.voucherId
      if (record.status && record.voucherUserId) {
        this.formMode = 'edit'
        this.voucherUserId = record.voucherUserId
      } else {
        this.formMode = 'create'
        this.voucherUserId = ''
      }
      if (this.isPerson) {
        this.userId = record.userId
      }

      const voucherCode = record.voucherCode
      switch (voucherCode) {
        case IOP_VOUCHER_TYPE.LOGINNAME:
          this.$refs.loginNameModal.show()
          break
        case IOP_VOUCHER_TYPE.PHONE:
          this.$refs.phoneModal.show()
          break
        case IOP_VOUCHER_TYPE.PAD:
          this.$refs.padModal.show()
          break
        default: MessageUtils.error('非法的凭证编码')
      }
    },

    holdEdit (record = '') {
      return (this.isPerson) && (record.voucherCode !== IOP_VOUCHER_TYPE.LOGINNAME)
    },

    handleReset (record = {}) {
      this.$confirm({
        title: '确定重置吗',
        onOk: async () => {
          try {
            await iopUserService.resetPwd(record.voucherUserId)
            MessageUtils.success()
          } catch (err) {
            MessageUtils.error(err)
          }
        }
      })
    },

    showReset (record = '') {
      return !this.isPerson && record.status && record.voucherCode === IOP_VOUCHER_TYPE.LOGINNAME
    }
  }
}
</script>
