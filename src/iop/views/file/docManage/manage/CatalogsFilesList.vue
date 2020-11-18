<template>
  <div>
    <iop-data-table
      ref="catalogsFilesList"
      :table="table"
      :permission="permission"
      tree
      :hiddenTop="searchFlag"
      @onAction="onAction"
      v-bind="$attrs"
    >
      <template #top v-if="changePage">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入标题" />
          </a-col>
        </a-row>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate">新建目录</a-button>
      </template>
      <template #beforeRemoveSelectedButton>
        <a-button type="primary" @click="statistics(menuId, 'all')">文档库统计</a-button>
        <a-button type="primary" @click="upload" >上传</a-button>
        <a-button type="primary" @click="move" :disabled="selectedFlag" >移动</a-button>
        <a-button type="primary" @click="merge" :disabled="selectedFlag" >合并</a-button>
        <a-button type="primary" @click="remove" :disabled="selectedFlag" >删除</a-button>
      </template>
      <template #rowButtons="{ record }">
        <a @click="handleView(record.fileId)" v-if="record.fileType === '目录'" >查看</a>
        <a-divider type="vertical" v-if="record.fileType !== '文件'"/>
        <a @click="handleEdit(record.fileId)" v-if="record.fileType === '目录'" >编辑</a>
        <a-divider type="vertical" v-if="record.fileType !== '文件'"/>
        <a @click="handleRemove(record)">删除</a>
        <a-divider type="vertical" />
        <a v-if="record.fileType === '文件'" @click="downloadFile(record)">下载</a>
        <a-divider type="vertical" v-if="record.fileType === '文件'" />
        <a v-if="record.fileType === '文件'" @click="putName(record)">重命名</a>
        <a-dropdown v-if="record.fileType === '目录'" >
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="statistics(record.fileId, 'one')">统计</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="putName(record)">重命名</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <template #tree>
        <catalogs-files-tree ref="catalogsFilesTree" @onSelect="onTreeSelect" :id="menuId"/>
      </template>
    </iop-data-table>
    <catalog-files-form
      v-if="clgChange"
      ref="catalogFilesForm"
      :ctlgId="menuId"
      :fileId="fileId"
      :parentId="parentId"
      :parentName="parentName"
      :mode="formMode"
      :submitSuccess="success"
    />
    <!--统计弹窗 -->
    <a-modal v-model="visible" :title="showEcharts ? '文档库统计' : '目录统计'" :footer="null" :destroyOnClose="true">
      <div class="chart" v-if="showEcharts">
        <StatisticsCharts :statisticsData="statisticsData"/>
        <div class="tip">
          <h4>总容量： {{ statisticsData.totalCapacity }}</h4>
          <h4>已用容量： {{ statisticsData.usedSpaceStr }}</h4>
          <h4>可用容量： {{ statisticsData.remainSpaceStr }}</h4>
          <h4>目录数量： {{ statisticsData.folderCount }}</h4>
          <h4>文件数量： {{ statisticsData.fileCount }}</h4>
        </div>
      </div>
      <div class="chart" v-else>
        <div class="tip">
          <h4>已用容量： {{ statisticsData.usedSpaceStr }}</h4>
          <h4>目录数量： {{ statisticsData.folderCount }}</h4>
          <h4>文件数量： {{ statisticsData.fileCount }}</h4>
        </div>
      </div>
    </a-modal>
    <!-- 重命名弹窗 -->
    <a-modal v-model="nameFlag" title="重命名">
      <a-input v-model="newName" placeholder="请输入名称"/>
      <template slot="footer">
        <a-button @click="cancelPut">取消</a-button>
        <a-button @click="saveName" type="primary">确定</a-button>
      </template>
    </a-modal>
    <!-- 上传文件弹窗 -->
    <a-modal v-model="uploadFlag" title="上传文件" :destroyOnClos="true">
      <iop-upload-dragger
        v-if="uploadFlag"
        ref="upLoad"
        :id="parentId"
        :multiple="true"
        :moreFileUpload="true"
        :customUrl="uploadUrl"
        :mode="'create'"
        :attrName="'UpLoadFile'"
        :businessName="'PubFileCtlgStore'"
        :autoUpload="false"
        @success="uploadSuccess"
      />
      <template slot="footer">
        <a-button @click="okLoad" type="primary">确定</a-button>
      </template>
    </a-modal>
    <!-- 移动弹窗 -->
    <a-modal v-model="moveFlag" title="移动" :destroyOnClos="true">
      <iop-data-tree-select
        ref="targetCtlgId"
        :url="treeUrl"
        style="width: 100%"
        :placeHolderSelected="placeHolderSelected"
        @select="selsectCtlgId"
        :value="targetCtlgId"
        :banSelectable="banSelectable"
        :treeSelectStrictly="true"
        v-if="moveFlag"/>
      <template slot="footer">
        <a-button @click="cancelMove" >取消</a-button>
        <a-button @click="saveMove" type="primary">确定</a-button>
      </template>
    </a-modal>
    <!-- 和并弹窗 -->
    <a-modal v-model="margeFlag" title="合并" :destroyOnClos="true">
      <a-form>
        <a-form-item label="目标目录" v-bind="formItemLayout">
          <iop-data-tree-select
            ref="margeId"
            :url="treeUrl"
            style="width: 100%"
            :placeHolderSelected="placeHolderSelected"
            @select="selectMargeTar"
            :value="margeId"/>
        </a-form-item>
        <a-form-item label="新目录名称" v-bind="formItemLayout">
          <a-input placeholder="请输入名称" v-model="newCtlgName"></a-input>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button @click="cancelMarge" >取消</a-button>
        <a-button @click="saveMarge" type="primary">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CatalogsFilesTree from './CatalogsFilesTree'
