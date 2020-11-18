<template>
  <iop-data-form
    ref="relationForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="relationId"
    :width="600"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-form-item label="关联类型" v-bind="formItemLayout">
        <iop-data-dict-radio @change="changeRelationType" type="relationType" v-decorator="['relationType', { rules: [{ required: true, whitespace: true, message: '关联类型不能为空' }, { max: 100, message: '类型不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="关联名称" v-bind="formItemLayout">
        <a-input v-decorator="['relationName', { rules: [{ required: true, whitespace: true, message: '关联名称不能为空' }, { max: 100, message: '名称不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="反向名称" v-bind="formItemLayout">
        <a-input v-decorator="['relationReverseName', { rules: [{ required: true, whitespace: true, message: '反向关联名称不能为空' }, { max: 100, message: '名称不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="资源属性" v-if="!isExtendsType" v-bind="formItemLayout">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="sourceData"
          placeholder="请选择"
          v-model="sourceId"
          :url="treeUrl"
        />
      </a-form-item>
      <a-form-item label="关联资源对象" :required="true" v-bind="formItemLayout">
        <iop-data-tree-select ref="formTree" :url="formUrl" :async="false" @change="onChange" v-decorator="['formObjectId', { rules: [{ required: true, whitespace: true, message: '关联资源对象不能为空' }] }]" />
      </a-form-item>
      <a-form-item label="关联资源属性" v-if="!isExtendsType && !isForeign" v-bind="formItemLayout">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="targetData"
          placeholder="请选择"
          v-model="targetId"
          :url="treeUrl"
        />
      </a-form-item>
      <a-form-item label="数据模型" :required="true" v-bind="formItemLayout">
        <iop-data-dict-select ref="dataModel" type="dataModel" v-decorator="['dataModel', { rules: [{ required: true, whitespace: true, message: '数据模型不能为空' }] }]"/>
      </a-form-item>
      <a-form-item label="关联条件" v-bind="formItemLayout">
        <a-input v-decorator="['relationCondition', { rules: [{ max: 100, message: '类型不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="启用状态" v-bind="formItemLayout">
        <a-switch :checked="openType" @change="onSwitchChange"/>
      </a-form-item>
      <a-form-item label="备注说明" v-bind="formItemLayout">
        <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio } from '@/iop/components'
import { TreeSelect } from 'ant-design-vue'
import relationFormVO from './vo/relation-form-vo'
import path from '@/iop-drms/api'
import attrs from '@/iop-drms/service/server/attr'

export default {
  name: 'RelationForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, ATreeSelect: TreeSelect },
  data () {
    return {
      relationType: '2',
      formUrl: '',
      treeUrl: '',
      sourceId: '',
      targetId: '',
      /** 表单加载、提交地址 */
      url: path.manage.rela.form,
      /** 表单定义 */
      vo: relationFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      openType: false,
      targetData: [
        { value: '', title: '请选择' }
      ],
      sourceData: []
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
    relationId: {
      type: String,
      required: false,
      default: ''
    },
    objectId: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    isForeign () {
      return this.relationType === '1'
    },
    isExtendsType () {
      return this.relationType === '4'
    }
  },
  methods: {
    changeRelationType (e) {
      this.relationType = e.target.value
    },
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.relationForm.showModal()
      this.getTree()
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.objectId = this.objectId
      value.sourceId = this.sourceId
      value.targetId = this.targetId
      value.openType = this.openType ? '1' : '0'
      return value
    },
    loadConvertor (values) {
      this.openType = values.openType === '1' ? this.openType = true : this.openType = false
      if (this.mode === 'create') {
        this.openType = false
        this.$refs.rela && this.$refs.rela.cleanSelected()
        this.$refs.formTree && this.$refs.formTree.cleanSelected()
        this.$refs.dataModel && this.$refs.dataModel.cleanSelected()
        this.sourceId = ''
        this.targetId = ''
        values.relationType = '1'
      } else {
        this.$nextTick(() => {
          this.$refs.formTree && this.$refs.formTree.setSelected({ title: values.formObjectName, value: values.formObjectId })
          this.$refs.dataModel && this.$refs.dataModel.setSelected(values.dataModel)
          this.sourceId = values.sourceId
          this.getAttrTree(values.formObjectId)
          this.targetId = values.targetId
        })
      }
      return values
    },
    reset (cb) {
      cb()
      const values = this.$refs.relationForm.record
      this.loadConvertor(values)
    },
    onSwitchChange (checked) {
      this.openType = checked
    },
    onChange (val) {
      this.targetId = ''
      if (val) {
        this.getAttrTree(val)
      } else {
        this.targetData = [{ value: '', title: '请选择' }]
      }
    },
    getAttrTree (val) {
      attrs.attrTree(val).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.targetData = data
        this.targetData.unshift({ value: '', title: '请选择' })
      })
    },
    getTree () {
      attrs.attrTree(this.objectId).then((res) => {
        console.log(res)
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.sourceData = data
        this.sourceData.unshift({ value: '', title: '请选择' })
      })
    }
  }
}
</script>
