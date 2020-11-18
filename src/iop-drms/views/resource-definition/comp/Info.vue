<template>
  <div class="Bsave">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :ref="state.formID" :form="form" v-if="isLoaded">
        <slot name="beforeFormItem"/>
        <form-item-list ref="formItemList" :mode="mode" :options="state.formOptions"></form-item-list>
        <slot name="appendFormItem"/>
      </a-form>
      <slot name="infoBtnGroup"></slot>
    </div>
  </div>
</template>
<script>
import FormItemList from './FormItemList'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import _idSeed from '../tool/idSeed'
import Define from '../tool/define'
import { arrayTool, objectTool } from 'mwutil'
import { checkFn } from '../tool/business'
const state = {
  formID: _idSeed.newId(),
  // 表单
  formOptions: {
    dataSource: [],
    // 表单一行多少个
    layoutColumn: 2
  },
  // 按钮
  button: [],
  // 主键key
  rowKey: '',
  // api map
  api: {}
}
export default {
  props: {
    // 请求信息的id 对应objectid
    id: {
      type: String,
      required: true,
      default: ''
    },
    // 详情的id
    detailId: {
      type: String,
      required: false,
      default: ''
    },
    // create => 新增
    // edit => 修改
    // view => 查看
    mode: {
      type: String,
      required: true,
      default: Define.MODE.CREATE
    },
    // objectCode请求form接口使用
    code: {
      type: String,
      required: true,
      default: ''
    },
    // tree选中的节点code
    treeSelectCode: {
      type: String,
      required: false,
      default: ''
    },
    // tree选中的节点id
    treeSelectId: {
      type: String,
      required: false,
      default: ''
    },
    attrCode: {
      required: false,
      type: String,
      default: ''
    },
    relationValue: {
      required: false,
      type: String,
      default: ''
    },
    // 留作扩展使用，交给后台前对数据进行组件使用者的解析
    submitConvertor: {
      required: false,
      type: Function,
      default: (data) => data
    },
    // 留作扩展使用，赋值前对数据进行组件使用者的解析
    loadConvertor: {
      required: false,
      type: Function,
      default: () => {}
    }
  },
  components: {
    FormItemList
  },
  data () {
    return {
      form: this.$form.createForm(this),
      isLoaded: false, // 标示是否请求信息接口完毕
      state: objectTool.deepClone(state),
      entity: {}
    }
  },
  computed: {
    // 判断是否是直接新增到指定资源对象
    _isAppendParent () {
      return this.attrCode !== '' && this.relationValue !== ''
    },
    // 判断是否是包含树选中节点
    _hasTreeSelecter () {
      // return (this.treeSelectCode) && (this.treeSelectId)
      return this.treeSelectCode !== '' && this.treeSelectId !== ''
    },
    isEdit () {
      return this.mode === Define.MODE.EDIT
    },
    isCreate () {
      return this.mode === Define.MODE.CREATE
    },
    isView () {
      return this.mode === Define.MODE.DETAIL
    },
    dataSource () {
      return this.state.formOptions.dataSource || []
    }
  },
  activated () {
    this.reload()
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
      this.reset()
      this.isLoaded = false
      this.getFormInfo()
    },
    reset () {
      this.state = objectTool.deepClone(state)
      // 有些下拉之所以还会提示必填  是因为下拉数据源中包含为空的value
      this.form.resetFields()
    },
    // 处理插入的数据 包含新增 + 修改 + 详情处理
    dealInsert (x) {
      this.dataSource.forEach(item => {
        const checkList = [
          'checkVoidValue',
          'checkSensitiveValue',
          'checkDateType',
          'checkTreeSelectorType'
        ]
        checkList.forEach(FnName => {
          checkFn.call(this, FnName, item, x)
        })
      })
      return x
    },
    // 获取详情
    getInfo () {
      Service.getInfo(this.state.api.detailUrl, this.detailId)
        .then(x => {
          this.isLoaded = true
          this.$nextTick(() => {
            this.entity = x
            this.loadConvertor(this.entity)
            this.setFormValueByValue(x)
          })
        })
    },
    // getNotHiddenField () {
    //   // 获取所有hidden数据
    //   return this.dataSource.filter((x) => {
    //     return !x.hidden
    //   })
    // },
    // getHiddenField () {
    //   // 获取所有hidden数据
    //   return this.dataSource.filter((x) => {
    //     return x.hidden
    //   })
    // },
    // 处理保存的params
    dealSaveParam (data) {
      // if (this._hasTreeSelecter) {
      //   // const hiddenData = {}
      //   // 合并隐藏数据
      //   // this.getHiddenField().forEach((x) => {
      //   //   hiddenData[x.name] = this.entity[x.name]
      //   // })
      //   // entity
      //   // data = Object.assign({}, data, hiddenData, {
      //   //   [this.treeSelectCode]: this.treeSelectId
      //   // })
      //   debugger
      //   data = Object.assign({}, data, {
      //     [this.treeSelectCode]: this.treeSelectId
      //   })
      // }
      this.dataSource.forEach(x => {
        if (x.hidden) return
        // 时间类型需要重新赋值
        if (data[x.name] && x.type === Define.COMPTYPE.DATE) {
          // 获取日期0点
          data[x.name] = new Date(data[x.name].toDate().toLocaleDateString()).getTime()
        }
        if (data[x.name] && x.type === Define.COMPTYPE.DATETIME) {
          data[x.name] = data[x.name].toDate().getTime()
        }
      })
      return data
    },
    // 保存的方法
    saveForm () {
      const _this = this
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if (!error) {
            let data = _this.submitConvertor(_this.form.getFieldsValue(this.getAllFormKeyList()))
            // 处理其他通用数据
            data = this.dealSaveParam(data)
            // 更新
            if (this.isEdit) {
              Service.doEdit(this.state.api.updateUrl, this.detailId, data)
                .then(x => {
                  _this.$message.success('更新成功')
                  resolve(x)
                })
                .catch(e => {
                  _this.$message.error(e)
                  reject(e)
                })
            }
            // 新增
            if (this.isCreate) {
              Service.doCreate(this.state.api.createUrl, data)
                .then(x => {
                  _this.$message.success('新增成功')
                  resolve(x)
                })
                .catch(e => {
                  _this.$message.error(e)
                  reject(e)
                })
            }
          } else {
            reject(error)
          }
        })
      })
    },
    // 获取keys数组
    // UPDATA: jinzhenzong 改为获取所有的key
    getAllFormKeyList () {
      return arrayTool.getSimpleValuesByField(this.dataSource, 'name')
    },
    // 根据value设置表单
    setFormValueByValue (value) {
      const data = this.dealInsert(value)
      const keys = {}
      this.getAllFormKeyList().map(x => {
        if (x !== null && x !== '' && x !== undefined) {
          keys[x] = data[x]
        }
      })
      this.form.setFieldsValue(keys)
    },
    // 获取页面相关信息
    getFormInfo () {
      Service.getConstructForm(this.id, {
        objectCode: this.code
      })
        .then(x => {
          // TODO: 分离代码逻辑
          x.columns.forEach((item) => {
            item.__show = true
            item.name === 'parentId' && (item.hidden = true)
          })
          this.state.formOptions.dataSource = x.columns || []
          // 处理有attrcode的情况
          if (this.attrCode) {
            this.state.formOptions.dataSource.map(item => {
              if (item.name === this.attrCode) item.readOnly = true
            })
          }
          this.state.button = x.button || []
          // 控制一行显示多少个
          this.state.formOptions.layoutColumn = x.layout || 2
          this.state.rowKey = x.rowKey || 'id'
          this.state.api = x.api || []
          if (this.isEdit || this.isView) {
            this.getInfo()
          } else {
            // 需要先释放节点
            this.isLoaded = true
            // 如果包含选中的节点则需要赋值
            if (this._hasTreeSelecter) {
              this.$nextTick(() => {
                this.setFormValueByValue({
                  [this.treeSelectCode]: this.treeSelectId
                })
              })
            }
            // 如果包含了上级则需要赋值
            if (this._isAppendParent) {
              this.$nextTick(() => {
                this.setFormValueByValue({
                  [this.attrCode]: this.relationValue
                })
              })
            }
          }
        })
    }
  }
}
</script>
<style scoped>
.Bsave >>> .table-page-search-wrapper .ant-form-inline .ant-form-item > .ant-form-item-label {
  width:100px!important
}
</style>
