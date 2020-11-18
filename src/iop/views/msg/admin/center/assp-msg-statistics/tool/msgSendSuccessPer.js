import echarts from 'echarts'
import { mathTool } from 'mwutil'
import Define from './define'
export default class MsgSendSuccessPer {
  constructor (options) {
    this.$el = options.el
    this.$chart = echarts.init(this.$el)
    this.$data = options.data
    this.total = options.total
    this.$data[0].value = mathTool.mul(parseFloat((mathTool.div(this.$data[0].value, this.total))).toFixed(2), 100).toFixed(0)
  }
  render () {
    const options = {
      series: [
        {
          type: Define.CHARTTYPE.GOUGE,
          title: {
            offsetCenter: ['-1.5%', '50%'],
            color: '#ccc'
          },
          detail: {
            formatter: '{value}%',
            textStyle: {
              fontWeight: 'bolder',
              color: '#333'
            },
            offsetCenter: ['0%', '70%']
          },
          axisTick: {
            show: false
          },
          splitNumber: 10,
          axisLabel: {
            fontWeight: 'bolder',
            min: 0,
            max: 100,
            color: '#333',
            shadowColor: '#333',
            formatter: function (v) {
              switch (v + '') {
                case '20' : return '差'
                case '40' : return '中'
                case '60' : return '良'
                case '80' : return '优'
              }
            }
          },
          splitLine: {
            show: true,
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLine: {
            lineStyle: {
              color: [
                ['0.' + this.$data[0].value, Define.MAINPRIMARYCOLOR], [1, Define.MAINCANCELCOLOR]
              ],
              width: 10
            }
          },
          data: this.$data
        }
      ]
    }
    this.$chart.setOption(options)
  }
}
