<template>
  <div>
    <a-card :bordered="false" class="topSearch" v-if="!hiddenTop">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <slot name="top" />
        </a-form>
      </div>
    </a-card>

    <a-card :bordered="false" :title="table.title">
      <a-row :gutter="8" type="flex" align="top">
        <div
          v-if="tree"
          style="position:absolute; top: 10px; left: 15px;"
          @click="triggerTreeHidden()"
        >
          <a-icon :type="hideTree ? 'menu-unfold' : 'menu-fold'" />
        </div>
        <a-col v-if="tree" :span="!hideTree ? 5 : 0">
          <slot name="tree" />
        </a-col>
        <a-col :span="tree && !hideTree ? 19 : 24">
          <div class="table-header" v-if="buttons" style="margin-bottom:20px">
            <slot name="headerButtons" />
          </div>

          <a-spin :spinning="loading">
            <div class="card-list">
              <a-list
                :grid="{gutter: 20, lg: 4, md: 2, sm: 1, xs: 1}"
                :dataSource="dataSource"
              >
                <template #renderItem="item">
                  <a-list-item>
                    <template v-if="item[table.rowKey]">
                      <a-card :hoverable="true">
                        <a-card-meta>
                          <div class="meta-content" slot="description">
                            <slot name="content" :record="item" />
                          </div>
                        </a-card-meta>
                        <template class="ant-card-actions" #actions>
                          <slot name="rowButtons" :record="item">
                            <slot name="beforeEditButton" :record="item" />
                            <slot
                              name="editButton"
                              :record="item"
                              v-if="permission.includes('edit')"
                            >
                              <a @click="handleAction('edit', item)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
                            </slot>
                            <slot name="afterEditButton" :record="item" />
                            <slot name="beforeRemoveButton" :record="item" />
                            <slot
                              name="removeButton"
                              :record="item"
                              v-if="permission.includes('remove')"
                            >
                              <a @click="handleRemove(item)"><a-icon style="margin-right: 5px;" type="delete" />删除</a>
                            </slot>
                            <slot name="afterRemoveButton" :record="item" />
                          </slot>
                        </template>
                      </a-card>
                    </template>
                    <template v-else>
                      <slot name="beforeCreateButton" />
                      <slot name="createButton" v-if="permission.includes('create')">
                        <a-button class="new-btn" type="dashed" @click="handleAction('create')">
                          <a-icon type="plus"/>新建
                        </a-button>
                      </slot>
                      <slot name="afterCreateButton" />
                    </template>
                  </a-list-item>
                </template>
              </a-list>
            </div>
            <a-pagination
              v-if="pageable"
              class="ant-table-pagination"
              :pageSize.sync="pagination.pageSize"
              :showTotal="pagination.showTotal"
              :total="pagination.total"
              v-model="pagination.current"
              @change="pageChange" />
          </a-spin>

        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'DataCardList',
  data () {
    return {
      pageable: true,
      pagination: {},
      dataSource: [],
      list: {},
      dynamicQueryParams: {},
      loading: false,
      hideTree: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    table: {
      type: Object,
      default: () => { }
    },
    buttons: {
      type: Boolean,
      required: false,
      default: false
    },
    tree: {
      type: Boolean,
      required: false,
      default: false
    },
    autoLoad: {
      type: Boolean,
      required: false,
      default: true
    },
    autoConfig: {
      type: Boolean,
      required: false,
      default: true
    },
    permission: {
      type: Array,
      required: false,
      // 'create', 'edit', 'view', 'remove', 'removeSelected'
      default: () => []
    },
    hiddenTop: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted () {
    if (typeof this.table.rowKey === 'function') {
      MessageUtils.warn('rowKey can not be function')
      return
    }
    if (this.autoConfig) {
      this.init()
    }
  },
  methods: {
    init () {
      this.initPagination()

      if (!this.tree && this.autoLoad) {
        this.loadData()
      }
    },

    initPagination () {
      if (this.pageable) {
        this.pagination = {
          current: 1,
          pageSize: this.permission.includes('create') ? 11 : 12,
          showTotal: (total, range) => `${range[0]}-${range[1]}  共 ${total} 项`
        }
      }
    },

    async refresh (firstPage = false) {
      firstPage && Object.assign(this.pagination, {
        current: 1
      })
      await this.loadData()
    },

    pageChange (current = '', pageSize = '') {
      this.loadData({ current, pageSize })
    },

    async loadData (pagination = {}) {
      this.loading = true
      const params = Object.assign(
        {
          page: (pagination && pagination.current) || this.pagination.current,
          size: (pagination && pagination.pageSize) || this.pagination.pageSize
        },
        this.table.query,
        this.dynamicQueryParams)
      try {
        const { result } = await iopDataService.get({
          url: this.table.url,
          params
        })
        const dataSource = []
        if (this.permission.includes('create')) {
          dataSource.push({})
        }
        this.dataSource = [...dataSource, ...result.data]
        if (this.pageable) {
          const page = parseInt(result.page)
          Object.assign(this.pagination, {
            current: page, // 返回结果中的当前分页数
            total: parseInt(result.totalSizes), // 返回结果中的总记录数
            pageSize: (pagination && pagination.pageSize) || this.pagination.pageSize
          })
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (result.data.length === 0 && this.pagination.current > 1) {
            this.pagination.current--
            this.load()
            return
          }
        }
      } catch (err) {
        MessageUtils.error(err)
      } finally {
        this.loading = false
      }
    },

    handleAction (name = '', data = {}, extra = {}) {
      this.$emit('onAction',
        {
          name: `on${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
          data: { original: data, extra }
        })
    },

    async handleRemove (record) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          this.remove(record)
        }
      })
    },

    async remove (record = {}, { reload = true, loading = true } = {}) {
      const id = this.getRowKeyValue(record)
      if (id && id.length > 0) {
        try {
          if (loading) {
            this.loading = true
          }
          let url
          if (!this.removeUrl) {
            url = `${this.table.url}/${id}`
          } else {
            url = `${this.removeUrl}/${id}`
          }
          await iopDataService.delete({ url })
          MessageUtils.success('操作成功')

          if (reload && !this.tree) {
            this.refresh()
          }
          this.handleAction('remove', id, { ...record })
        } catch (err) {
          MessageUtils.error(err)
        } finally {
          this.loading = false
        }
      }
    },

    getRowKeyValue (record = {}) {
      return record[this.table.rowKey]
    },

    triggerTreeHidden () {
      this.hideTree = !this.hideTree
    },

    search (data = {}) {
      const query = this.form.getFieldsValue()
      Object.assign(query, data)
      this.reload(query)
    },

    async reload (params = {}, { firstPage = true } = {}) {
      this.dynamicQueryParams = params
      this.refresh(firstPage)
    },

    resetSearch () {
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/components/index.less";
.card-list {
  /deep/ .ant-card-body:hover {
    .ant-card-meta-title > a {
      color: @primary-color;
    }
  }

  /deep/ .ant-card-meta-title {
    margin-bottom: 12px;

    & > a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0, 0, 0, .85);
    }
  }

  /deep/ meta-content {
    position: relative;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 80px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1em;
  }
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, .45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #e8e8e8;
  border-radius: 2px;
  width: 100%;
  height: 180px;
}
.topSearch {
  /deep/ .ant-card-body {
    padding: 20px 20px;
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
