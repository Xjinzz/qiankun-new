<template>
  <div style="position:relative">
    <div class="mainStyle">
      <a-row :gutter="12">
        <a-col :span="3"></a-col>
        <a-col :span="21" class="moveBottom">
          <div class="topStyle">
            <div>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                业务用户
              </span>
            </div>
            <div>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                服务用户
              </span>
            </div>
            <div>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                协同用户
              </span>
            </div>
            <div>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                服务调用用户
              </span>
            </div>
            <div>
              <img src="@/assets/demo2/2yh.png" />
              <span>
                其他
              </span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="3">
          <ul class="leftListStyle">
            <li v-for="item of leftData" :key="item">
              {{ item }}
            </li>
          </ul>
        </a-col>
        <a-col :span="21" class="moveBottom">
          <a-row :gutter="16" class="mainFirst">
            <a-col :span="5" style="padding-right:0px">
              <div class="mainFirstContentOne">
                <p>元数据管理</p>
                <div class="mainFirstContentLabel">
                  <div class="itemStyle">
                    <div class="item">业务元数据</div>
                    <div class="item" style="margin-left:8px">数据元数据</div>
                  </div>
                  <div class="itemStyle" style="margin-top:8px">
                    <div class="item">编码元数据</div>
                    <div class="item" style="margin-left:8px;width:50px">主数据</div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="5" style="padding-left:0px">
              <div class="mainFirstContentTwo">
                <p style="color:#1890FF;">展现层</p>
                <div class="mainFirstContentLabel">
                  <div class="itemStyle">
                    <div class="item">市场监管</div>
                    <div class="item" style="margin-left:8px">行政审批</div>
                  </div>
                  <div class="itemStyle" style="margin-top:8px">
                    <div class="item">公众服务</div>
                    <div class="item" style="margin-left:8px;">智慧商务</div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="14" style="padding-left:25px">
              <div class="mainFirstContentThree" style="border-color:#1890FF">
                <div class="ThreeItemOne">
                  <p class="ThreeItemTitle" style="color:#1890FF;font-size:17px">统一数据资源管理</p>
                  <div class="ThreeItemContent">
                    <div class="ThreeItemContent_item">资源目录管理</div>
                    <div class="ThreeItemContent_item">资源对象建模</div>
                    <div class="ThreeItemContent_item">数据编码管理</div>
                    <div class="ThreeItemContent_item">数据质量管理</div>
                    <div class="ThreeItemContent_item">数据共享服务</div>
                  </div>
                </div>
                <div class="ThreeItemTwo" style="border-color:#D73E4D">
                  <p class="ThreeItemTwoTitle" style="color:#1890FF;font-size:17px">专题库</p>
                  <div class="ThreeItemContent">
                    <div class="ThreeItemContent_item">企业画像主题库</div>
                    <div class="ThreeItemContent_item" style="margin-left:20px">消费经济主题库</div>
                    <div class="ThreeItemContent_item" style="margin-left:20px">商圈经济主题库</div>
                    <div class="ThreeItemContent_item" style="width:80px;margin-left:20px">......</div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row class="mainSecond">
            <a-col>
              <div class="mainSecondContent">
                <div class="itemContent" style="border:1px solid #417505">
                  <img src="@/assets/demo2/2tysj.png" alt="">
                  <span>统一数据访问服务</span>
                </div>
                <div class="itemContent" style="border:1px solid #417505">
                  <img src="@/assets/demo2/2dzwj.png" alt="">
                  <span>非结构化数据服务</span>
                </div>
                <div class="itemContent" style="border:1px solid #417505;">
                  <img src="@/assets/demo2/sjjs.png" alt="">
                  <span>数据检索服务</span>
                </div>
                <div class="itemContent" style="border:1px solid #417505">
                  <img src="@/assets/demo2/2sjzy.png">
                  <span>数据资源访问服务</span>
                </div>
                <div class="itemContent" style="border:1px solid #417505">
                  <img src="@/assets/demo2/2sjsq.png">
                  <span>统一数据授权服务</span>
                </div>
                <div class="itemContent" style="border:1px solid #417505;width:140px">
                  <img src="@/assets/demo2/2qtfw.png">
                  <span>其他服务</span>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="mainThird">
            <a-col :span="14">
              <div class="mainThirdLeftContent">
                <div class="title">生产数据</div>
                <div class="leftContentOne">
                  <div>非结构化数据存储</div>
                  <div style="margin-top:10px;">结构化数据存储库</div>
                </div>
                <div class="leftContentTwo">
                  <span>消息队列 <br>（内存）</span>
                </div>
                <div class="leftContentThree">
                  <div>索引数据</div>
                  <div style="margin-top:10px">NoSQL数据库</div>
                </div>
              </div>
            </a-col>
            <a-col :span="10">
              <div class="mainThirdRightContent">
                <div class="title">分析数据</div>
                <div class="rightContentOne">
                  <div>批处理</div>
                  <div>流处理</div>
                  <div>图计算</div>
                  <div>内存计算</div>
                  <div>离线计算</div>
                  <div style="width:30.5%;margin-top:10px">批流融合计算</div>
                  <div style="margin-top:10px">模型计算</div>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="mainFourth">
            <a-col :span="6">
              <div class="mainFourthleftOne">
                <p style="color:#1890FF;">数据采集</p>
                <div class="mainFourthleftOneContent">
                  <div>导入</div>
                  <div>抽取</div>
                  <div>清洗</div>
                  <div style="margin-top:8px">转换</div>
                  <div style="margin-top:8px">装载</div>
                </div>
              </div>
              <div class="mainFourthleftTwo">
                <p style="color:#1890FF;">外部数据</p>
                <div class="mainFourthleftTwoContent">
                  <div>DB</div>
                  <div>REST</div>
                  <div>File</div>
                  <div style="margin-top:8px;">WS</div>
                  <div style="margin-top:8px;width:70px">Dubbo</div>
                  <div style="margin-top:8px;width:50px">......</div>
                </div>
              </div>
            </a-col>
            <a-col :span="18" style="padding-left:4px">
              <div class="mainFourthRight">
                <div>
                  <div class="mainFourthRightTitle">企业主体信息（基于主题数据）</div>
                </div>
                <div class="mainFourthRightContent">
                  <div class="mainFourthRightContentOne">
                    <p style="color:#1890FF;">企业主体基础信息</p>
                    <div>统一信用代码</div>
                    <div>企业名称</div>
                    <div>企业法人</div>
                    <div>......</div>
                  </div>
                  <div class="mainFourthRightContentTwo">
                    <div>风险数据</div>
                    <div>财务数据</div>
                    <div>上市数据</div>
                    <div>风险舆情</div>
                  </div>
                  <div class="mainFourthRightContentImg" style="margin-top:18px;"></div>
                  <div class="mainFourthRightContentThree">
                    <div class="infoList">
                      <div>行政许可</div>
                      <div class="infoListContent">行政许可决定文书号</div>
                      <!-- <div class="infoListContent">行政许可决定文书名称</div> -->
                      <div class="infoListContent">......</div>
                    </div>
                    <div class="infoList">
                      <div>行政处罚</div>
                      <div class="infoListContent">处罚决定书文号</div>
                      <!-- <div class="infoListContent">批示内容</div> -->
                      <div class="infoListContent">处罚决定日期</div>
                      <div class="infoListContent">......</div>
                    </div>
                    <div class="infoList">
                      <div>守信激励</div>
                      <div class="infoListContent">纳税人名称</div>
                      <div class="infoListContent">评价年度</div>
                      <div class="infoListContent">数据来源</div>
                      <div class="infoListContent">......</div>
                    </div>
                    <div class="infoList">
                      <div>失信惩戒</div>
                      <div class="infoListContent">执行法院</div>
                      <div class="infoListContent">统一社会信用代码</div>
                      <!-- <div class="infoListContent">截至时间</div> -->
                      <div class="infoListContent">......</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div class="mainTitleOne">业务应用</div>
    <div class="mainTitleTwo">数据服务</div>
    <div class="mainTitleThree">大数据平台</div>
    <!-- <div class="jghsjkjt"></div> -->
    <div class="leftTopLine"></div>
    <div class="leftBottomLine"></div>
    <flow-line :referNumber="34000" v-if="refear" style="position:absolute;top:0;left:0;width:100%;height:100%;" :dataSource="dataSource"></flow-line>
  </div>
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
  components: { FlowLine },
  data () {
    return {
      refear: true,
      dataSource: [
        // 服务用户=》展示层
        {
          form: [860, 100],
          to: [860, 220],
          delay: 0,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文 =》 2分叉
        {
          form: [800, 415],
          to: [800, 515],
          delay: 2000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [800, 470],
          to: [450, 470],
          delay: 3000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [450, 468],
          to: [450, 518],
          delay: 5000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 统一数据访问服务 =》结构化数据库
        {
          form: [283, 590],
          to: [283, 783],
          delay: 7000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [283, 783],
          to: [410, 783],
          delay: 9000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化存储库 =》电子公文信息
        {
          form: [635, 795],
          to: [635, 930],
          delay: 11000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [635, 930],
          to: [780, 930],
          delay: 13000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文信息 -》 2分叉
        {
          form: [1085, 970],
          to: [1085, 1000],
          delay: 15000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [1087, 1000],
          to: [900, 1000],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [1083, 1000],
          to: [1270, 1000],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [900, 1000],
          to: [900, 1020],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [1270, 1000],
          to: [1270, 1020],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件访问服务 =》电子文件文件存储
        {
          form: [800, 585],
          to: [800, 640],
          delay: 4000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [800, 640],
          to: [460, 640],
          delay: 6000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [460, 640],
          to: [460, 710],
          delay: 8000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化数据存储库 - 消息队列
        {
          form: [645, 780],
          to: [777, 780],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件文件存储 - 消息队列
        {
          form: [645, 725],
          to: [780, 725],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列-NoSQL数据库
        {
          form: [865, 780],
          to: [1025, 780],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列 - 索引数据
        {
          form: [858, 725],
          to: [1025, 725],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 索引数据 - 数据检索服务
        {
          form: [1130, 710],
          to: [1130, 585],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // NoSQL数据库 - 数据资源访问服务
        {
          form: [1265, 780],
          to: [1397, 780],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        {
          form: [1396, 780],
          to: [1396, 600],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据检索服务 - 统一检索
        {
          form: [960, 515],
          to: [960, 415],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据资源访问服务 - 业务应用
        {
          form: [1396, 515],
          to: [1396, 435],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 业务应用 - 服务调用用户
        {
          form: [1720, 220],
          to: [1720, 100],
          delay: 31000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        }
      ],
      leftData: [
        '标准规范',
        '数据质量',
        '数据安全',
        '规范流程',
        '操作审计',
        '灾备恢复'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 2560px) {
  .moveBottom{
    transform: translateX(-20px);
  }
  .mainFourth{
    .mainFourthleftOne{
      text-align: center;
      padding: 12px 8px;
      width: 100%;
      height: 255px;
      background-image: url('~@/assets/demo2/2lhtx4.png');
      background-size:100% 100%;
      margin-top: 30px;
      p{
        margin-top: 66px;
        margin-bottom: 15px;
        font-size: 28px;
      }
      .mainFourthleftOneContent{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        div{
          text-align: center;
          width: 23%;
          height: 42px;
          line-height: 42px;
          border-radius: 30px;
          color: #000;
          margin: 0 4px;
          font-size:22px;
          background-color: #fff;
        }
      }
    }
    .mainFourthleftTwo{
      margin-top: 20px;
      text-align: center;
      padding: 12px 8px;
      width: 100%;
      height: 195px;
      background: #EEf7fe;
      border: 3px dashed #1890FF !important;
       p{
        font-size: 28px;
        margin-bottom: 15px;
      }
      .mainFourthleftTwoContent{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        div{
          text-align: center;
          width: 22%;
          height: 42px;
          line-height: 42px;
          border-radius: 30px;
          color: #000;
          margin: 0 4px;
          font-size:22px;
          background-color: #fff;
        }
      }
    }
    .mainFourthRight{
      margin-top: 20px;
      height: 480px;
      border: 3px dashed #1890FF !important;
      padding: 20px;
      .mainFourthRightTitle{
        text-align: center;
        margin-top:10px;
        height: 80px;
        border: 3px solid #1890FE;
        font-size: 32px;
        line-height: 70px;
        color: #1890FE;
        background:#eaf6fe;
        padding-left: 20px;
        width:720px;
      }
    }
    .mainFourthRightContent{
      display: flex;
      width: 100%;
      height: 300px;
      margin-top: 45px;
      .mainFourthRightContentOne{
        display: inline-block;
        width: 24%;
        height: 300px;
        background-image:url('~@/assets/demo2/jiasntou.png');
        background-size: 100% 100%;
        p{
          font-size: 28px;
          padding-top: 15px;
          padding-left: 25px;
          margin-bottom: 10px !important;
        }
        div{
          margin-left: 45px;
          text-align: center;
          font-size: 22px;
          color: #ffffff;
          width: 180px;
          height: 45px;
          line-height: 45px;
          margin-top:10px;
          background-color: #1890FE;
        }
      }
      .mainFourthRightContentTwo{
        display: inline-block;
        width: 20%;
        height: 300px;
        div{
          width: 100%;
          height: 64px;
          text-align: center;
          line-height: 60px;
          margin-top: 15px;
          color: #1890FE;
          font-size: 22px;
          border:2px solid #1890FE;
          &:nth-child(1) {
            border:2px solid #417505;
            color:#417505;
            background: #EFF8E4;
            margin-top:0px;
          }
        }
      }
      .mainFourthRightContentThree{
        width: 51%;
        height: 200px;
          .infoList{
            width: 100%;
            height: 64px;
            display: flex;
            padding: 5px;
            background-color: #EFF8E4;
            border:2px solid #417505;
            margin-top: 15px;
            &:nth-child(1) {
              margin-top:0px;
            }
            div{
              margin-left: 18px;
              line-height: 48px;
              font-size: 22px;
                &:nth-child(1) {
                  font-size: 24px;
              }
            }
            .infoListContent{
              color: #fff;
              padding: 0 18px;
              background-color: #417505;
            }
          }
        }
      .mainFourthRightContentImg{
        width: 80px;
        height: 250px;
        background-image:url('~@/assets/demo2/2jtlv.png');
        background-size: 100% 100%;
      }
    }
  }
  .mainThird{
    width: 100%;
    height: 200px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 35px;
    padding-left: 8px;
    padding-right: 15px;
    padding-top: 35px;
    padding-bottom: 15px;
    background-color: #F9F1DB;
    .mainThirdLeftContent{
      position: relative;
      z-index: 1000;
      padding-left: 40px;
      padding-top: 17px;
      border: 3px dashed #417505;
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      .title{
        position: absolute;
        width:265px;
        color: #8D5800;
        font-size:28px;
        background: #F9F1DB;
        text-align:center;
        top: -28px;
        left: 415px;
      }
      .leftContentOne{
        width: 21.8%;
        margin-top: 15px;
        transform: translateX(-160px);
        div{
          text-align: center;
          width: 100%;
          height: 42px;
          border-radius:30px;
          line-height: 42px;
          color: #000;
          font-size:22px;
          background-color: #fff;
          border: 1px solid transparent;
        }
      }
      .leftContentTwo{
        margin-top: 15px;
        transform: translateX(-32px);
        text-align: center;
        width: 9%;
        height: 95px;
        border-radius: 50%;
        line-height: 20px;
        background-color: #fff;
        span{
          display: block;
          color: #000;
          transform: translateY(30px);
          font-size: 21px;
        }
      }
      .leftContentThree{
        width: 21.8%;
        margin-top: 15px;
        transform: translateX(124px);
        div{
          text-align: center;
          width: 100%;
          height: 42px;
          color: #000;
          border-radius:30px;
          line-height: 42px;
          font-size:22px;
          background-color: #fff;
          border: 1px solid transparent;
        }
      }
    }
    .mainThirdRightContent{
      position: relative;
      padding-top: 17px;
      border: 3px dashed #417505;
      width: 100%;
      height: 150px;
      .title{
        position: absolute;
        width:265px;
        color: #8D5800;
        font-size:28px;
        background: #F9F1DB;
        text-align:center;
        top: -28px;
        right: 278px;
      }
      .rightContentOne{
        width: 100%;
        margin-top: 15px;
        padding-left: 12px;
        display: flex;
        flex-wrap: wrap;
        div {
          text-align: center;
          line-height: 42px;
          width: 18%;
          height: 42px;
          border-radius: 30px;
          margin: 0 5px;
          font-size: 22px;
          color: #000;
          background-color: #fff;
        }
      }
    }
  }
   .mainSecond{
    width: 100%;
    height: 118px;
    margin-top: 32px;
    padding-top: 32px;
    padding-bottom: 15px;
    background-color: #EFF8E4;
  }
  .mainSecondContent{
    width: 100%;
    display: flex;
    .itemContent{
      margin-left: 20px;
      text-align: center;
      line-height: 60px;
      width: 15.5%;
      height: 70px;
      border: 2px solid #417505;
      box-sizing: border-box;
      img{
        width: 42px;
        height: 42px;
      }
      span{
        margin-left:10px;
        color: #000;
        font-size:24px;
      }
    }
  }
  .mainFirstContentThree{
    display: inline-block;
    padding: 25px 15px 15px;
    width: 100%;
    height: 215px;
    border-radius: 10px;
    border: 3px dashed #1890FF !important;
    .ThreeItemOne{
      position: relative;
      width: 100%;
      height: 75px;
      padding: 10px;
      text-align: center;
      border: 3px dashed #1890FF !important;
      .ThreeItemTitle{
        width: 390px;
        border: 2px solid transparent;
        background-color: #EEF7FF;
        position: absolute;
        top: -28px;
        left: 320px;
      }
      .ThreeItemContent{
        display: flex;
        justify-content: space-between;
        .ThreeItemContent_item{
          margin-top: 10px;
          width: 19%;
          height: 40px;
          font-size: 22px;
          border-radius: 10px;
          line-height: 40px;
          background-color: #fff;
          color: #000;
        }
      }
    }
    .ThreeItemTwo{
      margin-top: 25px;
      position: relative;
      width: 100%;
      height: 75px;
      padding: 10px;
      text-align: center;
      border: 3px dashed #D73E4D !important;
      .ThreeItemTwoTitle{
        width: 390px;
        border: 2px solid transparent;
        background-color: #EEF7FF;
        position: absolute;
        top: -28px;
        left: 320px;
      }
      .ThreeItemContent{
        display: flex;
        justify-content: flex-start;
        .ThreeItemContent_item{
          width: 20%;
          height: 40px;
          font-size: 22px;
          border-radius: 10px;
          line-height: 40px;
          background-color: #fff;
          margin-top: 10px;
          color: #000;
        }
      }
    }
  }
  .mainFirstContentTwo{
    transform: translateX(14px);
    display: inline-block;
    text-align: center;
    width: 92%;
    height: 215px;
    padding: 18px;
    padding-right: 0;
    border: 3px dashed #1890FF;
    border-radius: 10px;
    p {
      font-size: 28px !important;
      color: #1890FF !important;
    }
    .mainFirstContentLabel{
      display: flex;
      flex-wrap: wrap;
      .itemStyle{
        display: flex;
        justify-content: space-around;
        width: 95%;
      }
      .item{
        width: 46.4%;
        height: 42px;
        border: 2px solid transparent;
        display: inline-block;
        font-size: 22px;
        color: #000;
        text-align: center;
        background-color: #fff;
        line-height: 42px;
        border-radius: 10px;
      }
    }
  }
  p{
    color:#1890FF !important;
    font-size:18px;
  }
  .mainFirstContentOne{
    transform: translateX(5px);
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 215px;
    padding: 18px;
    border: 3px dashed #D73E4D;
    border-radius: 10px;
    p {
      font-size: 28px !important;
      color: #1890FF !important;
    }
    .mainFirstContentLabel{
      .itemStyle{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
      }
      .item{
        width: 47.5%;
        height: 42px;
        border: 2px solid transparent;
        display: inline-block;
        font-size: 22px;
        color: #000;
        text-align: center;
        background-color: #fff;
        line-height: 42px;
        border-radius: 10px;
      }
    }
  }
  .mainTitleOne{
    z-index: 100;
    font-size: 32px;
    color:#fff;
    background: #1890FE;
    width: 200px;
    height: 48px;
    line-height: 43px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 157px;
  }
  .mainTitleTwo{
    z-index: 100;
    font-size: 32px;
    color:#fff;
    background: #417505;
    width: 200px;
    height: 48px;
    line-height: 43px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 456px;
  }
  .mainTitleThree{
    z-index: 100;
    font-size: 32px;
    color:#fff;
    background: #8D5800;
    width: 250px;
    height: 48px;
    line-height: 43px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 612px;
  }
  .jghsjkjt {
    width: 450px;
    height:96px;
    background: url('~@/assets/demo2/jgh.png');
    background-size:100% 100%;
    position: absolute;
    z-index: 0;
    top:760px;
    left:350px
  }
  .leftTopLine {
    z-index: 100;
    width: 140px;
    height: 60px;
    background-image: url('~@/assets/demo2/2jt1.png');
    background-size: 100% 100%;
    position:absolute;
    top: 80px;
    left:120px;
  }
  .leftBottomLine{
    z-index: 100;
    width: 140px;
    height: 60px;
    background: url('~@/assets/demo2/2jt2.png');
    background-size: 100% 100%;
    position:absolute;
    top: 1230px;
    left:120px;
  }
  .mainFirst{
    width: 100%;
    height: 270px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 15px;
    background-color: #EEF7FF;
    position: relative;
  }
  .topStyle{
    display: flex;
    height: 120px;
    border: 3px dashed #1890FF;
    justify-content: space-around;
    padding-top:10px;
    padding-bottom:10px;
    div{
      img{
        width: 96px;
        height: 87px;
      }
    }
    span{
      display: inline-block;
      line-height: 85px;
      margin-left: 15px;
      font-size: 30px;
      color: #000000;
    }
  }
  .mainStyle{
    padding-top: 24px;
    height: 900px;
    position: relative;
    .leftListStyle{
      list-style: none;
      li{
        width: 170px;
        height: 150px;
        line-height: 150px;
        background: #EEF7FF;
        color:#1890FE;
        font-size:30px;
        border: 3px dashed #1890FE!important;
        box-sizing: content-box;
        text-align:center;
        &:not(:first-child) {
          margin-top: 30px
        }
      }
    }
  }
}
</style>
