<template>
  <div>
    <iop-data-card-list ref="metaModelList" :table="table" :autoLoad="false" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              placeholder="请输入名称"
              @search="search"
              enterButton="搜索"
              allowClear
              size="large"
            />
          </a-col>
        </a-row>
        <a-tabs :activeKey="catalogId" class="tabs-header" style="margin-top: 10px;margin-bottom: -44px;" @change="catalogChange">
          <a-tab-pane v-for="catalog in catalogList" :key="catalog.catalogId">
            <template #tab>
              <span>
                {{ catalog.catalogName }}
                <a-dropdown :trigger="['click']" style="margin-left: 10px;">
                  <a-icon type="ellipsis" />
                  <a-menu slot="overlay">
                    <a-menu-item key="1" @click="editCatalog(catalog.catalogId)">
                      <a-icon type="edit" /><span style="margin-left: 5px;">编辑</span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="removeCatalog(catalog.catalogId)">
                      <a-icon type="delete" /><span style="margin-left: 5px;">删除</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </template>
          </a-tab-pane>
          <a @click="createCatalog()" slot="tabBarExtraContent">
            <a-icon type="plus-circle" />
            <span style="margin-left: 5px;">新建</span>
          </a>
        </a-tabs>
      </template>

      <template #content="{ record }">
        <div>
          <a-avatar class="card-avatar" slot="avatar" icon="profile" />
          <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            <ellipsis :length="14">{{ record.objectName }}</ellipsis>
          </span>
        </div>
        <div style="margin-top: 10px;">编码： <ellipsis :length="12">{{ record.objectCode }}</ellipsis></div>
        <div>
          性质：{{ record.objectNat }}
          <a @click="addMenu(record)" style="margin-left: 15px;">添加到菜单</a>
        </div>
      </template>
      <template #rowButtons="{ record }">
        <a @click="attrClick(record.objectId)"><a-icon style="margin-right: 5px;" type="exclamation-circle" />属性配置</a>
        <a @click="editObject(record)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
      </template>
    </iop-data-card-list>

    <catalog-form
      ref="catalogForm"
      :catalogType="catalogType"
      :catalogId="catalogId"
      :mode="formMode"
      :submitSuccess="loadCatalogList"
    />

    <attr-list ref="attrList" />
    <service-list ref="serviceList" />
    <create-form ref="createForm" :catalogId="catalogId" :catalogType="catalogType" @onSubmitSuccess="onSubmitSuccess" />
    <edit-form ref="editForm" :catalogId="catalogId" :catalogType="catalogType" @onSubmitSuccess="onSubmitSuccess" @onRemove="onSubmitSuccess"/>
    <add-menu ref="addMenu" />
  </div>
</template>
<script>
import { IopDataCardList, IopEllipsis } from '@/iop/components'
import { iopDrmsCatalogService, iopDrmsObjectService } from '@/iop-drms/service'
import path from '@/iop-drms/api'
import MessageUtils from '@/utils/message'
import CreateForm from './MetaModelCreateForm'
import EditForm from './MetaModelEditForm'
import CatalogForm from '../manage/catalog/CatalogForm'
import AttrList from '../manage/object/attr/AttrList'
import ServiceList from '../manage/object/service/ServiceList'
import addMenu from '../manage/object/addMenu'

export default {
  name: 'MetaModalList',
  components: { CatalogForm, AttrList, ServiceList, CreateForm, Ellipsis: IopEllipsis, addMenu, EditForm, IopDataCardList },
  data () {
    return {
      catalogList: [],
      catalogType: '',
      catalogId: '',
      formMode: '',
      objectList: [],
      objectId: '',
      objectName: '',
      table: {
        url: path.manage.object.allList,
        rowKey: 'objectId'
      },
      permission: ['create']
    }
  },
  created () {
    this.catalogType = this.$route.meta.para || ''
    this.loadCatalogList()
  },
  methods: {
    loadCatalogList () {
      const { catalogType } = this
      iopDrmsCatalogService.allList({ catalogType })
        .then(res => {
          this.catalogList = res.data
          if (res.data.length > 0) {
            this.catalogId = res.data[0].catalogId
            this.catalogChange(res.data[0].catalogId)
          }
        })
        .catch(err => MessageUtils.error(err))
    },

    catalogChange (catalogId = '') {
      this.catalogId = catalogId
      this.search()
    },

    async search (objectName = '') {
      const { catalogType, catalogId } = this
      this.$refs.metaModelList.reload({ objectName, catalogType, catalogId })
    },

    createCatalog () {
      this.formMode = 'create'
      this.$refs.catalogForm.show()
    },

    editCatalog (catalogId = '') {
      this.formMode = 'edit'
      this.catalogId = catalogId
      this.$refs.catalogForm.show()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.createObject()
          break
      }
    },

    createObject () {
      this.$refs.createForm.show(this.catalogId)
    },

    attrClick (objectId = '') {
      this.$refs.attrList.show(objectId)
    },

    editObject (record = {}) {
      this.$refs.editForm.show(record.objectId, record.objectName)
    },

    async removeObject (objectId = '') {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          iopDrmsObjectService.remove(objectId)
            .then(() => this.search())
            .catch(err => { MessageUtils.error(err) })
        }
      })
    },

    onSubmitSuccess () {
      this.search()
    },

    async handleStatus (record = {}) {
      const data = { type: record.releaseStatus === '未发布' ? '1' : '0' }
      try {
        await iopDrmsObjectService.rele(record.objectId, data)
        this.search()
      } catch (err) {
        MessageUtils.error(err)
      }
    },

    addMenu (record = {}) {
      this.$refs.addMenu.show({
        id: record.objectId,
        code: record.objectCode,
        name: record.objectName
      })
    },

    removeCatalog (catalogId = '') {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          iopDrmsCatalogService.remove(catalogId)
            .then(() => this.loadCatalogList())
            .catch(err => { MessageUtils.error(err) })
        }
      })
    }
  }
}
</script>
