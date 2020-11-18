<template>
  <a-card>
    <a-tabs
      defaultActiveKey="1"
      tabPosition="left"
      style="padding-left: 30px;"
    >
      <a-tab-pane tab="基本信息" key="1">
        <base-info />
      </a-tab-pane>
      <a-tab-pane tab="个人凭证" key="2">
        <voucher-list />
      </a-tab-pane>
      <!-- <a-tab-pane tab="通讯方式" key="3"></a-tab-pane> -->
      <!-- <a-tab-pane tab="消息待办" key="4"></a-tab-pane> -->
      <!-- <a-tab-pane tab="皮肤布局" key="5"></a-tab-pane> -->
      <a-tab-pane tab="主题选择" key="3">
        <theme-change></theme-change>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
import BaseInfo from './BaseInfo'
import VoucherList from './VoucherList'
import ThemeChange from './ThemeChange'

export default {
  name: 'SettingCenter',
  components: { BaseInfo, VoucherList, ThemeChange }
}
</script>
