<template>
  <iop-data-form
    ref="typesForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :destroyOnClose="true"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-form-item label="授权类型名称" v-bind="formItemLayout">
        <a-input placeholder="请输入授权类型名称" v-decorator="['typeName', { rules: [{ required: true, whitespace: true, message: '授权类型名称不能为空' }, {max: 100, message: '最多100位'}] }]" />
      </a-form-item>
      <a-form-item label="授权类型编码" v-bind="formItemLayout">
        <a-input placeholder="请输入授权类型编码" v-decorator="['typeCode', { rules: [{ required: true, whitespace: true, message: '授权类型编码不能为空' }, {max: 100, message: '最多100位'}] }]" />
      </a-form-item>
      <a-form-item label="上级目录" v-bind="formItemLayout">
        <iop-data-tree-select
          v-if="treeUrl !== ''"
          ref="parentId"
          :url="selectTreeUrl"
          v-decorator="['parentId']"/>
      </a-form-item>
      <a-form-item label="节点类型" v-bind="formItemLayout">
        <a-radio-group v-model="nodeType" @change="onChange">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">对象</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注说明最多500位' }]}]" />
      </a-form-item>
      <input id="appId" type="hidden" :value="record.appId" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import typesFormVo from './vo/types-form-vo.js'
import path from '@/iop/api/index'

export default {
  name: 'TypesForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    appId: {
      type: String,
      required: true,
      default: ''
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    id: {
      type: String,
      required: false,
      default: null
    },
    parentId: {
      type: String,
      required: false,
      default: '0'
    },
    parentName: {
      type: String,
      required: false,
      default: '0'
    },
    treeUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.permit.types.index,
      selectTreeUrl: this.treeUrl,
      /** 表单定义 */
      vo: typesFormVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      nodeType: 1
    }
  },
  watch: {
    treeUrl (val) {
      this.selectTreeUrl = val
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.typesForm.showModal()
    },
    onChange (e) {
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      if (this.mode === 'edit') {
        value.typeId = this.id
      }
      if (this.nodeType === 1) {
        value.authUrl = ''
      } else {
        value.authUrl = 'ANY'
      }
      value.parentId = value.parentId ? value.parentId : '0'
      Object.assign(value, {
        appId: this.appId
      })
      return value
    },
    loadConvertor (value) {
      if (this.mode === 'create') {
        this.nodeType = 1
        value.parentId = this.parentId
        this.$nextTick(() => {
          value.parentId && this.$refs.parentId.setSelected({ title: this.parentName, value: value.parentId })
        })
      } else {
        if (value.authUrl) {
          this.nodeType = 2
        } else {
          this.nodeType = 1
        }
        this.$nextTick(() => {
          value.parentId && this.$refs.parentId.setSelected({ title: value.parentName, value: value.parentId })
        })
      }
      return value
    }
  }
}
</script>
