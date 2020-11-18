<template>
  <div :id="chartId" style="width:100%;"></div>
</template>
<script>
import _idSeed from '../tool/idSeed'
import { iopMsgStatisticsService } from '@/iop/service/index'
import echarts from 'echarts'
import { arrayTool, mathTool } from 'mwutil'
import Define from '../tool/define'
export default {
  props: {
    contType: {
      type: String,
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
    this.getData()
  },
  methods: {
    getData () {
      iopMsgStatisticsService.getMsgTypeData({
        contType: this.contType
      })
        .then(x => {
          let count = 0
          x.data.map(item => {
            count += item.value
          })
          const Options = {
            grid: false,
            xAxis: [
              {
                type: 'category',
                data: arrayTool.getSimpleValuesByField(x.data, 'name'),
                nameGap: 50,
                axisLabel: {
                  interval: 0
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                show: false,
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: '数据',
                type: Define.CHARTTYPE.BAR,
                barWidth: '30%',
                label: {
                  show: true,
                  position: 'top',
                  distance: 6,
                  formatter: (item) => {
                    return mathTool.mul(parseFloat((mathTool.div(item.value, count))), 100).toFixed(2) + '%'
                  }
                },
                itemStyle: {
                  normal: {
                    color: this.color
                  },
                  emphasis: {
                    color: this.color
                  }
                },
                data: arrayTool.getSimpleValuesByField(x.data, 'value')
              }
            ]
          }
          const chart = echarts.init(document.getElementById(this.chartId))
          chart.setOption(Options)
        })
    }
  }
}
</script>
