<template>
  <a-card :bordered="false" style="overflow-x: scroll">
    <div id="demoApp">
      <div class="appTop">
        <div class="appTopContine">
          <ul class="topList">
            <li v-open="'http://192.168.1.54:8000/#/iop/sys/settings'">
              <img src="@/assets/demo2/2yh.png" />
              <span>
                业务用户
              </span>
            </li>
            <li>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                服务用户
              </span>
            </li>
            <li>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                协同用户
              </span>
            </li>
            <li>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                服务调用用户
              </span>
            </li>
            <li>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                其他
              </span>
            </li>
          </ul>
          <div class="businessBox">
            <div class="boxTitle">
              业务应用
            </div>
            <div class="businessItem" style="border-color:#D73E4D;width:18.2%;">
              <p class="title" style="margin-top:10px">
                元数据管理
              </p>
              <ul class="businessInnerList noPadding" style="margin-top:16px">
                <li>业务元数据</li>
                <li>数据元数据</li>
                <li>编码元数据</li>
                <li>主数据</li>
              </ul>
            </div>
            <div class="businessItem" style="border-color:#1890FF;width:17%;">
              <p class="title" style="margin-top:10px">
                展现层
              </p>
              <ul class="businessInnerList" style="margin-top:16px">
                <li>市场监管</li>
                <li>行政审批</li>
                <li>公众服务</li>
                <li>智慧商务</li>
              </ul>
            </div>
            <div class="businessItem" style="border-color:#1890FF;width:59.5%;margin-left:10px">
              <div class="businessStyle2">
                <p class="title">
                  统一数据资源管理
                </p>
                <ul class="businessInnerList">
                  <li>资源目录管理</li>
                  <li>资源对象建模</li>
                  <li>数据编码管理</li>
                  <li>数据质量管理</li>
                  <li>数据共享与服务</li>
                </ul>
              </div>
              <div class="businessStyle2" style="border-color:#DB4054;margin-top:15px">
                <p class="title">
                  专题库
                </p>
                <ul class="businessInnerList">
                  <li>企业画像主题库</li>
                  <li>消费经济主题库</li>
                  <li>商圈经济主题库</li>
                  <li style="padding-left:25px;padding-right:25px">......</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="dataService">
            <div class="boxTitle" style="background:#417505">
              数据服务
            </div>
            <ul class="dataServiceList">
              <li>
                <img src="@/assets/demo2/2tysj.png">
                <span>统一数据访问服务</span>
              </li>
              <li>
                <img src="@/assets/demo2/2dzwj.png">
                <span>非结构数据访问服务</span>
              </li>
              <li v-open="'http://www.baidu.com'">
                <img src="@/assets/demo2/sjjs.png">
                <span>数据检索服务</span>
              </li>
              <li>
                <img src="@/assets/demo2/2sjzy.png">
                <span>数据资源访问服务</span>
              </li>
              <li>
                <img src="@/assets/demo2/2sjsq.png">
                <span>统一数据授权服务</span>
              </li>
              <li style="width:170px">
                <img src="@/assets/demo2/2qtfw.png">
                <span>其他服务</span>
              </li>
            </ul>
          </div>
          <div class="platform" style="justify-content: start;">
            <div class="boxTitle" style="z-index:10000;background:#8D5800;width:184px;margin-left:-92px">
              大数据平台
            </div>
            <div class="platformItem" style="width:57.4%;margin-left:13px">
              <p class="title">
                生产数据
              </p>
              <div class="platformInnerListStyle2">
                <div class="vaticalList" style="width:22%">
                  <p>非结构化数据存储</p>
                  <p style="position:relative;z-index:1">结构化数据存储库</p>
                </div>
                <div class="circleList" style="margin-left:62px">
                  <span style="position:relative;top:20px">消息队列<br>（内存）</span>
                </div>
                <div class="vaticalList" style="width:25.6%;margin-left:53px">
                  <p>索引数据</p>
                  <p>NoSQL数据库</p>
                </div>
              </div>
            </div>
            <div class="platformItem" style="width:38.1%;margin-left:35px">
              <p class="title">
                分析数据
              </p>
              <ul class="platformInnerList">
                <li>批处理</li>
                <li>流处理</li>
                <li>图计算</li>
                <li>内存计算</li>
                <li>离线计算</li>
                <li>批流融合计算</li>
                <li>模型计算</li>
              </ul>
            </div>
          </div>
          <div class="lastBox" style="margin-top:14px">
            <div class="lastLeftBox">
              <div class="dataCollection">
                <p class="title">数据采集</p>
                <ul class="dataConllectionList">
                  <li>导入</li>
                  <li>抽取</li>
                  <li>清洗</li>
                  <li>转换</li>
                  <li>装载</li>
                </ul>
              </div>
              <div class="outerData">
                <p class="title">外部数据</p>
                <ul class="dataConllectionList">
                  <li>DB</li>
                  <li>REST</li>
                  <li>File</li>
                  <li>WS</li>
                  <li>Dubbo</li>
                  <li>......</li>
                </ul>
              </div>
            </div>
            <div class="lastRightBox">
              <div class="lastRightBoxTitle">
                企业主体信息（基于主题数据）
              </div>
              <div style="margin-left:60px;height:53px">
              </div>
              <div class="bottomBox">
                <div class="bottomBox1">
                  <p class="bottomBoxTitle">
                    企业主体基础信息
                  </p>
                  <ul class="bottomBox1List">
                    <li>统一信用代码</li>
                    <li>企业名称</li>
                    <li>业务类型</li>
                    <li>......</li>
                  </ul>
                </div>
                <div class="bottomCenter">
                  <ul class="bottomCenterList">
                    <li>风险数据</li>
                    <li>财务数据</li>
                    <li>上市数据</li>
                    <li>风险舆情</li>
                  </ul>
                </div>
                <div style="margin-top:20px;">
                  <img src="@/assets/demo2/2jtlv.png" alt="">
                </div>
                <div class="bottomRightList">
                  <div class="bottomBoxIgem">
                    <span class="title">行政许可</span>
                    <ul class="infoList">
                      <li>行政许可决定文书号</li>
                      <li>......</li>
                    </ul>
                  </div>
                  <div class="bottomBoxIgem">
                    <span class="title">行政处罚</span>
                    <ul class="infoList">
                      <li>处罚决定书文号</li>
                      <li>处罚决定日期</li>
                      <li>......</li>
                    </ul>
                  </div>
                  <div class="bottomBoxIgem">
                    <span class="title">守信激励</span>
                    <ul class="infoList">
                      <li>纳税人名称</li>
                      <li>评价年度</li>
                      <li>数据来源</li>
                      <li>......</li>
                    </ul>
                  </div>
                  <div class="bottomBoxIgem">
                    <span class="title">失信惩戒</span>
                    <ul class="infoList">
                      <li>执行法院</li>
                      <li>统一社会信用代码</li>
                      <li>......</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="topLeftList">
          <li>标准规范</li>
          <li>数据质量</li>
          <li>数据安全</li>
          <li>规范流程</li>
          <li>操作审计</li>
          <li>灾备恢复</li>
        </ul>
      </div>
    </div>
    <div class="fixed">
      <div class="jghsjkjt"></div>
      <div class="leftTopLine"></div>
      <div class="leftBottomLine"></div>
    </div>
    <flow-line :referNumber="34000" v-if="refear" style="position:absolute;top:0;left:0;width:100%;height:100%;" :dataSource="dataSource"></flow-line>
  </a-card>
