<template>
  <div>
    <a-card :bordered="false" style="margin-bottom: 20px;" title="基本信息">
      <template #extra v-if="$route.query.mode !== 'view'">
        <a-button @click="rest">重置</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" @click="submit">提交</a-button>
      </template>
      <template #extra v-else>
        <a-button type="primary" @click="goBack">返回列表</a-button>
      </template>
      <a-form :form="userForm">
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="人员姓名" v-bind="formItemLayout">
              <!-- <a-col :span="18">
                <a-input placeholder="请输入人员姓名" v-model="form.userName" maxLength="100"/>
              </a-col>
              <a-col :span="4">
                <a-button type="primary" @click="selUser">选择</a-button>
              </a-col> -->
              <a-input-search
                placeholder="请输入人员姓名"
                v-model="form.userName"
                maxLength="100"
                @search="selUser"
              >
                <a-button type="primary" slot="enterButton">
                  选择
                </a-button>
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="人员编码" v-bind="formItemLayout">
              <a-input placeholder="请输入人员编码" v-model="form.userCode" maxLength="100"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="排序号" v-bind="formItemLayout">
              <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分组" v-bind="formItemLayout">
              <iop-data-tree-select ref="contactId" :url="contactTreeUrl" @onSelect="getContactId" v-model="form.contactId"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="备注" v-bind="{ labelCol: { span: 3 }, wrapperCol: { span: 20 } }">
              <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark',{rules: [{ max: 500, message: '备注最多500位' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 20px;" title="联系方式">
      <a-form>
        <a-row type="flex" justify="space-between" align="middle" v-for="(item, ind) in userFormDomain" :key="ind">
          <a-col :span="7">
            <a-form-item label="联系方式名称" v-bind="formItemLayout">
              <a-input placeholder="请输入联系方式名称" v-model="item.contrName" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="联系方式编码" v-bind="formItemLayout">
              <a-select v-model="item.contrType">
                <a-select-option value="1">
                  手机号
                </a-select-option>
                <a-select-option value="2">
                  邮箱地址
                </a-select-option>
                <a-select-option value="3">
                  微信号
                </a-select-option>
                <a-select-option value="4">
                  QQ号
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="联系方式" v-bind="formItemLayout">
              <a-input placeholder="请输入联系方式" v-model="item.contrVal" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item>
              <a-button icon="minus" v-if="domainCount > 0" size="small" @click="minus(ind)"></a-button>
              <a-button v-if="ind === domainCount" icon="plus" size="small" @click="add(ind)" style="margin-left: 4px;"></a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <iop-sys-user-select ref="userSelects" :multipleChoice="true" @submit="onUserSelect"/>
  </div>
</template>
<script>
import { IopDataTreeSelect, IopDataTable, IopDataDictSelect, IopSysUserSelect } from '@/iop/components'
import { iopContactUserService } from '@/iop/service/index'

