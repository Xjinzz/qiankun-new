<template>
  <div>
    <iop-data-table
      ref="draftTable"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      :tree="false"
      @onAction="onAction"
    >
      <template #rowButtons="{ record }">
        <a v-if="status!='0'" @click="handleView(record)">查看</a>
        <!-- 未审核的状态是99 -->
        <template v-if="status=='99' && mode!=='view'">
          <a-divider type="vertical" />
          <a @click="createToken(record,false)">生成token</a>
        </template>
        <!-- 已审核的状态是88 -->
        <template v-if="status=='88' && mode!=='view'">
          <a-divider type="vertical" />
          <a @click="createToken(record,true)">查看token</a>
        </template>
        <a v-if="status=='0' && mode!=='view'" @click="handleRemove(record)">删除</a>
      </template>
    </iop-data-table>
    <app-view-form ref="viewForm" :appId="formAppId" />
    <token-model
      ref="tokenModel"
      :authId="authId"
      :applyId="applyId"
      :appId="appId"
      :type="type"
    />
  </div>
</template>
<script>
import AppViewForm from '../../app/form/AppViewForm'
import { IopDataTable } from '@/iop/components'
import applyServicesListVo from '../vo/access-application-list-vo'
import path from '@/iop/api/index'
import { iopServApplyService } from '@/iop/service'
import TokenModel from './TokenModal'
import MessageUtils from '@/utils/message'

export default {
  name: 'DraftTable',
  components: { IopDataTable, AppViewForm, TokenModel },
  props: {
    /** 表格组件按钮权限 */
    id: {
      type: String,
      required: true
    },
    appId: {
      type: String,
      required: false,
      default: ''
    },
    applyId: {
      type: String,
      required: false,
      default: ''
    },
    status: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: false,
      default: 'edit'
    }
  },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        url: `${path.serv.apply.busiList}/${this.id}`,
        rowKey: 'id',
        selectable: false,
        columns: applyServicesListVo,
        actionsWidth: 180
      },
      permission: ['view'],
      formAppId: '',
      authId: '',
      type: ''
    }
  },
  methods: {
    /**
     * 生成token
     */
    createToken (record, type) {
      this.authId = record.authId
      this.type = type
      this.$refs.tokenModel.show()
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
          this.handleView(data.original)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} id 主键
     */
    handleView (o) {
      this.formAppId = o.id
      this.$refs.viewForm.showModal()
    },

    /**
     * 点击删除按钮事件
     *
     */
    handleRemove (record) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            await iopServApplyService.deleteRef([record.refId])
            this.$refs.draftTable.reload()
            MessageUtils.success()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    }
  }
}
</script>
