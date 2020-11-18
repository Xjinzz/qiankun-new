<template>
  <iop-data-form
    ref="pubDeptForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="deptId"
    @onSubmitSuccess="formSubmitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :showType="showType"
    :showPageHeader="showPageHeader"
    :title="formTitle"
    :submitQuery="submitQuery"
  >
    <template #form="{ record }">
      <a-row :gutter="rowLayout">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构编码" v-bind="formItemLayout">
            <a-input placeholder="请输入机构编码" v-decorator="['deptCode', { rules: [{ required: true, whitespace: true, message: '机构编码不能为空' }, { max: 100, message: '编码长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="机构名称：" v-bind="formItemLayout">
            <a-input placeholder="请输入机构名称" v-decorator="['deptName', { rules: [{ required: true, whitespace: true, message: '机构名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="rowLayout">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构简称：" v-bind="formItemLayout">
            <a-input placeholder="请输入机构简称" v-decorator="['shortName', { rules: [{ required: true, whitespace: true, message: '机构简称不能为空' }, { max: 100, message: '简称长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="上级机构：" v-bind="formItemLayout">
            <iop-data-tree-select ref="parentTree" :loadQuery="{manager:1}" :url="parentUrl" v-decorator="['parentId', { rules: [{ required: true, whitespace: true, message: '上级机构必选' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="rowLayout">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构类型：" v-bind="formItemLayout">
            <iop-data-dict-radio type="deptType" v-decorator="['deptType', { rules: [{ required: true, whitespace: true, message: '请选择机构类型' }] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="行政级别：" v-bind="formItemLayout">
            <iop-data-dict-select ref="deptLevel" type="deptLevel" v-decorator="['deptLevel']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="rowLayout">
        <a-col :span="9" :offset="2">
          <a-form-item label="真实机构：" v-bind="formItemLayout">
            <a-switch :checked="isTrue" @change="onSwitchChange" checked-children="是" un-checked-children="否" default-checked />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="排序号：" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-show="advanced">
        <a-row :gutter="rowLayout">
          <a-col :span="9" :offset="2">
            <a-form-item label="机构性质" v-bind="formItemLayout">
              <iop-data-dict-select ref="deptXinzhi" type="deptXinzhi" v-decorator="['deptXinzhi']" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="机构种类" v-bind="formItemLayout">
              <iop-data-dict-select ref="deptKind" type="deptKind" v-decorator="['deptKind']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="rowLayout">
          <a-col :span="9" :offset="2">
            <a-form-item label="行政区域" v-bind="formItemLayout">
              <iop-data-tree-select ref="areaTree" :url="areaUrl" v-decorator="['areaId']" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="数据来源" v-bind="formItemLayout">
              <a-input v-decorator="['source']" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="rowLayout">
          <a-col :span="9" :offset="2">
            <a-form-item label="主管人员" v-bind="formItemLayout">
              <a-input placeholder="请输入主管人员" v-decorator="['chargeName', {rules : [{ max: 100, message: '主管人员长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="助记符" v-bind="formItemLayout">
              <a-input placeholder="请输入助记符" v-decorator="['zjf', { rules: [{ max: 100, message: '助记符长度不能超过100'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="rowLayout">
          <a-col :span="23" :offset="2">
            <a-form-item label="职能描述" v-bind="textAreaformItemLayout">
              <a-textarea placeholder="请输入职能描述" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '描述长度不能超过500'}]}]"/>
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
      <!-- 机构在系统内部的标识 -->
      <input type="hidden" id="deptStatus" :value="record.deptStatus" />
      <!-- 是否删除 -->
      <input type="hidden" id="isDel" :value="record.isDel" />
      <!-- LDAP同步标志 -->
      <input type="hidden" id="ldapFlag" :value="record.ldapFlag" />
      <!-- LDAP上次同步时间 -->
      <input type="hidden" id="ldapLastTime" :value="record.ldapLastTime" />
      <!-- 标识的HASH值组成的串 -->
      <input type="hidden" id="levelCode" :value="record.levelCode" />
      <!-- 岗位编码 -->
      <input type="hidden" id="postCode" :value="record.postCode" />
    </template>
  </iop-data-form>
</template>
<script>
import { iopAreaService, iopPubDeptService } from '@/iop/service/index'
import pubDeptFormVO from './vo/pub-dept-form-vo'
import { IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopDataForm } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'

export default {
  name: 'PubDeptForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      parentUrl: path.system.pubDept.tree,
      areaUrl: path.system.area.tree,
      vo: pubDeptFormVO,
      isTrue: true,
      localParentId: '',
      rowLayout: { xs: 8, sm: 16, md: 24, lg: 32 },
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
      advanced: false
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    deptId: {
      type: String,
      required: false,
      default: ''
    },
    parentId: {
      type: String,
      required: false,
      default: ''
    },
    showType: {
      type: String,
      required: false,
      default: 'modal'
    },
    url: {
      type: String,
      required: false,
      default: path.system.pubDept.index
    },
    showPageHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    formTitle: {
      type: String,
      required: false,
      default: ''
    },
    submitQuery: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    show () {
      this.$refs.pubDeptForm.showModal()
      this.advanced = false
    },

    submit () {
      this.$refs.pubDeptForm.submitForm()
    },

    load () {
      this.$nextTick(() => {
        this.$refs.pubDeptForm.load()
      })
    },

    loadConvertor (values) {
      const dictSelectArray = ['deptLevel', 'deptKind', 'deptXinzhi']
      if (this.mode === 'create') {
        this.isTrue = true
        values.orderNum = '1'
        values.parentId = this.parentId

        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].cleanSelected()
          })
          this.$refs.areaTree.cleanSelected()
        })
      } else {
        this.isTrue = (values.isTrue === '1')
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].setSelected(values[name])
          })
          this.initAreaTree(values.areaId)
        })
      }
      if (values.parentId && values.parentId !== '0') {
        iopPubDeptService.getById(values.parentId)
          .then((res) => {
            this.$refs.parentTree.setSelected({ title: res.deptName, value: res.deptId })
          })
          .catch((err) => MessageUtils.error(err))
      } else {
        this.$refs.parentTree.cleanSelected()
      }
      return values
    },

    async initAreaTree (areaId = '') {
      if (areaId) {
        const record = await iopAreaService.getById(areaId)
        this.$refs.areaTree.setSelected({ title: record.fullName, value: record.areaId })
      } else {
        this.$refs.areaTree.cleanSelected()
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      let { parentId } = value
      if (!parentId) {
        parentId = '0'
      }
      this.localParentId = parentId
      Object.assign(value, { isTrue: this.isTrue ? '1' : '0', parentId })
      if (this.mode === 'create' || !value.deptStatus) {
        Object.assign(value, { deptStatus: '1' })
      }
      return value
    },

    onSwitchChange (checked) {
      this.isTrue = checked
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    formSubmitSuccess () {
      this.$emit('onSubmitSuccess', this.localParentId)
    }
  }
}
</script>
