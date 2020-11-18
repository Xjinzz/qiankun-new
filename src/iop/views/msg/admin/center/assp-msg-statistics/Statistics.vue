<template>
  <div>
    <iop-data-table
      ref="inAuditList"
      :table="table"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="类型">
              <iop-data-dict-select ref="contType" type="msgContType" v-model="searchModel.contType" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="方式">
              <a-select v-model="searchModel.msgType">
                <a-select-option
                  v-for="(item, index) in dataSource.msgTypeList"
                  :key="index"
                  :value="item.msgCode"
                >
                  {{ item.msgName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align:right;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataDictSelect, IopDataTable } from '@/iop/components/index'
import path from '@/iop/api/index'
import { iopMsgStatisticsService } from '@/iop/service/index'
import { objectTool } from 'mwutil'
export default {
  name: 'Statistics',
  components: {
    IopDataDictSelect,
    IopDataTable
  },
  data () {
    return {
      table: {
        rowKey: 'recId',
        columns: [
          {
            title: '发信人',
            dataIndex: 'sendUserName',
            align: 'center',
            sorter: false
          },
          {
            title: '收信人',
            align: 'center',
            dataIndex: 'recipientName',
            sorter: false
          },
          {
            title: '时间',
            align: 'center',
            dataIndex: 'sendTime',
            sorter: false
          },
          {
            title: '类型',
            align: 'center',
            dataIndex: 'contType',
            sorter: false,
            customRender: (val, row, ind) => {
              if (val !== '') {
                return <a-tag color="blue">{ val }</a-tag>
              } else {
                return ''
              }
            }
          },
          {
            title: '方式',
            align: 'center',
            dataIndex: 'msgType',
            sorter: false,
            customRender: (val, row, ind) => {
              if (val !== '') {
                return <a-tag color="blue">{ val }</a-tag>
              } else {
                return ''
              }
            }
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            sorter: false,
            customRender: (val, row, ind) => {
              if (val !== '') {
                return (
                  <p class={val === '发送成功' ? 'success-table' : 'error-table'}>
                    <span></span>
                    { val }
                  </p>
                )
              } else {
                return ''
              }
            }
          }
        ],
        url: `${path.msg.msgStatistics.getAllRecipient}?${objectTool.toQueryString(this.searchModel)}`,
        selectable: false,
        actions: false
      },
      dataSource: {
        // 方式下拉
        msgTypeList: []
      },
      searchModel: {
        msgType: '',
        contType: ''
      }
    }
  },
  mounted () {
    this.getMsgTypeList()
  },
  methods: {
    search () {
      this.$refs.inAuditList.reload(this.searchModel)
    },
    // 获取方式下拉
    getMsgTypeList () {
      iopMsgStatisticsService.getMsgTypeList()
        .then(x => {
          this.dataSource.msgTypeList = x.data
        })
    },
    resetSearchForm () {
      this.searchModel = {}
      this.$refs.contType.cleanSelected()
      this.search()
    }
  }
}
</script>
<style lang='less' scoped>
  .success-table, .error-table {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .commen(@color) {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
    background: @color;
  }
  .success-table span {
    .commen(#84d860)
  }
  .error-table span {
    .commen(#ffa809)
  }
</style>
