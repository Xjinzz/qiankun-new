<template>
  <div>
    <div class="top">
      <div class="topTitle">协同联动平台</div>
      <a-row>
        <a-col :lg="4" :md="4" :sm="4" :xs="24">
          <img class="topImg" src="@/assets/drms/开放资源量ICON.png">
          <div class="topData" style="top: 74px;">
            <span>{{ objCountData.data }}个</span>
            <span>{{ objCountData.name }}</span>
          </div>
        </a-col>
        <a-col :lg="4" :md="4" :sm="4" :xs="24">
          <img class="topImg" src="@/assets/drms/Clip 2.png">
          <div class="topData" style="top: 72px;">
            <span>{{ serCountData.data }}个</span>
            <span>{{ serCountData.name }}</span>
          </div>
        </a-col>
        <a-col :lg="4" :md="4" :sm="4" :xs="24">
          <img class="topImg" src="@/assets/drms/接口调用量ICON.png">
          <div class="topData" style="top: 72px;">
            <span>{{ appCountData.data }}个</span>
            <span>{{ appCountData.name }}</span>
          </div>
        </a-col>
        <a-col :lg="4" :md="4" :sm="4" :xs="24">
          <img class="topImg" src="@/assets/drms/接口调用icon.png">
          <div class="topData" style="top: 77px;">
            <span>{{ calCountData.data }}次</span>
            <span>{{ calCountData.name }}</span>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="layerTwo">
      <div class="twoLeft">
        <tab></tab>
      </div>
      <div class="twoRight">
        <pie-chart :legData="dataPieData" :title="dataPieTitle" :serData="dataPieSerData"></pie-chart>
      </div>
    </div>
    <div class="layerThree">
      <div class="threeLeft">
        <div @click="showNew()" :class="showHN === true ? 'blu' : ''">
          <a>
            <span>最新数据</span>
            <img src="@/assets/drms/NEW.png">
            <div>点击这里，您可以获取更多有价值的最新数据</div>
          </a>
        </div>
        <div @click="showHot()" :class="showHN === true ? '' : 'blu'">
          <a>
            <span>热门数据</span>
            <img src="@/assets/drms/HOT.png">
            <div>点击这里，您可以获取更多有价值的热门数据</div>
          </a>
        </div>
      </div>
      <div class="threeRight">
        <div class="threeData" @click="jumpForm(item)" v-if="showHN === true" v-for="(item, i) in objNewData" :key="i">
          <div>{{ item.objectName }}</div>
          <a-row>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              数据提供方：{{ item.deptName }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              数据领域：{{ item.objectDomain }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              更新时间：{{ item.updateDate }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              下载次数：{{ item.downNum }}
            </a-col>
          </a-row>
        </div>
        <div class="threeData" @click="jumpForm(item)" v-if="showHN === false" v-for="(item, i) in objHotData" :key="i">
          <div>{{ item.objectName }}</div>
          <a-row>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              数据提供方：{{ item.deptName }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              数据领域：{{ item.objectDomain }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              更新时间：{{ item.updateDate }}
            </a-col>
            <a-col :lg="6" :md="6" :sm="6" :xs="12">
              下载次数：{{ item.downNum }}
            </a-col>
          </a-row>
        </div>
        <div v-if="showHN === true && objNewData.length > 2" style="text-align:right;color:#1890FF;margin-top: -10px;">
          <a @click="objClick()">更多数据<a-icon type="dash" style="margin-left:5px"/></a>
        </div>
        <div v-if="showHN === false && objHotData.length > 2" style="text-align:right;color:#1890FF;margin-top: -10px;">
          <a @click="objClick()">更多数据<a-icon type="dash" style="margin-left:5px"/></a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="botLeft">
        <a-radio-group v-model="tabPosition" style="margin:8px 20px 8px 8px;float:right;z-index: 999;position: relative;">
          <a-radio-button value="1">数据</a-radio-button>
          <a-radio-button value="2">容量</a-radio-button>
        </a-radio-group>
        <obj-bar v-show="tabPosition === '1'" />
        <data-bar v-show="tabPosition === '2'" />
      </div>
      <div class="botRight">
        <div class="botRigTitle">下载热度</div>
        <table id="tabTable" style="width: 100%">
          <tbody>
            <tr class="tbTop">
              <td>TOP5</td>
              <td>系统名称</td>
              <td>下载次数</td>
            </tr>
            <tr v-for="(item, i) in appHotData" :key="i">
              <td>{{ ++i }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import objBar from './ObjBar'
import dataBar from './DataBar'
import tab from './Tab'
import pieChart from './PieChart'
import portals from '@/iop-drms/service/server/portal'
import { iopAuthService } from '@/iop/service'
import { DRMS_FORM_URL } from '@/iop-drms/constants'
export default {
  props: {
  },
  components: { objBar, dataBar, tab, pieChart },
  data () {
    return {
      tabPosition: '1',
      objCountData: {},
      serCountData: {},
      appCountData: {},
      calCountData: {},
      appHotData: [],
      showHN: true,
      objHotData: [],
      objNewData: [],
      dataPieSerData: [],
      dataPieData: [],
      dataPieTitle: ''
    }
  },
  methods: {
    getData () {
      portals.objPie().then((res) => {
        this.dataPieTitle = res.title
        this.dataPieData = res.name
        this.dataPieSerData = res.data
      })
      portals.objCount().then((res) => {
        this.objCountData = res
      })
      portals.serCount().then((res) => {
        this.serCountData = res
      })
      portals.count().then((res) => {
        this.appCountData = res
      })
      portals.cal().then((res) => {
        this.calCountData = res
      })
      portals.appHot().then((res) => {
        this.appHotData = res.data
      })
      portals.objNew().then((res) => {
        res.data.map((item, key) => {
          if (key < 3) {
            this.objNewData.push(item)
          }
        })
      })
      portals.objHot().then((res) => {
        res.data.map((item, key) => {
          if (key < 3) {
            this.objHotData.push(item)
          }
        })
      })
    },
    showNew () {
      this.showHN = true
    },
    showHot () {
      this.showHN = false
    },
    objClick () {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_OBJECT.LIST)
    },
    jumpForm (item) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_OBJECT.VIEW, {
        objFormId: item.objectId
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
/*第一行*/
.top {
  width: 97%;
  height: 250px;
  margin: 20px;
  background-image: url('../../../../assets/drms/top.png');
  background-repeat:round;
  position: relative;
  .topTitle {
    position: absolute;
    color: #fff;
    font-size: 18px;
    top: 50px;
    left: 25px;
  }
  .topImg {
    position: relative;
    top: 136px;
    left: 12%;
  }
  .topData {
    position: relative;
    left: 40%;
    color: #fff;
    span:nth-child(1){
      display: block;
      font-size: 28px;
      color: #FFDF4C;
    }
    span:nth-child(2){
      display: block;
      font-size: 16px;
    }
  }
}
/*第二行*/
.layerTwo {
  width: 97%;
  height: 340px;
  margin: 20px;
  position: relative;
  .twoLeft {
    background: #fff;
    margin-right: 1%;
    width: 54%;
    height: 100%;
    float: left;
    padding: 20px 10px;
  }
  .twoRight {
    background: #fff;
    width: 45%;
    height: 100%;
    display: inline-block;
    padding-top: 10px
  }
}
/*第三行*/
.layerThree {
  width: 97%;
  height: 340px;
  margin: 20px;
  padding: 20px;
  position: relative;
  background: #fff;
  .threeLeft {
    margin-right: 20px;
    padding: 10px;
    width: 21%;
    height: 100%;
    float: left;
  }
  .threeLeft > div {
    height: 50%;
    color: rgba(0,0,0,0.65);
    div {
      color: rgba(0,0,0,0.45);
      font-size: 14px;
      margin-top: 10px;
      line-height: 24px;
    }
    span {
      color: rgba(0,0,0,0.45);
      font-size: 18px;
    }
    img {
      margin-left: 5px;
    }
  }
  .threeRight {
    width: 77%;
    height: 100%;
    display: inline-block;
    .threeData {
      height: 80px;
      border-bottom: 1px solid #F2F2F2;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .threeData > div:first-child {
      font-size: 16px;
      color: #333333;
    }
  }
}
/*第四行*/
.bottom {
  width: 97%;
  height: 370px;
  margin: 20px;
  position: relative;
  .botLeft {
    background: #fff;
    width: 55%;
    height: 100%;
    display: inline-block;
    padding: 30px 0 0 0;
  }
  .botRight {
    background: #fff;
    width: 43%;
    height: 100%;
    float: right;
    /*表格*/
    #tabTable {
      .tbTop {
        height: 50px;
        background: #59AEFD;
        font-size: 16px;
        color: #fff;
        text-align: center;
        border: 1px solid #59aefd;
        border-radius: 3px;
      }
      tr {
        height: 50px;
        text-align: center;
        font-size: 18px;
        margin: 0 5px;
        border-bottom: 1px solid rgba(0,0,0,0.09);
      }
    }
    .botRigTitle {
      height: 60px;
      font-size: 18px;
      color: #333333;
      padding-left: 20px;
      line-height: 60px;
      font-weight: bolder;
    }
  }
}
.blu {
  color: #1890FF !important;
  div, span {
    color: #1890FF !important;
  }
}
.threeData :hover {
  cursor: pointer
}
</style>