</template>
<script>
import FlowLine from './comp/FlowLine'
const Define = {
  STOKECOLOR: {
    GO: '#1890FE',
    REFARE: '#417505'
  },
  CIRCLECOLOR: {
    GO: '#f55',
    REFARE: '#F0C'
  }
}
export default {
  name: 'IndexDemo',
  components: {
    FlowLine
  },
  data () {
    return {
      refear: true,
      dataSource: [
        // 服务用户=》展示层
        {
          form: [600, 80],
          to: [600, 160],
          delay: 0,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文 =》 2分叉
        {
          form: [550, 300],
          to: [550, 400],
          delay: 2000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [550, 360],
          to: [330, 360],
          delay: 3000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [330, 360],
          to: [330, 400],
          delay: 5000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 统一数据访问服务 =》结构化数据库
        {
          form: [200, 460],
          to: [200, 620],
          delay: 7000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [200, 618],
          to: [305, 618],
          delay: 9000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化存储库 =》电子公文信息
        {
          form: [475, 620],
          to: [475, 720],
          delay: 11000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [475, 720],
          to: [525, 720],
          delay: 13000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文信息 -》 2分叉
        {
          form: [740, 750],
          to: [740, 780],
          delay: 15000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [740, 780],
          to: [600, 780],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [740, 780],
          to: [880, 780],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [600, 780],
          to: [600, 805],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [880, 780],
          to: [880, 805],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件访问服务 =》电子文件文件存储
        {
          form: [550, 460],
          to: [550, 495],
          delay: 4000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [550, 495],
          to: [350, 495],
          delay: 6000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [350, 495],
          to: [350, 560],
          delay: 8000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化数据存储库 - 消息队列
        {
          form: [475, 620],
          to: [542, 620],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件文件存储 - 消息队列
        {
          form: [475, 573],
          to: [550, 573],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列-NoSQL数据库
        {
          form: [617, 620],
          to: [675, 620],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列 - 索引数据
        {
          form: [613, 573],
          to: [675, 573],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 索引数据 - 数据检索服务
        {
          form: [780, 555],
          to: [780, 460],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // NoSQL数据库 - 数据资源访问服务
        {
          form: [865, 620],
          to: [1000, 620],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        {
          form: [1000, 620],
          to: [1000, 460],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据检索服务 - 统一检索
        {
          form: [675, 400],
          to: [675, 295],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据资源访问服务 - 业务应用
        {
          form: [1000, 400],
          to: [1000, 335],
          delay: 29000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 业务应用 - 服务调用用户
        {
          form: [1214, 160],
          to: [1214, 80],
          delay: 31000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        }
      ]
    }
  },
  directives: {
    'open': {
      inserted: function (el, binding, vnode) {
        el.onclick = function () {
          window.open(binding.value)
        }
        el.style.position = 'relative'
        el.style.zIndex = 10
        el.style.cursor = 'pointer'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .fixed {
      .line {
        position: absolute
      }
      position: absolute;
      top:0;
      left:0;
      .jghsjkjt {
        width: 276px;
        height:78px;
        background: url('~@/assets/demo2/jgh.png');
        background-size:100% 100%;
        position: absolute;
        z-index: 0;
        top:596px;
        left:285px
      }
      .leftTopLine {
        width: 87px;
        height: 35px;
        background-size: 100% 100%;
        position:absolute;
        top: 60px;
        left:100px;
        background: url('~@/assets/demo2/2jt1.png');
      }
      .leftBottomLine {
        width: 87px;
        height: 35px;
        background-size: 100% 100%;
        position:absolute;
        top: 990px;
        left:100px;
        background: url('~@/assets/demo2/2jt2.png');
      }
    }
  #demoApp {
    // width: 98%;
    height:1000px;
    position: relative;
    * {
      margin: 0;
      padding:0;
      list-style: none;
    }
    .appTopContine{
      width: 90%;
      float: right;
      // position: absolute;
      // left: 160px;
      // width: 1378px;
      .topList{
        width:100%;
        display: flex;
        justify-content: space-around;
        border: 2px dashed #1890FF;
        padding-top:10px;
        padding-bottom:10px;
        box-sizing: border-box;
        li{
          text-align: center;
          font-size: 20px;
          color: #000000;
          line-height: 54px;
          span {
            margin-left:10px;
          }
        }
      }
      .boxTitle {
        position: absolute;
        font-size: 24px;
        color:#fff;
        background: #1890FE;
        text-align: center;
        width: 160px;
        right:0;
        top: -17px;
        line-height: 34px;
        border-radius: 34px;
        // margin-left: -80px;
      }
      // 业务应用
      .businessBox{
        width:100%;
        position: relative;
        background: #EEF7FF;
        margin-top: 25px;
        padding-top:30px;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-around;
        .businessItem {
          border:2px dashed;
          border-radius: 5px;
          .title {
            color:#1890FE!important;
            font-size:20px;
            text-align:center;
            line-height: 20px;
          }
          .businessInnerList.noPadding {
            li {
              padding-left: 8px;
              padding-right: 8px;
            }
          }
          .businessInnerList {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
              padding: 5px;
              padding-left:16px;
              padding-right:16px;
              color: #000;
              font-size:18px;
              background: #fff;
              line-height: 30px;
              border-radius: 30px;
              margin-left: 10px;
              margin-bottom: 10px;
            }
          }
          .businessStyle2 {
            border: 2px dashed #1890FE;
            box-sizing: border-box;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: 10px;
            margin-right: 10px;
            padding-top:15px;
            position:relative;
            .title{
              position: absolute;
              z-index:1;
              background: #EEF7FF;
              top: -10px;
              left: 50%;
              width: 200px;
              line-height: 1em;
              margin-left:-100px;
            }
          }
        }
      }
      // 数据服务
      .dataService {
        width:100%;
        position: relative;
        background: #EFF8E4;
        margin-top: 25px;
        padding-top:30px;
        padding-bottom: 10px;
        .dataServiceList {
          li {
            display:inline-block;
            border: 1px solid #417505;
            box-sizing: border-box;
            margin-left:10px;
            background: #fff;
            padding:12px 0px;
            width:16.3%;
            text-align: center;
            img {
              width:30px;
              height:30px;
            }
            span {
              margin-left:10px;
              font-size:20px;
              line-height:30px;
            }
          }
        }
      }
      // 大数据平台
      .platform {
        width:100%;
        position: relative;
        background: #F9F1DB;
        margin-top: 25px;
        padding-top:30px;
        padding-bottom: 15px;
        display: flex;
        justify-content: space-around;
        .platformItem {
          border:2px dashed #BD7600;
          border-radius: 5px;
          position:relative;
          .title {
            font-size:20px;
            text-align:center;
            line-height: 50px;
            color: #8D5800;
            background: #F9F1DB;
            width:124px;
            position: absolute;
            top: -25px;
            left:50%;
            z-index:1;
            margin-left:-62px;
          }
          .platformInnerList {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top:30px;
            li {
              padding:2px;
              padding-left:16px;
              padding-right:16px;
              color: #000;
              font-size:18px;
              background: #fff;
              line-height: 30px;
              border-radius: 30px;
              margin-left: 10px;
              margin-bottom: 10px;
            }
          }
          .platformInnerListStyle2 {
            display: flex;
            justify-content: center;
            text-align: center;
            margin-top: 30px;
            margin-bottom:5px;
            .vaticalList p {
              height:32px;
              border-radius:30px;
              background:#fff;
              line-height: 32px;
              border-radius: 32px;
              &:nth-child(2) {
                margin-top:12px;
              }
              font-size:18px;
              font-weight: 500;
            }
            .circleList {
              width: 10.3%;
              // width: 82px;
              height:82px;
              border-radius: 50%;
              // line-height:82px;
              background:#fff;
              font-size:16px;
              font-weight: 500;
            }
          }
        }
      }
      // 最后一块
      .lastBox {
        display: flex;
        .lastLeftBox {
          width: 23%;
          .title {
            color: #1890fe!important;
            font-size:20px!important;
            line-height:40px!important;
            text-align: center;
          }
          .dataCollection {
            background-image: url('~@/assets/demo2/2lhtx4.png');
            background-size:100% 100%;
            padding-top: 50px;
          }
          .outerData {
            background: #EEf7fe;
            border: 2px dashed #1890FE;
            margin-top:20px;
            padding-bottom:10px;
          }
          .dataConllectionList{
            display: flex;
            flex-wrap: wrap;
            li {
              padding: 5px;
              padding-left:16px;
              padding-right:16px;
              color: #000;
              font-size:18px;
              background: #fff;
              line-height: 30px;
              border-radius: 30px;
              margin-left: 10px;
              margin-bottom: 10px;
            }
          }
        }
        .lastRightBox {
          flex:1;
          margin-left:10px;
          padding:15px;
          border: 2px dashed #1890FE;
          .lastRightBoxTitle {
            margin-top:10px;
            border: 2px solid #1890FE;
            font-size: 25px;
            line-height: 45px;
            color: #1890FE;
            background:#eaf6fe;
            padding-left: 20px;
            width:500px;
            text-align: center;
            padding-right: 20px;
          }
          .bottomBox {
            display:flex;
            .bottomBox1{
              padding: 10px;
              background-image:url('~@/assets/demo2/jiasntou.png');
              background-size:100% 100%;
              .bottomBoxTitle{
                font-size: 20px;
                color: #1890FE!important;
                width:200px;
              }
              .bottomBox1List {
                li {
                  background: #1890FE;
                  color:#fff;
                  text-align: center;
                  margin-left:20px;
                  width:124px;
                  line-height:32px;
                  margin-top:10px;
                }
              }
            }
            .bottomCenter {
              .bottomCenterList {
                li {
                  width: 211px;
                  line-height:42px;
                  color: #1890FE;
                  border: 1px solid #1890FE;
                  text-align:center;
                  margin-top: 10px;
                  &:nth-child(1) {
                    border:1px solid #417505;
                    color:#417505;
                    background: #EFF8E4;
                    margin-top:0px;
                  }
                }
              }
            }
            .bottomRightList {
              width: 506px;
              .bottomBoxIgem {
                background: #EFF8E4;
                display: flex;
                margin-top:10px;
                padding:5px;
                border: 1px solid #417505;
                &:nth-child(1) {
                  margin-top:0px
                }
              }
              .title {
                font-size: 20px;
                color: #417505;
                text-align: left;
                margin-left:10px;
              }
              .infoList {
                width: 392px;
                display:flex;
                margin-left:10px;
                li {
                  white-space: nowrap;
                  background:#417505;
                  color:#fff;
                  margin-left:10px;
                  padding:4px;
                  padding-left:15px;
                  padding-right:15px;
                }
              }
            }
          }
        }
      }
    }
    .topLeftList {
      position: absolute;
      top: 74px;
      left: -10px;
      li{
        width: 140px;
        height: 120px;
        line-height: 120px;
        background: #EEF7FF;
        color:#1890FE;
        font-size:25px;
        border: 2px dashed #1890FE!important;
        box-sizing: content-box;
        text-align:center;
        &:not(:first-child) {
          margin-top: 27px
        }
      }
    }
  }
</style>