import path from '@/iop/api/index'
export default {
  name: 'SendTypeForm',
  components: { IopDataTreeSelect, IopDataTable, IopDataDictSelect, IopSysUserSelect },
  data () {
    return {
      form: {
        userName: '',
        userCode: '',
        remark: '',
        contactId: '',
        deptId: '',
        type: 1
      },
      userForm: this.$form.createForm(this),
      deptTreeUrl: path.system.pubDept.tree,
      contactTreeUrl: path.msg.contact.tree,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      conUserId: '',
      userFormDomain: [
        {
          contrName: '',
          contrType: '',
          contrVal: ''
        }
      ],
      domainCount: 0
    }
  },
  mounted () {
    if (this.$route.query.mode !== 'create') {
      this.$nextTick(() => {
        this.loadVal()
      })
    } else {
      this.$nextTick(() => {
        this.form.contactId = this.$route.query.contactId
        this.$refs.contactId.setSelected({ title: this.$route.query.parentName, value: this.$route.query.contactId })
      })
    }
  },
  methods: {
    loadVal () {
      this.conUserId = this.$route.query.conUserId
      iopContactUserService.contactUserDetail(this.conUserId).then(res => {
        this.form.userName = res.userName
        this.form.userCode = res.userCode
        this.$nextTick(() => {
          this.userForm.setFieldsValue({
            orderNum: res.orderNum,
            remark: res.remark

          })
        })
        this.form.remark = res.remark
        this.form.deptId = res.deptId
        this.$refs.contactId.setSelected({ title: res.contactName, value: res.contactId })
        this.domainCount = res.pubMsgUserConts ? res.pubMsgUserConts.length - 1 : 0
        this.userFormDomain = res.pubMsgUserConts ? res.pubMsgUserConts : this.userFormDomain
        this.userFormDomain.forEach((v, i) => {
          this.$refs.contrType[i] && this.$refs.contrType[i].setSelected(v.contrType)
          v.busiId = null
          v.contractId = null
        })
      })
    },
    // 表单重置
    rest () {
      if (this.$route.query.mode === 'create') {
        this.form = {
          userName: '',
          userCode: '',
          remark: '',
          contactId: '',
          deptId: '',
          type: 1
        }
        this.userFormDomain = [
          {
            contrName: '',
            contrType: '',
            contrVal: ''
          }
        ]
        this.$nextTick(() => {
          this.userForm.setFieldsValue({
            orderNum: '',
            remark: ''
          })
          this.$refs.contactId.cleanSelected()
          this.$refs.contrType[0].cleanSelected()
        })
        this.domainCount = 0
      } else {
        this.loadVal()
      }
    },
    selUser () {
      this.$refs.userSelects.show()
    },
    async onUserSelect ({ keys, values }) {
      this.form.userName = values[0].userName
      this.form.userCode = values[0].userCode
    },
    add (ind) {
      if (this.userFormDomain[ind].contrName === '') {
        this.$message.error('请填写联系方式名称')
        return
      }
      if (this.userFormDomain[ind].contrType === '') {
        this.$message.error('请选择联系方式编码')
        return
      }
      if (/.*[\u4e00-\u9fa5]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]+.*$/.test(this.userFormDomain[ind].contrVal) || this.userFormDomain[ind].contrVal === '') {
        this.$message.error('请填写正确得联系方式')
        return
      }
      this.domainCount++
      this.userFormDomain.push({
        contrName: '',
        contrType: '',
        contrVal: ''
      })
      console.log(this.userFormDomain, '+')
    },
    minus (ind) {
      this.domainCount--
      this.userFormDomain.splice(ind, 1)
      console.log(this.userFormDomain, '-')
    },
    // 表单提交
    submit () {
      if (this.form.userName === '') {
        this.$message.error('请填写或选择人员名称')
        return
      }
      if (this.form.userCode === '') {
        this.$message.error('请填写人员编码')
        return
      }
      if (this.userFormDomain[this.userFormDomain.length - 1].contrName === '') {
        this.$message.error('请填写联系方式名称')
        return
      }
      if (this.userFormDomain[this.userFormDomain.length - 1].contrType === '') {
        this.$message.error('请选择联系方式编码')
        return
      }
      if (/.*[\u4e00-\u9fa5]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]+.*$/.test(this.userFormDomain[this.userFormDomain.length - 1].contrVal) || this.userFormDomain[this.userFormDomain.length - 1].contrVal === '') {
        this.$message.error('请填写正确得联系方式')
        return
      }
      if (this.form.contactId === '' || this.form.contactId === '0') {
        this.$message.error('请选择分组')
        return
      }
      this.userForm.validateFields((err, val) => {
        if (!err) {
          if (this.$route.query.mode === 'create') {
            const submitData = Object.assign(this.form, val, {
              pubMsgUserConts: this.userFormDomain[0].contrName ? this.userFormDomain : []
            })
            iopContactUserService.contactUserSubmit(submitData).then(res => {
              if (res.message === 'success') {
                this.$goPage('msg/contactUser', {
                  parentId: this.form.contactId
                })
                this.$message.success('操作成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else if (this.$route.query.mode === 'edit') {
            const editData = Object.assign(this.form, val, {
              conUserId: this.$route.query.conUserId,
              pubMsgUserConts: this.userFormDomain[0].contrName ? this.userFormDomain : []
            })
            iopContactUserService.contactUserEdit(this.$route.query.conUserId, editData).then(res => {
              if (res.message === 'success') {
                this.$goPage('msg/contactUser', {
                  parentId: this.form.contactId
                })
                this.$message.success('修改成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          }
        }
      })
    },
    getContactId (data) {
      this.form.contactId = data.key
    },
    // 返回上一页
    goBack () {
      this.$goPage('msg/contactUser', {
        parentId: this.form.contactId
      })
    }
  }
}
</script>
