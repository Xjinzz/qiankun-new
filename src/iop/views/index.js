import { IopPubDeptTree } from '@/iop/components/index'
import Login from './auth/Login'
import ServApplyForm from './serv/apply/ApplyForm'
import SerServiceList from './serv/service/ServiceList'
import BaseCodeList from './system/code/BaseCodeList'
import DeptList from './system/dept/SysDeptList'
import ProgramList from './system/program/SysProgramList'
import ProgramTree from './system/program/SysProgramTree'
import PubDeptList from './system/pub-dept/PubDeptList'
import PubUserList from './system/pub-user/PubUserList'
import PubUserVoucherList from './system/pub-user/PubUserVoucherList'
import SkinList from './system/skin/SkinList'
import SettingLayout from './settings/layout/Setting'
import ServApplyModal from './serv/flow-modal/ApplyModal.vue'

export {
  Login as IopLogin,
  BaseCodeList as IopBaseCodeList,
  DeptList as IopDeptList,
  ProgramList as IopProgramList,
  PubDeptList as IopPubDeptList,
  ProgramTree as IopProgramTree,
  PubUserList as IopPubUserList,
  PubUserVoucherList as IopPubUserVoucherList,
  IopPubDeptTree,
  SkinList as IopSkinList,
  ServApplyForm as IopServApplyForm,
  SerServiceList as IopSerServiceList,
  SettingLayout as IopSettingLayout,
  ServApplyModal as IopServApplyModal
}
