<template>
  <iop-data-form
    ref="segmentForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="segmentId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-form-item label="码段开始位" v-bind="formItemLayout">
        <a-input v-decorator="['segmentStart', { rules: [{ required: true, whitespace: true, message: '码段开始位不能为空' }, { max: 100, message: '码段开始位不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="码段结束位" v-bind="formItemLayout">
        <a-input v-decorator="['segmentEnd', { rules: [{ required: true, whitespace: true, message: '码段结束位不能为空' }, { max: 100, message: '码段结束位不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="码段类型" v-bind="formItemLayout">
        <iop-data-dict-select @change="onChange" ref="segmentType" type="segmentType" v-decorator="['segmentType', { rules: [{ required: true, whitespace: true, message: '列取值类型不能为空' }] }]"/>
      </a-form-item>
      <a-form-item v-if="typeChange === '3'" label="自动生成" v-bind="formItemLayout">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="rulesData"
          placeholder="请选择"
          v-decorator="['rolrId']"
          :url="treeUrl"
        />
      </a-form-item>
      <a-form-item v-if="typeChange === '5'" label="固定值" v-bind="formItemLayout">
        <a-input v-decorator="['valDef', { rules: [{ required: true, whitespace: true, message: '取值编码不能为空' }, { max: 100, message: '取值编码不能超过100'}] }]" />
      </a-form-item>
      <a-form-item v-else-if="typeChange === '7'" label="引用属性" v-bind="formItemLayout">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="dictData"
          placeholder="请选择"
          v-decorator="['codeId']"
          :url="treeUrl"
        />
      </a-form-item>
      <a-form-item v-else-if="typeChange === '9'" label="引用主数据" v-bind="formItemLayout">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="parentData"
          placeholder="请选择"
          v-model="refDefiId"
          :url="treeUrl"
        />
      </a-form-item>
      <a-form-item label="简单说明" v-bind="formItemLayout">
        <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import segmentFormVO from './vo/segment-form-vo'
import path from '@/iop-drms/api'
import { TreeSelect } from 'ant-design-vue'
import objects from '@/iop-drms/service/server/object'

export default {
  name: 'SegmentForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, ATreeSelect: TreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.manage.segment.form,
      /** 表单定义 */
      vo: segmentFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      objectId: '',
      typeChange: '1',
      parentData: [],
      dictData: [],
      rulesData: [],
      treeUrl: '',
      ch: '',
      refDefiId: ''
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
    segmentId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    reset (cb) {
      const record = this.$refs.segmentForm.record
      this.$refs.segmentType.onChange(record.segmentType || '')
      cb()
    },
    loadConvertor (values) {
      const dictSelectArray = ['segmentType']
      if (this.mode === 'create') {
        values.objectId = this.objectId
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name] && this.$refs[name].cleanSelected()
          })
          this.refDefiId = ''
        })
      } else {
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name] && this.$refs[name] && this.$refs[name].setSelected(values[name])
          })
          this.typeChange = values.segmentType
          this.ch = values.segmentType
          this.refDefiId = values.refDefiId
        })
      }
      return values
    },
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.segmentForm.showModal()
      this.getTree()
    },
    // 加载树形
    getTree () {
      objects.authTree({ objectId: this.objectId }).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key').replace(/code/g, 'value'))
        this.parentData = data
      })
      objects.codeTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.dictData = [data]
      })
      objects.rulesTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.rulesData = [data]
      })
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.refDefiId = this.refDefiId
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'edit') {
        const { segmentId } = this
        Object.assign(value, { segmentId })
      }
      return value
    },
    onChange (val) {
      this.typeChange = val
      if (this.ch !== val) {
        this.ch = val
      }
    }
  }
}
</script>
