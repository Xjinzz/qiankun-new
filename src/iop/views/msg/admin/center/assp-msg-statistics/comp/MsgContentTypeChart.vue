<template>
  <div :id="chartId" style="width:100%;"></div>
</template>
<script>
import _idSeed from '../tool/idSeed'
import echarts from 'echarts'
import { mathTool } from 'mwutil'
import Define from '../tool/define'
export default {
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      chartId: _idSeed.newId()
    }
  },
  mounted () {
    const Options = {
      title: {
        zlevel: 0,
        text: [
          '{name|' + this.dataSource.name + '}',
          '{value|' + mathTool.mul(parseFloat((mathTool.div(this.dataSource.value, this.count))), 100).toFixed(2) + '%}'
        ].join('\n'),
        top: 'center',
        left: '50%',
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
      tooltip: { // 悬停指示
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          type: Define.CHARTTYPE.PIE,
          radius: ['85%', '100%'],
          center: ['50%', '50%'],
          hoverAnimation: false,
          stillShowZeroSum: false,
          avoidLabelOverlap: false,
          zlevel: 1,
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              ...this.dataSource,
              itemStyle: {
                normal: {
                  color: this.color
                },
                emphasis: {
                  color: this.color
                }
              }
            },
            {
              name: '',
              value: this.count - this.dataSource.value,
              itemStyle: {
                normal: {
                  color: Define.MAINCANCELCOLOR
                },
                emphasis: {
                  color: Define.MAINCANCELCOLOR
                }
              }
            }
          ]
        }
      ]
    }
    const chart = echarts.init(document.getElementById(this.chartId))
    chart.setOption(Options)
  }
}
</script>
