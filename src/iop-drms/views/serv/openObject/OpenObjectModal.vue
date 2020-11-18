<template>
  <div>
    <a-modal
      title="数据预览"
      @ok="handleOk"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="1200px"
    >
      <div>
        <div style="font-size: 20px;padding: 5px;">
          {{ topData.objectName }}
        </div>
        <div v-if="topData.remark !== null" style="border: 1px solid #E5E5E5;padding: 10px;margin: 10px 0;">
          {{ topData.remark }}
        </div>
        <div v-else style="padding: 10px;margin: 10px 0;"></div>
        <div class="data-item-line">
          <div class="data-item">数据提供单位：{{ topData.deptName }}</div>
          <div class="data-item" style="float:right">最后更新时间：{{ topData.updateDate }}</div>
        </div>
        <div style="width:100%;overflow:auto">
          <a-table
            :columns="header"
            :dataSource="datas"
            :scroll="{ x: 1152 }"
            :rowKey="record => record.id"
            bordered
            :pagination="false"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import objects from '@/iop-drms/service/server/open-object'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      header: [],
      datas: [],
      topData: {}
    }
  },
  methods: {
    show (item) {
      this.topData = item
      this.getHeader(item)
    },
    getHeader (item) {
      objects.headList(item.objectCode, item.objectId).then((res) => {
        this.header = res.columns
        this.header.map((item) => {
          item.width = 100
        })
        this.getData(item)
      })
    },
    getData (item) {
      objects.dataList(item.objectCode, item.objectId).then((res) => {
        this.datas = res.data
        this.visible = true
      })
    },
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.data-item-line {
  height: 40px;
}
.data-item {
  float: left;
  font-size: 17px;
  margin-right: 50px;
  margin-left: 10px;
}
.data-visual-btn {
  float: right;
  margin-right: 10px;
}
</style>
