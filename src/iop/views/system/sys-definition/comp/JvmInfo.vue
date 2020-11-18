<template>
  <div>
    <a-row class="flex">
      <div class="content" style="position:relative">
        <p class="title">内存大小</p>
        <div ref="memary" style="width:200px;height:238px;"></div>
        <div style="position:absolute;bottom:0;width:100%">
          <div class="flex">
            <p><span class="lengedIcon" style="background:#0293fb"></span>可用</p>
            <p class="flex-auto-width tr">{{ entity.commit.value }}{{ entity.commit.unit }}</p>
          </div>
          <div class="flex">
            <p><span class="lengedIcon" style="background: #feb031"></span>已用</p>
            <p class="flex-auto-width tr">{{ entity.used.value }}{{ entity.used.unit }}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="title">缓存情况</p>
        <div class="flex" style="width:400px;height:238px;">
          <div ref="bufferUsed" style="width:200px;height:238px"></div>
          <div ref="bufferCount" style="width:200px;height:238px"></div>
        </div>
      </div>
      <div class="content flex-auto-width">
        <p class="title">线程数量（个）</p>
        <div ref="thread" style="width:100%;height:238px"></div>
      </div>
    </a-row>
    <a-row class="flex">
      <div class="content">
        <p class="title">class数量</p>
        <div style="width:200px;height:238px;">
          <div class="classBox">
            <p class="classTitle">已加载</p>
            <p class="classContext" style="color:#0293fb">
              {{ entity.classLoaded }}
              <span>个</span>
            </p>
          </div>
          <div class="classBox">
            <p class="classTitle">未加载</p>
            <p class="classContext" style="color:#feb031">
              {{ entity.classUnLoaded }}
              <span>个</span>
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="title">内存空间大小</p>
        <div style="width:400px;height:238px;">
          <div class="flex" style="margin-top: 10px">
            <p class="gctitle">GC时，年轻代分配的内存空间</p>
            <p class="gcvalue flex-auto-width">{{ entity.allocated }}</p>
          </div>
          <div class="flex">
            <p class="gctitle">GC时，老年代分配的内存空间</p>
            <p class="gcvalue flex-auto-width">{{ entity.promoted }}</p>
          </div>
          <div class="flex">
            <p class="gctitle">GC时，老年代的最大内存空间</p>
            <p class="gcvalue flex-auto-width">{{ entity.gcSize }}</p>
          </div>
          <div class="flex">
            <p class="gctitle">FullGc时，老年代的内存空间</p>
            <p class="gcvalue flex-auto-width">{{ entity.fullGcSize }}</p>
          </div>
        </div>
      </div>
      <div class="content flex-auto-width">
        <p class="title">系统启动以来GC情况</p>
        <div class="gcContine" style="width:100%;height:238px;">
          <div class="gcBox">
            <div class="gcCircle gcback1">
              {{ entity.gcCount }}
            </div>
            <p class="lastGcTitle">
              GC次数
            </p>
          </div>
          <div class="gcBox">
            <div class="gcCircle gcback2">
              {{ entity.gcTotal }}
            </div>
            <p class="lastGcTitle">
              GC总耗时
            </p>
          </div>
        </div>
      </div>
    </a-row>
  </div>
