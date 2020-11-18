<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs @change="tabChange">
          <a-tab-pane v-for="(item) in tableData" :key="item.code" :tab="item.name">
            <a-list>
              <a-list-item style="cursor:pointer;" @click="jump" v-for="(items, i) in noticeData" :key="i">
                <template v-if="i < 5">
                  <a-list-item-meta :title="items.sendContent" :description="items.sendTime">
                    <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                  </a-list-item-meta>
                </template>
              </a-list-item>
            </a-list>
            <div v-if="noticeData.length > 5" style="padding: 10px 0;text-align: right;">
              <a @click="moreClick">更多...</a>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="total">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import path from '@/iop/api/index'
// import recipients from '@/service/iop/msg/recipient'
import { iopDataService, iopAuthService } from '@/iop/service/index'
import { IOP_FORM_URL } from '@/iop/constants'
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loading: false,
      visible: false,
      tableData: [],
      noticeData: [],
      total: 0,
      tab: 2,
      timer: null
    }
  },
  methods: {
    ajaxLoop () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getData()
      }, 300 * 1000)
    },
    getData (type) {
      iopDataService
        .get({
          url: `${path.msg.recipient.table}?recStatus=0&contType=2`
        })
        .then((res) => {
          this.noticeData = res.result.data
          this.total = res.result.totalSizes
          this.ajaxLoop()
        })
    },
    selectData () {
      iopDataService
        .get({
          url: `${path.system.dict.code}/msgContType`
        })
        .then((res) => {
          this.tableData = res.result
        })
    },
    tabChange (activeKey) {
      this.tab = activeKey
      this.getData(activeKey)
    },
    fetchNotice () {
      if (!this.visible) {
        this.loading = true
        this.getData()
        this.selectData()
        setTimeout(() => {
          this.loading = false
        }, 2000)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    },
    moreClick () {
      iopAuthService.goPage(IOP_FORM_URL.MSG.RECIPIENT)
      this.visible = false
    },
    jump () {
      iopAuthService.goPage(IOP_FORM_URL.MSG.RECIPIENT)
      this.visible = false
    }
  },
  created () {
    // this.timer()
    this.getData()
    this.$on('hook:beforeDestroy', () => {
      clearTimeout(this.timer)
      this.timer = null
    })
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
