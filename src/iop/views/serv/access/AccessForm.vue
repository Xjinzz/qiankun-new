<template>
  <a-card :bordered="false" title="接入者信息">
    <template #extra>
    </template>
    <a-form :form="form" ref="accessForm">
      <a-spin :spinning="loading">
        <a-col>
          <a-form-item label="接入者类型：" v-bind="formItemLayout">
            <a-radio-group name="radioGroup" v-decorator="['accessCategory', { rules: [{ required: true, whitespace: true, message: '请选择接入者类型' }]}]" @change="changeVal">
              <a-radio value="2">个人</a-radio>
              <a-radio value="1">机构</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <div v-show="isPerson">
          <a-col>
            <a-form-item label="姓名" v-bind="formItemLayout">
              <a-input placeholder="请输入姓名" v-decorator="['accessName', { rules: [{ required: isPerson, message: '姓名不能为空' }, { max: 100, message: '姓名长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="职业" v-bind="formItemLayout">
              <a-input placeholder="请输入职业" v-decorator="['contactName', { rules: [{ max: 100, message: '职业长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="身份证号" v-bind="formItemLayout">
              <a-input maxlength="18" placeholder="请输入身份证号" v-decorator="['idCard', { rules: [{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式不正确'}]}]" />
            </a-form-item>
          </a-col>
        </div>
        <div v-show="!isPerson">
          <a-col>
            <a-form-item label="机构代码" v-bind="formItemLayout">
              <a-input placeholder="请输入机构代码" v-decorator="['deptIdCard', { rules: [{ required: !isPerson, message: '机构代码不能为空' }, { max: 100, message: '机构代码长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="机构名称" v-bind="formItemLayout">
              <a-input placeholder="请输入机构名称" v-decorator="['deptAccessName', { rules: [{ required: !isPerson, message: '机构名称不能为空' }, { max: 100, message: '机构名称长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="联系人" v-bind="formItemLayout">
              <a-input placeholder="请输入联系人姓名" v-decorator="['deptContactName', { rules: [{ max: 100, message: '联系人姓名长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
        </div>
        <a-col>
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input placeholder="请输入联系电话" v-decorator="['telePhone', { rules: [{ pattern: /^(^[1][\d]{10}$)|^([0\+]\d{2,3}-?)?(\d{7,8})(-?(\d{1,6}))?$/, message: '联系电话格式不正确'}]}]" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="电子邮箱" v-bind="formItemLayout">
            <a-input placeholder="请输入电子邮箱" type="email" v-decorator="['email', { rules: [{ max: 100, message: '电子邮箱长度不能超过100'}]}]" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="联系地址" v-bind="formItemLayout">
            <a-input placeholder="请输入联系地址" v-decorator="['address', { rules: [{ max: 100, message: '联系地址长度不能超过100'}]}]" />
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="备注" v-bind="formItemLayout">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}]}]" />
          </a-form-item>
        </a-col>
        <a-form-item>
          <a-input type="hidden" v-decorator="['accessId']" />
        </a-form-item>
        <a-divider />
        <a-col :offset="5">
          <a-button type="primary" @click="submit">提交</a-button>
        </a-col>
      </a-spin>
    </a-form>
  </a-card>
</template>
<script>
import { iopCurrencyService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'
import { objectTool } from 'mwutil'

export default {
  name: 'AccessForm',
  data () {
    return {
      isPerson: true,
      originRecord: {},
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 10 }
      },
      form: {},
      loading: false
    }
  },
  created () {
    this.form = this.$form.createForm(this)
    this.getInfo()
  },
  methods: {
    changeVal (e) {
      this.isPerson = (e.target.value === '2')
    },

    getInfo () {
      this.loading = true
      iopCurrencyService.getInfo()
        .then((res) => {
          const data = res || {}
          this.originRecord = objectTool.deepClone(data)
          this.isPerson = (data.accessCategory === '2')
          this.bind()
        })
        .catch((err) => { MessageUtils.error(err) })
        .finally(() => { this.loading = false })
    },

    bind () {
      const { originRecord } = this
      const { telePhone, email, address, remark, accessId, accessName, contactName, idCard, accessCategory } = originRecord
      const data = {
        deptIdCard: originRecord.idCard,
        deptAccessName: originRecord.accessName,
        deptContactName: originRecord.contactName,
        telePhone,
        email,
        address,
        remark,
        accessId,
        accessName,
        contactName,
        idCard,
        accessCategory
      }
      this.form.setFieldsValue(data)
    },

    async submit () {
      this.loading = true
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const data = { ...values }
          try {
            if (!this.isPerson) {
              Object.assign(data, { idCard: values.deptIdCard, accessName: values.deptAccessName, contactName: values.deptContactName })
            }
            if (!data.accessId) {
              await iopCurrencyService.save(data)
            } else {
              await iopCurrencyService.edit(data.accessId, data)
            }
            MessageUtils.success()
          } catch (err) {
            MessageUtils.e(err)
          } finally {
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