import CatalogFilesForm from './CatalogsFilesForm'
import { iopCatalogsService } from '@/iop/service/index'
import { IopDataTable, IopUploadDragger, IopDataTreeSelect } from '@/iop/components'
import StatisticsCharts from './statisticsCharts'
import path from '@/iop/api/index'
import Ellipsis from '@/components/Ellipsis'
import { arrayTool } from 'mwutil'
import { download } from '@/utils/util'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'

export default {
  inheritAttrs: false,
  name: 'CatalogsFilesList',
  components: { IopDataTable, CatalogsFilesTree, CatalogFilesForm, StatisticsCharts, IopUploadDragger, IopDataTreeSelect, Ellipsis },
  props: {
    searchFlag: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    const catalogsFilesListVo = [
      {
        title: '标题',
        dataIndex: 'fileName',
        align: 'left',
        sorter: false,
        customRender: (val) => {
          return <ellipsis length={20} tooltip={true}>{val}</ellipsis>
        }
      },
      {
        title: '大小',
        align: 'center',
        dataIndex: 'fileSize',
        sorter: true
      },
      {
        title: '创建时间',
        align: 'left',
        dataIndex: 'createTime',
        sorter: false
      },
      {
        title: '类型',
        align: 'left',
        dataIndex: 'fileType',
        sorter: false
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.file.manage.index,
        /** rowKey，必填 */
        rowKey: 'fileId',
        /** 不显示序号列 */
        serial: true,
        /** 列定义 */
        columns: catalogsFilesListVo,
        query: {
          ctlgId: this.id ? this.id : this.$route.meta.para
        }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      fileId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: this.id ? this.id : this.$route.meta.para,
      visible: false,
      statisticsData: {},
      nameFlag: false,
      newName: '',
      nameId: '',
      menuId: '',
      uploadFlag: false,
      selectedFlag: true,
      uploadUrl: path.file.manage.fileUpload,
      fileType: '',
      moveFlag: false,
      treeUrl: path.file.manage.moveTree,
      fileCodes: [],
      tableSelectRowIds: [],
      targetCtlgId: '',
      placeHolderSelected: {
        title: '全部',
        value: this.id ? this.id : this.$route.meta.para,
        key: this.id ? this.id : this.$route.meta.para
      },
      margeFlag: false,
      margeId: '',
      newCtlgName: '',
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      parentName: '',
      showEcharts: false,
      clgChange: true,
      changePage: true,
      banSelectable: []
    }
  },
  created () {
    this.changePage = false
    this.$nextTick(() => {
      this.changePage = true
    })
    this.menuId = this.id ? this.id : this.$route.meta.para
  },
  watch: {
    // 监听路由 路由改变 重新加载列表  树形
    '$route.meta.para': 'load'
  },
  methods: {
    load () {
      this.changePage = false
      this.$nextTick(() => {
        this.changePage = true
      })
      this.menuId = this.id ? this.id : this.$route.meta.para
      this.clgChange = false
      this.$nextTick(() => {
        this.clgChange = true
      })
    },
    // 查询
    async search (ctlgName = '') {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.catalogsFilesList.reload({ parentId: this.parentId, ctlgName })
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },
    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.catalogsFilesList.resetSearch()
      this.$refs.catalogsFilesTree.reload()
    },
    // 移动
    move () {
      this.moveFlag = true
    },
    cancelMove () {
      this.moveFlag = false
      this.targetCtlgId = ''
    },
    selsectCtlgId (val) {
      this.targetCtlgId = val
    },
    saveMove () {
      const moveData = {
        selectedItems: this.fileCodes,
        sourceCtlgId: this.selectedNode,
        targetCtlgId: this.targetCtlgId
      }
      this.parentId = this.targetCtlgId
      iopCatalogsService.move(moveData).then(res => {
        this.moveFlag = false
        this.targetCtlgId = ''
        this.fileCodes = []
        this.$refs.catalogsFilesTree.reload()
        this.$refs.targetCtlgId.cleanSelected()
      })
    },

    // 上传
    upload () {
      this.uploadFlag = true
    },
    okLoad () {
      if (this.$refs.upLoad.state.successList && this.$refs.upLoad.state.successList.length) {
        this.$refs.upLoad.upload()
        return
      }
      this.uploadFlag = false
    },
    uploadSuccess () {
      this.uploadFlag = false
      this.$refs.catalogsFilesList.reload({
        [tableQueryName]: this.parentId
      })
    },
    // 统计
    statistics (id, flag) {
      iopCatalogsService.statistics(id).then(res => {
        this.statisticsData = res
        this.visible = true
      })
      if (flag === 'all') {
        this.showEcharts = true
      } else {
        this.showEcharts = false
      }
    },

    // 合并
    merge () {
      this.margeFlag = true
    },
    // 取消合并
    cancelMarge () {
      this.margeFlag = false
      this.margeId = ''
      this.newCtlgName = ''
    },
    selectMargeTar (val) {
      this.margeId = val
    },
    saveMarge () {
      const mergeDat = {
        selectedCtlgIds: this.fileCodes,
        targetCtlgId: this.margeId,
        newCtlgName: this.newCtlgName
      }
      iopCatalogsService.merge(mergeDat)
        .then(res => {
          this.margeFlag = false
          this.margeId = ''
          this.newCtlgName = ''
          this.fileCodes = []
          this.$refs.catalogsFilesTree.reload()
          this.$refs.catalogsFilesList.reload({
            [tableQueryName]: this.selectedNode
          })
          this.$refs.margeId.cleanSelected()
        })
        .catch((e) => {
          this.$message.error(e)
        })
    },

    // 下载
    downloadFile (data) {
      // const app = iopAppService.getCurrentAppCode()
      // const token = iopTokenService.getToken(app)
      // const url = `${path.file.manage.download}?fileId=${data.fileId}&fileTile=&token=${token}`
      // window.location.href = url
      // FIXED: By jinzz 修改下载报错，原写法导致token为空
      download(`${path.file.manage.download}?fileId=${data.fileId}&fileTile=`, 'get')
    },
    // 重命名
    putName (data) {
      this.nameId = data.fileId
      this.newName = data.fileName
      this.nameFlag = true
      this.fileType = data.fileType
    },
    // 取消重命名
    cancelPut () {
      this.nameFlag = false
      this.nemName = ''
      this.fileType = ''
    },
    // 保存命名
    saveName () {
      if (this.fileType === '目录') {
        iopCatalogsService.putName(this.nameId, { ctlgName: this.newName }).then(res => {
          this.nameFlag = false
          this.nemName = ''
          this.nameId = ''
          this.fileType = ''
          this.reloadNode(this.selectedNode)
        })
      } else if (this.fileType === '文件') {
        iopCatalogsService.putFileName(this.nameId, { fileName: this.newName }).then(res => {
          this.nameFlag = false
          this.nemName = ''
          this.nameId = ''
          this.fileType = ''
          this.reloadNode(this.selectedNode)
        })
      }
    },
    success (data) {
      this.$refs.catalogsFilesTree.reload()
    },
    // 批量删除
    remove () {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          iopCatalogsService.batchDel({
            selectedItems: this.fileCodes
          }).then(res => {
            if (this.tableSelectRowIds.includes(this.id)) {
              this.$router.go(-1)
              return
            }
            this.$refs.catalogsFilesList.reload({
              [tableQueryName]: this.parentId
            })
            this.reloadNode(this.selectedNode)
          }).catch(error => {
            this.$message.error(error)
          })
        }
      })
    },
    // 删除
    handleRemove (record = {}) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          if (record.fileType === '目录') {
            iopCatalogsService.deleteCatalogs(record.fileId).then(res => {
              if (record.fileId === this.id) {
                this.$router.go(-1)
                return
              }
              this.reloadNode(this.selectedNode)
            }).catch(error => {
              this.$message.error(error)
            })
          } else if (record.fileType === '文件') {
            iopCatalogsService.deleteFiles(record.fileId).then(res => {
              this.reloadNode(this.selectedNode)
            }).catch(error => {
              this.$message.error(error)
            })
          }
        }
      })
    },
    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      this.parentName = data ? data.name : ''
      this.parentId = key
      this.$refs.catalogsFilesList.reload({
        [tableQueryName]: key
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
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
        case 'onSelectedChange':
          this.selected(data.original)
          break
      }
    },
    selected (data) {
      this.fileCodes = []
      this.banSelectable = arrayTool.deepClone(data.selectedRowKeys)
      if (data.selectedRowKeys.length > 0) {
        this.tableSelectRowIds = data.selectedRowKeys
        this.selectedFlag = false
        data.selectedRows.forEach(v => {
          if (this.fileCodes.indexOf(v.fileCode) === -1) {
            this.fileCodes.push(v.fileCode)
          }
        })
      } else {
        this.selectedFlag = true
        this.fileCodes = []
        this.tableSelectRowIds = []
      }
      this.$emit('onSelectedChange', data)
    },
    /**
     * 刷新树当前选中节点
     *
     * @param {string} ctlgId 数据主键
     */
    reloadNode (fileId) {
      if (!fileId) {
        // 新建或者编辑的回调
        fileId = this.fileId
      }
      if (fileId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.catalogsFilesTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.catalogsFilesTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.fileId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      // 先赋值，后显示
      this.$refs.catalogFilesForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} ctlgId 主键
     */
    handleView (fileId = '') {
      this.formMode = 'view'
      this.fileId = fileId
      this.parentId = this.selectedNode
      this.$refs.catalogFilesForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} ctlgId 主键
     */
    handleEdit (fileId = '') {
      this.formMode = 'edit'
      this.fileId = fileId
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.catalogFilesForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} servIds 选中项的主键数组
     */
    handleRemoveSelected (servIds = []) {
      let ctlgId
      if (servIds.includes(this.selectedNode)) {
        ctlgId = this.selectedNode
      } else {
        ctlgId = servIds[0]
      }
      this.reloadNode(ctlgId)
    }
  }
}
</script>
<style lang="less" scoped>
  .chart{
    width: 100%;
    height: 100%;
    display: flex;
    .tip {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
