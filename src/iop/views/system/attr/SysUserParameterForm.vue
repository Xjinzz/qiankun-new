<template>
  <iop-data-form
    ref="sysUserAttrForm"
    :width="900"
    :url="url"
    :loadUrl="loadUrl"
    :loadQuery="loadQuery"
    :vo="vo"
    :id="attrId"
    :mode="mode"
    :title="titleName"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="onSubmitSuccess"
  >
    <template #form="{ record }">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="参数编码：" v-bind="formItemLayout">
            <a-input v-decorator="['attrCode', { rules: [{ required: true, whitespace: true, message: '参数编码不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="参数名称：" v-bind="formItemLayout">
            <a-input v-decorator="['attrName', { rules: [{ required: true, whitespace: true, message: '参数名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="参数类型：" v-bind="formItemLayout">
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
        <!-- <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="所属系统：" v-bind="formItemLayout">
              <iop-data-dict-select
                type="appSelect"
                ref="appSelect"
                v-decorator="['appId']" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="所属功能：" v-bind="formItemLayout">
              <a-input v-decorator="['programId']" disabled />
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <!-- <a-col :span="9" :offset="2">
            <a-form-item label="所属环境：" v-bind="formItemLayout">
              <iop-data-dict-select type="attrEnviro" ref="enviromentCode" v-decorator="['enviromentCode']" :disabled="!isGroup" />
            </a-form-item>
          </a-col> -->
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="9" :offset="2">
              <a-form-item label="参数类型：" v-bind="formItemLayout">
                <iop-data-dict-select
                  ref="attrDatatype"
                  type="attrDatatype"
                  @change="onDatTypeChange"
                  v-decorator="['attrDatatype', { rules: [{ required: !isGroup, message: '参数类型不能为空' }] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item label="用户自定义：" v-bind="formItemLayout">
                <a-switch id="isUser" :checked="isUser " @change="onSwitchChange"/>
              </a-form-item>
            </a-col>
          </a-row>
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
        <div v-show="isFile">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="23" :offset="1">
              <a-form-item label="文件：" v-bind="textAreaformItemLayout">
                <iop-upload-dragger v-if="isUpload" :id="localId" businessName="sysUserVal" attrName="attrVallist" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div v-show="!isFile">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="23" :offset="1">
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
      </div>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="23" :offset="1">
          <a-form-item label="备注：" v-bind="textAreaformItemLayout">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <input type="hidden" id="attrValId" :value="record.attrValId" />
    </template>
    <template #afterOkButton v-if="this.attrValId != null ">
      <a-button type="primary" @click="delBtn">删除</a-button>
    </template>
    <template #afterOkButton v-else>
      <a-button type="primary" @click="del">删除</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger } from '@/iop/components'
import sysUserAttrFormVO from './vo/sys-user-attr-form-vo'
import path from '@/iop/api/index'
import { iopUserAttrService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'SysUserAttrForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger },
  data () {
    return {
      treeUrl: path.system.userAttr.tree,
      url: path.system.userAttr.index,
      loadUrl: path.system.userAttr.load,
      claTreeUrl: path.system.userAttr.clatree,
      loadQuery: {},
      titleName: '参数定义',
      vo: sysUserAttrFormVO,
      localId: '',
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      },
      isGroup: false,
      isUser: false,
      isFile: true,
      isUpload: false,
      parentId: '',
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
    attrValId: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  created () {
  },
  methods: {
    show () {
      let { attrValId } = this
      if (!attrValId) {
        attrValId = 'null'
      }
      this.loadQuery = { attrValId }
      this.$refs.sysUserAttrForm.showModal()
      this.$nextTick(() => {
        this.localId = this.attrId
        this.isUpload = false
      })
    },

    selectCode (res) {
      if (res.data) {
        this.code = res.data.code
      }
    },

    changeVal (val) {
      this.attrVallist = val
    },

    delBtn () {
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          iopUserAttrService.delte(this.attrValId)
            .then(() => {
              this.$message.success('删除成功')
              this.$emit('onSubmitSuccess', this.parentId)
              this.$refs.sysUserAttrForm.hideModal()
            })
            .catch((err) => {
              MessageUtils.error(err)
            })
        }
      })
    },

    del () {
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          iopUserAttrService.del(this.attrId)
            .then((res) => {
              this.$message.success('删除成功')
              this.$emit('onSubmitSuccess', this.parentId)
              this.$refs.sysUserAttrForm.hideModal()
            })
            .catch((err) => {
              MessageUtils.error(err)
            })
        }
      })
    },

    loadConvertor (values) {
      if (values.attrDatatype === '5') {
        this.isUpload = true
      } else {
        this.isUpload = false
      }
      if (this.mode === 'create') {
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
        this.isGroup = (values.attrType === '0')
        this.isFile = (values.attrDatatype === '5')
        if (values.isUser === '1') {
          this.isUser = true
        } else {
          this.isUser = false
        }
        this.$nextTick(() => {
          this.parentId = values.parentId
          this.$refs.parentId.setSelected({ title: values.parentName, value: values.parentId })
          this.$refs.attrVallist.setSelected({ title: values.attrVallistName, value: values.attrVallist })
          this.$refs.attrDatatype.setSelected(values.attrDatatype)
        })
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
      this.isGroup = (event.target.value === '0')
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
