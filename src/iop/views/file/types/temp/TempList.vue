<template>
  <div style="background-color: #fff padding: 20px">
    <iop-data-card-list
      ref="tempList"
      :table="table"
      :autoLoad="false"
      :hiddenTop="true"
      :permission="permission"
      @onAction="onAction"
    >
      <template #content="{ record }">
        <div>
          <div style="width: 20%;float:left">
            <a-icon type="file-text" style="fontSize:70px;margin-top: 15px"/>
          </div>
          <div style="width: 73%;display: inline-block;float:right">
            <a-row :gutter="24">
              <a-col :span="24" class="title">
                {{ record.tmplName }}
              </a-col>
              <a-col :span="24" class="list">
                模板状态：<a-switch style="margin-left: 10px" :checked="record.status === '1' ? true : false" @click="statuCheck(record)"/>
              </a-col>
              <a-col :span="24" class="list">
                备注：{{ record.remark }}
              </a-col>
            </a-row>
          </div>
          <div style="clear: both"></div>
        </div>
      </template>

      <template #beforeEditButton="{ record }">
        <a @click="downTemp(record)"><a-icon style="margin-right: 5px" type="vertical-align-bottom" />下载</a>
      </template>

      <template #afterEditButton="{ record }">
        <a @click="remove(record)"><a-icon style="margin-right: 5px" type="delete" />删除</a>
      </template>
    </iop-data-card-list>
    <temp-form v-if="addForm" ref="tempForm" @submitSuccess="submitSuccess"></temp-form>
  </div>
</template>
<script>
import { IopDataCardList } from '@/iop/components'
import files from '@/iop/service/file/types'
import tempForm from './TempForm'
import path from '@/iop/api/index'
import { iopTokenService } from '@/iop/service/index'
import { download } from '../../../../../utils/util'
export default {
  name: 'TempList',
  components: { IopDataCardList, tempForm },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    }
  },
  data () {
    return {
      typeId: '',
      listData: [],
      addForm: true,
      table: {
        url: path.file.types.template,
        rowKey: 'tmplId'
      },
      formMode: ''
    }
  },
  computed: {
    isView () {
      return this.mode === 'view'
    },
    permission () {
      const permission = ['view', 'edit']
      !this.isView && permission.push('create')
      return permission
    }
  },
  methods: {
    show (id, mode) {
      this.formMode = mode
      this.typeId = id
      this.table.url = `${path.file.types.template}?typeId=${id}`
      this.$refs.tempList.loadData()
    },
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original)
          break
      }
    },
    handleCreate () {
      this.addForm = false
      this.$nextTick(() => {
        this.addForm = true
        this.$nextTick(() => {
          this.$refs.tempForm.show(this.typeId, 'create', '')
        })
      })
    },
    remove (record) {
      if (this.formMode !== 'view') {
        const that = this
        that.$confirm({
          title: '确定删除吗',
          onOk () {
            files.tempDele(record.tmplId).then((res) => {
              that.show(that.typeId)
            })
          }
        })
      }
    },
    handleEdit (record) {
      this.$refs.tempForm.show(this.typeId, this.formMode, record.tmplId)
    },
    submitSuccess () {
      this.show(this.typeId, this.formMode)
    },
    downTemp (record) {
      const token = iopTokenService.getCurrentToken()
      const url = `${path.fileStorage.download}?fileId=${record.tmplFileId}&fileTile=&token=${token}`
      download(url)
      // const link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = url
      // link.click()
    },
    statuCheck (record) {
      files.tempSwitch(record.tmplId, { status: record.status === '1' ? '0' : '1' }).then((res) => {
        this.show(this.typeId)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-row {
  margin: 0 !important;
  .ant-card {
    /deep/ .ant-card-body {
      padding: 0 !important;
    }
  }
  /deep/ .ant-card-actions {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }
}
.ant-row > div {
  margin-top: 10px
}
.title {
  margin-top: 0px !important;
  padding-left: 12px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: rgba(0,0,0,0.85);
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.list {
  padding-left: 12px;
  padding-right: 12px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  line-height: 28px;
  margin-top: 12px;
  width: 100%;
  height: 28px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.addCard {
  width: 100%;
  text-align: center;
  height: 190px;
  border: 1px dashed #979797;
  background: #F2F2F2;
  padding-top: 80px;
  cursor: pointer;
}
</style>