</template>
<script>
import { objectTool, arrayTool } from 'mwutil'
import Service from '@/iop/service/system/sys-definition'
import Echarts from 'echarts'
import Define from '../enum'
const dealSizeUnit = (sizeUnit) => {
  const sizeMap = {
    [Define.MonitorModal.JVM.SIZEUNIT.KB]: 1,
    [Define.MonitorModal.JVM.SIZEUNIT.MB]: 1 * 1024,
    [Define.MonitorModal.JVM.SIZEUNIT.GB]: 1 * 1024 * 1024
  }
  return sizeMap[sizeUnit.toString().toUpperCase()]
}
const Entity = {
  commit: 0,
  used: 0,
  classLoaded: 0,
  classUnLoaded: 0,
  fullGcSize: 0,
  gcSize: 0,
  promoted: 0,
  allocated: 0,
  gcCount: 0,
  gcTotal: 0
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
      timer: null,
      entity: objectTool.deepClone(Entity),
      chartList: {
        memary: null,
        bufferUsed: null,
        bufferCount: null,
        thread: null
      }
    }
  },
  mounted () {
    this.chartList['memary'] = Echarts.init(this.$refs.memary)
    this.chartList['bufferUsed'] = Echarts.init(this.$refs.bufferUsed)
    this.chartList['bufferCount'] = Echarts.init(this.$refs.bufferCount)
    this.chartList['thread'] = Echarts.init(this.$refs.thread)
    this.chartList['memary'].showLoading()
    this.chartList['bufferUsed'].showLoading()
    this.chartList['bufferCount'].showLoading()
    this.chartList['thread'].showLoading()
    this.$on('hook:beforeDestroy', () => {
      this.endLoop()
    })
  },
  methods: {
    setEntity (data) {
      this.entity.commit = data.commit || this.entity.commit
      this.entity.used = data.used || this.entity.used
      this.entity.classLoaded = data.classLoaded || this.entity.classLoaded
      this.entity.classUnLoaded = data.classUnLoaded || this.entity.classUnLoaded
      this.entity.fullGcSize = data.fullGcSize || this.entity.fullGcSize
      this.entity.gcSize = data.gcSize || this.entity.gcSize
      this.entity.promoted = data.promoted || this.entity.promoted
      this.entity.allocated = data.allocated || this.entity.allocated
      this.entity.gcCount = data.gcCount || this.entity.gcCount
      this.entity.gcTotal = data.gcTotal || this.entity.gcTotal
    },
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
      this.entity = objectTool.deepClone(Entity)
    },
    drawBufferPie (option) {
      const { name, data, color, text } = option
      this.chartList[name].hideLoading()
      this.chartList[name].setOption({
        title: {
          text: data.value,
          x: 'center',
          y: '38%'
        },
        graphic: {
          type: 'text',
          left: 'center',
          bottom: '0%',
          style: {
            text: `${text}(${data.unit})`,
            textAlign: 'center',
            fontSize: 18
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '70%'],
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            startAngle: -90,
            top: -35,
            label: {
              show: false,
              position: 'center'
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color
                }
              }
            ]
          }
        ]
      })
    },
    drawMemary (data) {
      const maxUnitParam = dealSizeUnit(data.max.unit)
      const commitUnitParam = dealSizeUnit(data.commit.unit)
      const usedUnitParam = dealSizeUnit(data.used.unit)
      const maxData = data.max.value * maxUnitParam
      const commitData = data.commit.value * commitUnitParam
      const usedData = data.used.value * usedUnitParam
      this.chartList['memary'].hideLoading()
      this.chartList['memary'].setOption({
        title: {
          text: [
            '{a|最大内存}',
            `{b|${data.max.value}${data.max.unit}}`
          ].join('\n'),
          x: 'center',
          y: '30%',
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                lineHeight: 30
              },
              b: {
                fontSize: 16,
                lineHeight: 18,
                fontWeight: 600
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '70%'],
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            startAngle: -90,
            top: -35,
            label: {
              show: false,
              position: 'center'
            },
            data: [
              {
                name: '可用',
                value: `${commitData}`,
                itemStyle: {
                  color: '#0293fb'
                }
              },
              {
                name: '已用',
                value: `${usedData}`,
                itemStyle: {
                  color: '#feb031'
                }
              },
              {
                name: '最大值',
                value: `${maxData - usedData - commitData}`,
                itemStyle: {
                  normal: {
                    color: '#f2f2f2'
                  },
                  emphasis: {
                    color: '#f2f2f2'
                  }
                }
              }
            ]
          }
        ]
      })
    },
    drawThread (data) {
      this.chartList['thread'].hideLoading()
      const daemonData = arrayTool.getSimpleValuesByField(data.daemon, 'value')
      const liveData = arrayTool.getSimpleValuesByField(data.live, 'value')
      this.chartList['thread'].setOption({
        animation: false,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: arrayTool.getSimpleValuesByField(data.daemon, 'timer')
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
          left: 50,
          selectedMode: false
        },
        graphic: {
          type: 'text',
          right: 20,
          top: 3,
          style: {
            text: '峰值：' + data.max,
            textAlign: 'center',
            fontSize: 14
          }
        },
        series: [{
          name: '当前活跃线程',
          data: liveData,
          type: 'line',
          // 设置平滑
          // smooth: 0.5,
          itemStyle: {
            borderColor: '#0293fb',
            color: '#0293fb'
          }
        }, {
          name: '守护线程',
          data: daemonData,
          type: 'line',
          itemStyle: {
            color: '#feb031',
            borderColor: '#feb031'
          }
        }]
      })
    },
    getInfo () {
      Service.getJvmInfo(this.value)
        .then(x => {
          this.drawMemary({
            max: x[Define.MonitorModal.JVM.MEMORYMAX],
            commit: x[Define.MonitorModal.JVM.MEMORYCOMMIT],
            used: x[Define.MonitorModal.JVM.MEMORYUSED]
          })
          this.drawBufferPie({
            name: 'bufferUsed',
            color: '#0293fb',
            text: '缓存区已用内存\n ',
            data: x[Define.MonitorModal.JVM.BUFFERUSED]
          })
          this.drawBufferPie({
            name: 'bufferCount',
            color: '#feb031',
            text: '当前缓冲区数量\n ',
            data: x[Define.MonitorModal.JVM.BUFFERCOUNT]
          })
          this.drawThread({
            live: x[Define.MonitorModal.JVM.THREADSLIVE],
            daemon: x[Define.MonitorModal.JVM.THREADSDAEMON],
            max: x[Define.MonitorModal.JVM.THREADSPEAK]
          })
          this.setEntity({
            commit: x[Define.MonitorModal.JVM.MEMORYCOMMIT],
            used: x[Define.MonitorModal.JVM.MEMORYUSED],
            classLoaded: x[Define.MonitorModal.JVM.CLASSESLOADED],
            classUnLoaded: x[Define.MonitorModal.JVM.CLASSESUNLOADED],
            fullGcSize: x[Define.MonitorModal.JVM.FULLGCSIZE],
            gcSize: x[Define.MonitorModal.JVM.GCMAX],
            promoted: x[Define.MonitorModal.JVM.GCPROMOTED],
            allocated: x[Define.MonitorModal.JVM.GCALLOCATED],
            gcCount: x[Define.MonitorModal.JVM.GCCOUNT],
            gcTotal: x[Define.MonitorModal.JVM.GCTOTAL]
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
.tr {
  text-align: right;
}
.lengedIcon {
  display:inline-block;
  width:10px;
  height:10px;
  margin-right:10px;
}
.classBox {
  width: 188px;
  height: 75px;
  padding-left:18px;
  padding-top:15px;
  margin: 0 auto;
  margin-top:20px;
  background:#f6f6f6;
  .classTitle {
    font-size:14px;
  }
  .classContext {
    font-size: 20px;
    span {
      font-size:14px;
      color: #000;
      margin-left:10px
    }
  }
}
.gctitle {
  font-size: 14px;
  line-height: 50px;
}
.gcvalue {
  line-height: 50px;
  font-size: 14px;
  color: #0293fb;
  text-align: right;
}
.gcContine {
  display:flex;
  justify-self: space-around;
  .gcBox {
    width:45%;
    height:100%;
    .lastGcTitle {
      font-size:16px;
      text-align:center;
    }
    .gcCircle {
      width: 110px;
      height: 110px;
      margin: 30px auto;
      text-align: center;
      line-height: 110px;
      &.gcback1 {
        background:url(~@/assets/resource-definition/blue.png);
        background-size:100% 100%;
      }
      &.gcback2 {
        background:url(~@/assets/resource-definition/orange.png);
        background-size:100% 100%;
      }
    }
  }
}
</style>
