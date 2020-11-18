<template>
  <div>
    <iop-data-table
      ref="auditedList"
      :table="table"
      :permission="permission"
    >
      <template #top>
        <search-form @search="search" @resetSearchForm="search" />
      </template>
      <template #rowButtons="{ record }">
        <a href="javascript:;" @click="attrClick(record)">属性</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="servClick(record)">服务</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="handleView(record)">查看</a>
      </template>
    </iop-data-table>

    <attr-list ref="attrList" />

    <service-list ref="serviceList" />
  </div>
</template>
<script>
import SearchForm from './SearchForm'
import MessageUtils from '@/utils/message'
import objectListVO from './vo/object-list-vo'
import path from '@/iop-drms/api'
import AttrList from '../attr/AttrList'
import ServiceList from '../service/ServiceList'
import { DRMS_SERV_OBJECT_AUDIT_STATUS } from '@/iop-drms/constants'
import { IopDataTable } from '@/iop/components'

export default {
  name: 'ServRegisteredObjectList',
  components: { SearchForm, IopDataTable, AttrList, ServiceList },
  data () {
    return {
      table: {
        url: path.manage.object.allList,
        columns: objectListVO,
        rowKey: 'objectId',
        query: {
          third: 1,
          auditStatus: DRMS_SERV_OBJECT_AUDIT_STATUS.AUDITED,
          catalogType: ''
        }
      },
      permission: [],
      objectId: '',
      catalogType: ''
    }
  },
  methods: {
    async search (queryParam = {}) {
      try {
        this.$refs.registeredList.reload(queryParam)
      } catch (err) {
        MessageUtils.error(err)
      }
    },

    attrClick (record = {}) {
      this.$refs.attrList.show(record.objectId)
    },

    handleView (record = {}) {}
  }
}
</script>
