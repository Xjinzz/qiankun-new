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
          form: [440, 80],
          to: [440, 135],
          delay: 0,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文 =》 2分叉
        {
          form: [395, 247],
          to: [395, 320],
          delay: 2000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [395, 295],
          to: [225, 295],
          delay: 3000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [225, 295],
          to: [225, 320],
          delay: 5000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 统一数据访问服务 =》结构化数据库
        {
          form: [135, 378],
          to: [135, 495],
          delay: 7000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [135, 495],
          to: [190, 495],
          delay: 9000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化存储库 =》电子公文信息
        {
          form: [325, 500],
          to: [325, 580],
          delay: 11000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [325, 580],
          to: [377, 580],
          delay: 13000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文信息 -》 2分叉
        {
          form: [530, 615],
          to: [530, 635],
          delay: 15000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [532, 635],
          to: [440, 635],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [528, 635],
          to: [620, 635],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [440, 635],
          to: [440, 647],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [620, 635],
          to: [620, 647],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件访问服务 =》电子文件文件存储
        {
          form: [395, 380],
          to: [395, 410],
          delay: 4000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [395, 410],
          to: [220, 410],
          delay: 6000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [220, 408],
          to: [220, 440],
          delay: 8000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化数据存储库 - 消息队列
        {
          form: [330, 492],
          to: [375, 492],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件文件存储 - 消息队列
        {
          form: [330, 450],
          to: [380, 450],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列-NoSQL数据库
        {
          form: [440, 492],
          to: [485, 492],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列 - 索引数据
        {
          form: [435, 450],
          to: [485, 450],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 索引数据 - 数据检索服务
        {
          form: [550, 440],
          to: [550, 380],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // NoSQL数据库 - 数据资源访问服务
        {
          form: [625, 492],
          to: [690, 492],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        {
          form: [690, 493],
          to: [690, 380],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据检索服务 - 统一检索
        {
          form: [500, 320],
          to: [500, 247],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据资源访问服务 - 业务应用
        {
          form: [690, 320],
          to: [690, 275],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 业务应用 - 服务调用用户
        {
          form: [840, 80],
          to: [840, 135],
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
@media screen and (max-width: 1440px) {
  .moveBottom{
    transform: translateX(-20px);
  }
  .mainFourth{
    .mainFourthleftOne{
      text-align: center;
      padding: 12px 8px;
      width: 100%;
      height: 160px;
      background-image: url('~@/assets/demo2/2lhtx4.png');
      background-size:100% 100%;
      margin-top: 18px;
      p{
        margin-top: 35px;
        margin-bottom: 10px;
        font-size: 18px;
      }
      .mainFourthleftOneContent{
        display: flex;
        flex-wrap: wrap;
        div{
          text-align: center;
          width: 27.3%;
          height: 30px;
          line-height: 30px;
          border-radius: 30px;
          color: #000;
          margin: 0 4px;
          font-size:15px;
          background-color: #fff;
        }
      }
    }
    .mainFourthleftTwo{
      margin-top: 15px;
      text-align: center;
      padding: 10px 8px;
      width: 100%;
      height: 120px;
      background: #EEf7fe;
      border: 2px dashed #1890FF !important;
       p{
        margin-bottom: 3px;
        font-size: 18px;
      }
      .mainFourthleftTwoContent{
        display: flex;
        flex-wrap: wrap;
        div{
          text-align: center;
          width: 26.5%;
          height: 30px;
          line-height: 30px;
          border-radius: 30px;
          color: #000;
          margin: 0 4px;
          font-size:15px;
          background-color: #fff;
        }
      }
    }
    .mainFourthRight{
      margin-top: 18px;
      width: 100%;
      height: 295px;
      border: 2px dashed #1890FF !important;
      padding: 20px 12px 12px 12px;
      .mainFourthRightTitle{
        text-align: center;
        width:400px;
        height: 55px;
        border: 2px solid #1890FE;
        font-size: 24px;
        line-height: 50px;
        color: #1890FE;
        background:#eaf6fe;
        padding-left: 20px;
      }
    }
    .mainFourthRightContent{
      display: flex;
      width: 100%;
      margin-top: 28px;
      .mainFourthRightContentOne{
        display: inline-block;
        width: 30%;
        height: 180px;
        background-image:url('~@/assets/demo2/jiasntou.png');
        background-size: 100% 100%;
        p{
          font-size: 16px;
          padding-top: 10px;
          padding-left: 4px;
          margin-bottom: 10px !important;
        }
        div{
          margin-left: 15px;
          text-align: center;
          font-size: 15px;
          color: #ffffff;
          width: 64%;
          height: 26px;
          line-height: 26px;
          margin-top:6px;
          background-color: #1890FE;
        }
      }
      .mainFourthRightContentTwo{
        display: inline-block;
        width: 22%;
        height: 180px;
        div{
          width: 100%;
          height: 40px;
          text-align: center;
          line-height: 38px;
          margin-top: 7px;
          color: #1890FE;
          font-size: 15px;
          border:1px solid #1890FE;
          &:nth-child(1) {
            border:1px solid #417505;
            color:#417505;
            background: #EFF8E4;
            margin-top:0px;
          }
        }
      }
      .mainFourthRightContentThree{
        width: 43.5%;
        height: 180px;
          .infoList{
            width: 100%;
            height: 40px;
            display: flex;
            padding: 5px;
            background-color: #EFF8E4;
            border:1px solid #417505;
            margin-top: 7px;
            &:nth-child(1) {
              margin-top:0px;
            }
            div{
              margin-left: 8px;
              line-height: 24px;
              font-size: 14px;
                &:nth-child(1) {
                  font-size: 15px;
              }
            }
            .infoListContent{
              color: #fff;
              line-height: 25px;
              background-color: #417505;
            }
          }
        }
      .mainFourthRightContentImg{
        width: 42px;
        height: 148px;
        background-image:url('~@/assets/demo2/2jtlv.png');
        background-size: 100% 100%;
      }
    }
  }
  .mainThird{
    width: 100%;
    height: 115px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 18px;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #F9F1DB;
    .mainThirdLeftContent{
      position: relative;
      z-index: 1000;
      padding-left: 40px;
      padding-top: 12px;
      border: 2px dashed #417505;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      .title{
        position: absolute;
        width:136px;
        color: #8D5800;
        font-size:20px;
        background: #F9F1DB;
        text-align:center;
        top: -20px;
        left: 208px;
      }
      .leftContentOne{
        width: 28.6%;
        transform: translateX(-60px);
        div{
          text-align: center;
          width: 100%;
          height: 28px;
          border-radius:30px;
          line-height: 28px;
          color: #000;
          font-size:15px;
          background-color: #fff;
          border: 1px solid transparent;
        }
      }
      .leftContentTwo{
        transform: translateX(-20px);
        text-align: center;
        width: 13%;
        height: 70px;
        border-radius: 50%;
        line-height: 15px;
        background-color: #fff;
        span{
          display: block;
          color: #000;
          transform: translateY(22px);
          font-size: 15px;
        }
      }
      .leftContentThree{
        width: 28.6%;
        transform: translateX(25px);
        div{
          text-align: center;
          width: 100%;
          height: 28px;
          color: #000;
          border-radius:30px;
          line-height: 28px;
          font-size:15px;
          background-color: #fff;
          border: 1px solid transparent;
        }
      }
    }
    .mainThirdRightContent{
      position: relative;
      padding-top: 12px;
      padding-left: 2px;
      border: 2px dashed #417505;
      width: 100%;
      height: 90px;
      .title{
        position: absolute;
        width:176px;
        color: #8D5800;
        font-size:20px;
        background: #F9F1DB;
        text-align:center;
        top: -20px;
        right: 117px;
      }
      .rightContentOne{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        div {
          text-align: center;
          line-height: 28px;
          width: 17.2%;
          height: 28px;
          border-radius: 30px;
          margin: 0 5px;
          font-size: 15px;
          color: #000;
          background-color: #fff;
        }
      }
    }
  }
   .mainSecond{
    width: 100%;
    height: 84px;
    margin-top: 18px;
    padding-top: 15px;
    padding-right: 12px;
    padding-left: 6px;
    padding-bottom: 8px;
    background-color: #EFF8E4;
  }
  .mainSecondContent{
    width: 100%;
    display: flex;
    .itemContent{
      margin-left: 6px;
      text-align: center;
      line-height: 60px;
      width: 16.8%;
      height: 60px;
      border: 1 solid #417505 !important;
      box-sizing: border-box;
      img{
        width: 28px;
        height: 28px;
      }
      span{
        margin-left:6px;
        color: #000;
        font-size:15px;
      }
    }
  }
  .mainFirstContentThree{
    display: inline-block;
    padding: 24px 4px 4px;
    width: 100%;
    height: 140px;
    border-radius: 10px;
    border: 2px dashed #1890FF !important;
    .ThreeItemOne{
      position: relative;
      width: 100%;
      height: 42px;
      padding: 4px;
      text-align: center;
      border: 2px dashed #1890FF !important;
      .ThreeItemTitle{
        width: 198px;
        border: 2px solid transparent;
        background-color: #EEF7FF;
        position: absolute;
        top: -25px;
        left: 166px;
        margin-bottom: 0px;
      }
      .ThreeItemContent{
        display: flex;
        justify-content: space-between;
        .ThreeItemContent_item{
          width: 19%;
          height: 30px;
          font-size: 14px;
          border-radius: 10px;
          line-height: 30px;
          background-color: #fff;
          color: #000;
        }
      }
    }
    .ThreeItemTwo{
      margin-top: 24px;
      position: relative;
      width: 100%;
      height: 42px;
      padding: 4px;
      text-align: center;
      border: 2px dashed #D73E4D !important;
      .ThreeItemTwoTitle{
        width: 198px;
        border: 2px solid transparent;
        background-color: #EEF7FF;
        position: absolute;
        top: -25px;
        left: 166px;
      }
      .ThreeItemContent{
        display: flex;
        .ThreeItemContent_item{
          width: 23%;
          height: 30px;
          font-size: 14px;
          border-radius: 10px;
          line-height: 30px;
          background-color: #fff;
          color: #000;
        }
      }
    }
  }
  .mainFirstContentTwo{
    transform: translateX(14px);
    display: inline-block;
    text-align: center;
    width: 200px;
    height: 140px;
    padding: 8px;
    border: 2px dashed #1890FF;
    border-radius: 10px;
    p {
      font-size: 17px !important;
      color: #1890FF !important;
      margin-bottom: 5px;
    }
    .mainFirstContentLabel{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .itemStyle{
        display: flex;
      }
      .item{
        width: 86px;
        height: 30px;
        border: 2px solid transparent;
        display: inline-block;
        font-size: 14px;
        color: #000;
        text-align: center;
        background-color: #fff;
        line-height: 25px;
        border-radius: 10px;
      }
    }
  }
  p{
    color:#1890FF !important;
    font-size:18px;
  }
  .mainFirstContentOne{
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 140px;
    padding: 8px;
    border: 2px dashed #D73E4D;
    border-radius: 10px;
    p {
      font-size: 17px !important;
      color: #1890FF !important;
      margin-bottom: 5px;
    }
    .mainFirstContentLabel{
      margin-top: 10px;
      .itemStyle{
        width: 100%;
        display: flex;
      }
      .item{
        width: 47.6%;
        height: 30px;
        border: 2px solid transparent;
        display: inline-block;
        font-size: 14px;
        color: #000;
        text-align: center;
        background-color: #fff;
        line-height: 25px;
        border-radius: 10px;
      }
    }
  }
  .mainFirst{
    width: 100%;
    height: 165px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 18px;
    padding-top: 15px;
    padding-bottom: 8px;
    background-color: #EEF7FF;
    position: relative;
  }
  .mainTitleOne{
    z-index: 100;
    font-size: 22px;
    color:#fff;
    background: #1890FE;
    width: 145px;
    height: 28px;
    line-height: 27px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 105px;
  }
  .mainTitleTwo{
    z-index: 100;
    font-size: 22px;
    color:#fff;
    background: #417505;
    width: 145px;
    height: 28px;
    line-height: 27px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 288px;
  }
  .mainTitleThree{
    z-index: 100;
    font-size: 22px;
    color:#fff;
    background: #8D5800;
    width: 165px;
    height: 28px;
    line-height: 27px;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 390px;
  }
  .jghsjkjt {
    width: 220px;
    height:68px;
    background: url('~@/assets/demo2/jgh.png');
    background-size:100% 100%;
    position: absolute;
    z-index: 0;
    top:474px;
    left:164px
  }
  .leftTopLine {
    z-index: 100;
    width: 62px;
    height: 48px;
    background-image: url('~@/assets/demo2/2jt1.png');
    background-size: 100% 100%;
    position:absolute;
    top: 57px;
    left:59px;
  }
  .leftBottomLine{
    z-index: 100;
    width: 62px;
    height: 48px;
    background: url('~@/assets/demo2/2jt2.png');
    background-size: 100% 100%;
    position:absolute;
    top: 756px;
    left:59px;
  }
  .topStyle{
    display: flex;
    height: 80px;
    border: 2px dashed #1890FF;
    justify-content: space-around;
    padding-top:10px;
    padding-bottom:10px;
    div{
      img{
        width: 60px;
        height: 50px;
        margin-bottom: 5px;
      }
    }
    span{
      display: inline-block;
      line-height: 60px;
      margin-left: 15px;
      font-size: 20px;
      color: #000000;
    }
  }
  .mainStyle{
    padding-top: 24px;
    height: 900px;
    position: relative;
    .leftListStyle{
      padding-left: 15px;
      list-style: none;
      li{
        padding: 0 4px;
        width: 80px;
        height: 80px;
        line-height: 80px;
        background: #EEF7FF;
        color:#1890FE;
        font-size:18px;
        border: 2px dashed #1890FE!important;
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
