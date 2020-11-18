<template>
  <iop-data-form
    ref="attrForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="attrId"
    :width="width"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <div style="border-bottom:1px solid #e8e8e8">
        <div style="width:100%;heigth:100px;padding:0px 20px 20px 25px;font-size: 16px;">
          <div style="display:inline-block;font-size: 18px;">基本信息</div>
          <a @click="cataClick" style="display:inline-block;float:right;">
            {{ cataShow ? '收缩' : '展开' }}
            <a-icon :type="cataShow ? 'up' : 'down'" />
          </a>
        </div>
        <div style="margin-top:20px;" v-show="cataShow">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="属性中文名" v-bind="formItemLayout">
                <a-input v-decorator="['attrName', { rules: [{ required: true, whitespace: true, message: '属性中文名不能为空' }, { max: 100, message: '中文名长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="属性编码" v-bind="formItemLayout">
                <a-input v-decorator="['attrCode', { rules: [{ required: true, whitespace: true, message: '属性名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="列数据类型" v-bind="formItemLayout">
                <iop-data-dict-select ref="dataType" type="dataType" v-decorator="['dataType', { rules: [{ required: true, whitespace: true, message: '列数据类型不能为空' }] }]"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="属性标记" v-bind="formItemLayout">
                <iop-data-dict-select ref="attrSign" type="attrSign" v-decorator="['attrSign', { rules: [{ required: true, whitespace: true, message: '列数据类型不能为空' }] }]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="列取值类型" v-bind="formItemLayout">
                <iop-data-dict-select @change="onChange" ref="valueType" type="segmentType" v-decorator="['valueType', { rules: [{ required: true, whitespace: true, message: '列取值类型不能为空' }] }]"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="取值编码" v-bind="formItemLayout">
                <a-input v-if="typeChange === '5'" v-decorator="['valueCode', { rules: [{ required: true, whitespace: true, message: '取值编码不能为空' }, { max: 100, message: '编码不能超过100'}] }]" />
                <a-tree-select
                  v-else-if="typeChange === '3'"
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="rulesData"
                  v-model="valueCodeId"
                  :url="treeUrl"
                />
                <a-tree-select
                  v-else-if="typeChange === '7'"
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="dictData"
                  v-model="valueCodeId"
                  :url="treeUrl"
                />
                <a-tree-select
                  v-else-if="typeChange === '9'"
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="parentData"
                  v-model="valueCodeId"
                  :url="treeUrl"
                />
                <div v-else></div>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="字段长度" v-bind="formItemLayout">
                <a-input-number v-decorator="['length', { rules: [{ pattern: /^[0-9]{0,4}$/, message: '字段长度不能超过4位数'}] }]" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="字段精度" v-bind="formItemLayout">
                <a-input-number v-decorator="['precision', { rules: [{ pattern: /^[0-9]{0,2}$/, message: '字段精度不能超过2位，且只能为数字'}] }]" style="width: 100%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否查询项" v-bind="formItemLayout">
                <a-switch :checked="isQuery" @change="onIsQuery"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="是否必须项" v-bind="formItemLayout">
                <a-switch :checked="isRequired" @change="onIsRequired"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否多值" v-bind="formItemLayout">
                <a-switch :checked="isMuchVal" @change="onIsMuchVal"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="排序号码" v-bind="formItemLayout">
                <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}] }]" style="width: 100%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
      <div style="margin-top:10px">
        <div style="width:100%;heigth:100px;padding:10px 20px 0px 25px;font-size: 16px;">
          <div style="display:inline-block;font-size: 18px;">控制信息</div>
          <a @click="sysClick" style="display:inline-block;float:right;">
            {{ sysShow ? '收缩' : '展开' }}
            <a-icon :type="sysShow ? 'up' : 'down'" />
          </a>
        </div>
        <div style="margin-top:20px;" v-show="sysShow">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否允许继承" v-bind="formItemLayout">
                <a-switch :checked="inherChange" @change="onInherChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="是否为导航项" v-bind="formItemLayout">
                <a-switch :checked="navChange" @change="onNavChange"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="服务发布列" v-bind="formItemLayout">
                <a-switch :checked="authChange" @change="onAuthChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="是否列表显示" v-bind="formItemLayout">
                <a-switch :checked="showChange" @change="onShowChange"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否加密储存" v-bind="formItemLayout">
                <a-switch :checked="encryptChange" @change="onEncryptChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="是否脱敏处理" v-bind="formItemLayout">
                <a-switch :checked="sensitiveChange" @change="onSensitiveChange"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="是否表单隐藏" v-bind="formItemLayout">
                <a-switch :checked="isHidden" @change="onIsHidden"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="内容过长省略" v-bind="formItemLayout">
                <a-switch :checked="ellipsis" @change="onEllipsis"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="12" :sm="24">
              <a-form-item label="固定列" v-bind="formItemLayout">
                <a-select v-model="fixed">
                  <a-select-option value="">不固定</a-select-option>
                  <a-select-option value="left">左固定</a-select-option>
                  <a-select-option value="right">右固定</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="列宽度" v-bind="formItemLayout">
                <a-input v-decorator="['width', { rules: [{ max: 100, message: '宽度位数不能超过100'}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio } from '@/iop/components'
