<template>
  <iop-data-form
    ref="sysUserAttrForm"
    :width="900"
    :mode="mode"
    :url="url"
    :loadUrl="loadUrl"
    :loadQuery="loadQuery"
    :vo="vo"
    :id="attrId"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="onSubmitSuccess"
  >
    <template #form="{ record }">
      <div v-show="isInformationShow">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="参数编码：" v-bind="formItemLayout">
              <a-input v-decorator="['attrCode', { rules: [{ required: true, whitespace: true, message: '参数编码不能为空' }] }]" :disabled="!isGroup && mode === 'edit' " />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="参数名称：" v-bind="formItemLayout">
              <a-input style="position:relative;" v-decorator="['attrName', { rules: [{ required: true, whitespace: true, message: '参数名称不能为空' }] }]" :disabled="!isGroup && mode === 'edit' " />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="参数类型：" v-bind="formItemLayout">
              <iop-data-dict-radio
                ref="sex"
                type="attrType"
                :disabled="!isGroup && mode === 'edit' "
                v-decorator="['attrType', { rules: [{ required: true, whitespace: true, message: '请选择一个类型' }] }]"
                @change="attrTypeChange" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item :label="isGroup ? '上级分类：': '所属分类：'" v-bind="formItemLayout">
              <iop-data-tree-select
                ref="parentId"
                :disabled="!isGroup && mode === 'edit' "
                :url="treeUrl"
                v-decorator="['parentId']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <div v-show="!isGroup">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="9" :offset="2">
              <a-form-item label="参数类型：" v-bind="formItemLayout">
                <iop-data-dict-select
                  type="attrDatatype"
                  ref="attrDatatype"
                  :disabled="!isGroup && mode === 'edit' "
                  @change="onDatTypeChange"
                  v-decorator="['attrDatatype', { rules: [{ required: !isGroup, message: '参数类型不能为空' }] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item label="用户自定义：" v-bind="formItemLayout">
                <a-switch id="isUser" :checked="isUser" @change="onSwitchChange" :disabled="!isGroup && mode === 'edit' "/>
              </a-form-item>
            </a-col>
          </a-row>
          <div v-show="isFile">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
              <a-col :span="21" :offset="1">
                <a-form-item label="文件：" v-bind="textAreaformItemLayout">
                  <iop-upload-dragger ref="dragger" mode="edit" :id="localId" businessName="sysUserAttr" attrName="attrVallist" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div v-show="!isFile">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
              <a-col :span="9" :offset="2">
                <a-form-item label="缺省值：" v-bind="formItemLayout">
                  <a-input v-decorator="['attrDefault']" :disabled="!isGroup && mode === 'edit' " />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="排序号：" v-bind="formItemLayout">
                  <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" :disabled="!isGroup && mode === 'edit' " />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
              <a-col :span="21" :offset="1">
                <a-form-item label="可选值：" v-bind="textAreaformItemLayout">
                  <!-- <a-input v-decorator="['attrVallist']" :disabled="!isGroup && mode === 'edit' " /> -->
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
      </div>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-show="!isParameterShow &&!isCompleteShow">
        <a-col :span="21" :offset="1">
          <a-form-item label="备注：" v-bind="textAreaformItemLayout">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark']" :disabled="!isGroup && mode === 'edit' "/>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-show="isParameterShow">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="19" :offset="1">
            <a-form-item label="所属系统" v-bind="formItemLayout">
              <iop-data-dict-select
                type="appSelect"
                ref="appSelect"
                v-decorator="['appId']" />
            </a-form-item>
            <!-- <a-form-item label="所属功能：" v-bind="formItemLayout">
              <a-input v-decorator="['programId']" disabled />
            </a-form-item> -->
            <a-form-item label="所属环境" v-bind="formItemLayout">
              <iop-data-dict-select type="attrEnviro" ref="enviromentCode" v-decorator="['enviromentCode']" />
            </a-form-item>
            <a-form-item label="设定值" v-bind="formItemLayout" v-if="!isFile">
              <iop-data-dict-select ref="userVal" :type="code" v-decorator="['userVal']" v-if="isSelectCode" />
              <a-input v-decorator="['userVal']" v-else/>
            </a-form-item>
            <div v-if="isFile">
              <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
                <a-col :span="24" :offset="1">
                  <a-form-item label="文件：" v-bind="formItemLayouttext">
                    <iop-upload-dragger mode="edit" ref="dragger" :id="localId" businessName="sysUserVal" attrName="attrVallist" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-show="isCompleteShow">
        <div style="text-align:center">
          <p>是否返回修改？</p>
          <a-button type="primary" @click="back">返回修改</a-button>
        </div>
      </div>
      <input type="hidden" id="attrValId" :value="record.attrValId" />
      <input type="hidden" id="saveAll " :value="record.saveAll" />
    </template>
    <template #beforeOkButton v-if="isBeforeOkButton">
      <a-button type="primary" @click="next">下一步</a-button>
    </template>
    <template #afterOkButton v-if="isTwoBtn">
      <a-button type="primary" @click="nextStep">下一步</a-button>
      <a-button type="primary" @click="skip">跳过</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger } from '@/iop/components'
