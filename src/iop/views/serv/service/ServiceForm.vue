<template>
  <iop-data-form
    ref="serviceForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="$route.query.serviceId ? $route.query.serviceId : ''"
    :width="1200"
    :showType="'page'"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    v-bind="$attrs"
  >
    <template #form>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="应用系统">
            <iop-service-app-select v-if="thirdparty === 'invoke'" ref="serviceAppSelect" v-decorator="['appId', { rules: [{ required: true, whitespace: true, message: '请选择应用系统' }] }]" />
            <iop-data-dict-select v-else ref="appSelect" type="appSelect" v-decorator="['appSelect', { rules: [{ required: true, whitespace: true, message: '请选择应用系统' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务中文名">
            <a-input placeholder="请输入服务中文名" v-decorator="['chName', { rules: [{ required: true, whitespace: true, message: '服务中文名不能为空' }, { max: 100, message: '服务中文名最多100位' }] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务分类">
            <iop-data-dict-select type="serviceKind" ref="serviceKind" v-decorator="['serviceKind']" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="业务分类码">
            <iop-data-dict-select type="servBusiType" ref="serviceType" v-decorator="['serviceType']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="thirdparty !== 'invoke'" type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item label="所属单位：" v-bind="formItemLayout">
            <iop-data-tree-select ref="deptTree" :url="deptTreeUrl" @onSelect="getDepName" v-decorator="['deptId']"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="上级分类：" v-bind="formItemLayout">
            <iop-data-tree-select
              ref="parentId"
              :url="treeUrl"
              v-decorator="['parentId']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务编码">
            <a-input placeholder="请输入服务编码" v-decorator="['serviceCode', { rules: [{ required: true, whitespace: true, message: '服务编码不能为空' },{ max: 100, message: '服务编码最多100位' }] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="运行模式">
            <iop-data-dict-radio type="runType" v-decorator="['runType', { initialValue: '0' }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务出口地址">
            <a-input placeholder="请输入服务出口地址" v-decorator="['outAddr', {rules: [{ max: 200, message: '服务出口地址最多200位' }]}]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="授权方式">
            <iop-data-dict-radio type="authType" v-decorator="['authType', { initialValue: '0' }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="是否启用">
            <a-switch id="isUser" :checked="isValide" @change="changeValide" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开放条件">
            <iop-data-dict-radio type="openCond" v-decorator="['openCond']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="测试方法">
            <a-input placeholder="请输入测试方法" v-decorator="['testMethod', { max: 100, message: '系统编码最多100位' }]" maxLength="100"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="实现类">
            <a-input placeholder="请输入实现类" v-decorator="['classDef']" maxLength="100"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="展现地址">
            <a-input placeholder="请输入展现地址" v-decorator="['showAddr']" maxLength="200"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务入口地址">
            <a-input placeholder="请输入服务入口地址" v-decorator="['inAddr']" maxLength="200"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start">
        <a-col :span="24">
          <a-form-item label="服务备注" v-bind="{ labelCol: { span: 3 }, wrapperCol: { span: 19 } }">
            <a-textarea placeholder="请输入服务备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark']" maxLength="500"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="示例代码">
            <iop-upload-dragger :id="uuservId" :mode="mode" :attrName="'sampleCode'" :businessName="'servService'" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="服务说明">
            <iop-upload-dragger :id="uuservId" :mode="mode" :attrName="'helpDoc'" :businessName="'servService'" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
    <template #closeButton>
      <a-button @click="goBack">返回</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger, IopServiceAppSelect } from '@/iop/components'
import serviceFormVO from './vo/service-form-vo'
import path from '@/iop/api/index'
import UUIDUtils from '@/utils/uuid'
// 服务管理-服务列表新建、接入管理-服务接入公用
export default {
  name: 'ServiceForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopUploadDragger, IopServiceAppSelect },
  inheritAttrs: false,
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.servindex,
      treeUrl: path.system.serv.tree,
      deptTreeUrl: path.system.pubDept.tree,
      /** 表单定义 */
      vo: serviceFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      isValide: false,
      title: '',
      appSelect: '',
      uuservId: '',
      deptName: ''
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: ''
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => {}
    },
    /** 数据主键 */
    serviceId: {
      type: String,
      required: false,
      default: ''
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: null
    },
    thirdparty: {
      type: String,
      required: false,
      default: ''
    }
  },
  created () {
    if (this.mode === 'create') {
      this.uuservId = UUIDUtils.generate()
      this.$nextTick(() => {
        this.$refs.serviceForm.load()
      })
    } else {
      this.uuservId = this.$route.query.serviceId
      this.$nextTick(() => {
        this.$refs.serviceForm.load()
      })
    }
  },
  methods: {
    changeValide () {
      this.isValide = !this.isValide
    },
    getDepName (params) {
      if (params.data) {
        this.deptName = params.data.name
      }
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        console.log(value.parentId)
        Object.assign(value, {
          serviceId: this.$route.query.serviceId,
          parentId: value.parentId
        })
      }
      if (this.mode === 'create') {
        Object.assign(value, {
          serviceId: this.uuservId,
          parentId: this.parentId
        })
      }
      Object.assign(value, {
        appId: this.$refs.serviceAppSelect ? this.$refs.serviceAppSelect.value : value['appSelect'],
        isValide: this.isValide ? 1 : 0,
        deptName: this.deptName,
        approStatus: this.thirdparty === 'invoke' ? '0' : ''
      })
      return value
    },
    goBack () {
      this.$router.go(-1)
    },
    loadConvertor (value) {
      if (this.mode !== 'create') {
        this.uuservId = value.serviceId
        this.$nextTick(() => {
          value.appId && (this.$refs.serviceAppSelect ? this.$refs.serviceAppSelect.setSelected(value.appId) : this.$refs.appSelect.setSelected(value.appId))
          value.serviceType && this.$refs.serviceType && this.$refs.serviceType.setSelected(value.serviceType)
          value.serviceKind && this.$refs.serviceKind && this.$refs.serviceKind.setSelected(value.serviceKind)
          value.deptName && this.$refs.deptTree && this.$refs.deptTree.setSelected({ title: value.deptName, value: value.deptId })
          value.parentId && this.$refs.parentId && this.$refs.parentId.setSelected({ title: value.parentName, value: value.parentId })
        })
        this.deptName = value.deptName
        if (value.isValide === '1') {
          this.isValide = true
        } else {
          this.isValide = false
        }
      } else {
        let { parentId } = this
        if (!parentId) {
          parentId = '0'
        }
        value.parentId = parentId
        this.deptName = ''
        this.$nextTick(() => {
          this.$refs.serviceAppSelect && this.$refs.serviceAppSelect.setSelected()
          this.$refs.appSelect && this.$refs.appSelect.setSelected()
          this.$refs.serviceKind && this.$refs.serviceKind.setSelected()
          this.$refs.serviceType && this.$refs.serviceType.setSelected()
          this.$refs.deptTree && this.$refs.deptTree.setSelected({ title: '', value: '' })
        })
      }
      return value
    }
  }
}
</script>
