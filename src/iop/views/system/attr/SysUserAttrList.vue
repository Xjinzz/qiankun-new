<template>
  <div>
    <iop-data-table
      ref="sysUserAttrList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="参数环境：">
              <a-select
                @change="onAttrEnvChange"
                v-decorator="['enviromentCode', { initialValue: '1' }]">
                <template
                  v-for="env in attrEnviroValues">
                  <a-select-option :value="env.code" :key="env.code">{{ env.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="参数名称：">
              <a-input @pressEnter="search" placeholder="请输入" v-model="attrName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced">
            <a-form-item label="参数编码：">
              <a-input @pressEnter="search" placeholder="请输入" v-model="attrCode" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced" style="margin-top: 20px">
            <a-form-item label="参数值类型：">
              <iop-data-dict-select ref="attrDatatype" @change="changeVal" type="attrDatatype" v-model="attrDatatype" />
            </a-form-item>
          </a-col>
          <a-col :span="advanced ? 16 : 8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced()" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <sysUserAttr-tree ref="sysUserAttrTree" @onSelect="onTreeSelect" />
      </template>

      <template #beforeCreateButton>
        <a-button type="primary" @click="copyCatalog()">复制目录</a-button>
      </template>

      <template #beforeRemoveSelectedButton>
        <a-button type="primary" @click="copyVal()" :disabled="selectedRows.length === 0">复制参数</a-button>
        <a-button type="primary" @click="clean()">清空</a-button>
      </template>

      <template #rowButtons="{ record }">
        <span v-if="record.attrId != '' && record.attrValId === '' || null && record.attrType === '分组' ">
          <a @click="handleViewGroup(record)">查看</a>
          <a-divider type="vertical" />
          <span>
            <a @click="handleEdit(record)" >编辑</a>
            <a-divider type="vertical" />
          </span>
          <a @click="handleRemove(record)">删除</a>
        </span>
        <span v-else-if="record.attrValId != null || '' && record.attrId != '' ">
          <a @click="handleViews(record)">查看</a>
          <a-divider type="vertical" />
          <span>
            <a @click="handleEdits(record)" >编辑</a>
            <a-divider type="vertical" />
          </span>
          <a @click="handleRemoves(record)">删除</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleSetUp(record)">系统设置</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleHistory(record)">历史版本</a>
              </a-menu-item>
              <a-menu-item v-if="record.isUser != '否' ">
                <a @click="handlePersonality(record)">个性化设置</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleConfigure(record)">配置环境</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleParameter(record)">参数定义</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <span v-else>
          <a @click="handleParameter(record)">参数定义</a>
          <a-divider type="vertical" />
          <a @click="handleSetUp(record)">系统设置</a>
          <a-divider type="vertical" />
          <a @click="handleConfigure(record)">配置环境</a>
        </span>
      </template>
    </iop-data-table>

    <sys-user-attr-group-form
      ref="sysUserAttrForm"
      :attrId="attrId"
      :parentId="parentId"
      :attrValId="attrValId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode" />

    <sys-user-attr-edit-form
      ref="sysUserAttrEditForm"
      :attrId="attrId"
      :attrValId="attrValId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode" />

    <sys-user-set-up-form
      ref="sysUserSetUpForm"
      :attrId="attrId"
      :parentId="parentId"
      :attrVallist="attrVallist"
      :attrValId="attrValId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode" />

    <sys-user-add-attr-form
      ref="sysUserAddAttrForm"
      :attrId="attrId"
      :parentId="parentId"
      :attrValId="attrValId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode" />

    <sys-user-parameter-form
      ref="sysUserParameterForm"
      :attrId="attrId"
      :mode="formMode"
      :attrValId="attrValId"
      @onSubmitSuccess="reloadNode" />

    <copy-catalog-modal ref="catalogModal" />

    <copy-val-modal
      ref="valModal"
      :attrEnviroValues="attrEnviroValues"
      :sourceEnCode="selectedAttrEnviro"
      :vals="selectedRows"
      @submitSuccess="copyValSuccess" />

    <a-modal title="历史版本" width="950px" :visible="showHistorical" @cancel="hideRoleModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideRoleModal">关闭</a-button>
        </div>
      </template>
      <div style="margin-bottom: -24px;">
        <historical-version-modal ref="historical" :attrValId="attrValId" :attrEnviro="attrEnviro" />
      </div>
    </a-modal>

    <a-modal title="个性化设置" width="950px" :visible="showSetupModal" @cancel="hideSetupModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideSetupModal">关闭</a-button>
        </div>
      </template>
      <div style="margin-bottom: -24px;">
        <sys-user-set-up-list-modal ref="setup" :attrValId="attrValId" :attrEnviro="attrEnviro" />
      </div>
    </a-modal>

    <a-modal title="环境配置" width="950px" :visible="showSEnvironmentalModal" @cancel="hideEnvironmentalModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideEnvironmentalModal">关闭</a-button>
        </div>
      </template>
      <div style="margin-bottom: -24px;">
        <environmental-list-modal ref="environmental" :attrId="attrId" :attrValId="attrValId" :attrEnviro="attrEnviro" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { iopCodeService, iopUserAttrService } from '@/iop/service'
import CopyCatalogModal from './CopyCatalogModal'
import CopyValModal from './CopyValModal'
import SysUserAttrTree from './SysUserAttrTree'
import HistoricalVersionModal from './HistoricalVersionModal'
import SysUserSetUpListModal from './SysUserSetUpListModal'
import EnvironmentalListModal from './EnvironmentalListModal'
import SysUserAttrGroupForm from './SysUserAttrGroupForm'
import SysUserAddAttrForm from './SysUserAddAttrForm'
import SysUserParameterForm from './SysUserParameterForm'
import SysUserSetUpForm from './SysUserSetUpForm'
import sysUserAttrListVO from './vo/sys-user-attr-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'
import SysUserAttrEditForm from './SysUserAttrEditForm'

export default {
  name: 'SysUserAttrList',
  components: {
    SysUserAttrTree,
    SysUserAttrGroupForm,
    SysUserParameterForm,
    SysUserAddAttrForm,
    IopDataTable,
    IopDataDictSelect,
    CopyCatalogModal,
    CopyValModal,
    HistoricalVersionModal,
    SysUserSetUpListModal,
    EnvironmentalListModal,
    SysUserSetUpForm,
    SysUserAttrEditForm
  },
  data () {
    return {
      advanced: false,
      table: {
        url: path.system.userAttr.index,
        rowKey: 'attrId',
        columns: sysUserAttrListVO
      },
      permission: ['create', 'edit'],
      formMode: 'create',
      attrId: '',
      selectedNode: { id: 0 },
      parentId: '',
      attrValId: '',
      attrEnviro: '1',
      attrVallist: '',
      selectedRows: [],
      attrEnviroValues: [],
      selectedAttrEnviro: {},
      showHistorical: false,
      showSetupModal: false,
      showSEnvironmentalModal: false,
      attrName: '',
      attrDatatype: '',
      attrCode: ''
    }
  },
  watch: {
    'attrEnviro' () {
      this.search()
    }
  },
  created () {
    iopCodeService.getDict('attrEnviro')
      .then((data) => {
        this.attrEnviroValues = data
      })
      .catch((err) => {
        MessageUtils.error(err)
      })
  },
  methods: {
    onAttrEnvChange (value) {
      this.attrEnviro = value
    },

    changeVal (val) {
      this.attrDatatype = val
    },

    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    /**
     * 查询
     */
    async search () {
      try {
        this.$refs.sysUserAttrList.reload({
          parentId: this.selectedNode.id,
          enviromentCode: this.attrEnviro,
          attrName: this.attrName,
          attrDatatype: this.attrDatatype,
          attrCode: this.attrCode
        })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.sysUserAttrList.resetSearch()
      this.$refs.attrDatatype.cleanSelected()
      this.attrName = ''
      this.attrDatatype = ''
      this.attrCode = ''
      this.search()
    },

    /**
     * 选中树节点
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = data
      this.$refs.sysUserAttrList.reload({
        parentId: key,
        enviromentCode: this.attrEnviro
      })
    },

    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据
     */
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onRemove':
          this.reloadNode(data.original.extra.parentId)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.extra)
          break
        case 'onSelectedChange':
          if (data && data.original) {
            this.selectedRows = data.original.selectedRows
          }
          break
        case 'onClearSelected':
          this.selectedRows = []
          break
      }
    },

    /**
     * 刷新树当前选中节点
     */
    reloadNode (key) {
      this.$refs.sysUserAttrTree.reloadNode(key)
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.attrId = ''
      this.parentId = this.selectedNode.id
      this.$refs.sysUserAddAttrForm.show(this.selectedNode)
    },

    /**
     * 点击查看(分组)按钮事件
     */
    handleViewGroup (record = {}) {
      this.formMode = 'view'
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$refs.sysUserAttrForm.attrValId.attrValId = record.attrValId
      this.$refs.sysUserAttrForm.show()
    },

    /**
     * 点击编辑（分组）按钮事件
     */
    handleEdit (record = {}) {
      this.formMode = 'edit'
      this.$refs.sysUserAttrForm.attrValId.attrValId = record.attrValId
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$refs.sysUserAttrForm.show()
    },

    /**
     * 点击查看（参数）按钮事件
     */
    handleViews (record = {}) {
      this.formMode = 'view'
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$refs.sysUserAttrEditForm.show()
    },

    /**
     * 点击编辑(参数)按钮事件
     */
    handleEdits (record = {}) {
      this.formMode = 'edit'
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$refs.sysUserAttrEditForm.show()
    },

    handleSetUp (record = {}) {
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.attrVallist = record.attrVallist
      this.$refs.sysUserSetUpForm.show()
      this.$refs.sysUserSetUpForm.attrDataType = record.attrDataType
    },

    /**
     * 参数定义
     */
    handleParameter (record = {}) {
      this.formMode = 'edit'
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$refs.sysUserParameterForm.show()
    },

    /**
     * 历史版本
     */
    handleHistory (record = {}) {
      this.showHistorical = true
      this.attrValId = record.attrValId
      this.$nextTick(() => {
        this.$refs.historical && this.$refs.historical.load()
      })
    },
    hideRoleModal () {
      this.showHistorical = false
    },

    /**
     * 个性化设置
     */
    handlePersonality (record = {}) {
      this.showSetupModal = true
      this.attrValId = record.attrValId
      this.$nextTick(() => {
        this.$refs.setup && this.$refs.setup.load()
      })
    },
    hideSetupModal () {
      this.showSetupModal = false
    },

    /**
     * 环境配置
     */
    handleConfigure (record = {}) {
      this.showSEnvironmentalModal = true
      this.attrId = record.attrId
      this.attrValId = record.attrValId
      this.$nextTick(() => {
        this.$refs.environmental && this.$refs.environmental.load()
      })
    },
    hideEnvironmentalModal () {
      this.showSEnvironmentalModal = false
    },

    /**
     * 删除
     */
    handleRemove (record = {}) {
      var params = {
        userValId: record.attrValId
      }
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          iopUserAttrService.del(record.attrId, params)
            .then(() => {
              this.$message.success('删除成功')
              this.reloadNode()
            })
            .catch((err) => {
              MessageUtils.error(err)
            })
        }
      })
    },

    /**
     * 删除已设定值
     */
    handleRemoves (record = {}) {
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          iopUserAttrService.delte(record.attrValId)
            .then(() => {
              this.$message.success('删除成功')
              this.reloadNode()
            })
            .catch((err) => {
              MessageUtils.error(err)
            })
        }
      })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} records 删除的数据
     */
    handleRemoveSelected (records = []) {
      let key
      const { selectedNode } = this
      for (const record of records) {
        if (record.attrId === selectedNode.id) {
          key = record.parentId
          break
        }
      }
      if (!key) {
        key = selectedNode.id
      }
      this.reloadNode(key)
    },

    copyCatalog () {
      this.$refs.catalogModal.show()
    },

    copyVal () {
      for (const env of this.attrEnviroValues) {
        if (env.code === this.attrEnviro) {
          this.selectedAttrEnviro = { ...env }
          break
        }
      }
      this.$refs.valModal.show()
    },

    clean () {
      const params = {
        enCode: this.attrEnviro
      }
      this.$confirm({
        title: '点击清空后，当前参数环境下所有的值会被删除，确定清空吗？',
        onOk: () => {
          iopUserAttrService.clean(params).then(res => {
            this.$message.success('清空成功')
            this.reloadNode(0)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    copyValSuccess () {
      this.$refs.sysUserAttrList.clearSelected()
    }
  }
}
</script>
