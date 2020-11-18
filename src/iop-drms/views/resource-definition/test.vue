<template>
  <a-card
    :title="mode===define.MODE.CREATE ? '新建1222' : '修改111'"
  >
    <!--
    <info-view
    :id="id"
    :detailId="detailId"
    :mode="mode"
    :code="code"
    :treeSelectCode="treeSelectCode"
    :treeSelectId="treeSelectId"
    ref="infoView"
    >
    <a-row slot="infoBtnGroup" style="text-align:center">
    <a-button :loading="savePadding" type="primary" @click="save">
    提交
    </a-button>
    <a-button @click="goBack">
    取消
    </a-button>
    </a-row>
    </info-view>
    -->
    <div class="Bsave">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :ref="state.formID" :form="form" v-if="isLoaded">
          <form-item-list ref="formItemList" :mode="mode" :options="state.formOptions" :readonlyCode="[attrCode]"></form-item-list>
        </a-form>
        <a-row style="text-align:center">
          <a-button :loading="savePadding" type="primary" @click="save">
            提交
          </a-button>
          <a-button @click="goBack">
            取消
          </a-button>
        </a-row>
      </div>
    </div>
  </a-card>
</template>
<script>
import Define from './tool/define'
import FormItemList from './comp/FormItemList'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import _idSeed from './tool/idSeed'
import { arrayTool, objectTool } from 'mwutil'
import { sensitiveField } from './tool/business'
import moment from 'moment'
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
    attrCode: {
      required: false,
      type: String,
      default: ''
    },
    relationValue: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      savePadding: false,
      define: Define,
      form: this.$form.createForm(this),
      isLoaded: false, // 标示是否请求信息接口完毕
      state: objectTool.deepClone(state),
      entity: {}
    }
  },
  components: {
    FormItemList
  },
  computed: {
    /**
     * @description 请求信息的id 对应objectid
     * @requires
     * @readonly
     * @returns { String } query.id
     */
    id () {
      return this.$route.query.id || ''
    },
    /**
     * @description 修改或者查看时候的详情id 对应数据id
     * @readonly
     * @returns { String } query.detailId
     * @default ''
     */
    detailId () {
      return this.$route.query.detailId || ''
    },
    /**
     * @description 表单状态
     * @requires
     * @readonly
     * @returns { String } query.mode
     * @default create
     *  create => 新增
     *  edit => 修改
     *  view => 查看
     */
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    /**
     * @description objectCode请求form接口使用
     * @requires
     * @readonly
     * @returns { String } query.code
     * @default ''
     */
    code () {
      return this.$route.query.code || ''
    },
    // tree选中的节点code
    treeSelectCode () {
      return this.$route.query.treeSelectCode || ''
    },
    // tree选中的节点Id
    treeSelectId () {
      return this.$route.query.treeSelectId || ''
    },
    // 判断是否是直接新增到指定资源对象
    _isAppendParent () {
      return this.attrCode !== '' && this.relationValue !== ''
    },
    // 判断是否是包含树选中节点
    _hasTreeSelecter () {
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
    this.reset()
    this.isLoaded = false
    this.getFormInfo()
  },
  mounted () {
    this.reset()
    this.isLoaded = false
    this.getFormInfo()
  },
  methods: {
    reset () {
      this.state = objectTool.deepClone(state)
      // 有些下拉之所以还会提示必填  是因为下拉数据源中包含为空的value
      this.form.resetFields()
    },
    // 处理插入的数据 包含新增 + 修改 + 详情处理
    dealInsert (x) {
      this.dataSource.forEach(item => {
        if (x[item.name] === null || x[item.name] === '') {
          delete x[item.name]
        }
        // 详情需要判断脱敏
        if (x[item.name] && item.sensitive && this.isView) {
          const textSplitPosition = {
            0: [0, 0],
            1: [1, 0],
            2: [1, 0],
            3: [1, 1],
            4: [1, 1],
            5: [2, 2],
            6: [2, 2],
            7: [3, 3],
            8: [3, 3]
          }
          x[item.name] = sensitiveField(x[item.name], ...(x[item.name].length < 9 ? textSplitPosition[x[item.name].length] : [4, 4]))
        }
        // 日期类型需要moment一下
        if (
          x[item.name] &&
          (
            item.type === Define.COMPTYPE.DATE ||
            item.type === Define.COMPTYPE.DATETIME
          )
        ) {
          // 如果number能够处理  则按照
          if (Number(x[item.name])) {
            // 处理时间戳的格式
            x[item.name] = moment(Number(x[item.name]))
          } else {
            // 处理字符串的格式
            x[item.name] = moment(x[item.name])
          }
        }
        // if slecttree => minxins treeselect
        if (x[item.name] && item.type === Define.COMPTYPE.SELECTTREE) {
          item.treeSelector = x[item.name]
        }
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
            this.setFormValueByValue(x)
          })
        })
    },
    getNotHiddenField () {
      // 获取所有hidden数据
      return this.dataSource.filter((x) => {
        return !x.hidden
      })
    },
    getHiddenField () {
      // 获取所有hidden数据
      return this.dataSource.filter((x) => {
        return x.hidden
      })
    },
    // 处理保存的params
    dealSaveParam (data) {
      if (this._hasTreeSelecter) {
        const hiddenData = {}
        // 合并隐藏数据
        this.getHiddenField().forEach((x) => {
          hiddenData[x.name] = this.entity[x.name]
        })
        // entity
        data = Object.assign({}, {
          [this.treeSelectCode]: this.treeSelectId
        }, data, hiddenData)
      }
      this.dataSource.forEach(x => {
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
            let data = _this.form.getFieldsValue(this.getAllFormKeyList())
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
    getAllFormKeyList () {
      // 过滤hidden
      return arrayTool.getSimpleValuesByField(this.getNotHiddenField(), 'name')
    },
    // 根据value设置表单
    setFormValueByValue (value) {
      const data = this.dealInsert(value)
      const keys = {}
      this.getAllFormKeyList().map(x => {
        if (x !== null && x !== '') {
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
          x.columns.map(item => {
            if (item.title === '来源') {
              item.type = '7'
              item.typeCode = 'CTLG_SEC_LEVEL'
            }
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
    },
    goBack () {
      this.$router.go(-1)
    },
    save () {
      const _this = this
      this.savePadding = true
      this.saveForm()
        .finally(() => {
          this.savePadding = false
        })
        .then(x => {
          _this.goBack()
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
