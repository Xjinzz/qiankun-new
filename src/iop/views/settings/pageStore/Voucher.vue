<template>
  <div class="settings-tab2">
    <p class="title">个人凭证密码</p>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.voucherName }}</a>
          <span slot="description" v-if="item.voucherName === '登录名凭证' ">
            <span class="security-list-description">当前登陆密码强度:{{ item.voucherVal }}</span>
            <span v-if="item.voucherCode"></span>
            <span class="security-list-value"></span>
          </span>
          <span slot="description" v-if="item.voucherName === '手机号凭证' ">
            <span class="security-list-description">当前绑定手机号:{{ item.voucherId }}</span>
            <span v-if="item.voucherCode"></span>
            <span class="security-list-value"></span>
          </span>
        </a-list-item-meta>
        <template>
          <a slot="actions" @click="clickEvent(item, index)">修改</a>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { iopSettingService } from '@/iop/service/index'
export default {
  data () {
    return {
      data: [
        // { title: '登陆名凭证', description: '当前登陆密码强度', value: '强', actions: { title: '修改', callback: () => { this.$message.info('This is a normal message') } } },
        // { title: '手机号凭证', description: '当前绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.$message.success('This is a message of success') } } },
        // { title: '会议PAD凭证', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '修改', callback: () => { this.$message.error('This is a message of error') } } },
        // { title: 'CA登陆凭证', description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } }
      ]
    }
  },
  props: {
    userid: {
      type: String,
      required: true
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      iopSettingService.getPList({ userid: this.userid }).then(res => {
        this.data = res.data
      })
    },
    clickEvent (item, index) {
      if (item.voucherName === '登录名凭证') {
        this.visible = true
      }
    }
  }
}
</script>

<style scoped lang="less">
  .settings-tab2{
        height: 100%;
        position: relative;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
    }
</style>
