<template>
  <div style="height:100%;width:100%;margin-left:15px">
    <div id="dataBar" :style="{width: '650px', height: '340px'}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import echartsTheme from 'ant-design-vue-echart-theme'
import portals from '@/iop-drms/service/server/portal'
echarts.registerTheme('light', echartsTheme)
export default {
  data () {
    return {
      xData: [],
      dataSer: [],
      title: ''
    }
  },
  methods: {
    getData () {
      portals.dataBar().then((res) => {
        this.title = res.title
        this.xData = res.name
        res.data.map((item) => {
          this.dataSer.push(item.value)
        })
        this.drawLine()
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('dataBar'), 'light')
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        title: { text: this.title },
        xAxis: {
          type: 'category',
          data: this.xData,
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        grid: {
          left: '15%'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.dataSer,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
