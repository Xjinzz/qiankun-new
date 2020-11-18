<template>
  <iop-data-form
    ref="codeForm"
    :url="url"
    :mode="mode"
    :id="codeId"
    :vo="vo"
    :width="700"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="formSubmitSuccess">
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="编码编号" v-bind="formItemLayout">
            <a-input placeholder="请输入编码编号" v-decorator="['codeNum', { rules: [{ required: true, whitespace: true, message: '编码编号不能为空' }, { max: 100, message: '编码长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="编码名称" v-bind="formItemLayout">
            <a-input placeholder="请输入编码名称" v-decorator="['codeName', { rules: [{ required: true, whitespace: true, message: '编码名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="编码类型" v-bind="formItemLayout">
            <iop-data-dict-radio type="codeKind" v-decorator="['codeType']" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="编码分类" v-bind="formItemLayout">
            <iop-data-tree-select ref="claTree" :url="claUrl" v-decorator="['claId']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="23" :offset="2">
          <a-form-item label="属性描述" v-bind="textAreaformItemLayout">
            <a-textarea placeholder="请输入属性描述" v-decorator="['codeDesc', { rules: [{ max: 500, message: '描述长度不能超过500'}]}]" :autosize="{minRows: 4}"/>
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </iop-data-form>
</template>
<script>
import baseCodeFormVO from './vo/base-code-form-vo'
import { IopDataForm, IopDataDictRadio, IopDataTreeSelect } from '@/iop/components'
import path from '@/iop/api'
import { iopCodeclaService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'BaseCodeInfoForm',
  components: { IopDataForm, IopDataDictRadio, IopDataTreeSelect },
  data () {
    return {
      url: path.system.code.index,
      vo: baseCodeFormVO,
      claUrl: path.system.codecla.tree,
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
      }
    }
  },
  props: {
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    codeId: {
      type: String,
      required: true
    },
    claId: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  methods: {
    loadConvertor (value) {
      if (this.mode !== 'create') {
        this.$refs.claTree.setSelected({ title: value.claName, value: value.claId })
      } else {
        this.$refs.claTree.cleanSelected()
        if (this.claId !== '0') {
          iopCodeclaService.getById(this.claId)
            .then((res) => {
              this.$nextTick(() => {
                this.$refs.claTree.setSelected({ title: res.claName, value: res.claId })
              })
            })
            .catch((err) => { MessageUtils.error(err) })
        }
      }
      return value
    },

    submitConvertor (value = {}) {
      if (!value.claId) {
        value.claId = '0'
      }
      return value
    },

    show () {
      this.$refs.codeForm.showModal()
      this.$nextTick(() => {
        this.$refs.codeForm && this.$refs.codeForm.load()
      })
    },

    formSubmitSuccess (result = {}) {
      this.$emit('onSubmitSuccess', result.claId)
    }
  }
}
</script>
