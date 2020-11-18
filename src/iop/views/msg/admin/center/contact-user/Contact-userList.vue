<template>
  <div>
    <iop-data-table ref="contactUserList" :table="table" :permission="permission" tree @onAction="onAction">
      <template #beforeRemoveSelectedButton>
        <slot name="tableHeader">
          <a-button type="primary" @click="handleCreate">新建人员</a-button>
          <a-button type="primary" @click="createContact">新建分组</a-button>
        </slot>
      </template>
      <template #beforeViewButton="record">
        <a @click="packetSwitch(record)" v-if="record.record.classification === 'PubMsgContUser'">切换分组</a>
        <a-divider type="vertical" v-if="record.record.classification === 'PubMsgContUser'"/>
      </template>
      <template #afterEditButton="record">
        <a @click="handelRemove(record)" >删除</a>
      </template>
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="名称">
              <a-input @pressEnter="search" placeholder="请输入名称" v-decorator="['userName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="编码">
              <a-input @pressEnter="search" placeholder="请输入编码" v-decorator="['userCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <contact-user-tree ref="contactUserTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <a-modal title="上级分类" v-model="switchFormFlag" destroyOnClose>
      <a-form>
        <a-form-item label="上级分类：" v-bind="formItemLayout">
          <iop-data-tree-select
            ref="parentId"
            :url="treeUrl"
            @onSelect="getParentId"
            v-model="parentId"/>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="submit">提交</a-button>
      </template>
    </a-modal>
    <contact-form ref="contactForm" :contactId="contactId" :parentId="parentId" :mode="formMode" :submitSuccess="reloadNode" />
  </div>
</template>
<script>
import ContactUserTree from './Contact-userTree'
import ContactForm from '../contact/ContactForm'
import { IopDataTable, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import { iopContactUserService } from '@/iop/service/index'
import path from '@/iop/api/index'

export default {
  name: 'ContactUserList',
  components: {
    ContactUserTree,
    IopDataTable,
    ContactForm,
    IopDataDictSelect,
    IopDataTreeSelect
  },
  data () {
    const contactUserListVo = [
      {
        title: '名称',
        dataIndex: 'userName',
        align: 'center',
        sorter: false
      },
      {
        title: '编码',
        align: 'center',
        dataIndex: 'userCode',
        sorter: false
      },
      {
        title: '类型',
        dataIndex: 'classification',
        align: 'left',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.classification === 'PubMsgContacts') {
            return <a-tag color="pink">分组</a-tag>
          } else {
            return <a-tag color="pink">人员</a-tag>
          }
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        url: path.msg.contactUser.index,
        rowKey: 'conUserId',
        selectable: false,
        /** 列定义 */
        columns: contactUserListVo,
        actionsWidth: 240
      },
      treeUrl: path.msg.contactUser.tree,
      /** 表格组件按钮权限 */
      permission: ['view', 'edit'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      conUserId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      contactId: '',
      selectedFlag: false,
      switchFormFlag: false,
      ids: [],
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      parentId: '',
      parentName: ''
    }
  },
  methods: {
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.contactUserList.search({ parentId: this.parentId })
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.contactUserList.resetSearch()
      this.$refs.contactUserTree.reloadNode(this.parentId)
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      this.parentName = data && data.name ? data.name : ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.contactUserList.reload({
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
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onView':
          this.handleView(data.original)
          break
        case 'onEdit':
          this.handleEdit(data.original)
          break
      }
    },
    // 切换分组
    packetSwitch (record) {
      this.switchFormFlag = true
      if (record.record.conUserId) {
        this.ids.push(record.record.conUserId)
      }
    },
    getParentId (data) {
      this.parentId = data.key
    },
    cancel () {
      this.switchFormFlag = false
      this.parentId = ''
    },
    submit () {
      if (this.parentId) {
        iopContactUserService.packetSwitch(this.parentId, this.ids).then(res => {
          if (res.success) {
            this.onTreeSelect({
              key: this.parentId,
              data: {
                name: this.parentName
              }
            })
            this.$refs.contactUserTree.reloadNode(this.parentId)
            this.ids = []
            this.parentId = ''
            this.switchFormFlag = false
          }
        })
      } else {
        this.$message.error('请选择上级分类')
      }
    },
    /**
     * 刷新树当前选中节点
     *
     * @param {string} conUserId 数据主键
     */
    reloadNode (conUserId) {
      if (!conUserId) {
        // 新建或者编辑的回调
        conUserId = this.conUserId
      }
      if (conUserId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.contactUserTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.contactUserTree.reload()
      }
    },
    // 新建分组
    createContact () {
      this.formMode = 'create'
      this.contactId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      // 先赋值，后显示
      this.$refs.contactForm.show()
    },
    /**
     * 点击新建按钮事件
     * 新建人员
     */
    handleCreate () {
      this.formMode = 'create'
      this.conUserId = ''
      this.contactId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$goPage('msg/contactUserForm', {
        mode: this.formMode,
        contactId: this.contactId,
        parentName: this.parentName
      })
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} conUserId 主键
     */
    handleView (record) {
      this.formMode = 'view'
      if (record.classification === 'PubMsgContacts') {
        this.contactId = record.conUserId
        this.$refs.contactForm.show()
      } else {
        this.conUserId = record.conUserId
        this.contactId = this.selectedNode !== '0' ? this.selectedNode : '0'
        this.$goPage('msg/contactUserForm', {
          mode: this.formMode,
          conUserId: this.conUserId,
          contactId: this.contactId
        })
      }
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} conUserId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      if (record.classification === 'PubMsgContacts') {
        this.contactId = record.conUserId
        this.$refs.contactForm.show()
      } else {
        this.conUserId = record.conUserId
        this.contactId = this.selectedNode !== '0' ? this.selectedNode : '0'
        this.$goPage('msg/contactUserForm', {
          mode: this.formMode,
          conUserId: this.conUserId,
          contactId: this.contactId
        })
      }
    },
    handelRemove (data) {
      this.$confirm({
        title: '提示',
        content: '确定要删除吗 ?',
        onOk: async () => {
          if (data.record.classification === 'PubMsgContacts') {
            iopContactUserService.contactDelete(data.record.conUserId).then(res => {
              if (res.success) {
                // this.$refs.contactUserList.reload({ parentId: this.selectedNode })
                this.$refs.contactUserTree.reloadNode(this.selectedNode)
                this.$message.success('操作成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          } else {
            iopContactUserService.contactUserDelete(data.record.conUserId).then(res => {
              if (res.success) {
                this.$refs.contactUserTree.reloadNode(this.selectedNode)
                this.$message.success('操作成功')
              }
            }).catch(err => {
              this.$message.error(err)
            })
          }
        }
      })
    }
  }
}
</script>
