import appService from './auth/app'
import authService from './auth/index'
import tokenService from './auth/token'
import dataService from './components/data'
import servAppService from './serv/app'
import servApplicationService from './serv/application'
import servApplyService from './serv/apply'
import servCallService from './serv/call'
import servService from './serv/service'
import settingService from './settings/settings'
import areaService from './system/area'
import codeService from './system/code'
import currencyServe from './system/currency'
import deptService from './system/dept'
import codeclaService from './system/codecla'
import pubDeptService from './system/pub-dept'
import pubDeptAdminService from './system/pub-dept-admin'
import pubUserService from './system/pub-user'
import roleService from './system/role'
import userService from './system/user'
import userAttrService from './system/user-attr'
import userRoleServe from './system/user-role'
import SendTypeService from './msg/sendType'
import ContactUserService from './msg/contactUser'
import msgStatisticsService from './msg/statistics'
import CatalogsService from './file/catalogs'
import FilesService from './file/files'
import BpmsDefToEngService from './bpms/def-to-eng'
import BpmsEngRegService from './bpms/eng-reg'
import BpmsDefInfoService from './bpms/def-info'
import PermitService from './permit/types'
import ProgramService from './system/program'
import onlineService from './system/online-user'
import pubVoucherService from './system/pub-voucher'

export {
  areaService as iopAreaService,
  appService as iopAppService,
  authService as iopAuthService,
  codeService as iopCodeService,
  dataService as iopDataService,
  deptService as iopDeptService,
  codeclaService as iopCodeclaService,
  tokenService as iopTokenService,
  pubDeptService as iopPubDeptService,
  pubDeptAdminService as iopPubDeptAdminService,
  pubUserService as iopPubUserService,
  settingService as iopSettingService,
  userService as iopUserService,
  userAttrService as iopUserAttrService,
  roleService as iopRoleService,
  userRoleServe as iopUserRoleServe,
  currencyServe as iopCurrencyService,
  servAppService as iopServAppService,
  servService as iopServService,
  servApplicationService as iopServApplicationService,
  servApplyService as iopServApplyService,
  SendTypeService as iopSendTypeService,
  servCallService as iopServCallService,
  ContactUserService as iopContactUserService,
  msgStatisticsService as iopMsgStatisticsService,
  CatalogsService as iopCatalogsService,
  FilesService as iopFilesService,
  BpmsDefToEngService as iopBpmsDefToEngService,
  BpmsEngRegService as iopBpmsEngRegService,
  BpmsDefInfoService as iopBpmsDefInfoService,
  PermitService as iopPermitService,
  ProgramService as iopProgramService,
  onlineService as iopOnlineService,
  pubVoucherService as iopPubVoucherService
}
