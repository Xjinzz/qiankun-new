<template>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'StatisticsCharts',
  props: {
    statisticsData: {
      type: Object,
      required: true,
      default: null
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          zlevel: 0,
          text: [
            '{name|总容量}',
            '{value|' + this.statisticsData.totalCapacity + '}'
          ].join('\n'),
          top: 'center',
          left: '48%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 30,
                fontWeight: 'bold',
                lineHeight: 60
              },
              name: {
                color: '#909399',
                lineHeight: 20
              }
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['已用', '未用']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['55%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                formatter: '{b} : {c} ({d}%)'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.statisticsData.usedSpace, name: '已用' },
              { value: this.statisticsData.remainSpace, name: '未用' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
              },
              normal: {
                color: function (params) {
                  // 自定义颜色
                  var colorList = [
                    '#00FF00', '#0000ff'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style>
</style>
