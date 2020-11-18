<template>
  <div>
    <iop-data-table
      ref="baseCodeClaList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="分类编号">
                <a-input @pressEnter="search" placeholder="请输入分类编号" v-model="queryParam.claCode" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="分类名称">
                <a-input @pressEnter="search" placeholder="请输入分类名称" v-model="queryParam.claName" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8" class="search-buttons">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button @click="resetSearchForm()">重置</a-button>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #tree>
        <baseCodeCla-tree ref="baseCodeClaTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import BaseCodeClaTree from './CodeclaTree'
import baseCodeClaListVO from './vo/codecla-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'

export default {
  name: 'BaseCodeClaList',
  components: { BaseCodeClaTree, IopDataTable },
  data () {
    return {
      queryParam: {},
      table: {
        url: path.system.codecla.index,
        rowKey: 'claId',
        columns: baseCodeClaListVO
      },
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      claId: '',
      selectedNode: ''
    }
  },
  methods: {
    async search () {
      try {
        await this.$refs.baseCodeClaList.reload(Object.assign({ parentId: this.selectedNode }, this.queryParam))
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.baseCodeClaList.reload({
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
        case 'onRemoveSelected':
          this.$refs.baseCodeClaTree.reload()
          break
        case 'onCreate':
          this.$refs.baseCodeClaTree.handleCreate()
          break
        case 'onView':
          this.$refs.baseCodeClaTree.handleView(data.original.claId)
          break
        case 'onEdit':
          this.$refs.baseCodeClaTree.handleEdit(data.original.claId)
          break
      }
    }
  }
}
</script>
