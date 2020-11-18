<template>
  <div>
    <a-modal
      title="详细信息"
      @ok="handleOk"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="1200px"
    >
      <div v-if="showData">
        <div>
          <p style="width: 100%; display: block;line-height: 50px;text-align: center;font-size: 30px;color:#1890FF">{{ name }}</p>
        </div>
        <div>
          <p style="width: 100%; display: block;line-height: 50px;text-align: center;font-size: 30px;">暂无相关数据</p>
        </div>
      </div>
      <div v-else class="showMessges">
        <div class="showMessgesboxT">
          <span class="title">
            <a>{{ objData.objectName }}</a>
          </span>
        </div>
        <table class="showContTable">
          <tbody>
            <tr class="tableTit">
              <td>信息资源名称</td>
              <td>信息资源代码</td>
              <td style="width:100px">信息资源摘要</td>
              <td>信息资源格式</td>
              <td style="width:100px">标签</td>
              <td>数据领域</td>
              <td>行业分类</td>
              <td>更新频率</td>
              <td>数据容量</td>
              <td>发布日期</td>
              <!-- 右侧 -->
              <td>信息项中文名称</td>
              <td>信息项英文名称</td>
              <td>字段描述</td>
              <td>数据类型</td>
              <td>是否向社会开放</td>
              <td>是否为空</td>
              <td>是否主键</td>
            </tr>
            <tr>
              <td :rowspan="rowspan">{{ objData.objectName }}</td>
              <td :rowspan="rowspan">{{ objData.objectCode }}</td>
              <td :rowspan="rowspan">{{ objData.remark }}</td>
              <td :rowspan="rowspan">{{ objData.objectFormat }}</td>
              <td :rowspan="rowspan">{{ objData.objectLabel }}</td>
              <td :rowspan="rowspan">{{ objData.objectDomain }}</td>
              <td :rowspan="rowspan">{{ objData.objectTrade }}</td>
              <td :rowspan="rowspan">{{ objData.renewalCycle }}</td>
              <td :rowspan="rowspan">{{ objData.capacity }}</td>
              <td :rowspan="rowspan">{{ objData.releaseTime }}</td>
              <td>{{ oneData.attrName }}</td>
              <td>{{ oneData.attrCode }}</td>
              <td>{{ oneData.remark }}</td>
              <td>{{ oneData.dataType }}</td>
              <td>{{ oneData.isShowList }}</td>
              <td>{{ oneData.isNull }}</td>
              <td>{{ oneData.isPk }}</td>
            </tr>
            <tr v-for="(item, i) in data" :key="i">
              <td>{{ item.attrName }}</td>
              <td>{{ item.attrCode }}</td>
              <td>{{ item.remark }}</td>
              <td>{{ item.dataType }}</td>
              <td>{{ item.isShowList }}</td>
              <td>{{ item.isNull }}</td>
              <td>{{ item.isPk }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-modal>
  </div>
</template>
<script>
import catalogs from '@/iop-drms/service/server/open-catalog'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      data: [],
      objData: {},
      oneData: [],
      rowspan: 0,
      name: '',
      showData: true
    }
  },
  methods: {
    show (item) {
      this.name = item.objectName
      catalogs.attrList(item.objectId).then((res) => {
        res.data.length === 0 ? this.showData = true : this.showData = false
        this.oneData = res.data[0]
        this.rowspan = res.data.length
        for (var i = 0; i < res.data.length; i++) {
          if (i !== 0) {
            this.data.push(res.data[i])
          }
        }
      })
      catalogs.openDataList(item.objectId).then((res) => {
        this.objData = res
        this.visible = true
        catalogs.dataCount(item.objectCode).then((res) => {
          this.objData.capacity = res.count
        })
      })
    },
    handleOk () {
      this.visible = false
      this.data = []
      this.oneData = []
    },
    handleCancel () {
      this.visible = false
      this.data = []
      this.oneData = []
    }
  }
}
</script>
<style scoped>
table, th, td {
  border: 1px solid #f2f2f2;
  text-align: center;
}
.showMessgesboxT {
  text-align: center;
  height: 50px;
  position: relative;
  line-height: 50px;
  font-size: 17px;
}
.showMessges {
  width: auto;
  height: 500px;
  overflow-x: scroll;
  position: relative;
}
.showContTable {
  width: 2000px;
  height: 320px;
  background: #fff;
  border: 1px solid #333;
  border-collapse: collapse;
  font-size: 15px;
}
.tableTit {
  background: #f3f3f3;
  height: 60px;
  text-align: center;
  font-size: 15px;
}
::-webkit-scrollbar{
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
  background: #F6F6F6;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #CCC;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.title :hover {
  cursor: default !important;
}
</style>
