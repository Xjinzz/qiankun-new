<template>
  <div>
    <a-card :bordered="false" style="margin-bottom: 20px;" title="消息配置基本信息">
      <template #extra v-if="$route.query.mode !== 'view'">
        <a-button @click="goBack">返回列表</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" @click="submit">提交</a-button>
      </template>
      <template #extra v-else>
        <a-button type="primary" @click="goBack">返回列表</a-button>
      </template>
      <a-form>
        <a-row type="flex" ref="form" justify="space-around">
          <a-col :span="12">
            <a-form-item label="配置名称" v-bind="formItemLayout" prop="msgName">
              <a-input placeholder="请输入配置名称" v-model="form.msgName" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编码" v-bind="formItemLayout">
              <a-input placeholder="请输入编码" v-model="form.msgCode" maxLength="100"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="排序号" v-bind="formItemLayout">
              <a-input v-model="form.orderNum" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否需要用户配置账号：" v-bind="formItemLayout">
              <a-radio-group v-model="form.userConf">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="实现类" v-bind="formItemLayout">
              <a-input placeholder="请输入实现类" v-model="form.classDef" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否启用" v-bind="formItemLayout">
              <a-radio-group v-model="form.isValide">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="备注" v-bind="{ labelCol: { span: 3 }, wrapperCol: { span: 20 } }">
              <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-model="form.remark" maxLength="300"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 20px;" title="配置" v-if="$route.query.mode !== 'create'">
      <a-form>
        <a-row type="flex" justify="space-between">
          <a-col :span="12" v-for="(item, ind) in configFormDomain" :key="ind">
            <a-form-item>
              <a-input-group>
                <a-row :gutter="8" type="flex" align="middle">
                  <a-col :span="8">
                    <a-input placeholder="请输入属性名称" v-model="item.name" maxLength="100"/>
                  </a-col>
                  <a-col :span="8">
                    <a-input placeholder="请输入属性值" v-model="item.val" maxLength="100"/>
                  </a-col>
                  <a-col :span="5">
                    <a-button icon="minus" size="small" v-if="domainCount > 0" @click="minus(ind)"></a-button>
                    <a-button v-if="ind === domainCount" icon="plus" size="small" @click="add" style="margin-left: 4px;"></a-button>
                  </a-col>
                </a-row>
              </a-input-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import { iopSendTypeService } from '@/iop/service/index'
import { validateTool } from 'mwutil'
export default {
  name: 'SendTypeForm',
  data () {
    return {
      form: {
        msgName: '',
        msgCode: '',
        orderNum: '',
        remark: '',
        userConf: '',
        isValide: '',
        classDef: ''
      },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      configFormDomain: [
        {
          name: '',
          val: '',
          msgTypeId: '',
          orderNum: ''
        }
      ],
      domainCount: 0,
      id: ''
    }
  },
  mounted () {
    if (this.$route.query.mode !== 'create') {
      this.$nextTick(() => {
        this.loadVal()
      })
    }
  },
  methods: {
    loadVal () {
      this.id = this.$route.query.msgTypeId
      iopSendTypeService.sendTypeDetail(this.id).then(res => {
        this.form.msgName = res.msgName ? res.msgName : ''
        this.form.msgCode = res.msgCode ? res.msgCode : ''
        this.form.orderNum = res.orderNum ? res.orderNum : ''
        this.form.remark = res.remark ? res.remark : ''
        this.form.userConf = res.userConf ? res.userConf : ''
        this.form.classDef = res.classDef ? res.classDef : ''
        this.form.isValide = res.isValide ? res.isValide : ''
        this.domainCount = res.pubMsgSendTypeConfDTOS ? res.pubMsgSendTypeConfDTOS.length - 1 : 0
        this.configFormDomain = res.pubMsgSendTypeConfDTOS ? res.pubMsgSendTypeConfDTOS : this.configFormDomain
        this.configFormDomain.forEach(v => {
          v.id = null
        })
      })
    },
    // 表单重置
    rest () {
      if (this.$route.query.mode === 'create') {
        this.form = {
          msgName: '',
          msgCode: '',
          orderNum: '',
          remark: '',
          userConf: ''
        }
        this.configFormDomain = [{
          name: '',
          val: '',
          msgTypeId: '',
          orderNum: ''
        }]
      } else {
        this.loadVal()
      }
    },
    checkForm () {
      return new Promise((resolve, reject) => {
        if (this.form.orderNum !== '') {
          if (!validateTool.validate('natureNum', this.form.orderNum)) {
            this.$message.error('排序号必须为正整数')
            return reject(new Error('排序号必须为正整数'))
          }
          if (this.form.orderNum > 1000000) {
            this.$message.error('排序号需要小于1000000')
            return reject(new Error('排序号需要小于1000000'))
          }
        }
        return resolve()
      })
    },
    // 表单提交
    submit () {
      this.checkForm()
        .then(res => {
          if (this.$route.query.mode === 'create') {
            iopSendTypeService.sendTypeSubmit(this.form).then(res => {
              if (res.message === 'success') {
                this.$goPage('msg/send-type')
                this.$message.success('操作成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else if (this.$route.query.mode === 'edit') {
            this.configFormDomain.forEach((v, i) => {
              v.orderNum = i
              v.msgTypeId = this.$route.query.msgTypeId
            })
            let editData = {}
            if (this.configFormDomain[0].name) {
              editData = Object.assign(this.form, {
                msgTypeId: this.$route.query.msgTypeId,
                pubMsgSendTypeConfDTOS: this.configFormDomain
              })
            } else {
              editData = Object.assign(this.form, {
                msgTypeId: this.$route.query.msgTypeId
              })
            }
            iopSendTypeService.sendTypeEdit(this.$route.query.msgTypeId, editData).then(res => {
              if (res.message === 'success') {
                this.$goPage('msg/send-type')
                this.$message.success('修改成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          }
        })
        .catch(e => {})
    },
    // 配置删除
    minus (ind) {
      this.domainCount--
      this.configFormDomain.splice(ind, 1)
    },
    // 配置添加
    add () {
      this.domainCount++
      this.configFormDomain.push({
        name: '',
        val: '',
        msgTypeId: '',
        orderNum: ''
      })
    },
    // 返回上一页
    goBack () {
      this.$goPage('msg/send-type')
    }
  }
}
</script>
