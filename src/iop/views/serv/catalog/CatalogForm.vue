<template>
  <iop-data-form
    ref="catalogForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="serviceId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-form-item label="目录编码" v-bind="formItemLayout">
        <a-input placeholder="请输入目录编码" v-decorator="['serviceCode', { rules: [{ required: true, whitespace: true, message: '目录编码不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="目录名称" v-bind="formItemLayout">
        <a-input placeholder="请输入目录名称" v-decorator="['chName', { rules: [{ required: true, whitespace: true, message: '目录名称不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="上级分类：" v-bind="formItemLayout">
        <iop-data-tree-select
          ref="parentId"
          :url="treeUrl"
          v-decorator="['parentId']"/>
      </a-form-item>
      <a-form-item label="排序号" v-bind="formItemLayout">
        <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]" />
      </a-form-item>
      <a-form-item label="目录说明" v-bind="formItemLayout">
        <a-input placeholder="请输入目录说明" v-decorator="['remark']" maxLength="500"/>
      </a-form-item>
      <input id="levelCode" type="hidden" :value="record.levelCode" />
      <input id="lng" type="hidden" :value="record.lng" />
      <input id="lat" type="hidden" :value="record.lat" />
      <input id="servLevel" type="hidden" :value="record.servLevel" />
      <input id="secretLevel" type="hidden" :value="record.secretLevel" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import catalogFromVo from './vo/catalog-form-vo'
import path from '@/iop/api/index'
import UUIDUtils from '@/utils/uuid'

// TODO 下拉树组件
export default {
  name: 'CatalogForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.index,
      treeUrl: path.system.serv.tree,
      /** 表单定义 */
      vo: catalogFromVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
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
    serviceId: {
      type: String,
      required: false,
      default: null
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: '0'
    },
    /** 上级行政区域name */
    parentName: {
      type: String,
      required: false,
      default: '全部'
    }
  },
  created () {
    if (this.mode === 'create') {
      this.uuservId = UUIDUtils.generate()
    } else {
      this.uuservId = this.$route.query.serviceId
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.catalogForm.showModal()
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { serviceId } = this
        Object.assign(value, { serviceId })
      }
      if (this.mode === 'create') {
        Object.assign(value, {
          serviceId: this.uuservId,
          parentId: this.parentId
        })
      }
      return value
    },
    loadConvertor (value) {
      if (this.mode === 'create') {
        value.orderNum = ''
        let { parentId, parentName } = this
        if (!parentId) {
          parentId = '0'
          parentName = '全部'
        }
        value.parentId = parentId
        this.$nextTick(() => {
          this.$refs.parentId.setSelected({ title: parentName, value: parentId })
        })
      } else {
        value.orderNum = value.orderNum ? value.orderNum : ''
        this.$nextTick(() => {
          value.parentId && this.$refs.parentId.setSelected({ title: value.parentName, value: value.parentId })
        })
      }
      return value
    }
  }
}
</script>