import attrFormVO from './vo/attr-form-vo'
import path from '@/iop-drms/api'
import { TreeSelect } from 'ant-design-vue'
import objects from '@/iop-drms/service/server/object'

export default {
  name: 'AttrForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio, ATreeSelect: TreeSelect },
  data () {
    return {
      cataShow: true,
      sysShow: true,
      /** 表单加载、提交地址 */
      url: path.manage.attr.form,
      /** 表单定义 */
      vo: attrFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      // 备注
      remLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 }
      },
      width: 1000,
      typeChange: '1',
      objectId: '',
      inherChange: false,
      navChange: false,
      authChange: false,
      showChange: false,
      encryptChange: false,
      sensitiveChange: false,
      dictData: [],
      parentData: [],
      rulesData: [],
      treeUrl: '',
      valueCodeId: '',
      ch: '',
      isHidden: false,
      ellipsis: false,
      isMuchVal: false,
      isRequired: false,
      isQuery: false,
      fixed: ''
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
    attrId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.fixed = ''
        values.objectId = this.objectId
        this.$nextTick(() => {
          this.valueCodeId = ''
          values.isQuery = '0'
          values.isRequired = '0'
          values.isMuchVal = '0'
          values.valueType = '1'
          values.dataType = '1'
          values.attrSign = '4'
          this.isHidden = false
          this.ellipsis = false
          this.isMuchVal = false
          this.isRequired = false
          this.isQuery = false
        })
      } else {
        this.$nextTick(() => {
          this.$refs.valueType && this.$refs.valueType.setSelected(values.valueType)
          this.$refs.dataType && this.$refs.dataType.setSelected(values.dataType)
          this.$refs.attrSign && this.$refs.attrSign.setSelected(values.attrSign)
          if (values.valueType === '7' || values.valueType === '9' || values.valueType === '3') {
            this.valueCodeId = values.valueCode
          }
          this.ch = values.valueType
          this.typeChange = values.valueType
          this.fixed = values.fixed
          values.isInherited === '1' ? this.inherChange = true : this.inherChange = false
          values.isNav === '1' ? this.navChange = true : this.navChange = false
          values.isAuthColumn === '1' ? this.authChange = true : this.authChange = false
          values.isShowList === '1' ? this.showChange = true : this.showChange = false
          values.isEncrypt === '1' ? this.encryptChange = true : this.encryptChange = false
          values.isSensitive === '1' ? this.sensitiveChange = true : this.sensitiveChange = false
          values.isHidden === '1' ? this.isHidden = true : this.isHidden = false
          values.ellipsis === '1' ? this.ellipsis = true : this.ellipsis = false
          values.isMuchVal === '1' ? this.isMuchVal = true : this.isMuchVal = false
          values.isRequired === '1' ? this.isRequired = true : this.isRequired = false
          values.isQuery === '1' ? this.isQuery = true : this.isQuery = false
        })
      }
      return values
    },
    show (data) {
      this.objectId = data
      this.$refs.attrForm.showModal()
      this.getTree()
    },
    submitConvertor (value) {
      // 后台接口bug，要求更新时body必须有id
      this.inherChange ? value.isInherited = '1' : value.isInherited = '0'
      this.navChange ? value.isNav = '1' : value.isNav = '0'
      this.authChange ? value.isAuthColumn = '1' : value.isAuthColumn = '0'
      this.showChange ? value.isShowList = '1' : value.isShowList = '0'
      this.encryptChange ? value.isEncrypt = '1' : value.isEncrypt = '0'
      this.sensitiveChange ? value.isSensitive = '1' : value.isSensitive = '0'
      this.isHidden ? value.isHidden = '1' : value.isHidden = '0'
      this.ellipsis ? value.ellipsis = '1' : value.ellipsis = '0'
      this.isMuchVal ? value.isMuchVal = '1' : value.isMuchVal = '0'
      this.isRequired ? value.isRequired = '1' : value.isRequired = '0'
      this.isQuery ? value.isQuery = '1' : value.isQuery = '0'
      value.fixed = this.fixed
      if (value.valueType === '7' || value.valueType === '9' || value.valueType === '3') {
        value.valueCode = this.valueCodeId
      }
      if (this.mode === 'edit') {
        const { attrId } = this
        Object.assign(value, { attrId })
      }
      return value
    },
    onChange (value) {
      this.typeChange = value
      if (this.ch !== value) {
        this.valueCodeId = ''
        this.ch = value
      }
    },
    // 加载树形
    getTree () {
      objects.authTree({ objectId: this.objectId }).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/"name"/g, '"title"').replace(/"code"/g, '"value"').replace(/"id"/g, '"key"'))
        this.parentData = data
      })
      objects.codeTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/"name"/g, '"title"').replace(/"code"/g, '"value"').replace(/"id"/g, '"key"'))
        this.dictData = [data]
      })
      objects.rulesTree().then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/"name"/g, '"title"').replace(/"id"/g, '"value"').replace(/"code"/g, '"key"'))
        this.rulesData = [data]
      })
    },
    /**
    * 交互
    */
    cataClick () {
      this.cataShow = !this.cataShow
      if (this.cataText === '收缩') {
        this.cataText = '展开'
      } else {
        this.cataText = '收缩'
      }
    },
    // 重置函数
    reset (cb) {
      cb()
      if (this.mode === 'create') {
        this.$refs.dataType.onChange('1')
        this.$refs.valueType.onChange('1')
        this.$refs.attrSign.onChange('4')
        this.fixed = ''
        this.isHidden = false
        this.ellipsis = false
        this.isMuchVal = false
        this.isRequired = false
        this.isQuery = false
        this.inherChange = false
        this.navChange = false
        this.authChange = false
        this.showChange = false
        this.encryptChange = false
        this.sensitiveChange = false
      } else {
        const values = this.$refs.attrForm.record
        this.$refs.valueType && this.$refs.valueType.setSelected(values.valueType)
        this.$refs.dataType && this.$refs.dataType.setSelected(values.dataType)
        this.$refs.attrSign && this.$refs.attrSign.setSelected(values.attrSign)
        if (values.valueType === '7' || values.valueType === '9' || values.valueType === '3') {
          this.valueCodeId = values.valueCode
        }
        this.ch = values.valueType
        this.typeChange = values.valueType
        this.fixed = values.fixed
        values.isInherited === '1' ? this.inherChange = true : this.inherChange = false
        values.isNav === '1' ? this.navChange = true : this.navChange = false
        values.isAuthColumn === '1' ? this.authChange = true : this.authChange = false
        values.isShowList === '1' ? this.showChange = true : this.showChange = false
        values.isEncrypt === '1' ? this.encryptChange = true : this.encryptChange = false
        values.isSensitive === '1' ? this.sensitiveChange = true : this.sensitiveChange = false
        values.isHidden === '1' ? this.isHidden = true : this.isHidden = false
        values.ellipsis === '1' ? this.ellipsis = true : this.ellipsis = false
        values.isMuchVal === '1' ? this.isMuchVal = true : this.isMuchVal = false
        values.isRequired === '1' ? this.isRequired = true : this.isRequired = false
        values.isQuery === '1' ? this.isQuery = true : this.isQuery = false
      }
    },
    sysClick () {
      this.sysShow = !this.sysShow
      if (this.sysText === '收缩') {
        this.sysText = '展开'
      } else {
        this.sysText = '收缩'
      }
    },
    onQueryChange (checked) {
      this.queryChange = checked
    },
    onInherChange (checked) {
      this.inherChange = checked
    },
    onNavChange (checked) {
      this.navChange = checked
    },
    onNullChange (checked) {
      this.nullChange = checked
    },
    onPkChange (checked) {
      this.pkChange = checked
    },
    onAuthChange (checked) {
      this.authChange = checked
    },
    onMuchChange (checked) {
      this.muchChange = checked
    },
    onShowChange (checked) {
      this.showChange = checked
    },
    onEncryptChange (checked) {
      this.encryptChange = checked
    },
    onSensitiveChange (checked) {
      this.sensitiveChange = checked
    },
    onIsHidden (checked) {
      this.isHidden = checked
    },
    onEllipsis (checked) {
      this.ellipsis = checked
    },
    onIsMuchVal (checked) {
      this.isMuchVal = checked
    },
    onIsRequired (checked) {
      this.isRequired = checked
    },
    onIsQuery (checked) {
      this.isQuery = checked
    }
  }
}
</script>
