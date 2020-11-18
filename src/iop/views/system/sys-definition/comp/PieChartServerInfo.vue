<template>
  <div ref="chart"></div>
</template>
<script>
import Echarts from 'echarts'
import { mathTool } from 'mwutil'

export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      instance: null
    }
  },
  mounted () {
    this.instance = Echarts.init(this.$refs.chart)
  },
  methods: {
    draw (value) {
      this.instance.setOption({
        title: {
          text: this.title,
          textStyle: {
            color: '#000',
            fontWeight: 400,
            fontSize: 16
          },
          bottom: 0,
          left: 0
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '30%',
          style: {
            text: `${value}%`,
            textAlign: 'center',
            fill: this.color,
            fontSize: 18
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '55%'],
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            startAngle: -90,
            top: -35,
            data: [
              {
                value: `${value}`,
                itemStyle: {
                  color: this.color
                }
              },
              {
                value: `${mathTool.sub(100, Number(value))}`,
                itemStyle: {
                  normal: {
                    color: '#efefef'
                  },
                  emphasis: {
                    color: '#efefef'
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
