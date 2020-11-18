<template>
  <a-modal
    :title="state.isEdit?'修改认证配置':'新增认证配置'"
    :visible="state.visible"
    @cancel="hide"
    :width="900"
  >
    <a-row style="height:500px">
      <a-form :form="form">
        <a-col :span="11">
          <a-form-item label="通道编码" class="flex" style="width:100%">
            <a-input placeholder="请输入通道编码" v-decorator="['roadCode', { rules: rules.roadCode }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="通道名称" class="flex" style="width:100%">
            <a-input placeholder="请输入通道名称" v-decorator="['roadName', { rules: rules.roadName }]" />
          </a-form-item>
        </a-col>
        <a-col :span="22" class="flex">
          <a-form-item label="备注" class="flex" style="width:100%">
            <a-textarea
              placeholder="请输入备注"
              :autoSize="{ minRows: 2, maxRows: 4 }"
              v-decorator="['remark',{ rules: rules.remark }]"
            />
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <template slot="footer">
      <a-row style="text-align:center">
        <a-button :loading="state.savePadding" type="primary" @click="save">
          提交
        </a-button>
        <a-button @click="hide">
          取消
        </a-button>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import { objectTool } from 'mwutil'
const entity = {
  roadName: '',
  roadCode: '',
  remark: ''
}
export default {
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      rules: {
        roadName: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道名称最多100位' }
        ],
        roadCode: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道编码最多100位' }
        ],
        remark: [
          { max: 500, message: '备注最多500位' }
        ]
      },
      state: {
        isEdit: false,
        visible: false,
        savePadding: false
      },
      dataSource: {
        sysStatusList: []
      },
      entity: objectTool.deepClone(entity),
      id: null
    }
  },
  methods: {
    init () {
      if (this.state.isEdit) {
        this.getInfo()
      }
    },
    getAllFormKeyList () {
      const keysList = objectTool.deepClone(entity)
      return objectTool.getKeyList(keysList)
    },
    getInfo () {
      Service.getAuthInfo(this.id)
        .then(x => {
          this.entity = x
          const keys = {}
          this.getAllFormKeyList().map(x => {
            keys[x] = this.entity[x]
          })
          this.form.setFieldsValue(keys)
        })
    },
    show (id) {
      this.id = id
      this.state.isEdit = id
      this.state.visible = true
      this.init()
    },
    reset () {
      this.entity = objectTool.deepClone(entity)
      this.form.resetFields()
      this.id = null
    },
    hide () {
      this.state.visible = false
      this.reset()
    },
    save () {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.entity = this.form.getFieldsValue(objectTool.getKeyList(this.entity))
          if (this.state.isEdit) {
            Service.doUpdateAuth(this.id, {
              ...this.entity,
              appId: this.appId
            })
              .then((d) => {
                this.$emit('saveCallBack')
                this.hide()
              })
              .catch((e) => {
              })
          } else {
            Service.doSaveAuth({
              appId: this.appId,
              ...this.entity
            })
              .then((d) => {
                this.$emit('saveCallBack')
                this.hide()
              })
              .catch((e) => {
              })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.flex >>> .ant-form-item-control-wrapper {
  flex:1
}
.flex >>> .ant-form-item-label {
  width:100px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="less" scoped>
.flex{
  display:flex;
  margin-top:10px;
}
</style>
