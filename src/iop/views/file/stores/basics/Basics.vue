<template>
  <iop-data-form
    ref="basicsForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="storeId"
    :showType="showType"
    :width="width"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文件库名称" v-bind="formItemLayout">
            <a-input placeholder="请输入文件库名称" v-decorator="['storeName', { rules: [{ required: true, whitespace: true, message: '文件库名称不能为空' }, { max: 100, message: '文件库名称长度不能超过100'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文件库编码" v-bind="formItemLayout">
            <a-input placeholder="请输入文件库编码" v-decorator="['storeCode', { rules: [{ required: true, whitespace: true, message: '文件库编码不能为空' }, { max: 100, message: '文件库编码长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="资源对象名称" v-bind="formItemLayout">
            <iop-data-tree-select
              ref="defiId"
              :url="defiUrl"
              @onSelect="defiSelect"
              query="parentId"
              v-decorator="['defiId']"
            />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="资源主键标识" v-bind="formItemLayout">
            <!--
            <iop-data-tree-select
            v-if="defiStu"
            ref="busiIdName"
            :url="busiUrl"
            :loadQuery="busiQuery"
            @onSelect="busiSelect"
            query=""
            v-decorator="['busiIdName']"
            />
            -->
            <a-select ref="busiIdName" v-model="state.busiIdName">
              <a-select-option v-for="(item) in dataSource.busiIdName" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="资源物理表名称" v-bind="formItemLayout">
            <a-input placeholder="请输入资源物理表名称" v-decorator="['busiTable', { rules: [{ max: 100, message: '表名称长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文件处理接口" v-bind="formItemLayout">
            <a-input placeholder="请输入文件处理接口" v-decorator="['procClass', { rules: [{ max: 100, message: '接口长度不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文件库根目录" v-bind="formItemLayout">
            <a-input placeholder="请输入文件库根目录" v-decorator="['rootPath', { rules: [{ required: true, whitespace: true, message: '文件库根目录长度不能为空' }, { max: 100, message: '根目录不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="子文件夹命名规则" v-bind="formItemLayout">
            <iop-data-dict-select ref="folderNameRule" type="FOLDER_NAME_RULE" v-decorator="['folderNameRule', { rules: [{ required: true, whitespace: true, message: '子文件夹命名规则不能为空' }] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文档库容量(GB)" v-bind="formItemLayout">
            <a-input-number style="width: 100%" v-decorator="['capacity', { rules: [{ required: true, message: '文档库容量不能为空' }, { pattern: /^[0-9]{0,7}$/, message: '文件库容量最多7位'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="备注" v-bind="formItemLayout">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import typesFormVO from './vo/types-form-vo'
import path from '@/iop/api'
import Service from '@/iop/service/file/stores'

// TODO 下拉树组件
export default {
  name: 'BasicsForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      storeId: '',
      mode: '',
      width: 1000,
      showType: 'modal',
      /** 表单加载、提交地址 */
      url: path.file.stores.table,
      /** 表单定义 */
      vo: typesFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      loadQuery: { parentId: '0' },
      busiQuery: { parentId: '0' },
      // /iop/drms/auth/tree-visit?roleId=0&type=T_DRMS_OBJECT
      defiUrl: '/iop/drms/object/tree-other',
      // /iop/drms/auth/tree-attr?roleId=0&type=T_DRMS_OBJECT
      defiName: '',
      busiName: '',
      defiStu: true,
      state: {
        selectedKey: '',
        busiIdName: ''
      },
      dataSource: {
        busiIdName: []
      }
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show (mode = 'create', id = '', showList = false) {
      this.storeId = id
      this.mode = mode
      this.busiQuery.parentId = '0'
      if (this.mode === 'create') {
        this.showType = 'modal'
        this.$refs.basicsForm.showModal()
      } else if (this.mode === 'view' && showList === true) {
        this.showType = 'modal'
        this.$refs.basicsForm.showModal()
      } else {
        this.showType = 'page'
        this.$nextTick(() => {
          this.$refs.basicsForm.load()
        })
      }
    },
    /**
     * 加载前
     */
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.defiId && this.$refs.defiId.cleanSelected()
          this.state.busiIdName = ''
          this.$refs.folderNameRule && this.$refs.folderNameRule.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          this.busiQuery.parentId = values.defiId
          this.$refs.defiId && this.$refs.defiId.setSelected({ title: values.defiName, value: values.defiId })
          setTimeout(() => {
            this.state.busiIdName = values.busiIdName
            this.defiName = values.defiName
          })
          this.$refs.folderNameRule && this.$refs.folderNameRule.setSelected(values.folderNameRule)
        })
      }
      return values
    },
    findItemById (arr, id) {
      const fileterList = arr.filter(x => {
        return x.id === id
      })
      return fileterList[0] || null
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.rootPath = value.storeCode
      value.busiIdName = this.state.busiIdName
      value.defiName = this.defiName
      const item = this.findItemById(this.dataSource.busiIdName, this.state.busiIdName)
      value.busiIdNameCn = (item && item.name) || ''
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { storeId } = this
        Object.assign(value, { storeId })
      }
      return value
    },
    // 重置
    reset (cb) {
      cb()
      const values = this.$refs.basicsForm.record
      if (this.mode === 'created') {
        this.$refs.defiId && this.$refs.defiId.cleanSelected()
        this.$refs.folderNameRule && this.$refs.folderNameRule.cleanSelected()
      } else {
        this.busiQuery.parentId = values.defiId
        this.$refs.defiId && this.$refs.defiId.setSelected({ title: values.defiName, value: values.defiId })
        this.$refs.folderNameRule && this.$refs.folderNameRule.setSelected(values.folderNameRule)
      }
    },
    defiSelect (key) {
      key.data ? this.defiName = key.data.name : this.defiName = ''
      key.key ? this.busiQuery.parentId = key.key : this.busiQuery.parentId = '0'
      this.state.busiIdName = ''
      Service.getDefiList(key.key)
        .then(x => {
          this.dataSource.busiIdName = x
          this.defiStu = false
          this.$nextTick(() => {
            this.defiStu = true
          })
        })
    },
    busiSelect (key) {
      key.data ? this.busiName = key.data.name : this.busiName = ''
    }
  }
}
</script>
