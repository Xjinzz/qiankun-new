<template>
  <iop-data-form
    ref="baseCodeClaForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="claId"
    :loadConvertor="loadConvertor"
    @onSubmitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
  >
    <template #form>
      <a-form-item label="分类编号" v-bind="formItemLayout">
        <a-input placeholder="请输入分类编号" v-decorator="['claCode', { rules: [{ required: true, whitespace: true, message: '分类编号不能为空' }, { max: 100, message: '编号长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="分类名称" v-bind="formItemLayout">
        <a-input placeholder="请输入分类名称" v-decorator="['claName', { rules: [{ required: true, whitespace: true, message: '分类名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="上级分类" v-bind="formItemLayout">
        <iop-data-tree-select ref="parentIdTree" :url="treeUrl" v-decorator="['parentId']" />
      </a-form-item>
      <a-form-item label="分类排序号" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width: 100%;"/>
      </a-form-item>
      <a-form-item label="备注说明" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注说明" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}]}]"/>
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataTreeSelect } from '@/iop/components'
import { iopCodeclaService } from '@/iop/service'
import baseCodeClaFormVO from './vo/codecla-form-vo'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'

export default {
  name: 'BaseCodeClaForm',
  components: { IopDataForm, IopDataTreeSelect },
  data () {
    return {
      treeUrl: path.system.codecla.tree,
      url: path.system.codecla.index,
      vo: baseCodeClaFormVO,
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    claId: {
      type: String,
      required: false,
      default: null
    },
    parentId: {
      type: String,
      required: false,
      default: '0'
    }
  },
  methods: {
    show () {
      this.$refs.baseCodeClaForm.showModal()
    },

    submitConvertor (value) {
      if (!value.parentId) {
        value.parentId = '0'
      }
      return value
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        this.$refs.parentIdTree.cleanSelected()
        if (this.parentId !== '0') {
          iopCodeclaService.getById(this.parentId)
            .then((res) => {
              this.$nextTick(() => {
                this.$refs.parentIdTree.setSelected({ title: res.claName, value: res.claId })
              })
            })
            .catch((err) => MessageUtils.error(err))
        }
      } else {
        this.$refs.parentIdTree.setSelected({ title: value.parentName, value: value.parentId })
      }
      return value
    },

    submitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
