// 节点类型
const sysType = [
  {
    key: '1',
    val: '系统'
  },
  {
    key: '0',
    val: '组件'
  },
  {
    key: '9',
    val: '分组'
  }
]
// 菜单
const menusList = [
  {
    key: '0',
    val: '单位管理',
    roleKey: ['1']
  },
  {
    key: '0',
    val: '用户管理',
    roleKey: ['1']
  },
  {
    key: '0',
    val: '角色管理',
    roleKey: ['2']
  },
  {
    key: '0',
    val: '菜单管理',
    roleKey: ['1']
  },
  {
    key: '3',
    val: '用户授权',
    roleKey: ['2']
  },
  {
    key: '4',
    val: '审计管理',
    roleKey: ['3']
  },
  {
    key: '5',
    val: '审计日志',
    roleKey: ['3']
  },
  {
    key: '6',
    val: '在线用户',
    roleKey: ['1']
  },
  {
    key: '7',
    val: '个人设置',
    roleKey: ['1', '2', '3']
  },
  {
    key: '8',
    val: '个人消息',
    roleKey: ['1', '2', '3']
  },
  {
    key: '9',
    val: '字典管理',
    roleKey: ['1']
  }
]
// 角色
const roleList = [
  {
    key: '1',
    val: '系统管理员'
  },
  {
    key: '2',
    val: '权限管理员'
  },
  {
    key: '3',
    val: '审计管理员'
  }
]
// 同步内容
const syncList = [
  {
    key: '0',
    val: '机构'
  },
  {
    key: '1',
    val: '用户'
  }
]
// 依赖组件
const rektCompList = [
  {
    key: '0',
    val: '统一数据访问组件'
  },
  {
    key: '1',
    val: '统一数据访问组件'
  }
]
// 依赖组件
const sysStatusList = [
  {
    key: '1',
    val: '正常'
  },
  {
    key: '0',
    val: '异常'
  }
]
// const systemMenus = [
//   {
//     key: '0',
//     val: '单位管理'
//   },
//   {
//     key: '0',
//     val: '用户管理'
//   },
//   {
//     key: '0',
//     val: '菜单管理'
//   },
//   {
//     key: '7',
//     val: '个人设置'
//   },
//   {
//     key: '8',
//     val: '个人消息'
//   },
//   {
//     key: '9',
//     val: '字典管理'
//   }
// ]
// const permissionMenus = [
//   {
//     key: '0',
//     val: '角色管理'
//   },
//   {
//     key: '3',
//     val: '用户授权'
//   }
// ]
// const auditMenus = [
//   {
//     key: '4',
//     val: '审计管理'
//   },
//   {
//     key: '5',
//     val: '日志管理'
//   }
// ]
const MODE = {
  CREATE: '0',
  EDIT: '1',
  VIEW: '2'
}
const TYPE = {
  COMP: '0',
  SYS: '1',
  GROUP: '9'
}
const MonitorModal = {
  SERVERINFO: {
    // CPU核数
    CPUCOUNT: 'system.cpu.count',
    // CPU 使用率
    CPUUSAGE: 'system.cpu.usage',
    // 应用启动时间点
    STARTTIME: 'process.start.time',
    // 已运行时间
    UPDATETIME: 'process.uptime',
    // 当前CPU 使用率
    CPUUSAGECURRENT: 'process.cpu.usage'
  },
  TOMCAT: {
    // 全局 request 请求 次数
    REQCOUNT: 'tomcat.global.request.count',
    // request 请求最长耗时
    REQMAX: 'tomcat.global.request.max',
    // 全局 request 请求 总耗时
    REQTOTAL: 'tomcat.global.request.totalTime',
    // 发送的字节数
    SENT: 'tomcat.global.sent',
    // tomcat 当前活跃 session 数
    ACTIVECURRENT: 'tomcat.sessions.active.current',
    // tomcat 活跃 session 数峰值
    ACTIVEMAX: 'tomcat.sessions.active.max',
    // tomcat 已创建 session 数
    ACTIVECREATE: 'tomcat.sessions.created',
    // tomcat 已过期 session 数
    ACTIVEEXPIRED: 'tomcat.sessions.expired',
    // 超过session 最大配置后，拒绝的 session 个数
    ACTIVEREJECT: 'tomcat.sessions.rejected',
    // tomcat.threads.config.max
    CONFIGMAX: 'tomcat.threads.config.max',
    // tomcat 当前线程数（包括守护线程
    CURRENT: 'tomcat.threads.current'
  },
  JVM: {
    SIZEUNIT: {
      KB: 'KB',
      MB: 'MB',
      GB: 'GB'
    },
    // jvm最大内存
    MEMORYMAX: 'jvm.memory.max',
    // JVM 可用内存
    MEMORYCOMMIT: 'jvm.memory.committed',
    // JVM 已用内存
    MEMORYUSED: 'jvm.memory.used',
    // 缓存区已用内存
    BUFFERUSED: 'jvm.buffer.memory.used',
    // 当前缓冲区数量
    BUFFERCOUNT: 'jvm.buffer.count',
    // JVM 守护线程数量
    THREADSDAEMON: 'jvm.threads.daemon',
    // JVM 当前活跃线程数量
    THREADSLIVE: 'jvm.threads.live',
    // JVM峰值线程数量
    THREADSPEAK: 'jvm.threads.peak',
    // JVM 已加载 Class 数量
    CLASSESLOADED: 'jvm.classes.loaded',
    // JVM 未加载 Class 数量
    CLASSESUNLOADED: 'jvm.classes.unloaded',
    // GC 时, 年轻代分配的内存空间
    GCALLOCATED: 'jvm.gc.memory.allocated',
    // GC 时, 老年代分配的内存空间
    GCPROMOTED: 'jvm.gc.memory.promoted',
    // GC 时, 老年代的最大内存空间
    GCMAX: 'jvm.gc.max.data.size',
    // FullGC 时, 老年代的内存空间
    FULLGCSIZE: 'jvm.gc.live.data.size',
    // 系统启动以来GC 次数
    GCCOUNT: 'jvm.gc.pause.count',
    // 系统启动以来GC 总耗时
    GCTOTAL: 'jvm.gc.pause.totalTime'
  }
}
export default {
  sysType,
  menusList,
  roleList,
  syncList,
  rektCompList,
  sysStatusList,
  MODE,
  TYPE,
  MonitorModal
}
