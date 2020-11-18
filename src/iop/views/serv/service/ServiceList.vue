<template>
  <div>
    <iop-data-table ref="serviceList" :table="table" :permission="permission" :tree="thirdparty !== 'invoke'" @onAction="onAction">
      <template #beforeRemoveSelectedButton>
        <a-button v-if="thirdparty !== 'invoke'" type="primary" @click="toLead">导入</a-button>
        <slot name="tableHeader">
          <a-button type="primary" :disabled="selectedFlag" @click="stop">停用</a-button>
          <a-button type="primary" :disabled="selectedFlag" @click="start">启用</a-button>
          <a-button type="primary" :disabled="selectedFlag" @click="publish">发布</a-button>
          <a-button type="primary" :disabled="selectedFlag" @click="unPublish">取消发布</a-button>
        </slot>
      </template>
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="服务名称">
              <a-input @pressEnter="search" placeholder="请输入服务名称" v-decorator="['chName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="服务提供单位">
              <a-input @pressEnter="search" placeholder="请输入服务提供单位名称" v-decorator="['deptName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <!-- 第三方服务的批量删除 -->
      <template v-if="thirdparty === 'invoke'" #removeSelectedButton="{ record }">
        <a-button
          type="primary"
          @click="thirdpartyRemove(record)"
          :disabled="thirdpartyServiceIds.length === 0"
        >删除</a-button>
      </template>
      <template #rowButtons="{ record }">
        <a @click="handleView(record.serviceId)">查看</a>
        <a-divider v-if="approStatus!=1&&approStatus!=2&&approStatus!=9" type="vertical" />
        <a v-if="approStatus!=1&&approStatus!=2&&approStatus!=9" @click="handleEdit(record.serviceId)">编辑</a>
        <a-divider v-if="approStatus!=1" type="vertical" />
        <template v-if="approStatus">
          <a v-if="approStatus!=1" @click="thirdpartyRemove(record,'column')">删除</a>
        </template>
        <a v-else @click="handleRemove(record)">删除</a>
        <a-divider v-if="thirdparty !== 'invoke'" type="vertical" />
        <a-dropdown v-if="thirdparty !== 'invoke'">
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="MethodDef(record)">方法列表</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <!-- <template #afterRemoveButton="data">
        <a-divider type="vertical" />
        <a @click="MethodDef(data.record)">方法定义</a>
      </template> -->
      <template #tree v-if="thirdparty !== 'invoke'">
        <service-tree ref="serviceTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <!-- 导入弹框 -->
    <a-modal title="导入" v-model="visible" @cancel="handleCancel" :footer="null" :maskClosable="false">
      <a-tabs v-model="activeKey" @change="tabChange">
        <a-tab-pane tab="swagger导入" key="swagger">
          <a-form
            ref="swaggerForm"
            :form="swaggerForm"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="上传文件">
              <a-upload-dragger
                name="file"
                :multiple="false"
                :customRequest="upload"
                @change="handleChange"
                :fileList="fileList"
                :beforeUpload="beforeUpload"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击或拖拽文件上传</p>
              </a-upload-dragger>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="zookeeper导入" key="zookeeper" forceRender>
          <a-form
            ref="zookForm"
            :form="zookForm"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="用户名">
              <a-input v-model="zookUser"></a-input>
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password v-model="zookPass"></a-input-password>
            </a-form-item>
            <a-form-item label="地址">
              <a-input v-model="zookUrl"></a-input>
            </a-form-item>
            <a-form-item label="端口">
              <a-input v-model="zookPort"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button @click="restImportForm">取消</a-button>
              <a-button style="margin-left: 10px;" type="primary" @click="submitZook">提交</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="nacos导入" key="nacos">
          <a-form
            ref="nacosForm"
            :form="nacosForm"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="用户名">
              <a-input v-model="nacosUser"></a-input>
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password v-model="nacosPass"></a-input-password>
            </a-form-item>
            <a-form-item label="服务">
              <a-input v-model="nacoskUrl"></a-input>
            </a-form-item>
            <a-form-item label="端口">
              <a-input v-model="nacosPort"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button @click="restImportForm">取消</a-button>
              <a-button style="margin-left: 10px;" type="primary" @click="submitNacos">提交</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script>
