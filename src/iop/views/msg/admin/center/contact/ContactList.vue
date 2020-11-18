<template>
  <div>
    <iop-data-table ref="contactList" :table="table" :permission="permission" tree @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="分组名称">
              <a-input placeholder="请输入分组名称" v-decorator="['contactName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="分组编码">
              <a-input placeholder="请输入分组编码" v-decorator="['contactCode']" allowClear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <contact-tree ref="contactTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <contact-form ref="contactForm" :contactId="contactId" :parentId="parentId" :mode="formMode" :submitSuccess="reloadNode" />
  </div>
</template>
<script>
import ContactTree from './ContactTree'
import ContactForm from './ContactForm'
import contactListVo from './vo/contact-list-vo.js'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'ContactList',
  components: {
    ContactTree,
    ContactForm,
    IopDataTable,
    IopDataDictSelect
  },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.msg.contact.index,
        /** rowKey，必填 */
        rowKey: 'contactId',
        /** 不显示序号列 */
        serial: false,
        /** 列定义 */
        columns: contactListVo
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      contactId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
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
        await this.$refs.contactList.search({ parentId: this.selectedNode })
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.contactList.resetSearch()
      this.$refs.contactTree.reload()
      this.$refs.contactList.reload()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      this.parentName = data.name
      this.$refs.contactList.reload({
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
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.contactId)
          break
        case 'onEdit':
          this.handleEdit(data.original.contactId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} contactId 数据主键
     */
    reloadNode (contactId) {
      if (!contactId) {
        // 新建或者编辑的回调
        contactId = this.contactId
      }
      if (contactId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.contactTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.contactTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.contactId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : ''
      // 先赋值，后显示
      this.$refs.contactForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} contactId 主键
     */
    handleView (contactId = '') {
      this.formMode = 'view'
      this.contactId = contactId
      this.$refs.contactForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} contactId 主键
     */
    handleEdit (contactId = '') {
      this.formMode = 'edit'
      this.contactId = contactId
      this.$refs.contactForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} areaIds 选中项的主键数组
     */
    handleRemoveSelected (areaIds = []) {
      let contactId
      if (areaIds.includes(this.selectedNode)) {
        contactId = this.selectedNode
      } else {
        contactId = areaIds[0]
      }
      this.reloadNode(contactId)
    }
  }
}
</script>
