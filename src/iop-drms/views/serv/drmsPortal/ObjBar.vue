<template>
  <div style="height:100%;width:100%;margin-left:15px">
    <div id="objBar" :style="{width: '650px', height: '340px'}"></div>
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
      datasets: [],
      title: ''
    }
  },
  methods: {
    getData () {
      portals.objBar().then((res) => {
        this.title = res.title
        const dataset = [['product']]
        res.legend.map((item) => {
          dataset[0].push(item)
        })
        res.xaxis.map((item, key) => {
          dataset[key + 1] = [item]
        })
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].value.length; j++) {
            dataset[j + 1].push(res.data[i].value[j])
          }
        }
        this.datasets = dataset
        this.drawLine()
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('objBar'), 'light')
      // 绘制图表
      myChart.setOption({
        title: { text: this.title },
        legend: {},
        tooltip: {},
        dataset: {
          source: this.datasets
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {},
        series: [
          {
            type: 'bar'
          },
          {
            type: 'bar'
          }
        ]
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
