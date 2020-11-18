<template>
  <div style="height:500px;width:500px;margin:0 auto">
    <div id="myChart" :style="{ width: '500px', height: '500px'}"></div>
  </div>
</template>
<script>
// 引入 echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      chartData: {}
    }
  },
  methods: {
    show (data) {
      this.chartData = data
      this.drawLine()
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'), 'light')
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['已用空间(MB)', '未用空间(MB)']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.chartData,
            center: ['60%', '50%']
          }
        ]
      })
    }
  }
}
</script>
