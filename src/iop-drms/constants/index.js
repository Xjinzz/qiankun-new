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
  NATION: 'B109'
}
const BASE_CODE_TREE = {
  code: '9',
  title: '树形'
}
const USER_ATTR_GROUP = '0'

const SERV_APP_STATUS = {
  PENDING: 101,
  INAUDIT: 102,
  AUDITED: 103
}

const SERV_OBJECT_AUDIT_STATUS = {
  REGISTERED: 1,
  AUDITED: 2,
  NOTHROUGH: 3
}

const FORM_URL = {
  OBJECT: {
    FORM: 'manage/object/form'
  },
  OPEN_OBJECT: {
    LIST: 'serv/openObject',
    VIEW: 'serv/open-object/view'
  },
  OPEN_SERVICE: {
    LIST: 'serv/openService',
    VIEW: 'serv/open-service/view'
  },
  OPEN_CATALOG: {
    LIST: 'serv/openCatalog'
  }
}

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
  FORM_URL as DRMS_FORM_URL,
  SERV_OBJECT_AUDIT_STATUS as DRMS_SERV_OBJECT_AUDIT_STATUS
}
