<template>
  <iop-pub-user-voucher-list ref="voucherList" :isAdmin="false" title="个人凭证" />
</template>
<script>
import { IopPubUserVoucherList } from '@/iop/views/index'

export default {
  name: 'SettingVoucherList',
  components: { IopPubUserVoucherList }
}
</script>
