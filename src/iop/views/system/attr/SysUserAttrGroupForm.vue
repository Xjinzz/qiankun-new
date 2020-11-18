<template>
  <iop-data-form
    ref="sysUserAttrForm"
    :width="900"
    :mode="mode"
    :url="url"
    :loadUrl="loadUrl"
    :vo="vo"
    :id="attrId"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="onSubmitSuccess"
  >
    <template #form="{ record }">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-show="isGroup">
        <a-col :span="9" :offset="2">
          <a-form-item label="参数编码：" v-bind="formItemLayout">
            <a-input v-decorator="['attrCode', { rules: [{ required: true, whitespace: true, message: '参数编码不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="参数名称：" v-bind="formItemLayout">
            <a-input style="position:relative;" v-decorator="['attrName', { rules: [{ required: true, whitespace: true, message: '参数名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="类型：" v-bind="formItemLayout">
            <iop-data-dict-radio
              ref="sex"
              type="attrType"
              v-decorator="['attrType', { rules: [{ required: true, whitespace: true, message: '请选择一个类型' }] }]"
              @change="attrTypeChange" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item :label="isGroup ? '上级分类：': '所属分类：'" v-bind="formItemLayout">
            <iop-data-tree-select
              ref="parentId"
              :url="treeUrl"
              v-decorator="['parentId']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-show="!isGroup">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="record.attrType === '1' ">
          <a-col :span="9" :offset="2">
            <a-form-item label="所属系统：" v-bind="formItemLayout">
              <a-input v-decorator="['appId']" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="所属功能：" v-bind="formItemLayout" v-if="record.attrType != '1' ">
              <a-input v-decorator="['programId']" disabled />
            </a-form-item>
            <a-form-item label="所属环境：" v-bind="formItemLayout" v-else>
              <iop-data-dict-select type="attrEnviro" ref="enviromentCode" v-decorator="['enviromentCode']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="record.attrType != '1' ">
          <a-col :span="9" :offset="2">
            <a-form-item label="参数类型：" v-bind="formItemLayout">
              <iop-data-dict-select
                type="attrDatatype"
                ref="attrDatatype"
                @change="onDatTypeChange"
                v-decorator="['attrDatatype', { rules: [{ required: !isGroup, message: '参数类型不能为空' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="用户自定义：" v-bind="formItemLayout">
              <a-switch id="isUser" :checked="isUser" @change="onSwitchChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <div v-show="isFile">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="21" :offset="1">
              <a-form-item label="文件：" v-bind="textAreaformItemLayout">
                <iop-upload-dragger :mode="mode" :id="localId" businessName="sysUserAttr" attrName="attrVallist" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div v-show="!isFile && record.attrType != '1' " style="display: none;">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="9" :offset="2">
              <a-form-item label="缺省值：" v-bind="formItemLayout">
                <a-input v-decorator="['attrDefault']" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item label="排序号：" v-bind="formItemLayout">
                <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="21" :offset="1">
              <a-form-item label="可选值：" v-bind="textAreaformItemLayout">
                <iop-data-tree-select
                  :url="claTreeUrl"
                  query="parentId"
                  ref="attrVallist"
                  @onSelect="selectCode"
                  v-decorator="['attrVallist']"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="record.attrType === '1' ">
          <a-col :span="23" :offset="1">
            <a-form-item label="设定值：" v-bind="textAreaformItemLayout">
              <a-input v-decorator="['userVal']" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="record.attrType === '0' ">
        <a-col :span="21" :offset="1">
          <a-form-item label="备注：" v-bind="textAreaformItemLayout">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark']" />
          </a-form-item>
        </a-col>
      </a-row>
      <input type="hidden" id="attrValId" :value="record.attrValId" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger } from '@/iop/components'
import sysUserAttrFormVO from './vo/sys-user-attr-form-vo'
import path from '@/iop/api/index'
import { IOP_USER_ATTR_GROUP } from '@/iop/constants/index'

export default {
  name: 'SysUserAttrForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger },
  data () {
    return {
      treeUrl: path.system.userAttr.tree,
      url: path.system.userAttr.index,
      loadUrl: path.system.userAttr.load,
      claTreeUrl: path.system.userAttr.clatree,
      vo: sysUserAttrFormVO,
      localId: '',
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        }
      },
      isGroup: false,
      isUser: false,
      isFile: true,
      attrValId: {
        attrValId: ''
      },
      code: ''
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    attrId: {
      type: String,
      required: true
    },
    parentId: {
      type: String,
      required: false,
      default: '0'
    }
  },
  methods: {
    show () {
      this.$refs.sysUserAttrForm.showModal()
    },

    selectCode (res) {
      setTimeout(() => {
        this.code = res.data.code
      }, 1000)
    },

    loadConvertor (values) {
      if (this.mode === 'create') {
        let { parentId } = this
        if (!parentId) {
          parentId = '0'
        }
        values.parentId = parentId
        values.attrType = '0'
        this.isGroup = true
        this.isFile = false
        this.localId = `${new Date().getTime()}`
        this.$nextTick(() => {
          this.$refs.parentId.cleanSelected()
          this.$refs.attrDatatype && this.$refs.attrDatatype.cleanSelected()
        })
      } else {
        this.localId = this.attrId
        this.isGroup = (values.attrType === IOP_USER_ATTR_GROUP)
        this.isFile = (values.attrDatatype === '5')
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.parentId.setSelected({ title: values.parentName, value: values.parentId })
          })
        }, 0)
      }
      return values
    },

    submitConvertor (values = {}) {
      if (!values.parentId) {
        values.parentId = '0'
      }
      values.attrVallist = this.code
      Object.assign(values, { isUser: this.isUser ? '1' : '0' })
      return values
    },

    attrTypeChange (event = '') {
      this.isGroup = (event.target.value === IOP_USER_ATTR_GROUP)
    },

    onSwitchChange (checked = true) {
      this.isUser = checked
    },

    onSubmitSuccess (record = {}) {
      this.$emit('onSubmitSuccess', record.parentId)
    },

    onDatTypeChange (value) {
      this.isFile = (value === '5')
    }
  }
}
</script>
