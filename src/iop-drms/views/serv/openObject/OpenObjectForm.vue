<template>
  <div>
    <div style="width:100%;background: #fff;padding: 10px;">
      <table id="table" style="width: 1200px;margin: 0 auto;" >
        <tr style="height: 45px;">
          <td colspan="4">
            <div class="sjxqTit">
              <span class="sjxqTit1"><a>{{ listData.objectName }}</a></span>
              <div class="user-action">
                <a-button style="margin-right:5px" type="primary" @click="rturn">返回</a-button>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>资源摘要:</td>
          <td>{{ listData.remark }}</td>
        </tr>
        <tr>
          <td>资源代码:</td>
          <td>{{ listData.objectCode }}</td>
          <td>数据标签:</td>
          <td>{{ listData.objectLabel }}</td>
        </tr>
        <tr>
          <td>更新周期：</td>
          <td>{{ listData.renewalCycle }}</td>
          <td>资源格式：</td>
          <td>{{ listData.objectFormat }}</td>
        </tr>
        <tr>
          <td>数源单位：</td>
          <td>{{ listData.deptName }}</td>
          <td>数据领域：</td>
          <td>{{ listData.objectDomain }}</td>
        </tr>
        <tr>
          <td>系统名称：</td>
          <td>{{ listData.appName }}</td>
          <td>行业分类：</td>
          <td>{{ listData.objectTrade }}</td>
        </tr>
        <tr>
          <td>数据预览：</td>
          <td>
            <!-- <a class="btnList" target="_blank" @click="showModal()">预览</a> -->
            <a-button type="primary" size="small" @click="showModal()">预览</a-button>
            <!-- <a-button type="primary" size="small" disabled>可视化</a-button> -->
            <!-- <a class="btnList" disabled target="_blank" style="margin-left: 10px;">可视化</a> -->
          </td>
          <td>数据分级：</td>
          <td>{{ listData.accessRights }}</td>
        </tr>
        <tr>
          <td>数据接口：</td>
          <td>
            <a-button type="primary" size="small" :disabled="listData.serviceId === ''" @click="apiJump()">{{ listData.serviceId === '' ? 'API尚未发布' : 'API' }}</a-button>
          </td>
          <td>数据范围：</td>
          <td>{{ listData.objectRange }}</td>
        </tr>
        <tr>
          <td>数据容量：</td>
          <td>{{ listData.capacity }}</td>
          <td>数据图谱：</td>
          <td>
            <!-- <a target="_blank" disabled class="btnList" style="width:72px">数据图谱</a> -->
            <a-button type="primary" disabled size="small">数据图谱</a-button>
          </td>
        </tr>
        <tr>
          <td>更新日期：</td>
          <td>{{ listData.updateDate }}</td>
          <td>发布日期：</td>
          <td>{{ listData.releaseTime }}</td>
        </tr>
        <tr>
          <td>数据下载：</td>
          <td>
            <!-- <a target="_blank" class="btn btn-primary" @click="dataDown('xls')">XLS</a> -->
            <a-button type="primary" size="small" @click="dataDown('xls')">XLS</a-button>
            <a-button type="primary" size="small" @click="dataDown('csv')">CSV</a-button>
            <!-- <a target="_blank" class="btn btn-primary" @click="dataDown('XML')" >XML</a> -->
            <a-button type="primary" size="small" @click="dataDown('json')">JSON</a-button>
            <!-- <a target="_blank" class="btn btn-primary" @click="dataDown('RDF')" >RDF</a> -->
          </td>
          <td>下载次数：</td>
          <td>{{ listData.downNum }}</td>
        </tr>
        <!-- <tr>
          <td class="sjxz1">历史数据下载：</td>
          <td colspan="3">
            <a target="_blank" class="btn btn-primary btn-download-old" @click="hisDown('XLS')">XLS</a>
            <a target="_blank" class="btn btn-primary btn-download-old" @click="hisDown('CSV')">CSV</a>
            <a target="_blank" class="btn btn-primary btn-download-old" @click="hisDown('XML')">XML</a>
            <a target="_blank" class="btn btn-primary btn-download-old" @click="hisDown('JSON')">JSON</a>
            <a target="_blank" class="btn btn-primary btn-download-old" @click="hisDown('RDF')">RDF</a>
          </td>
        </tr> -->
      </table>
    </div>
    <div style="width: 100%;min-height: 400px;margin: 0 auto;margin-top:20px">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="数据项" key="1">
          <a-card :bordered="false" style="background:#fff;padding:0;background:#fff">
            <div v-if="formData.length === 0">
              <p style="width: 100%; display: block;line-height: 200px;text-align: center;font-size: 30px">暂无相关数据</p>
            </div>
            <a-table
              v-else
              :columns="header"
              :dataSource="formData"
              :rowKey="record => record.attrId"
              :pagination="false"
            />
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="关联信息" key="2" forceRender>
          <a-card :bordered="false" style="background:#fff;padding:0">
            <div v-if="relaData.length === 0">
              <p style="width: 100%; display: block;line-height: 200px;text-align: center;font-size: 30px;">暂无相关数据</p>
            </div>
            <div v-else class="related-list" v-for="(item, i) in relaData" :key="i">
              <div class="related-data">
                <div class="related-item-line">
                  <div class="related-title">
                    <a @click="infClick(item)">{{ item.objectName }}</a>
                  </div>
                </div>
                <div class="related-item-line">
                  <div class="related-item">数据领域：{{ item.objectDomain }}</div>
                  <div class="related-item related-content">数据摘要：{{ item.remark }}</div>
                  <div style="float:right">
                    <div class="related-item">数据容量：{{ item.capacity }}</div>
                    <div class="related-item">下载次数：{{ item.downNum }}</div>
                    <div class="related-item">数源单位：{{ item.deptName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane tab="相关数据" key="3">
          <div>
            <p style="width: 100%; display: block;line-height: 200px;text-align: center;font-size: 30px;">暂无相关数据</p>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="相关应用" key="4">
          <div>
            <p style="width: 100%; display: block;line-height: 200px;text-align: center;font-size: 30px;">暂无相关数据</p>
          </div>
        </a-tab-pane> -->
      </a-tabs>
    </div>
    <modal ref="modal"></modal>
  </div>
</template>
<script>
import objects from '@/iop-drms/service/server/open-object'
import { download } from '@/utils/util'
import { iopAuthService } from '@/iop/service/index'
import { DRMS_FORM_URL } from '@/iop-drms/constants'
import modal from './OpenObjectModal'
import openObjectListVO from './vo/open-object-list-vo'
export default {
  components: { modal },
  data () {
    return {
      objectId: '',
      listData: {},
      formData: [],
      relaData: [],
      header: openObjectListVO
    }
  },
  methods: {
    selectData () {
      objects.getData(this.objectId).then((res) => {
        this.listData = res
        objects.dataCount(res.objectCode).then((res) => {
          this.listData.capacity = res.count
        })
      })
      objects.attrList(this.objectId).then((res) => {
        this.formData = res.data
      })
      objects.relationList(this.objectId).then((res) => {
        this.relaData = res.data
        this.relaData.map((item, key) => {
          objects.dataCount(item.objectCode).then((res) => {
            this.relaData[key].capacity = res.count
          })
        })
      })
    },
    rturn () {
      this.$router.go(-1)
    },
    callback (value) {
      console.log(value)
    },
    infClick (item) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_OBJECT.VIEW, {
        objFormId: item.objectId
      })
    },
    // 数据下载
    dataDown (key) {
      const url = `/iop/drms/server/data/${this.listData.objectCode}/download/${this.objectId}/${key}`
      download(url, 'get')
    },
    showModal () {
      const data = {
        objectCode: this.listData.objectCode,
        objectId: this.listData.objectId,
        objectName: this.listData.objectName,
        remark: this.listData.remark,
        deptName: this.listData.deptName,
        updateDate: this.listData.updateDate
      }
      this.$refs.modal.show(data)
    },
    apiJump () {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_SERVICE.VIEW, {
        objectId: this.listData.objectId,
        serviceId: this.listData.serviceId
      })
    }
  },
  mounted () {
    this.objectId = this.$route.query.objFormId
    this.selectData()
  },
  watch: {
    $route: function () {
      if (this.$route.query.objFormId !== undefined) {
        this.objectId = this.$route.query.objFormId
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
      width: 120px;
    }
    td:nth-child(2) {
      padding-left: 20px;
      width: 435px;
    }
    td:nth-child(3) {
      padding-left: 30px;
      width: 120px;
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
}
.related-list {
  border: 1px solid #E5E5E5;
  margin-top: 10px;
}
.related-data{
  padding-top: 10px;
  padding-left: 10px;
}
.related-item-line{
  height: 30px;
}
.related-title > a {
  font-size: 18px;
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
</style>
