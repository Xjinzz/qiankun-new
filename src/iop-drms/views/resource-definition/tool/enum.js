// 指数
const INDICATOR = [
  {
    code: 'count',
    value: '个数',
    type: ['1', '2', '3']
  },
  {
    code: 'max',
    value: '最大值',
    type: ['2']
  },
  {
    code: 'min',
    value: '最小值',
    type: ['2']
  },
  {
    code: 'avg',
    value: '平均值',
    type: ['2']
  },
  {
    code: 'sum',
    value: '求和',
    type: ['2']
  },
  {
    code: 'stddevpop',
    value: '标准差',
    type: ['2']
  }
]
// 主题
const THEME = [
  {
    code: 'drak',
    value: 'drak'
  },
  {
    code: 'infographic',
    value: 'infographic'
  },
  {
    code: 'maccarons',
    value: 'maccarons'
  },
  {
    code: 'roma',
    value: 'roma'
  },
  {
    code: 'shine',
    value: 'shine'
  },
  {
    code: 'vintage',
    value: 'vintage'
  }
]
const CHARTTYPELIST = [
  {
    code: 'line',
    value: '折线图'
  },
  {
    code: 'bar',
    value: '柱状图'
  },
  {
    code: 'pie',
    value: '饼状图'
  },
  {
    code: 'stack',
    value: '堆积图'
  }
]
const TIMEUNIT = [
  {
    code: '%Y-%m-%d %H:%M:%S',
    value: '秒'
  },
  {
    code: '%Y-%m-%d %H:%M',
    value: '分'
  },
  {
    code: '%Y-%m-%d %H',
    value: '时'
  },
  {
    code: '%Y-%m-%d',
    value: '天'
  },
  {
    code: '%Y-%m',
    value: '月'
  },
  {
    code: '%Y',
    value: '年'
  }
]
export default {
  INDICATOR,
  THEME,
  CHARTTYPELIST,
  TIMEUNIT
}
