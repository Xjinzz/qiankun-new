<template>
  <div>
    <iop-data-table
      ref="registeredList"
      :table="table"
      :permission="permission"
    >
      <template #top>
        <search-form @search="search" @reset="reset" @resetSearchForm="search" />
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
      <template #rowButtons="{ record }">
        <a href="javascript:;" @click="attrClick(record)">属性</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="servClick(record)">服务</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleRemove(record)">删除</a>
      </template>
    </iop-data-table>

    <create-form
      ref="createForm"
      mode="create"
      :third="true"
      :objectId="objectId"
      :catalogType="catalogType"
      @onSubmitSuccess="submitSuccess" />

    <attr-list ref="attrList" />
    <service-list ref="serviceList" />
  </div>
</template>
<script>
import SearchForm from './SearchForm'
import MessageUtils from '@/utils/message'
import objectListVO from './vo/object-list-vo'
import path from '@/iop-drms/api'
import CreateForm from '../AddForm'
import AttrList from '../attr/AttrList'
import ServiceList from '../service/ServiceList'
import { DRMS_SERV_OBJECT_AUDIT_STATUS } from '@/iop-drms/constants'
import { IopDataTable } from '@/iop/components'

export default {
  name: 'ServRegisteredObjectList',
  components: { SearchForm, IopDataTable, CreateForm, AttrList, ServiceList },
  data () {
    return {
      table: {
        url: path.manage.object.allList,
        columns: objectListVO,
        rowKey: 'objectId',
        query: {
          third: 1,
          auditStatus: DRMS_SERV_OBJECT_AUDIT_STATUS.REGISTERED,
          catalogType: ''
        }
      },
      permission: ['create'],
      objectId: '',
      catalogType: ''
    }
  },
  methods: {
    async search (queryParam = {}) {
      console.log(queryParam)
      try {
        this.$refs.registeredList.reload(queryParam)
      } catch (err) {
        MessageUtils.error(err)
      }
    },
    reset () {
      this.$refs.registeredList.reload()
    },
    onAction () {},

    handleCreate () {
      this.$refs.createForm.show()
    },

    submitSuccess () {
      this.$refs.registeredList.refresh(true)
    },

    handleRemove (record) {
      this.$refs.registeredList.handleRemove(record)
    },

    attrClick (record = {}) {
      this.$refs.attrList.show(record.objectId)
    },

    servClick (record = {}) {
      this.$refs.serviceList.show(record.objectId)
    },

    handleEdit (record = {}) {}
  }
}
</script>
