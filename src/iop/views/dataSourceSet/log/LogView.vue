<template>
  <a-modal
    :title="pageTitle"
    :visible="state.visible"
    @cancel="hide"
    width="900px"
  >
    <a-row>
      <a-form :ref="formState.formId" :form="formState.intance">
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="调用系统">
            <a-input :disabled="isView" v-decorator="['callApp']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="调用人">
            <a-input :disabled="isView" v-decorator="['callUserName']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="调用方法">
            <a-input :disabled="isView" v-decorator="['method']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="访问资源">
            <a-input :disabled="isView" v-decorator="['uri']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="资源所属系统">
            <a-input :disabled="isView" v-decorator="['resourceApp']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formState.itemLayout" label="调用时间">
            <a-input :disabled="isView" v-decorator="['createTime']"/>
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <a-row slot="footer" style="text-align:center">
      <a-button @click="hide">取消</a-button>
    </a-row>
  </a-modal>
</template>

<script>
import Define from '@/iop/constants/dataSourceSet'
// import Service from '@/iop/service/test/service'
import { objectTool } from 'mwutil'
const Entity = {
  callApp: '',
  callUserName: '',
  uri: '',
  resourceApp: ''
}
export default {
  props: {
    mode: {
      type: String,
      default: Define.MODE.CREATE
    }
  },
  data () {
    return {
      formState: {
        formId: 'dataSourceSet',
        intance: this.$form.createForm(this),
        itemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        }
      },
      state: {
        visible: false
      }
    }
  },
  computed: {
    isView () {
      return this.mode === Define.MODE.VIEW
    },
    isEdit () {
      return this.mode === Define.MODE.EDIT
    },
    isCreate () {
      return this.mode === Define.MODE.CREATE
    },
    pageTitle () {
      const titleMap = new Map()
      titleMap
        .set(Define.MODE.CREATE, '新建')
        .set(Define.MODE.EDIT, '修改')
        .set(Define.MODE.VIEW, '查看')
      return titleMap.get(this.mode)
    }
  },
  methods: {
    hide () {
      this.formState.intance.resetFields()
      this.state.visible = false
    },
    show (data) {
      this.state.visible = true
      this.$nextTick(() => {
        this.setEntity(data)
      })
    },
    setEntity (data) {
      this.formState.intance.setFieldsValue(data)
    },
    getInfo (id) {
      // 代码略
    },
    save () {
      this.formState.intance.validateFields((err, values) => {
        if (err) return
        const value = this.formState.intance.getFieldValue(objectTool.getKeyList(Entity))
        if (this.isEdit) {
          this.doSaveEdit(Object.assign(value, {
            id: this.id
          }))
        } else {
          this.doSaveCreate(value)
        }
      })
    }
  }
}
</script>
