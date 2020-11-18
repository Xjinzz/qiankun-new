<template>
  <div>
    <a-modal v-model="visible" :title="title" @cancel="handleCancel">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form-item label="流程引擎名称：" v-bind="formItemLayout">
              <a-select v-decorator="['engId', { rules: [{ required: true, whitespace: true, message: '请选择流程引擎名称' }]}]" placeholder="请选择流程引擎名称" style="width:100%" @change="handleChange">
                <a-select-option
                  v-for="item in engList"
                  :key="item.id"
                  :value="item.id">
                  {{ item.engName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="备注" v-bind="formItemLayout">
              <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button @click="handleCancel" >取消</a-button>
        <a-button type="primary" @click="submit" >提交</a-button>
      </template>
    </a-modal>
  </div>

</template>
<script>
import { IopDataForm } from '@/iop/components/index'
import { iopBpmsDefInfoService } from '@/iop/service'
import MessageUtils from '@/utils/message'
export default {
  /** 定义与引擎 表单 */
  name: 'DefToEngForm',
  components: { IopDataForm },
  data () {
    return {
      visible: false,
      title: '新增',
      form: this.$form.createForm(this),
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      /** 引擎注册的列表 */
      engList: [],
      engId: '',
      remark: '',
      id: ''
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
    /** 流程定义id */
    defId: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    /**
     * 流程引擎下拉事件
     */
    handleChange (value) {
      this.engId = value
    },
    /**
     * 提交
     */
    submit () {
      try {
        this.form.validateFields(async (error) => {
          if (!error) {
            const query = this.form.getFieldsValue()
            const data = {
              bpmsDefId: this.defId,
              remark: query.remark,
              engId: query.engId,
              id: this.id ? this.id : ''
            }
            if (this.id) {
              await iopBpmsDefInfoService.putDefToEng(this.id, data)
            } else {
              await iopBpmsDefInfoService.addDefToEng(data)
            }
            this.handleCancel()
            this.submitSuccess()
          }
        })
      } catch (error) {
        MessageUtils.error(error)
      }
    },
    /**
     * 取消
     */
    handleCancel () {
      this.visible = false
      this.engId = ''
      this.remark = ''
    },
    /**
     * 显示弹窗
     */
    async show (mode, id = '') {
      this.visible = true
      this.engId = ''
      this.remark = ''
      await this.load()
      if (mode === 'edit') {
        this.id = id
        this.title = '编辑'
        await this.info()
      } else {
        this.id = ''
        this.title = '新增'
      }
    },
    /**
     * 引擎列表
     */
    async load () {
      try {
        const { defId } = this
        const res = await iopBpmsDefInfoService.getEngRegList(defId)
        this.engList = res.data
      } catch (error) {
        MessageUtils.error(error)
      }
    },
    /**
     * 编辑详情
     */
    async info () {
      try {
        const { id } = this
        const res = await iopBpmsDefInfoService.getDefToEngInfo(id)
        this.engId = res.engId
        this.remark = res.remark
      } catch (error) {
        MessageUtils.error(error)
      }
    }
  }
}
</script>
