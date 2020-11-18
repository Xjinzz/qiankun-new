<template>
  <div style="height:100%;width:100%;padding-left:20px">
    <div id="myChart" :style="{ width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
// 引入 echarts
import echarts from 'echarts'
export default {
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    legData: {
      type: Array,
      required: false,
      default: () => {}
    },
    serData: {
      type: Array,
      required: false,
      default: () => {}
    }
  },
  methods: {
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
          data: this.legData
          // ['主体', '主体信息', '违法线索', '案件', '客体', '检查任务']
        },
        series: [
          {
            name: this.title,
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
            data: this.serData,
            center: ['60%', '50%']
          }
        ]
      })
    }
  },
  watch: {
    'legData': function (newVal) {
      this.drawLine()
    }
  }
}
</script>
