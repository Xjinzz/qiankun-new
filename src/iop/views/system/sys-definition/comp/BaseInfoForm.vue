<template>
  <div class="baseInfoBox" >
    <a-form :form="form">
      <a-col :span="11">
        <a-form-item :label="title+'编号'" class="flex" style="width:100%">
          <a-input @change="(e) => { appCodeChange(e.target.value) }" placeholder="请输入编号" v-decorator="['appCode', { rules: rules.appCode }]" />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item :label="title+'名称'" class="flex" style="width:100%">
          <a-input placeholder="请输入名称" v-decorator="['appName', { rules: rules.appName }]" />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="上级分组" class="flex" style="width:100%">
          <iop-data-tree-select
            :url="dataUrl.tree"
            v-decorator="['parentId']"
            queryName="id"
          />
        </a-form-item>
      </a-col>
      <a-col :span="11" v-if="isSys">
        <a-form-item label="内部系统" class="flex" style="width:100%">
          <!--
          <a-radio-group v-decorator="['appType', { rules: rules.appType }]">
          <a-radio value="1">是</a-radio>
          <a-radio value="0">否</a-radio>
          </a-radio-group>
          -->
          <a-switch @change="appTypeChange" checked-children="是" un-checked-children="否" v-decorator="['appType']"/>
        </a-form-item>
      </a-col>
      <a-col :span="11" v-if="isComp || isSys">
        <a-form-item label="上下文根" class="flex" style="width:100%">
          <a-input disabled placeholder="请输入上下文根" v-decorator="['appContext', { rules: rules.appContext }]" />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="排序号码" class="flex" style="width:100%">
          <a-input v-decorator="['orderNum',{ rules: rules.orderNum }]" />
        </a-form-item>
      </a-col>
      <a-col :span="11" v-if="isComp || isSys">
        <a-form-item label="首页地址" class="flex" style="width:100%">
          <a-input placeholder="请输入首页地址" v-decorator="['indexUrl', { rules: rules.indexUrl }]" />
        </a-form-item>
      </a-col>
      <a-col :span="11" v-if="isComp || isSys">
        <a-form-item label="登录地址" class="flex" style="width:100%">
          <a-input placeholder="请输入登录地址" v-decorator="['loginUrl', { rules: rules.loginUrl }]" />
        </a-form-item>
      </a-col>
      <a-col :span="24" v-if="isComp || isSys">
        <a-col :span="11">
          <a-form-item :label="title+'图标'" class="flex" style="width:100%">
            <iop-upload-dragger
              mode="edit"
              :id="appId"
              businessName="sysApp"
              attrName="iconBig"
              @progress="progressHandle"
            />
          </a-form-item>
        </a-col>
      </a-col>
      <a-col :span="22" class="flex">
        <a-form-item label="备注说明" class="flex" style="width:100%">
          <a-textarea
            placeholder="请输入介绍"
            :autoSize="{ minRows: 2, maxRows: 4 }"
            v-decorator="['remark', {rules: [{ max: 500, message: '系统介绍最多500位' }]}]"
          />
        </a-form-item>
      </a-col>
    </a-form>
  </div>
</template>
<script>
import { IopDataTreeSelect, IopUploadDragger } from '@/iop/components'
import Path from '@/iop/api'
import { objectTool } from 'mwutil'
import getuuid from '@/utils/uuid.js'
const entity = {
  parentId: '', // 上级节点
  appName: '', // 系统名称
  appCode: '', // 系统编号
  appType: '0', // 内部系统 1=是 0=否
  appContext: '', // 上下文根
  orderNum: '', // 排序号
  indexUrl: '', // 首页地址
  loginUrl: '', // 登陆地址
  remark: '' // 系统介绍
}
export default {
  components: {
    IopDataTreeSelect,
    IopUploadDragger
  },
  props: {
    dataSource: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    isSys () {
      return this.mode === 'sys'
    },
    isComp () {
      return this.mode === 'comp'
    },
    isGroup () {
      return this.mode === 'group'
    },
    title () {
      const obj = {
        'sys': '系统',
        'comp': '组件',
        'group': '分组'
      }
      return obj[this.mode]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.appCodeChange('')
    })
  },
  data () {
    return {
      rules: {
        appCode: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道编码最多100位' }
        ],
        appName: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道名称最多100位' }
        ],
        // appType: [
        //   { required: true, whitespace: true, message: '该字段必须选择' }
        // ],
        orderNum: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { pattern: /^[0-9]{0,7}$/, message: '排序号最多七位' }
        ],
        appContext: [
          { required: true, whitespace: true, message: '该字段必须选择' },
          { max: 100, message: '上下文根最多100位' }
        ],
        indexUrl: [
          { required: true, whitespace: true, message: '该字段必须选择' },
          { max: 200, message: '首页地址最多200位' }
        ],
        loginUrl: [
          { max: 100, message: '登陆地址最多100位' }
        ],
        parentId: [
          { required: true, whitespace: true, message: '该字段必须选择' }
        ]
      },
      dataUrl: {
        tree: Path.sysDefinition.asyncTree
      },
      appId: getuuid.generate(),
      entity: objectTool.deepClone(entity),
      form: this.$form.createForm(this),
      iconBig: ''
    }
  },
  methods: {
    // 获取数据
    getData () {
      this.entity = this.form.getFieldsValue(objectTool.getKeyList(this.entity))
      // 内部系统未选择默认值
      if (this.entity.appType === undefined) {
        this.entity.appType = false
      }
      if (!this.entity.parentId) {
        this.entity.parentId = '0'
      }
      return Object.assign(this.entity, {
        iconBig: this.iconBig
      })
    },
    appCodeChange (val) {
      if (this.isComp || this.isSys) {
        this.form.setFieldsValue({
          appContext: '/' + val
        })
      }
    },
    appTypeChange (val) {
      this.$emit('appTypeChange', val)
    },
    // 重置表单
    reset () {
      this.entity = objectTool.deepClone(entity)
      this.form.resetFields()
    },
    progressHandle (file) {
      this.iconBig = file.uid
    },
    // 验证表单
    validate (cb) {
      this.form.validateFields((error, values) => {
        if (!error) {
          const result = {
            success: true,
            messgae: '校验成功'
          }
          cb(result)
        }
      })
    }
  }
}
</script>
<style scoped>
.flex >>> .ant-form-item-control-wrapper {
  flex:1
}
.flex >>> .ant-form-item-label {
  width:100px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="less" scoped>
  .flex{
    display:flex;
    margin-top:10px;
  }
  .formItem{
    flex:1;
    margin-left:10px
  }
</style>
