const ACCESS_TOKEN = 'Access-Token'
const APP_CODE = 'App-Code'
const LOGIN_PATH = '/login'
const TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000
const NICK_NAME = 'nickname'
const APPS = 'apps'
const BASE_CODE_NUM = {
  SEX: 'sex',
  USER_TYPE: 'userType',
  RANK: 'B105',
  NATION: 'nation'
}
const BASE_CODE_TREE = {
  code: '9',
  title: '树形'
}
const USER_ATTR_GROUP = '0'
/**
 * 应用接入状态
 */
const SERV_APP_STATUS = {
  PENDING: 0,
  INAUDIT: 1,
  AUDITED: 9,
  NOTHROUGH: -1
}
/**
 * 服务审批状态
 */
const SERV_APPLY_ADMIN_STATUS = {
  INAUDIT: 1,
  AUDITED: 2
}

const VOUCHER_TYPE = {
  LOGINNAME: 'PZ_001',
  PHONE: 'PZ_002',
  PAD: 'PZ_003'
}

const FORM_URL = {
  /**
   * 应用接入页面
   */
  SERV_APP: {
    CREATE: 'serv/app/create',
    EDIT: 'serv/app/edit'
  },
  /**
   * 服务组件-接入管理-申请单详情
   */
  SERV_APPLY: {
    VIEW: 'serv/apply/view'
  },
  /**
   * 服务组件-服务管理-授权
   */
  SERV_SERVICE: {
    ADD: 'serv/service/add'
  },
  /**
   * 服务管理-调用服务
   */
  SERV_CALL: {
    /** 查看 */
    INFO: 'serv/call/info',
    METHOD: 'serv/call/info/method'
  },
  /**
   * 服务管理-服务审核
   */
  SERV_ADMIN: {
    /** 查看 */
    INFO: 'serv/apply-admin/info',
    /** 查看 - 服务 -查看 */
    SERVICE: 'serv/apply-admin/info/service'
  },
  MSG: {
    RECIPIENT: 'msg/recipient'
  },
  FILE: {
    LIFECYCLE: {
      VIEW: 'file/types/view',
      LIST: 'file/types'
    },
    STORES: {
      LIST: 'file/stores',
      VIEW: 'file/stores/view'
    },
    FILES: {
      LIST: 'file/files/list'
    }
  },
  /**
  * 流程组件
  */
  BPMS: {
    // 流程定义
    DEFINFO: {
      INFO: 'bpms/defInfo/info'
    }
  }
}

const SERV_APPLY_STATUS = {
  DRAFT: 0,
  PENDING: 1,
  THROUHT: 2,
  NOTHROUGH: 9
}
/**
 * 调用服务状态
 */
const SERV_SERVICE_CALL_STATUS = {
  ALL: 0,
  PENDING: 1,
  AUDITED: 2
}

const OLD_TOKENS = 'oldTokens'

export {
  ACCESS_TOKEN as IOP_ACCESS_TOKEN,
  APP_CODE as IOP_APP_CODE,
  LOGIN_PATH as IOP_LOGIN_PATH,
  TOKEN_VALIDITY as IOP_TOKEN_VALIDITY,
  NICK_NAME as IOP_NICK_NAME,
  APPS as IOP_APPS,
  BASE_CODE_NUM as IOP_BASE_CODE_NUM,
  BASE_CODE_TREE as IOP_BASE_CODE_TREE,
  USER_ATTR_GROUP as IOP_USER_ATTR_GROUP,
  SERV_APP_STATUS as IOP_SERV_APP_STATUS,
  FORM_URL as IOP_FORM_URL,
  SERV_APPLY_STATUS as IOP_SERV_APPLY_STATUS,
  SERV_APPLY_ADMIN_STATUS as IOP_SERV_APPLY_ADMIN_STATUS,
  SERV_SERVICE_CALL_STATUS as IOP_SERV_SERVICE_CALL_STATUS,
  VOUCHER_TYPE as IOP_VOUCHER_TYPE,
  OLD_TOKENS as IOP_OLD_TOKENS
}
