<template>
  <div>
    <iop-data-table
      ref="authTrackList"
      :table="table"
      :permission="permission"
      :tree="{}"
      @onAction="onAction"
      :hiddenTop="true"
      treeTitle="权限树形"
    >
      <template #tree>
        <auth-track-tree ref="authTrackTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <a-modal :width="1400" v-model="visible" title="授权信息" :footer="null" :destroyOnClose="true">
      <auth-acl-list ref="authAclList" :typeId="typeId" :roleId="roleId" :aclListUrl="aclListUrl"/>
    </a-modal>
  </div>
</template>
<script>
import AuthTrackTree from './AuthTrackTree'
import authTrackListVo from './vo/auth-track-list-vo.js'
import { IopDataTable } from '@/iop/components'
import AuthAclList from './AuthAclList'
import path from '@/iop/api/index'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'roleId'
export default {
  name: 'AuthTrackList',
  components: { IopDataTable, AuthTrackTree, AuthAclList },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.permit.authTrack.index,
        /** rowKey，必填 */
        rowKey: 'typeId',
        /** 不显示序号列 */
        serial: true,
        selectable: false,
        /** 列定义 */
        columns: authTrackListVo
      },
      /** 表格组件按钮权限 */
      permission: ['view'],
      typeId: '',
      roleId: '',
      visible: false,
      aclListUrl: path.permit.authTrack.authData,
      appId: ''
    }
  },
  watch: {
    roleId (val) {
      this.aclListUrl = `${path.permit.authTrack.authData}?roleId=${val}&typeId=${this.typeId}`
    },
    typeId (val) {
      this.aclListUrl = `${path.permit.authTrack.authData}?roleId=${this.roleId}&typeId=${val}`
    }
  },
  methods: {

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }, appId) {
      this.appId = appId
      this.selectedNode = key
      this.roleId = key
      this.$refs.authTrackList.reload({
        [tableQueryName]: key,
        currentLoginAppId: this.appId
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
        case 'onView':
          this.handleView(data.original.typeId)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (id = '') {
      this.typeId = id
      this.visible = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
