<template>
  <div class="serv-form">
    <div style="width:100%;padding:10px;background:#fff">
      <table id="table" style="width: 1200px;margin: 0 auto;" >
        <tr style="height: 45px;">
          <td colspan="4">
            <div class="sjxqTit">
              <span class="sjxqTit1"><a>{{ servData.objectName }}</a></span>
              <div class="user-action">
                <a-button style="margin-right:5px" type="primary" @click="rturn">返回</a-button>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>资源摘要:</td>
          <td colspan="3">{{ servData.remark }}</td>
        </tr>
        <tr>
          <td>数据领域:</td>
          <td>{{ servData.objectDomain }}</td>
          <td>申请接口:</td>
          <td>
            <a-button v-if="servData.serviceType === '审核中'" size="small" type="primary" disabled>审核中</a-button>
            <a-button v-else-if="servData.serviceType === '已申请'" size="small" type="primary" disabled>已申请</a-button>
            <a-button v-else type="primary" size="small" @click="createApply()">申请</a-button>
          </td>
        </tr>
        <tr>
          <td>更新周期：</td>
          <td>{{ servData.renewalCycle }}</td>
          <td>发布时间：</td>
          <td>{{ servData.releaseTime }}</td>
        </tr>
        <tr>
          <td>数据提供单位：</td>
          <td>{{ servData.deptName }}</td>
          <td>更新时间：</td>
          <td>{{ servData.updateDate }}</td>
        </tr>
        <tr>
          <td>调用次数：</td>
          <td>{{ servData.downNum }}</td>
          <td>数据量：</td>
          <td>{{ servData.capacity }}</td>
        </tr>
        <tr>
          <td>数据预览：</td>
          <td>
            <a-button type="primary" size="small" @click="showModal()">预览</a-button>
          </td>
        </tr>
      </table>
    </div>
    <div style="width: 100%;min-height: 400px;margin: 0 auto;margin-top:20px">
      <a-tabs v-model="tabKey" @change="callback">
        <a-tab-pane v-for="(items, i) in methListData" :key="i" :tab="items.chName">
          <div class="api-doc">
            <div class="api-item">接口地址：/iop/drms/server/{{ servData.objectCode }}{{ items.methodName }}</div>
            <div class="api-item">支持格式：{{ items.format }}</div>
            <div class="api-item">请求方式：{{ items.requestMode }}</div>
            <div class="api-item">接口描述：{{ items.remark }}</div>
            <div class="api-item">请求示例：{{ items.requestUrl }}</div>
            <div class="api-item">返回示例：{{ items.backTest }}</div>
            <a-card :bordered="false" title="请求参数" style="background:#fff;padding:0">
              <a-table
                :columns="header"
                :dataSource="items.table"
                :rowKey="record => record.paraId"
                :pagination="false"
              />
            </a-card>
            <a-card :bordered="false" title="返回参数" style="background:#fff;padding:0">
              <a-table
                :columns="parHeader"
                :dataSource="parData"
                :rowKey="record => record.paraId"
                :pagination="false"
              />
            </a-card>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <modal ref="modal"></modal>
    <apply-modal ref="applyModal" :serviceIds="serviceIds" :services="services" @onSubmitSuccess="applySuccess"/>
  </div>
