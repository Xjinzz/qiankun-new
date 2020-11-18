export default {
  ROUTEMARK: '',
  SHOWMORENUM: 8,
  // 修改页面类型
  MODE: {
    CREATE: 'create',
    EDIT: 'edit',
    DETAIL: 'detail',
    SEARCH: 'search'
  },
  // tablebutton
  TABLEBUTTON: {
    CREATE: 'create',
    VIEW: 'view',
    REMOVESELECTED: 'removeSelected',
    SUBMIT: 'submit',
    EDIT: 'edit',
    REMOVE: 'remove',
    ANALYZE: 'analyze',
    GRAPHBTN: 'relation'
  },
  // 组件类型
  COMPTYPE: {
    INPUTNUMBER: '0',
    INPUT: '1',
    PASSWORD: '2',
    DATETIME: '3',
    DATE: '8',
    TEXTAREA: '5',
    SELECTDICT: '7',
    SELECTTREE: '9',
    // 前端根据页面自定义的
    DATEGROUP: '3360',
    DATETIMEGROUP: '3361'
  },
  // 页面url
  PAGEURL: {
    SAVE: 'resource-definition/save/', // 表单页面
    SEARCH: 'resource-definition/search/1589003874941', // search页面
    RELATION: 'resource-definition/relation/', // 关联页面
    VIEW: 'resource-definition/view/', // 查看页面
    RELATIONVERTICAL: 'resource-definition/relationVertical/', // 关联页面竖
    ANALYSIS: 'resource-definition/analysis/'
  },
  // 布局类型，0列表 1树+列表
  LAYOUTTYPE: {
    LIST: '0',
    TREE: '1'
  },
  // 判断一对多（2）、一对一（1）
  RELATIONTYPE: {
    INFO: '1',
    LIST: '2'
  },
  // 关联资源布局，1:竖排显示，2.横向标签，3.竖向标签
  RELATIONLAYOUT: {
    COLUMN: '1',
    TABROW: '2',
    TABCOLUMN: '3'
  },
  // 表格fixed
  FIXED: {
    LEFT: 'left',
    RIGHT: 'right'
  },
  // 图表类型
  CHARTTYPE: {
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    // 堆积图
    STACK: 'stack'
  },
  // 图表切换的options是否禁用
  CHARTTYPEDISABLE: {
    OFF: 'off',
    ON: 'on',
    NORMAL: 'normal'
  },
  DEMITIONTYPE: {
    TIME: '3',
    NORMAL: '1'
  }
}
