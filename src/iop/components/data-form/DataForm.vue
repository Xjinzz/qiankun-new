<template>
  <div>
    <div v-if="showType === 'modal'">
      <a-modal :width="modalWidth" :visible="show" @cancel="hideModal" :title="localTitle" :destroyOnClose="destroyOnClose">
        <a-form :form="form">
          <a-spin :spinning="loading">
            <slot name="form" :record="record" />
            <slot name="additional" :record="record" />
          </a-spin>
        </a-form>

        <template #footer>
          <slot name="modalFooter">
            <div style="text-align:center;">
              <div v-show="mode !== 'view'">
                <slot name="beforeCancelButton" />
                <slot name="cancelButton">
                  <a-button @click="hideModal">取消</a-button>
                </slot>
                <slot name="afterCancelButton" />
                <template v-if="showReset">
                  <slot name="beforResetButton" :record="record" />
                  <slot name="resetButton" :record="record">
                    <!-- <a-button @click="resetFormValues()">重置</a-button> -->
                  </slot>
                  <slot name="afterResetButton" :record="record" />
                </template>
                <slot name="beforeOkButton" />
                <slot name="okButton">
                  <a-button
                    type="primary"
                    @click="submitForm()"
                    :disabled="loading"
                    :loading="loading"
                  >提交</a-button>
                </slot>
                <slot name="afterOkButton" />
              </div>
              <div v-show="mode === 'view'">
                <slot name="beforeCloseButton" />
                <slot name="closeButton">
                  <a-button @click="hideModal">取消</a-button>
                </slot>
                <slot name="afterCloseButton" />
              </div>
            </div>
          </slot>
        </template>
      </a-modal>
    </div>
    <a-form :form="form" v-else-if="showType === 'page'">
      <a-spin :spinning="loading">
        <a-card :bordered="false" style="margin-bottom: 20px;" :title="localTitle">
          <template #extra v-if="showPageHeader">
            <slot name="pageHeader" :record="record">
              <template v-if="mode !== 'view'">
                <template v-if="showReset">
                  <slot name="beforResetButton" :record="record" />
                  <slot name="resetButton" :record="record">
                    <!-- <a-button @click="resetFormValues()">重置</a-button>
                    <a-divider type="vertical" /> -->
                  </slot>
                  <slot name="afterResetButton" :record="record" />
                </template>
                <slot name="beforSubmitButton" :record="record" />
                <slot name="submitButton" :record="record">
                  <a-button type="primary" @click="submitForm()" :disabled="loading">提交</a-button>
                </slot>
                <slot name="afterSubmitButton" />
              </template>
              <template v-show="mode === 'view'">
                <slot name="beforeCloseButton" />
                <slot name="closeButton"></slot>
                <slot name="afterCloseButton" />
              </template>
            </slot>
          </template>
          <div class="table-page-search-wrapper">
            <slot name="form" :record="record" />
          </div>
        </a-card>
        <slot name="moreCard" :record="record"></slot>
        <slot name="additional" :record="record" />
      </a-spin>
    </a-form>
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'DataForm',
  props: {
    vo: {
      type: Array,
      required: true
    },
    submitConvertor: {
      type: Function,
      required: false,
      default: (values) => values
    },
    submitQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    submitVariable: {
      type: Object,
      required: false,
      default: () => {}
    },
    loadConvertor: {
      type: Function,
      required: false,
      default: (values) => values
    },
    loadQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    loadVariable: {
      type: Object,
      required: false,
      default: () => {}
    },
    url: {
      type: String,
      required: true
    },
    loadUrl: {
      type: String,
      required: false,
      default: ''
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    submitHidden: {
      type: Boolean,
      required: false,
      default: true
    },
    mode: {
      type: String,
      required: true
    },
    showType: {
      type: String,
      required: false,
      default: 'modal'
    },
    id: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: false,
      default: 520
    },
    showPageHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    showReset: {
      type: Boolean,
      required: false,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      required: false,
      default: false
    },
    reset: {
      type: [Function, null],
      required: false,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      record: {},
      localTitle: '新建',
      show: false,
      initValue: {},
      modalWidth: 520,
      modaltoggleFlag: true
    }
  },
  created () {
    this.modalWidth = this.width
    const definination = []
    const { record } = this
    this.vo.map(item => {
      if (!item.hidden) {
        definination.push(item.dataIndex)
      }
      record[item.dataIndex] = ''
    })
    if (this.title) {
      this.localTitle = this.title
    }
    this.record = record
    // 非隐藏字段
    this.definination = definination

    this.form = this.$form.createForm(this)
  },
  methods: {
    /**
     * 修改title
     */
    changeTitle () {
      if (!this.title) {
        switch (this.mode) {
          case 'create':
            this.localTitle = '新建'
            break
          case 'edit':
            this.localTitle = '编辑'
            break
          case 'view':
            this.localTitle = '查看'
            break
          default:
            console.error('invalid mode !!')
        }
      } else {
        this.localTitle = this.title
      }
    },

    /**
     * 加载数据
     */
    load () {
      this.changeTitle()
      if (this.mode !== 'create') {
        const url = this.loadUrl || this.url
        this.loading = true
        iopDataService.get(
          {
            url: `${url}/${this.id}`,
            params: this.loadQuery,
            variable: this.loadVariable
          })
          .then((res) => { this.bind(res.result) })
          .catch((err) => { throw err })
          .finally(() => { this.loading = false })
      } else {
        this.bind({})
      }
    },

    /**
     * 重置/设置表单项的值
     */
    resetFormValues () {
      if (this.reset !== null) {
        this.reset(() => {
          this.resetFormCallback()
        })
        return
      }
      this.resetFormCallback()
    },
    resetFormCallback () {
      const { record } = this
      const data = {}
      // 已定义的字段赋值
      for (const attr of this.definination) {
        data[attr] = record[attr]
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
        this.$emit('onBind')
      })
    },

    /**
     * 提交数据
     */
    async submitForm (url = '') {
      this.loading = true
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let data = { ...values }
          if (typeof this.submitConvertor === 'function') {
            data = await this.submitConvertor(data)
            if (data === false) {
              this.loading = false
              return
            }
          }

          data = Object.assign({}, this.record, data)
          try {
            let result
            switch (this.mode) {
              case 'create':
                result = await this.create(data, url)
                break
              case 'edit':
                result = await this.update(data, url)
                this.bind(result)
                break
              default:
                console.warn('invalid mode !!!')
                return
            }

            MessageUtils.success('操作成功')
            if (this.submitHidden) {
              this.hideModal()
            }
            this.submitSuccess(result)
            this.$emit('onSubmitSuccess', result)
          } catch (err) {
            this.$emit('onSubmitFailture')
            MessageUtils.error(err)
          } finally {
            this.$emit('onSubmitComplete')
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    },

    /**
     * 提交新建请求
     *
     * @private
     * @param {Object} data 表单数据
     */
    async create (data, url = '') {
      url = url || this.url
      const { submitQuery, submitVariable } = this
      const { result } = await iopDataService.post({
        url,
        data,
        params: submitQuery,
        variable: submitVariable
      })
      return result
    },

    /**
     * 提交编辑请求
     *
     * @param {Object} data 表单数据
     */
    async update (data, url = '') {
      url = url || `${this.url}/${this.id}`
      const { result } = await iopDataService.put({
        url,
        data,
        params: this.submitQuery,
        variable: this.submitVariable
      })
      return result
    },

    /**
     * 表单绑定数据
     */
    async bind (data = {}) {
      if (typeof this.loadConvertor === 'function') {
        data = await this.loadConvertor(data)
      }
      if (this.mode === 'create') {
        Object.assign(data, this.initValue)
      }

      this.record = data
      this.resetFormValues()
    },

    /**
     * 关闭弹出框
     */
    hideModal () {
      this.show = false
      this.form.resetFields()
      this.$emit('onModalHide')
    },

    /**
     * 显示弹出框
     */
    showModal () {
      if (this.showType === 'modal') {
        this.show = true
        this.$nextTick(() => {
          this.load()
        })
      }
    },

    setInitValue (data) {
      this.initValue = data
      this.form.setFieldsValue(data)
    },

    getFieldValue (field) {
      return this.form.getFieldValue(field)
    },

    getFieldsValue (fields) {
      return this.form.getFieldsValue(fields)
    },

    resetFields (fields) {
      this.form.resetFields(fields)
    }
  }

}
</script>
