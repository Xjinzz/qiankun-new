<template>
  <div>
    <iop-data-form
      ref="roleUserForm"
      :mode="mode"
      :url="url"
      :vo="vo"
      :id="relaTypeId"
      :submitSuccess="submitSuccess"
      :loadConvertor="loadConvertor"
      :submitConvertor="submitConvertor"
    >
      <template #form>
        <a-form-item label="关联角色名称" v-bind="formItemLayout">
          <a-input-search v-model="viceRoleName" @search="selectUserRole">
            <a-button slot="enterButton">
              选择
            </a-button>
          </a-input-search>
        </a-form-item>
        <a-form-item label="角色关系" v-bind="formItemLayout">
          <iop-data-dict-select ref="roleRelaType" type="roleRelaType" v-decorator="['roleRelaType', { rules: [{ required: true, whitespace: true, message: '角色关系不能为空' }] }]"></iop-data-dict-select>
        </a-form-item>
        <a-form-item label="备注" v-bind="formItemLayout">
          <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
        </a-form-item>
      </template>
    </iop-data-form>
    <roleList ref="roleList" @selRole="selRole"></roleList>
  </div>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import roleUserFormVO from './vo/role-user-form-vo'
import roleList from '../roleUser/RoleList'
import path from '@/iop/api'

export default {
  name: 'RoleUserForm',
  components: { IopDataForm, IopDataDictSelect, roleList },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.role.roleSelect,
      /** 表单定义 */
      vo: roleUserFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      viceRoleName: '',
      viceRoleId: ''
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    relaTypeId: {
      type: String,
      required: false,
      default: ''
    },
    roleId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show (viceRoleName = '') {
      this.$refs.roleUserForm.showModal()
      this.viceRoleName = viceRoleName
    },
    selectUserRole () {
      this.$refs.roleList.show()
    },
    selRole (record) {
      this.viceRoleId = record.roleId
      this.viceRoleName = record.roleName
    },
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.roleRelaType && this.$refs.roleRelaType.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.roleRelaType && this.$refs.roleRelaType.setSelected(values.roleRelaType)
          this.viceRoleId = values.viceRoleId
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.viceRoleId = this.viceRoleId
      value.viceRoleName = this.viceRoleName
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'create') {
        value.roleId = this.roleId
      }
      if (this.mode === 'edit') {
        const { relaTypeId } = this
        Object.assign(value, { relaTypeId })
      }
      return value
    }
  }
}
</script>
