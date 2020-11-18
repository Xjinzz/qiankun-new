<template>
  <div>
    <a-row class="flex flexBetween">
      <div style="width:64%">
        <a-card title="消息发送方式占比">
          <a-row style="width:100%;height:500px">
            <a-col id="msgTypeChart" style="width:100%;height:500px"></a-col>
          </a-row>
        </a-card>
      </div>
      <div style="width:34%">
        <a-card title="发送成功率">
          <a-row style="height:500px">
            <a-col id="sendSuccessChart" style="width:100%;height:500px"></a-col>
          </a-row>
        </a-card>
      </div>
    </a-row>
    <a-row>
      <a-card title="消息发送类型占比">
        <a-row class="flex flexWrap">
          <a-col
            :span="7"
            v-for="(item, index) in state.msgContentTypeList"
            :key="index"
            style="height:400px"
          >
            <msg-content-type-chart :dataSource="item" :count="state.msgContentCount" :color="item.color" style="height:200px"></msg-content-type-chart>
            <msg-type-chart-classify v-if="item.contType!=null" :color="item.color" :contType="item.contType" style="height:200px"></msg-type-chart-classify>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
    <a-row>
      <a-card title="消息发送状态" class="sendStatus">
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="日期">
                <a-date-picker v-model="searchModel.date"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="时间间隔">
                <a-select v-model="searchModel.timeInterval" style="width:100%">
                  <a-select-option
                    v-for="(item, index) in dataSource.timeInterval"
                    :key="index"
                    :value="item.code"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8" style="text-align:left;margin-top:1px">
              <a-button type="primary" @click="getMsgSecNum">查询</a-button>
            </a-col>
          </a-row>
        </a-form>
        <p v-if="state.msgSecChartLoaded" style="margin-top:20px">
          发送成功：{{ state.msgSendStatusSuccessNum }} 发送失败：{{ state.msgSendStatusErrorNum }}
        </p>
        <a-row style="width:100%;height:400px">
          <a-col id="msgSendStatus" style="width:100%;height:400px"></a-col>
        </a-row>
      </a-card>
    </a-row>
  </div>
</template>
<script>
// import path from '@/iop/api/index'
import { dateTool } from 'mwutil'
import MsgTypeChart from './tool/msgTypeChart'
import MsgSendSuccessPer from './tool/msgSendSuccessPer'
import MsgSendStatus from './tool/msgSendStatus'
import { iopMsgStatisticsService } from '@/iop/service/index'
import MsgContentTypeChart from './comp/MsgContentTypeChart'
import MsgTypeChartClassify from './comp/MsgTypeChartClassify'
import idSeed from './tool/idSeed'
import Define from './tool/define'
import moment from 'moment'
export default {
  name: 'StatisticsChart',
  components: {
    MsgContentTypeChart,
    MsgTypeChartClassify,
    MsgSendStatus
  },
  data () {
    return {
      state: {
        msgSecChartLoaded: false, // 消息发送状态图表是否loaded
        msgContentTypeList: [], // 消息发送类型图表数据list
        msgContentCount: 0, // 消息发送类型图表总数
        msgSendStatusErrorNum: 0, // 发送失败总数
        msgSendStatusSuccessNum: 0 // 发送成功总数
      },
      // 消息发送状态search
      searchModel: {
        date: moment(new Date()),
        timeInterval: '0.5'
      },
      dataSource: {
        timeInterval: []// 时间间隔下拉dataSource
      }
    }
  },
  mounted () {
    this.renderMsgTypeChart()
    this.renderMsgContentTypeChart()
    this.renderSendSuccessPer()
    this.dataSource.timeInterval = iopMsgStatisticsService.getTimeInterval()
    this.getMsgSecNum()
  },
  methods: {
    // 消息发送方式图表
    renderMsgTypeChart () {
      iopMsgStatisticsService.getMsgTypeData({})
        .then(x => {
          const chart = new MsgTypeChart({
            el: document.getElementById('msgTypeChart'),
            num: x.num,
            data: x.data,
            title: Define.MSGTYPECHARTTITLE
          })
          chart.render()
        })
    },
    // 获取随机颜色
    getColorRandom () {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return '#' + r.toString(16) + g.toString(16) + b.toString(16)
    },
    // 消息发送类型占比图表
    renderMsgContentTypeChart () {
      iopMsgStatisticsService.getMsgContentTypeData()
        .then(x => {
          x.data.map(item => {
            // 计算随机颜色
            item.color = this.getColorRandom()
            item.__id = idSeed.newId()
          })
          this.state.msgContentTypeList = x.data
          x.data.map(item => {
            this.state.msgContentCount += item.value
          })
        })
    },
    // 发送成功率图表
    renderSendSuccessPer () {
      iopMsgStatisticsService.getSendSuccess()
        .then(x => {
          let successItem = null
          let total = 0
          x.data.map(item => {
            if (item.name === Define.SENDMESSAGECODE.SUCCESS) {
              item.name = '成功率'
              successItem = item
            }
            total += item.value
          })
          const chart = new MsgSendSuccessPer({
            el: document.getElementById('sendSuccessChart'),
            data: [successItem],
            total: total
          })
          chart.render()
        })
    },
    // 获取消息发送状态
    getMsgSecNum () {
      if (!this.searchModel.date || !this.searchModel.timeInterval) {
        this.$message.error('请先选择日期和时间间隔')
        return
      }
      this.state.msgSecChartLoaded = false
      iopMsgStatisticsService.getMsgSecNum({
        date: dateTool.date(this.searchModel.date),
        timeInterval: this.searchModel.timeInterval
      })
        .then(x => {
          this.state.msgSendStatusSuccessNum = x.msgSuccessSum
          this.state.msgSendStatusErrorNum = x.msgErrorSum
          this.state.msgSecChartLoaded = true
          const chart = new MsgSendStatus({
            successData: x.msgSuccess,
            errorData: x.msgError,
            el: document.getElementById('msgSendStatus')
          })
          chart.render()
        })
    }
  }
}
</script>
<style scoped>
  .sendStatus >>> .ant-form-inline .ant-form-item {
    width: 100%;
    display: flex;
  }
  .sendStatus >>> .ant-form-inline .ant-form-item .ant-form-item-control-wrapper {
    flex:1
  }
  .sendStatus >>> .ant-form-item-children {
    width:100%
  }
  .sendStatus >>> .ant-form-item-children .ant-calendar-picker {
    width: 100%;
  }
</style>
<style lang="less" scoped>
  .flex {
    display:flex!important;
  }
  .flexBetween {
    justify-content: space-between;
  }
  .flexWrap {
    flex-wrap: wrap;
  }
</style>