import serviceTree from './ServiceTree'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import { iopServService, iopAppService, iopTokenService } from '@/iop/service/index'
import { IOP_ACCESS_TOKEN, IOP_APP_CODE } from '@/iop/constants/index'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import { IOP_FORM_URL } from '@/iop/constants'
import { arrayTool } from 'mwutil'
export default {
  name: 'ServiceList',
  components: { serviceTree, IopDataTable, IopDataDictSelect },
  props: {
    thirdparty: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: path.system.serv.servindex
    },
    permission: {
      type: Array,
      required: false,
      default: () => ['create', 'view', 'edit', 'remove', 'removeSelected']
    },
    approStatus: {
      type: String,
      required: false,
      default: ''
    },
    selectable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    const serviceListVO = [
      {
        title: '服务名称',
        dataIndex: 'chName',
        align: 'center',
        sorter: false,
        width: '150px'
      },
      {
        title: '服务提供单位',
        align: 'center',
        dataIndex: 'deptName',
        sorter: false
      },
      {
        title: '服务入口地址',
        align: 'left',
        dataIndex: 'inAddr',
        sorter: false,
        hidden: true
      },
      {
        title: '状态',
        align: 'left',
        dataIndex: 'isValide',
        sorter: false,
        width: '100px',
        customRender: (val, row, ind) => {
          if (row.isValide === '否') {
            return <a-tag color="pink">未启用</a-tag>
          } else {
            return <a-tag color="purple">已启用</a-tag>
          }
        }
      }
    ]
    if (this.thirdparty !== 'invoke') {
      serviceListVO.push(
        {
          title: '是否发布',
          dataIndex: 'isPub',
          sorter: false,
          width: '100px',
          customRender: (val, row, ind) => {
            return <a-switch checked={row.isPub === '是'} checked-children="是" un-checked-children="否" onChange={() => { this.changeIsPub(event, row) }} />
          }
        }
      )
    }
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: this.url,
        /** rowKey，必填 */
        rowKey: 'serviceId',
        /** 列定义 */
        columns: serviceListVO,
        selectable: this.selectable,
        actionsWidth: 215
      },
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      serviceId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '0',
      selectedFlag: false,
      serviceIds: [],
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      swaggerForm: this.$form.createForm(this),
      zookForm: this.$form.createForm(this),
      nacosForm: this.$form.createForm(this),
      zookUrl: '',
      zookPort: '',
      nacoskUrl: '',
      nacosPort: '',
      nacosUser: '',
      zookUser: '',
      nacosPass: '',
      zookPass: '',
      activeKey: 'swagger',
      fileUrl: path.system.serv.fileImport,
      header: {},
      /** 第三方服务选中的 */
      thirdpartyServiceIds: [],
      fileList: []
    }
  },
  mounted () {
    if (this.$route.query.parentId && this.$route.query.parentId !== '0') {
      this.parentId = this.$route.query.parentId
      this.selectedNode = this.parentId
      if (this.thirdparty !== 'invoke') {
        this.$refs.serviceTree.reloadNode(this.parentId)
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
      }
    } else {
      this.parentId = '0'
      if (this.thirdparty !== 'invoke') {
        this.$refs.serviceTree.reload()
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
      }
    }
    const app = iopAppService.getCurrentAppCode()
    const token = iopTokenService.getToken(app)
    this.header = {
      [IOP_ACCESS_TOKEN]: token,
      [IOP_APP_CODE]: app
    }
  },

  methods: {
    beforeUpload (file) {
      this.fileList = [file]
    },
    reload () {
      this.$refs.serviceList.reload()
    },
    /**
     * 查询
     */
    async search () {
      try {
        const query = {}
        if (this.thirdparty !== 'invoke') {
          Object.assign(query, { parentId: this.selectedNode })
        }
        await this.$refs.serviceList.search(query)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.serviceList.resetSearch()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.parentId = key
      this.$refs.serviceList.reload({
        parentId: key
      })
    },

    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据id
     */
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onSelectedChange':
          this.selected(data.original)
          break
      }
    },
    selected (data) {
      this.thirdpartyServiceIds = data.selectedRowKeys
      if (data.selectedRowKeys.length > 0) {
        this.selectedFlag = false
        data.selectedRows.forEach(v => {
          if (this.serviceIds.indexOf(v.serviceId) === -1) {
            this.serviceIds.push(v.serviceId)
          }
        })
      } else {
        this.selectedFlag = true
        this.serviceIds = []
      }
      this.$emit('onSelectedChange', data)
    },
    // 导入
    toLead () {
      this.visible = true
      this.activeKey = 'swagger'
    },
    tabChange (key) {
      this.activeKey = key
    },
    setFileStatus (file, value) {
      const idx = arrayTool.findIndex(this.fileList, file)
      if (idx > -1) {
        const fileItem = this.fileList[idx]
        fileItem.status = value
        this.$set(this.fileList, idx, fileItem)
      }
    },
    upload (data) {
      this.submitSwagger(data.file)
    },
    // 导入上传
    handleChange (info) {
      const status = info.file.status
      if (status === 'done') {
        this.$message.success(`${info.file.name}上传成功`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name}上传失败`)
      }
    },
    handleCancel () {
      this.restImportForm()
    },
    restImportForm () {
      this.visible = false
      this.zookUrl = ''
      this.zookPort = ''
      this.zookUser = ''
      this.zookPass = ''
      this.nacoskUrl = ''
      this.nacosPort = ''
      this.nacosUser = ''
      this.nacosPass = ''
      this.activeKey = 'swagger'
      this.fileList = []
    },
    // 导入swagger提交
    async submitSwagger (file) {
      this.setFileStatus(file, 'uploading')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'swagger')
      try {
        await iopServService.fileImport(formData)
        this.setFileStatus(file, 'done')
        MessageUtils.success()
        this.restImportForm()
      } catch (err) {
        this.setFileStatus(file, 'error')
        MessageUtils.error(err)
      }
    },
    async submitZook () {
      const zookData = {
        type: this.activeKey,
        userName: this.zookUser,
        passwd: this.zookPass,
        url: this.zookUrl,
        port: this.zookPort
      }
      try {
        await iopServService.servImport(zookData)
        MessageUtils.success()
        this.restImportForm()
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    async submitNacos () {
      const nacosData = {
        type: this.activeKey,
        userName: this.nacosUser,
        passwd: this.zookPass,
        url: this.nacosPass,
        port: this.nacosPort
      }
      try {
        await iopServService.servImport(nacosData)
        MessageUtils.success()
        this.restImportForm()
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    // 停用
    async stop () {
      try {
        await iopServService.batchUnValide(this.serviceIds)
        MessageUtils.success()
        this.$notification.success({
          message: '操作成功'
        })
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
        this.serviceIds = []
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    // 启用
    async start () {
      try {
        await iopServService.batchValide(this.serviceIds)
        MessageUtils.success()
        this.$notification.success({
          message: '操作成功'
        })
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
        this.serviceIds = []
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    // 发布
    async publish () {
      try {
        await iopServService.batchPub(this.serviceIds)
        MessageUtils.success()
        this.$notification.success({
          message: '操作成功'
        })
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
        this.serviceIds = []
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    // 取消发布
    async unPublish () {
      try {
        await iopServService.batchUnPub(this.serviceIds)
        MessageUtils.success()
        this.$notification.success({
          message: '操作成功'
        })
        this.$refs.serviceList.reload({
          parentId: this.parentId
        })
        this.serviceIds = []
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    // switch事件
    changeIsPub (e, row) {
      this.$confirm({
        title: '确定更改吗',
        onOk: async () => {
          this.serviceIds.push(row.serviceId)
          if (row.isPub === '否') {
            await this.publish()
          } else {
            await this.unPublish()
          }
        }
      })
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} serviceId 数据主键
     */
    reloadNode (parentId = '') {
      if (!parentId) {
        // 新建或者编辑的回调
        parentId = this.parentId
      }
      if (parentId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.serviceTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.serviceTree.reload()
      }
    },

    /** 删除 */
    handleRemove (record = {}) {
      // this.$refs.serviceList.handleRemove(record)
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          iopServService.removeService(record.serviceId)
            .then(() => {
              this.$message.success('删除成功')
              this.reloadNode(record.serviceIds)
            })
            .catch(e => {
              this.$message.error(e)
            })
        }
      })
    },
    /** 第三方删除 */
    thirdpartyRemove (record = {}, type) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            if (type) {
              iopServService.batchDeleteService([record.serviceId]).then(res => {
                this.$message.success('操作成功')
                this.$refs.serviceList.reload()
              })
            } else {
              iopServService.batchDeleteService(this.thirdpartyServiceIds).then(res => {
                this.$message.success('操作成功')
                this.$refs.serviceList.reload()
              })
            }
          } catch (error) {
            this.$message.error(error)
          }
        }
      })
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.serviceId = ''
      this.parentId = this.selectedNode
      // 跳转页面
      if (this.thirdparty !== 'invoke') {
        this.$goPage(`serv/service/add`, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      } else {
        this.$goPage(IOP_FORM_URL.SERV_CALL.INFO, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (serviceId = '') {
      this.formMode = 'view'
      this.serviceId = serviceId
      this.parentId = this.selectedNode
      if (this.thirdparty !== 'invoke') {
        this.$goPage(`serv/service/add`, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      } else {
        this.$goPage(IOP_FORM_URL.SERV_CALL.INFO, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      }
    },
    /**
     * 点击编辑
     */
    handleEdit (serviceId = '') {
      this.formMode = 'edit'
      this.serviceId = serviceId
      if (this.thirdparty !== 'invoke') {
        this.$goPage(`serv/service/add`, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      } else {
        this.$goPage(IOP_FORM_URL.SERV_CALL.INFO, {
          parentId: this.parentId,
          mode: this.formMode,
          serviceId: this.serviceId,
          thirdparty: this.thirdparty
        })
      }
    },
    /**
     * 点击方法定义
     */
    MethodDef (record) {
      this.serviceId = record.serviceId
      this.$goPage(`serv/service/methodList`, {
        serviceId: this.serviceId
      })
    },
    /**
     * 删除列表选择项，多选
     *
     * @param {Array} servIds 选中项的主键数组
     */
    handleRemoveSelected (servIds = []) {
      if (this.thirdparty !== 'invoke') {
        let serviceId
        if (servIds.includes(this.selectedNode)) {
          serviceId = this.selectedNode
        } else {
          serviceId = servIds[0]
        }
        this.reloadNode(serviceId)
      } else {
        this.reloadNode()
      }
    }
  }
}
</script>
