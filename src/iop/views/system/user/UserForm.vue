<template>
  <iop-data-form
    ref="userForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="sysUserId"
    :submitSuccess="formSubmitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="用户编码" v-bind="formItemLayout">
            <a-input placeholder="请输入用户编码" v-decorator="['userCode', { rules: [{ required: true, whitespace: true, message: '编码不能为空' }, { max: 100, message: '用户编码不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="用户姓名" v-bind="formItemLayout">
            <a-input placeholder="请输入用户姓名" v-decorator="['userName', { rules: [{ required: true, whitespace: true, message: '姓名不能为空' }, { max: 100, message: '用户姓名不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="登录名" v-bind="formItemLayout">
            <a-input placeholder="请输入登录名" v-decorator="['loginName', { rules: [{ required: true, whitespace: true, message: '登录名不能为空' }, { max: 100, message: '登录名不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="用户性别" v-bind="formItemLayout">
            <iop-data-dict-radio ref="sex" :type="sexCodeNum" v-decorator="['sex', { rules: [{ required: true, whitespace: true, message: '请选择性别' }] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="所在机构" v-bind="formItemLayout">
            <iop-data-tree-select ref="deptTree" :url="deptTreeUrl" v-decorator="['sysDeptId', { rules: [{ required: true, whitespace: true, message: '请选择机构' }] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="用户职务" v-bind="formItemLayout">
            <a-input placeholder="请输入用户职务" v-decorator="['duty', { rules: [{ max: 100, message: '用户职务不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="职位职级" v-bind="formItemLayout">
            <iop-data-dict-select ref="rank" :type="rank" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="排序号码" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}] }]" style="width:100%;" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="证件类型" v-bind="formItemLayout">
            <iop-data-dict-select ref="paperType" type="paperType" v-decorator="['paperType']"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="证件号码" v-bind="formItemLayout">
            <a-input placeholder="请输入证件号码" v-decorator="['paperNum', { rules: [rules.paperNum, { max: 100, message: '证件号码不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="用户类型" v-bind="formItemLayout">
            <iop-data-dict-select ref="userType" :type="userType" v-decorator="['userType']"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="用户状态" v-bind="formItemLayout">
            <a-switch :checked="userStatus" checked-children="启用" un-checked-children="禁用" disabled />
          </a-form-item>
        </a-col>
      </a-row>
      <div v-show="advanced">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="用户国籍" v-bind="formItemLayout">
              <a-input placeholder="请输入用户国籍" v-decorator="['nationality', { rules: [{ max: 100, message: '用户国籍不能超过100'}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="用户民族" v-bind="formItemLayout">
              <iop-data-dict-select ref="nation" :type="nation" v-decorator="['nation']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="出生地点" v-bind="formItemLayout">
              <a-input placeholder="请输入出生地点" v-decorator="['birthplace', { rules: [{ max: 100, message: '出生地点不能超过100'}] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="出生日期" v-bind="formItemLayout">
              <a-date-picker v-decorator="['birthday']" style="width:100%;" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="入职时间" v-bind="formItemLayout">
              <a-date-picker v-decorator="['entryTime']" style="width:100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="退休时间" v-bind="formItemLayout">
              <a-date-picker v-decorator="['retirementTime']" style="width:100%;" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="数据来源" v-bind="formItemLayout">
              <a-input v-decorator="['source']" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="23" :offset="2">
            <a-form-item label="备注" v-bind="textAreaformItemLayout">
              <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <a-row>
        <a-col :span="5" :offset="9">
          <a-button @click="toggleAdvanced()" block>
            {{ advanced ? '隐藏更多' : '显示更多' }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a-button>
        </a-col>
      </a-row>
      <!-- 是否删除 -->
      <input type="hidden" id="isDel" :value="record.isDel" />
      <!-- LDAP同步标志 -->
      <input type="hidden" id="ldapFlag" :value="record.ldapFlag" />
      <!-- LDAP上次同步时间 -->
      <input type="hidden" id="ldapLastTime" :value="record.ldapLastTime" />
      <!-- 登录密码 -->
      <input type="hidden" id="loginPwd" :value="record.loginPwd" />
      <!-- 统一用户id-->
      <input type="hidden" id="userId" :value="record.userId" />

      <input type="hidden" id="appId" :value="record.appId" />
      <input type="hidden" id="beginDate" :value="record.beginDate" />
      <input type="hidden" id="endDate" :value="record.endDate" />
    </template>
  </iop-data-form>
</template>
<script>
import { IOP_BASE_CODE_NUM } from '@/iop/constants'
import { iopDeptService } from '@/iop/service/index'
import { IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopDataForm } from '@/iop/components'
import moment from 'moment'
import path from '@/iop/api'
import userFormVO from './vo/user-form-vo'
import MessageUtils from '@/utils/message'

export default {
  name: 'UserForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      rules: {
        paperNum: [
          {
            validator: this.paperNumValidate
          }
        ]
      },
      url: path.system.user.index,
      deptTreeUrl: path.system.dept.tree,
      vo: userFormVO,
      localDeptId: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      },
      advanced: false,
      userStatus: true,
      sexCodeNum: IOP_BASE_CODE_NUM.SEX,
      userType: IOP_BASE_CODE_NUM.USER_TYPE,
      rank: IOP_BASE_CODE_NUM.RANK,
      nation: IOP_BASE_CODE_NUM.NATION,
      dateArray: ['birthday', 'entryTime', 'retirementTime']
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    sysUserId: {
      type: String,
      required: false,
      default: ''
    },
    sysDeptId: {
      type: String,
      required: false,
      default: ''
    },
    sysDeptName: {
      type: String,
      required: false,
      default: ''
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  methods: {
    paperNumValidate (rule, value, callback) {
      if (value !== '' && value !== undefined) {
        const type = this.$refs.userForm.getFieldValue('paperType')
        if (type === '' || type === undefined) {
          callback(new Error('请选择证件类型'))
        }
        if (type === '1' && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
          callback(new Error('身份证号格式不正确'))
        }
      }
      callback()
    },
    show () {
      this.advanced = false
      this.$refs.userForm.showModal()
    },

    submit () {
      this.$refs.userForm.submitForm()
    },

    load () {
      this.$refs.userForm && this.$refs.userForm.load()
    },

    loadConvertor (value) {
      const dictSelectArray = ['userType', 'rank', 'paperType', 'nation']
      if (this.mode === 'create') {
        value.orderNum = '1'
        this.userStatus = true

        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].cleanSelected()
          })
          value.sysDeptId = this.sysDeptId
          this.$refs.deptTree.setSelected({ title: this.sysDeptName, value: this.sysDeptId })
        })
      } else {
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].setSelected(value[name])
          })
          this.initDeptTree(value.sysDeptId)

          this.dateArray.map(name => {
            const date = value[name]
            if (date) {
              value[name] = moment(date)
            }
          })
          this.userStatus = (value.userStatus === '1')
        })
      }
      return value
    },

    async initDeptTree (deptId = '') {
      if (deptId) {
        try {
          const record = await iopDeptService.getById(deptId)
          this.$refs.deptTree.setSelected({ title: record.deptName, value: deptId })
        } catch (err) {
          MessageUtils.error(err)
        }
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      let { sysDeptId } = value
      if (!sysDeptId) {
        sysDeptId = '0'
      }
      this.localDeptId = sysDeptId
      // date convertor
      this.dateArray.map(name => {
        const date = value[name]
        if (date) {
          value[name] = value[name].toDate().getTime()
        }
      })

      Object.assign(value, { userStatus: this.userStatus ? '1' : '9', sysDeptId })
      return value
    },

    onSwitchChange (checked) {
      this.userStatus = checked
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    formSubmitSuccess () {
      this.submitSuccess(this.localDeptId)
    }
  }
}
</script>