import sysUserAttrFormVO from './vo/sys-user-attr-form-vo'
import path from '@/iop/api/index'
import getuuid from '@/utils/uuid.js'

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
      vo: sysUserAttrFormVO,
      localId: '',
      isParameterShow: false,
      isInformationShow: true,
      isCompleteShow: false,
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      formItemLayouttext: {
        labelCol: { span: 6 },
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
      isBeforeOkButton: false,
      isTwoBtn: false,
      isBackBtn: false,
      saveAll: '',
      code: '',
      isSelectCode: false
    }
  },
  watch: {
    'isBackBtn' (val) {
      if (val) {
        this.isTwoBtn = false
      }
    },
    'isCompleteShow' (val) {
      if (val) {
        this.isTwoBtn = false
      }
    },
    'code' (val) {
      if (val) {
        this.isSelectCode = true
      }
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    attrId: {
      type: String,
      required: true
    },
    parentId: {
      type: String,
      required: false,
      default: '0'
    },
    attrValId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    getFormValue (list) {
      return this.$refs.sysUserAttrForm.getFieldsValue(list)
    },
    next () {
      const requiredList = ['attrCode', 'attrName', 'attrType', 'attrDatatype']
      const formValue = this.getFormValue(requiredList)
      let flag = true
      requiredList.forEach(x => {
        if (!formValue[x]) {
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('请填写所有必填项')
        return
      }
      this.isParameterShow = true
      this.isInformationShow = false
      this.isBeforeOkButton = false
      this.isTwoBtn = true
    },
    selectCode (res) {
      // 解决控制台code报undefined警告
      if (res.key === '' || res.data === undefined) {
        return
      }
      this.code = res.data.code
    },
    nextStep () {
      this.isParameterShow = false
      this.isCompleteShow = true
      this.saveAll = true
      this.isBackBtn = true
    },
    skip () {
      this.saveAll = false
      this.isParameterShow = false
      this.isCompleteShow = true
    },
    back () {
      // this.isTwoBtn = false
      // this.isBeforeOkButton = true
      if (!this.saveAll) {
        this.isInformationShow = true
        this.isParameterShow = false
        this.isCompleteShow = false
        this.isTwoBtn = false
        this.isBeforeOkButton = true
      } else {
        this.isInformationShow = false
        this.isParameterShow = true
        this.isCompleteShow = false
        this.isTwoBtn = true
        this.isBeforeOkButton = false
      }
    },
    show (parentNode) {
      this.isParameterShow = false
      this.isInformationShow = true
      this.isCompleteShow = false
      this.isBeforeOkButton = false
      this.isTwoBtn = false
      this.isBackBtn = false
      this.saveAll = ''
      let { attrValId } = this
      if (!attrValId) {
        attrValId = 'null'
      }
      this.loadQuery = { attrValId }
      this.$refs.sysUserAttrForm.showModal()
      this.$nextTick(() => {
        this.isSelectCode = false
        this.$refs.userVal && this.$refs.userVal.cleanSelected()
        this.$refs.attrVallist && this.$refs.attrVallist.cleanSelected()
        this.$refs.parentId && this.$refs.parentId.setSelected({
          title: parentNode.name,
          value: parentNode.id
        })
      })
      // this.localId = getuuid.generate()
      // this.$refs.dragger.setId(this.localId)
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
        this.localId = getuuid.generate()
        this.$nextTick(() => {
          // this.$refs.parentId.cleanSelected()
          this.$refs.appSelect && this.$refs.appSelect.cleanSelected()
          this.$refs.enviromentCode && this.$refs.enviromentCode.cleanSelected()
          this.$refs.attrDatatype && this.$refs.attrDatatype.cleanSelected()
        })
      } else {
        this.localId = this.attrId
        this.isGroup = (values.attrType === '0')
        this.isFile = (values.attrDatatype === '5')
        this.$nextTick(() => {
          this.$refs.parentId && this.$refs.parentId.setSelected({ title: values.parentName, value: values.parentId })
        })
      }
      return values
    },

    submitConvertor (values = {}) {
      if (!values.parentId) {
        values.parentId = '0'
      }
      if (this.mode === 'create') {
        Object.assign(values, { attrId: this.localId })
      }
      values.attrVallist = this.code
      Object.assign(values, { isUser: this.isUser ? '1' : '0' })
      Object.assign(values, { saveAll: this.saveAll })
      return values
    },

    attrTypeChange (event = '') {
      this.isGroup = (event.target.value === '0')
      if (event.target.value === '1') {
        this.isBeforeOkButton = true
      } else {
        this.isBeforeOkButton = false
      }
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
