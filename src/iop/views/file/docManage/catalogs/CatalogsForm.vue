<template>
  <div>
    <iop-data-form
      ref="catalogsForm"
      :mode="mode"
      :url="url"
      :vo="vo"
      :id="ctlgId"
      :width="1200"
      :title="'基本信息'"
      :showType="showType"
      :submitSuccess="submitSuccess"
      :submitConvertor="submitConvertor"
      :loadConvertor="loadConvertor"
      v-bind="$attrs"
    >
      <template #beforResetButton>
        <a-button @click="cancel">取消</a-button>
        <a-divider type="vertical" />
      </template>
      <template #form>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="目录名称">
              <a-input placeholder="请输入目录名称" v-decorator="['ctlgName', { rules: [{ required: true, whitespace: true, message: '目录名称不能为空' }] }]" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="目录编码">
              <a-input placeholder="请输入目录编码" v-decorator="['ctlgCode', { rules: [{ required: true, whitespace: true, message: '目录编码不能为空' }] }]" maxLength="100"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="父级目录">
              <iop-data-tree-select
                ref="parentId"
                :url="treeUrl"
                v-decorator="['parentId']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="公开范围">
              <iop-data-dict-select type="CTLG_SEC_LEVEL" ref="ctlgType" v-decorator="['ctlgType']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="分配空间">
              <a-input placeholder="请输入正整数" addon-after="GB" v-decorator="['capacity', { rules: [{ pattern: new RegExp(/^[1-9]\d{0,9}$/), message: '只能输入1-10位正整数' },{required: true, message: '请输入分配空间'}] }]" maxLength="100"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="访问URL">
              <a-input placeholder="请输入访问URL" v-decorator="['url']" maxLength="200"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="排序号">
              <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-bind="formItemLayout" label="备注">
              <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注说明最多500位' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
    </iop-data-form>
    <a-tabs defaultActiveKey="1" v-model="tabKey" v-if="$route.query.mode !== 'create' && showList">
      <a-tab-pane tab="文档库管理" key="1">
        <!-- 文档库管理 -->
        <catalogs-files-list :searchFlag="true" :id="$route.query.ctlgId ? $route.query.ctlgId : ''"/>
      </a-tab-pane>
      <a-tab-pane tab="文件来源查看" key="2">
        <!-- 文件来源查看 -->
        <source-list :id="$route.query.ctlgId ? $route.query.ctlgId : ''"/>
      </a-tab-pane>
      <a-tab-pane tab="关联文档类型" key="3">
        <!-- 关联文档类型 -->
        <file-types-list :id="$route.query.ctlgId ? $route.query.ctlgId : ''"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import path from '@/iop/api/index'
import catalogsFormVo from './vo/catalogs-form-vo.js'
import CatalogsFilesList from '../manage/CatalogsFilesList'
import SourceList from './SourceList'
import FileTypesList from './FileTypesList'

export default {
  inheritAttrs: false,
  name: 'CatalogsForm',
  components: {
    IopDataForm,
    IopDataDictSelect,
    IopDataTreeSelect,
    CatalogsFilesList,
    SourceList,
    FileTypesList
  },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      url: path.file.catalogs.add,
      treeUrl: path.file.catalogs.fileTree,
      vo: catalogsFormVo,
      ctlgId: this.$route.query.ctlgId ? this.$route.query.ctlgId : '',
      showType: '',
      showList: '',
      mode: '',
      tabKey: '1'
    }
  },
  mounted () {
    this.mode = this.$route.query.mode ? this.$route.query.mode : 'view'
    this.tabKey = '1'
    if (this.mode === 'edit') {
      this.showList = true
      this.showType = 'page'
      this.$refs.catalogsForm.load()
    } else if (this.mode === 'create') {
      this.showList = false
      this.showType = 'page'
    } else if (this.mode === 'view') {
      this.showType = 'modal'
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    show (ctlgId = '', showList) {
      if (this.mode === 'view' && !showList) {
        this.mode = 'view'
        this.showType = 'modal'
        this.ctlgId = ctlgId
        this.$refs.catalogsForm.showModal()
      }
    },
    clearSelect () {
      this.$nextTick(() => {
        this.$refs.ctlgType.cleanSelected()
        this.$refs.parentId.cleanSelected()
      })
    },
    reset () {
      this.clearSelect()
      this.$nextTick(() => {
        this.$refs.catalogsForm.load()
      })
    },
    submitSuccess () {
      this.$goPage('file/catalogs')
    },
    submitConvertor (val) {
      if (this.$route.query.mode === 'create') {
        if (!val.parentId) {
          val.parentId = '0'
        }
      }
      return val
    },
    loadConvertor (val) {
      this.$nextTick(() => {
        val.ctlgType && this.$refs.ctlgType.setSelected(val.ctlgType)
      })
      return val
    }
  }
}
</script>
<style scoped>
.ant-tabs >>> .ant-tabs-nav-scroll {
  overflow: hidden;
  white-space: nowrap;
  background: #fff;
}
</style>
