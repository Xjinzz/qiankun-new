import echarts from 'echarts'
import { arrayTool } from 'mwutil'
import Define from './define'
export default class MsgSendSuccessPer {
  constructor (options) {
    this.$el = options.el
    this.$chart = echarts.init(this.$el)
    this.$success = options.successData
    this.$error = options.errorData
    this.$title = options.title
  }
  render () {
    const options = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: arrayTool.getSimpleValuesByField(this.$success, 'name')
      },
      axisLabel: {
        interval: 0
      },
      legend: {
        data: [Define.SENDMESSAGETEXT.SUCCESS, Define.SENDMESSAGETEXT.ERROR],
        right: 0,
        icon: 'circle'
      },
      yAxis: {
        type: 'value'
      },
      color: [Define.MAINPRIMARYCOLOR, '#F4D358'],
      series: [
        {
          name: Define.SENDMESSAGETEXT.SUCCESS,
          type: Define.CHARTTYPE.LINE,
          stack: Define.SENDMESSAGETEXT.SUCCESS,
          data: arrayTool.getSimpleValuesByField(this.$success, 'value')
        },
        {
          name: Define.SENDMESSAGETEXT.ERROR,
          type: Define.CHARTTYPE.LINE,
          stack: Define.SENDMESSAGETEXT.ERROR,
          data: arrayTool.getSimpleValuesByField(this.$error, 'value')
        }
      ]
    }
    this.$chart.setOption(options)
  }
}
