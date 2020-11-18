import echarts from 'echarts'
import { arrayTool, mathTool } from 'mwutil'
import Define from './define'
export default class MsgTypeChart {
  constructor (options) {
    this.$el = options.el
    this.$chart = echarts.init(this.$el)
    this.total = options.num
    this.title = options.title
    this.$data = options.data
  }
  getItemByName (name) {
    return this.$data.filter(item => item.name === name)[0]
  }
  render () {
    const options = {
      title: {
        zlevel: 0,
        text: [
          '{name|' + this.title + '}',
          '{value|' + this.total + '}'
        ].join('\n'),
        top: 'center',
        left: '35%',
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
      legend: {
        orient: 'vertical',
        x: '75%',
        data: arrayTool.getSimpleValuesByField(this.$data, 'name'),
        itemGap: 30,
        top: 'middle',
        align: 'left',
        icon: 'circle',
        formatter: (name) => {
          const item = this.getItemByName(name)
          return item['name'] + ' ' + '| ' + mathTool.mul(parseFloat((mathTool.div(item['value'], this.total))), 100).toFixed(2) + '%'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '70%'],
          center: ['35%', '50%'],
          stillShowZeroSum: false,
          avoidLabelOverlap: false,
          hoverAnimation: false,
          zlevel: 1,
          itemStyle: {
            borderWidth: 5, // 设置border的宽度有多大（间隙）
            borderColor: '#fff'
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          data: this.$data
        }
      ],
      color: [Define.MAINPRIMARYCOLOR, '#F42850', '#F6A93B', '#7ED321', '#282828']
    }
    this.$chart.setOption(options)
  }
}
