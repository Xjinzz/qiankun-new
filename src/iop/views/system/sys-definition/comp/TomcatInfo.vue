<template>
  <div>
    <a-row class="flex">
      <div class="content" style="width:30%">
        <p class="title">session数</p>
        <div ref="sessionNum" style="width:100%;height:238px;"></div>
      </div>
      <div class="content flex-auto-width">
        <p class="title">活跃session数</p>
        <div ref="activeSessionNum" style="width:100%;height:238px;"></div>
      </div>
    </a-row>
    <a-row class="flex">
      <div class="content" style="width:30%">
        <p class="title">request请求</p>
        <div style="width:100%;height:238px;">
          <a-row class="flex" style="margin-top:28px">
            <p class="requestTitle">
              发送的字节数
            </p>
            <p class="requestValue flex-auto-width">
              {{ entity.sent.value | sliceStr }}<span>{{ entity.sent.unit }}</span>
            </p>
          </a-row>
          <a-row class="flex" style="margin-top:28px">
            <p class="requestTitle">
              request请求最长耗时
            </p>
            <p class="requestValue flex-auto-width">
              {{ entity.max.value | sliceStr }}<span>{{ entity.max.unit }}</span>
            </p>
          </a-row>
          <a-row class="flex" style="margin-top:28px">
            <p class="requestTitle">
              全局request请求次数
            </p>
            <p class="requestValue flex-auto-width">
              {{ entity.count.value | sliceStr }}<span>{{ entity.count.unit }}</span>
            </p>
          </a-row>
          <a-row class="flex" style="margin-top:28px">
            <p class="requestTitle">
              全局request请求总耗时
            </p>
            <p class="requestValue flex-auto-width">
              {{ entity.total.value | sliceStr }}<span>{{ entity.total.unit }}</span>
            </p>
          </a-row>
        </div>
      </div>
      <div class="content flex-auto-width">
        <p class="title">线程数</p>
        <p style="text-align:right;font-size:14px;color:#333">
          最大线程：{{ entity.threadsMax }}个
        </p>
        <div ref="threads" style="width:100%;height:238px;"></div>
      </div>
    </a-row>
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import Echarts from 'echarts'
import Define from '../enum'
import { arrayTool, objectTool } from 'mwutil'
const Entity = {
  count: 0,
  max: 0,
  total: 0,
  sent: 0,
  threadsMax: 0
}
export default {
  props: {
    value: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      chartList: {
        sessionNum: null,
        activeSessionNum: null,
        threads: null
      },
      entity: objectTool.deepClone(Entity),
      timer: null
    }
  },
  mounted () {
    this.$on('hook:beforeDestroy', () => {
      this.endLoop()
    })
    this.chartList['sessionNum'] = Echarts.init(this.$refs.sessionNum)
    this.chartList['activeSessionNum'] = Echarts.init(this.$refs.activeSessionNum)
    this.chartList['threads'] = Echarts.init(this.$refs.threads)
    this.chartList['sessionNum'].showLoading()
    this.chartList['activeSessionNum'].showLoading()
    this.chartList['threads'].showLoading()
  },
  filters: {
    sliceStr (str) {
      return String(str).length < 8 ? str : (String(str).substring(0, 8) + '...')
    }
  },
  methods: {
    startLoop () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.getInfo()
      this.timer = setTimeout(() => {
        this.startLoop()
      }, 1000)
    },
    endLoop () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      Service.cleanState()
      this.entity = objectTool.deepClone(Entity)
    },
    drawSessionNum (data) {
      this.chartList['sessionNum'].hideLoading()
      this.chartList['sessionNum'].setOption({
        xAxis: {
          type: 'category',
          data: ['已过期', '已创建', '已拒绝'],
          boundaryGap: 0,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#333',
            fontSize: 14
          },
          nameGap: 12
        },
        yAxis: {
          type: 'value',
          show: false,
          boundaryGap: false
        },
        grid: {
          top: 50,
          left: 30,
          bottom: 30,
          right: 30
        },
        series: [{
          itemStyle: {
            barBorderRadius: [5, 5, 0, 0]
          },
          data: [
            {
              value: data.expir,
              name: '已过期',
              itemStyle: {
                color: new Echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#0edfec' },
                    { offset: 1, color: '#23bdc6' }
                  ]
                )
              }
            },
            {
              value: data.create,
              name: '已创建',
              itemStyle: {
                color: new Echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#ff9228' },
                    { offset: 1, color: '#ffa045' }
                  ]
                )
              }
            },
            {
              value: data.reject,
              name: '已拒绝',
              itemStyle: {
                color: new Echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#1baafd' },
                    { offset: 1, color: '#04a9e4' }
                  ]
                )
              }
            }
          ],
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            color: 'auto'
          },
          barWidth: 40,
          showBackground: false
        }]
      })
    },
    drawActiveSessionNum (data) {
      this.chartList['activeSessionNum'].hideLoading()
      const currentData = arrayTool.getSimpleValuesByField(data.current, 'value')
      const maxData = arrayTool.getSimpleValuesByField(data.max, 'value')
      this.chartList['activeSessionNum'].setOption({
        animation: false,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: arrayTool.getSimpleValuesByField(data.current, 'timer')
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: 50,
          left: 30,
          bottom: 30,
          right: 30
        },
        legend: {
          right: 0,
          selectedMode: false
        },
        series: [{
          name: '活跃峰值：' + maxData[maxData.length - 1],
          data: maxData,
          type: 'line',
          // 设置平滑
          // smooth: 0.5,
          areaStyle: {
            color: 'rgb(30,159,255,0.1)'
          },
          itemStyle: {
            borderColor: '#0293fb',
            color: '#0293fb'
          }
        }, {
          name: '当前活跃数：' + currentData[currentData.length - 1],
          data: currentData,
          type: 'line',
          areaStyle: {
            color: 'rgb(253,174,48,0.1)'
          },
          itemStyle: {
            color: '#feb031',
            borderColor: '#feb031'
          }
        }]
      })
    },
    drawThreads (data) {
      this.chartList['threads'].hideLoading()
      const currentData = arrayTool.getSimpleValuesByField(data.current, 'value')
      this.chartList['threads'].setOption({
        animation: false,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: arrayTool.getSimpleValuesByField(data.current, 'timer')
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: 30,
          left: 30,
          bottom: 30,
          right: 30
        },
        series: [{
          data: currentData,
          type: 'line',
          areaStyle: {
            color: 'rgb(253,174,48,0.1)'
          },
          itemStyle: {
            color: '#feb031',
            borderColor: '#feb031'
          }
        }]
      })
    },
    setEntity (state) {
      this.entity.count = state.count || this.entity.count
      this.entity.max = state.max || this.entity.max
      this.entity.total = state.total || this.entity.total
      this.entity.sent = state.sent || this.entity.sent
      this.entity.threadsMax = state.threadsMax || this.entity.threadsMax
    },
    getInfo () {
      Service.getTomcatInfo(this.value)
        .then(x => {
          this.drawSessionNum({
            create: x[Define.MonitorModal.TOMCAT.ACTIVECREATE],
            expir: x[Define.MonitorModal.TOMCAT.ACTIVEEXPIRED],
            reject: x[Define.MonitorModal.TOMCAT.ACTIVEREJECT]
          })
          this.drawActiveSessionNum({
            current: x[Define.MonitorModal.TOMCAT.ACTIVECURRENT],
            max: x[Define.MonitorModal.TOMCAT.ACTIVEMAX]
          })
          this.drawThreads({
            current: x[Define.MonitorModal.TOMCAT.CURRENT]
          })
          this.setEntity({
            count: x[Define.MonitorModal.TOMCAT.REQCOUNT],
            max: x[Define.MonitorModal.TOMCAT.REQMAX],
            total: x[Define.MonitorModal.TOMCAT.REQTOTAL],
            sent: x[Define.MonitorModal.TOMCAT.SENT],
            threadsMax: x[Define.MonitorModal.TOMCAT.CONFIGMAX]
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
p {
  margin-bottom: 0;
}
.flex{
  display: flex;
}
.alignEnd {
  align-items: center
}
.flex-wrap{
  flex-wrap: wrap;
}
.flex-speen {
  justify-content: start;
}
.flex-auto-width{
  flex:1
}
.context{
  text-align:left;
}
.title {
  font-size: 16px;
  line-height:25px;
}
.requestTitle {
  margin-top: 10px;
  font-size:14px;
  color: #333;
}
.requestValue {
  font-size:22px;
  height: 22px;
  color:#000;
  font-weight: 800;
  text-align: right;
  span {
    margin-left:10px;
    font-size: 14px;
    color: #666;
    font-weight:400;
    height: 22px;
  }
}
</style>
