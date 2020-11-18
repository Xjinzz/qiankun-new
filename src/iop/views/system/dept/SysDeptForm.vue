<template>
  <iop-data-form
    ref="sysDeptForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="deptId"
    :submitSuccess="formSubmitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form="{ record }">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构编码" v-bind="formItemLayout">
            <a-input :disabled="mode==='view'" placeholder="请输入机构编码" v-decorator="['deptCode', { rules: [{ required: true, whitespace: true, message: '机构编码不能为空' }, { max: 100, message: '机构编码不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="机构名称" v-bind="formItemLayout">
            <a-input :disabled="mode==='view'" placeholder="机构名称" v-decorator="['deptName', { rules: [{ required: true, whitespace: true, message: '机构名称不能为空' }, { max: 100, message: '机构名称不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构简称" v-bind="formItemLayout">
            <a-input :disabled="mode==='view'" placeholder="请输入机构简称" v-decorator="['shortName', { rules: [{ required: true, whitespace: true, message: '机构简称不能为空' }, { max: 100, message: '机构简称不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="上级机构" v-bind="formItemLayout">
            <iop-data-tree-select :disabled="mode==='view'" ref="parentTree" :url="parentUrl" query="id" v-decorator="['parentId']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="机构类型" v-bind="formItemLayout">
            <iop-data-dict-radio :disabled="mode==='view'" type="deptType" v-decorator="['deptType', { rules: [{ required: true, whitespace: true, message: '机构类型不能为空' }] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="行政级别" v-bind="formItemLayout">
            <iop-data-dict-select :disabled="mode==='view'" ref="deptLevel" type="deptLevel" v-decorator="['deptLevel']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="真实机构" v-bind="formItemLayout">
            <a-switch
              :disabled="mode==='view'"
              :checked="isTrue"
              @change="onSwitchChange"
              checked-children="是"
              un-checked-children="否"
              default-checked
            />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="排序号" v-bind="formItemLayout">
            <a-input-number :disabled="mode==='view'" style="width: 100%;" v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <div v-show="advanced">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="机构性质" v-bind="formItemLayout">
              <iop-data-dict-select :disabled="mode==='view'" ref="deptXinzhi" type="deptXinzhi" v-decorator="['deptXinzhi']" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="机构种类" v-bind="formItemLayout">
              <iop-data-dict-select :disabled="mode==='view'" ref="deptKind" type="deptKind" v-decorator="['deptKind']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="行政区域" v-bind="formItemLayout">
              <iop-data-tree-select :disabled="mode==='view'" ref="areaTree" :url="areaUrl" v-decorator="['areaId']" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="数据来源" v-bind="formItemLayout">
              <a-input v-decorator="['source']" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="9" :offset="2">
            <a-form-item label="主管人员" v-bind="formItemLayout">
              <a-input :disabled="mode==='view'" placeholder="请输入主管人员" v-decorator="['chargeName', { rules: [{ max: 100, message: '主管人员不能超过100'}] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="助记符" v-bind="formItemLayout">
              <a-input :disabled="mode==='view'" placeholder="请输入助记符" v-decorator="['zjf', { rules: [{ max: 100, message: '助记符不能超过100'}] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="23" :offset="2">
            <a-form-item label="职能描述" v-bind="textAreaformItemLayout">
              <a-textarea :disabled="mode==='view'" placeholder="请输入职能描述" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '描述不能超过500'}] }]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <a-row>
        <a-col :span="5" :offset="9">
          <a-button @click="toggleAdvanced()" block>
            {{ advanced ? '隐藏更多' : '显示更多' }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a-button>
        </a-col>
      </a-row>
      <!-- 机构在系统内部的标识 -->
      <input type="hidden" id="deptStatus" :value="record.deptStatus" />
      <!-- 是否删除 -->
      <input type="hidden" id="isDel" :value="record.isDel" />
      <!-- LDAP同步标志 -->
      <input type="hidden" id="ldapFlag" :value="record.ldapFlag" />
      <!-- LDAP上次同步时间 -->
      <input type="hidden" id="ldapLastTime" :value="record.ldapLastTime" />
      <!-- 标识的HASH值组成的串 -->
      <input type="hidden" id="levelCode" :value="record.levelCode" />
      <!-- 岗位编码 -->
      <input type="hidden" id="postCode" :value="record.postCode" />
    </template>
  </iop-data-form>
</template>
<script>
import { iopAreaService, iopDeptService } from '@/iop/service/index'
import { IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, IopDataForm } from '@/iop/components'
import sysDeptFormVO from './vo/sys-dept-form-vo'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'

export default {
  name: 'SysDeptForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      parentUrl: path.system.dept.tree,
      areaUrl: path.system.area.tree,
      vo: sysDeptFormVO,
      isTrue: true,
      url: path.system.dept.index,
      localParentId: '',
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
      },
      advanced: false
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    deptId: {
      type: String,
      required: false,
      default: ''
    },
    parentId: {
      type: String,
      required: false,
      default: ''
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  methods: {
    show () {
      this.$refs.sysDeptForm.showModal()
      this.advanced = false
    },

    submit () {
      this.$refs.sysDeptForm.submitForm()
    },

    load () {
      this.$refs.sysDeptForm && this.$refs.sysDeptForm.load()
    },

    loadConvertor (values) {
      const dictSelectArray = ['deptLevel', 'deptKind', 'deptXinzhi']
      if (this.mode === 'create') {
        values.orderNum = '1'
        this.isTrue = true

        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].cleanSelected()
          })
          this.$refs.areaTree.cleanSelected()
          if (this.parentId !== '0') {
            iopDeptService.getById(this.parentId)
              .then((res) => {
                this.$refs.parentTree.setSelected({ title: res.deptName, value: res.sysDeptId })
              })
              .catch((err) => MessageUtils.error(err))
          }
        })
      } else {
        this.isTrue = (values.isTrue === '1')
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name].setSelected(values[name])
          })

          this.$refs.parentTree.setSelected({ title: values.deptName, value: values.parentId })
          this.initAreaTree(values.areaId)
        })
      }
      return values
    },

    // 重置
    reset (cb) {
      cb()
      const values = this.$refs.sysDeptForm.record
      this.isTrue = (values.isTrue === '1')
      !values.isTrue && (values.isTrue = 1)
      const dictSelectArray = ['deptLevel', 'deptKind', 'deptXinzhi']
      if (this.mode === 'created') {
        values.orderNum = '1'
        dictSelectArray.map(name => {
          this.$refs[name].cleanSelected()
        })
        this.$refs.parentTree.cleanSelected()
        this.$refs.areaTree.cleanSelected()
        if (this.parentId !== '0') {
          iopDeptService.getById(this.parentId)
            .then((res) => {
              this.$refs.parentTree.setSelected({ title: res.deptName, value: res.sysDeptId })
            })
            .catch((err) => MessageUtils.error(err))
        }
      } else {
        dictSelectArray.map(name => {
          this.$refs[name].setSelected(values[name])
        })
        this.$refs.parentTree.setSelected({ title: values.deptName, value: values.parentId })
        this.initAreaTree(values.areaId)
      }
    },

    async initAreaTree (areaId = '') {
      if (areaId) {
        const record = await iopAreaService.getById(areaId)
        this.$refs.areaTree.setSelected({ title: record.fullName, value: record.areaId })
      } else {
        this.$refs.areaTree.cleanSelected()
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      let { parentId } = value
      if (!parentId) {
        parentId = '0'
      }
      this.localParentId = parentId
      Object.assign(value, { parentId, isTrue: this.isTrue ? '1' : '0' })
      if (this.mode === 'create' || !value.deptStatus) {
        Object.assign(value, { deptStatus: '1' })
      }
      return value
    },

    onSwitchChange (checked) {
      this.isTrue = checked
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    formSubmitSuccess () {
      this.submitSuccess(this.localParentId)
    }
  }
}
</script>