</template>
<script>
import services from '@/iop-drms/service/server/open-service'
import modal from '../openObject/OpenObjectModal'
import ApplyModal from '@/iop/views/serv/call/ApplyModal'
import openServiceFormVO from './vo/open-service-form-vo'
export default {
  components: { modal, ApplyModal },
  data () {
    return {
      servData: {},
      methListData: [],
      methData: [],
      serviceIds: [],
      services: [],
      objectId: '',
      serviceId: '',
      tabKey: 0,
      header: openServiceFormVO,
      parHeader: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '描述',
          dataIndex: 'remark'
        }
      ],
      parData: [
        {
          paraId: '1',
          name: 'success',
          type: 'Boolean',
          remark: '成功标志'
        },
        {
          paraId: '2',
          name: 'message',
          type: 'String',
          remark: '描述信息'
        },
        {
          paraId: '3',
          name: 'code',
          type: 'Integer',
          remark: '状态码'
        },
        {
          paraId: '4',
          name: 'result',
          type: 'T',
          remark: '响应数据'
        },
        {
          paraId: '5',
          name: 'timestamp',
          type: 'Long',
          remark: '时间戳'
        }
      ]
    }
  },
  methods: {
    selectData () {
      services.table(this.objectId).then((res) => {
        this.servData = res
        services.dataCount(res.objectCode).then((res) => {
          this.servData.capacity = res.count
        })
        services.servCount(res.objectCode).then((res) => {
          this.servData.downNum = res.count
        })
      })
      services.methList(this.serviceId).then((res) => {
        this.methListData = res.data
        this.methListData.map((item) => {
          services.meth(item.methodId).then((res) => {
            item.table = res.data
          })
        })
      })
    },
    rturn () {
      this.$router.go(-1)
    },
    callback (value) {
      this.tabKey = value
    },
    showModal () {
      this.$refs.modal.show(this.servData)
    },
    createApply () {
      this.serviceIds = [this.servData.serviceId]
      this.services = [{
        serviceId: this.servData.serviceId,
        chName: this.servData.objectName,
        serviceCode: this.servData.objectCode,
        deptName: this.servData.deptName
      }]
      this.$refs.applyModal.show()
    },
    applySuccess () {
      this.selectData()
    }
  },
  mounted () {
    this.objectId = this.$route.query.objectId
    this.serviceId = this.$route.query.serviceId
    this.selectData()
  },
  watch: {
    $route: function () {
      this.objectId = ''
      this.objectId = this.$route.query.objectId
      this.serviceId = this.$route.query.serviceId
      if (this.objectId !== undefined) {
        this.selectData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
#table {
  background: #fff;
  border-collapse: collapse;
  font-size: 15px;
  font-family: '微软雅黑' !important;
  tr {
    height: 40px;
    td:first-child {
      padding-left: 30px;
      width: 151px;
    }
    td:nth-child(2) {
      padding-left: 20px;
      width: 435px;
    }
    td:nth-child(3) {
      padding-left: 30px;
      width: 147px;
    }
    td:nth-child(4) {
      padding-left: 20px;
    }
  }
}
.sjxqTit1 {
  font-size: 20px;
  font-weight: bold;
  a {
    cursor: default;
  }
}
.user-action {
  float: right;
}
.user-action span>.iconfont {
  padding-left: 15px;
  font-size: 20px;
  color: #7fdaff;
}
.ant-tabs {
  /deep/ .ant-tabs-nav-wrap {
    background: #fff;
    font-size: 16px;
    padding: 2px 0px 10px 10px;
  }
  /deep/ .ant-tabs-tabpane {
    background: #fff;
  }
}
#tabTable {
  text-align: center;
  border: 0;
  font-size: 15px;
  font-family: '微软雅黑' !important;
  tr{
    height: 40px;
  }
  tr:first-child{
    height: 50px;
  }
}
.related-list {
  border: 1px solid #E5E5E5;
}
.related-data{
  padding-top: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #E5E5E5;
}
.related-item-line{
  height: 30px;
}
.related-title > a {
  font-size: 18px;
  color: #205CA3;
  margin-left: 10px;
}
.related-item {
  font-size: 15px;
  float: left;
  margin-right: 30px;
  margin-left: 10px;
}
.related-content{
  width: 380px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn {
  display: inline-block;
  height: 30px;
  line-height: 29px;
  font-size: 13px;
  border: 0;
  padding: 0 10px;
  cursor: pointer;
  vertical-align: middle;
  outline: none;
}
.api-doc {
  border: 1px solid #E5E5E5;
  margin: 20px 0 0 0;
}
.api-doc>.api-item {
  margin: 20px 0 20px 20px;
  font-weight: lighter;
  color: #000
}
.param-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.param-table th, #tabTable th {
  border: 1px solid #E5E5E5;
  text-align: left;
  height: 40px;
  background-color: #F5F5F5;
  padding-left: 10px;
}
.param-table td {
  border: 1px solid #E5E5E5;
  height: 40px;
  text-align: center;
}
</style>
<style scoped>
.serv-form >>> .ant-table-thead > tr > th, .serv-form >>> .ant-table-tbody > tr > td {
  width: 33.3% !important;
}
</style>
