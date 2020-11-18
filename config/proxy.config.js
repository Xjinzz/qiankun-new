/**
 * @description 各子包分别代理，统一配置，最终到webpack proxy
 */
const COMMENPROXY = {
}
const IOPPROXY = {
  '/iop/auth': {
    // target: 'http://118.190.199.44:9020/'
    target: 'http://192.168.0.109:8020/'
  },
  '/iop/system': {
    // target: 'http://118.190.199.44:9030/'
    target: 'http://192.168.0.109:8030/'
  },
  '/iop/base': {
    // target: 'http://118.190.199.44:9030/'
    target: 'http://192.168.0.109:8030/'
  },
  '/iop/file': {
    target: 'http://118.190.199.44:9040/'
  },
  '/iop/drms': {
    target: 'http://118.190.199.44:9070/'
  },
  '/msg': {
    target: 'http://118.190.199.44:9090/'
  },
  '/iop/serv': {
    target: 'http://118.190.199.44:9050/'
  },
  /** 流程 */
  '/iop/bpms': {
    target: 'http://118.190.199.44:8050/'
  },
  /** 授权 */
  '/iop/permit': {
    target: 'http://118.190.199.44:9080/'
  },
  /** 工具 */
  '/iop/tools': {
    target: 'http://118.190.199.44:8070/'
  }
}
module.exports = {
  ...COMMENPROXY,
  ...IOPPROXY
}