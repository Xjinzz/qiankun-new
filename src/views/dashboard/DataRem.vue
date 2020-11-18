<template>
  <div class="mainStyle">
    <div class="leftStyle">
      <ul class="leftListStyle">
        <li v-for="item of leftData" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="rightStyle">
      <div class="firstStyle">
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
      <div class="secondStyle">
        <div class="secondItemOne">
          <div class="secondItemTitle secondItemTitlePadding">元数据管理</div>
          <div class="secondItemContent">
            <div class="contentFlex">
              <div class="contentFlexMargin bgColor bgColorOne">业务元数据</div>
              <div class="contentFlexMargin bgColor bgColorOne">数据元数据</div>
            </div>
            <div class="contentFlex" style="margin-top:0.4rem">
              <div class="contentFlexMargin bgColor bgColorOne">编码元数据</div>
              <div class="contentFlexMargin bgColor bgColorOne">主数据</div>
            </div>
          </div>
        </div>
        <div class="secondItemTwo">
          <div class="secondItemTitle secondItemTitlePadding">展现层</div>
          <div class="secondItemContent">
            <div class="contentFlex">
              <div class="contentFlexMargin bgColor bgColorTwo">市场监管</div>
              <div class="contentFlexMargin bgColor bgColorTwo">行政审批</div>
            </div>
            <div class="contentFlex" style="margin-top:0.4rem">
              <div class="contentFlexMargin bgColor bgColorTwo">公众服务</div>
              <div class="contentFlexMargin bgColor bgColorTwo">智慧商务</div>
            </div>
          </div>
        </div>
        <div class="secondItemThree">
          <div class="secondItemTitle positionTitleOne">统一数据资源管理</div>
          <div class="secondItemTitle positionTitleTwo">专题库</div>
          <div class="secondItemThreeContentOne">
            <div>资源目录管理</div>
            <div>资源对象建模</div>
            <div>数据编码管理</div>
            <div>数据质量管理</div>
            <div>......</div>
          </div>
          <div class="secondItemThreeContentTwo">
            <div>企业画像主题库</div>
            <div>消费经济主题库</div>
            <div>商圈经济主题库</div>
            <div>......</div>
          </div>
        </div>
      </div>
      <div class="thirdStyle">
        <div>
          <img src="@/assets/demo2/2tysj.png" alt="">
          <span>统一数据访问服务</span>
        </div>
        <div>
          <img src="@/assets/demo2/2dzwj.png" alt="">
          <span>非结构化数据服务</span>
        </div>
        <div>
          <img src="@/assets/demo2/sjjs.png" alt="">
          <span>数据检索服务</span>
        </div>
        <div>
          <img src="@/assets/demo2/2sjzy.png">
          <span>数据资源访问服务</span>
        </div>
        <div>
          <img src="@/assets/demo2/2sjsq.png">
          <span>统一数据授权服务</span>
        </div>
        <div>
          <img src="@/assets/demo2/2qtfw.png">
          <span>其他服务</span>
        </div>
      </div>
      <div class="fourthStyle">
        <div class="fourthTitle fourthPositionOne">生产数据</div>
        <div class="fourthTitle fourthPositionTwo">分析数据</div>
        <div class="fourthLeft">
          <div class="fourthLeftContentOne">
            <div>非结构化数据存储</div>
            <div style="margin-top:0.6rem;">结构化数据存储库</div>
          </div>
          <div class="fourthLeftContentTwo">
            <div>消息队列</div>
            <div>（内存）</div>
          </div>
          <div class="fourthLeftContentThree">
            <div>索引数据</div>
            <div style="margin-top:0.6rem;">NoSQL数据库</div>
          </div>
        </div>
        <div class="fourthRight">
          <div class="fourthRightOne">
            <div>批处理</div>
            <div>流处理</div>
            <div>图计算</div>
            <div>内存计算</div>
            <div>离线计算</div>
          </div>
          <div class="fourthRightTwo" style="margin-top:0.6rem;">
            <div>批流融合计算</div>
            <div style="margin-left: 1.4rem;">模型计算</div>
          </div>
        </div>
      </div>
      <div class="fifthStyle">
        <div class="fifthLeft">
          <div class="fifthLeftOne">
            <div class="fifthLeftTitle">数据采集</div>
            <div class="fifthLeftContentOne">
              <div>导入</div>
              <div>抽取</div>
              <div>清洗</div>
              <div>转换</div>
            </div>
            <div class="fifthLeftContentTwo">
              <div>装载</div>
            </div>
          </div>
          <div class="fifthLeftTwo">
            <div class="fifthLeftTitle">外部数据</div>
            <div class="fifthLeftContentOne">
              <div>DB</div>
              <div>REST</div>
              <div>File</div>
              <div>WS</div>
            </div>
            <div class="fifthLeftContentTwo">
              <div style="margin-left: 0.4rem;">Dubbo</div>
              <div style="margin-left:0.5rem;">......</div>
            </div>
          </div>
        </div>
        <div class="fifthRight">
          <div class="fifthRightTitle">
            企业主体信息（基于主题数据）
          </div>
          <div class="fifthRightContent">
            <div class="fifthRightContentOne">
              <div class="fifthRightTitleOne">企业主体基础信息</div>
              <div class="fifthRightSubject">
                <div>统一信用代码</div>
                <div>企业名称</div>
                <div>企业法人</div>
                <div>......</div>
              </div>
            </div>
            <div class="fifthRightContentTwo">
              <div>风险数据</div>
              <div>财务数据</div>
              <div>上市数据</div>
              <div>风险舆情</div>
            </div>
            <div class="fifthRightContentThree"></div>
            <div class="fifthRightContentFour">
              <div class="fifthRightContentFirst">
                <div class="fifthRightContentFirstTitle">行政许可</div>
                <div class="fifthRightContentFirstContent">
                  <div>行政许可决定文书号</div>
                  <div>......</div>
                </div>
              </div>
              <div class="fifthRightContentFirst">
                <div class="fifthRightContentFirstTitle">行政处罚</div>
                <div class="fifthRightContentFirstContent">
                  <div>处罚决定书文号</div>
                  <div>处罚决定日期</div>
                  <div>......</div>
                </div>
              </div>
              <div class="fifthRightContentFirst">
                <div class="fifthRightContentFirstTitle">守信激励</div>
                <div class="fifthRightContentFirstContent">
                  <div>纳税人名称</div>
                  <div>评价年度</div>
                  <div>数据来源</div>
                  <div>......</div>
                </div>
              </div>
              <div class="fifthRightContentFirst">
                <div class="fifthRightContentFirstTitle">失信惩戒</div>
                <div class="fifthRightContentFirstContent">
                  <div>执行法院</div>
                  <div>统一社会信用代码</div>
                  <div>......</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jghsjkjt"></div>
    <div class="leftTopLine"></div>
    <div class="leftBottomLine"></div>
    <div class="mainTitleOne">业务应用</div>
    <div class="mainTitleTwo">数据服务</div>
    <div class="mainTitleThree">大数据平台</div>
    <flow-line :referNumber="34000" v-if="refear" style="position:absolute;top:0;left:0;width:100%;height:100%;" :dataSource="dataSource" :alg="2"></flow-line>
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
  components: {
    FlowLine
  },
  data () {
    return {
      refear: true,
      dataSource: [
        // 服务用户=》展示层
        {
          form: [595, 80],
          to: [595, 160],
          delay: 0,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子公文 =》 2分叉
        {
          form: [550, 320],
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
          form: [330, 359],
          to: [330, 400],
          delay: 5000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 统一数据访问服务 =》结构化数据库
        {
          form: [198, 452],
          to: [198, 610],
          delay: 7000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [198, 609],
          to: [292, 609],
          delay: 9000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化存储库 =》电子公文信息
        {
          form: [488, 620],
          to: [488, 720],
          delay: 11000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [486, 720],
          to: [568, 720],
          delay: 13000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 企业主体信息 -》 2分叉
        {
          form: [780, 750],
          to: [780, 770],
          delay: 15000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [782, 770],
          to: [635, 770],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [778, 770],
          to: [925, 770],
          delay: 17000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [635, 770],
          to: [635, 790],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [925, 770],
          to: [925, 790],
          delay: 19000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件访问服务 =》电子文件文件存储
        {
          form: [550, 452],
          to: [550, 492],
          delay: 4000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [550, 492],
          to: [350, 492],
          delay: 6000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        {
          form: [350, 492],
          to: [350, 545],
          delay: 8000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 结构化数据存储库 - 消息队列
        {
          form: [485, 610],
          to: [570, 610],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 电子文件文件存储 - 消息队列
        {
          form: [485, 562],
          to: [570, 562],
          delay: 21000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列-NoSQL数据库
        {
          form: [645, 610],
          to: [730, 610],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 消息队列 - 索引数据
        {
          form: [645, 562],
          to: [730, 562],
          delay: 23000,
          stokeColor: Define.STOKECOLOR.GO,
          circleColor: Define.CIRCLECOLOR.GO
        },
        // 索引数据 - 数据检索服务
        {
          form: [810, 550],
          to: [810, 450],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // NoSQL数据库 - 数据资源访问服务
        {
          form: [930, 610],
          to: [1000, 610],
          delay: 25000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        {
          form: [1000, 610],
          to: [1000, 450],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据检索服务 - 统一检索
        {
          form: [700, 400],
          to: [700, 320],
          delay: 27000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 数据资源访问服务 - 业务应用
        {
          form: [1000, 400],
          to: [1000, 330],
          delay: 29000,
          stokeColor: Define.STOKECOLOR.REFARE,
          circleColor: Define.CIRCLECOLOR.REFARE
        },
        // 业务应用 - 服务调用用户
        {
          form: [1150, 158],
          to: [1150, 80],
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
.mainStyle{
  display: flex;
  padding: 1.2rem 0.9rem;
  position: relative;
  .leftStyle{
    margin-top: 4rem;
    width: 7.2rem;
    text-align: center;
    box-sizing: border-box;
    .leftListStyle{
      list-style: none;
      padding-left:0;
      li{
        width: 100%;
        height: 5.8rem;
        line-height: 5rem;
        font-size: 1.2rem;
        background: #EEF7FF;
        color:#1890FE;
        border: 0.12rem dashed #1890FE!important;
        margin-bottom: 1.2rem;
      }
    }
  };
  .rightStyle{
    flex: 1;
    margin-left: 1rem;
    box-sizing: border-box;
    .firstStyle{
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      height: 4rem;
      border: 0.12rem dashed #1890FF;
      img{
        width: 3.2rem;
        height: 2.7rem;
      }
      span{
        color: #000000;
        font-size: 1.1rem;
        vertical-align: middle;
        margin-left: 0.3rem;
      }
    };
    .secondStyle{
      display: flex;
      margin-top: 1.5rem;
      padding: 1.2rem 0.6rem 0.6rem;
      width: 100%;
      height: 10.5rem;
      background-color: #EEF7FF;
      .secondItemTitle{
        font-size: 1rem;
        color:#1890FF;
        &.secondItemTitlePadding {
          padding-top:0.5rem;
          padding-bottom:0.5rem;
        }
      }
      .secondItemContent{
        margin-top: 0.5rem;
        .contentFlex{
          .contentFlexMargin {
            display: inline-block;
            border-radius: 0.4rem;
            width: 5.4rem;
            margin-left: 0.5rem
          }
          .bgColor{
            background-color: #fff;
            color: #000;
            font-size: 0.8rem;
          };
          .bgColorOne{
            padding: 0.4rem 0.4rem;
          }
          .bgColorTwo{
            padding: 0.4rem 0.6rem;
          }
        };
      };
      .secondItemOne{
        width: 13.5rem;
        height: 100%;
        text-align: center;
        padding: 0.5rem;
        border: 0.12rem dashed #D73E4D;
        border-radius: 0.3rem
      };
      .secondItemTwo{
        width: 13.5rem;
        height: 100%;
        text-align: center;
        margin-left: 0.5rem;
        padding: 0.5rem;
        border: 0.12rem dashed #1890FF;
        border-radius: 0.3rem
      };
      .secondItemThree{
        flex: 1;
        height: 100%;
        text-align: center;
        padding: 0.8rem 0.5rem 0.3rem;
        margin-left: 0.6rem;
        border: 0.12rem dashed #1890FF;
        border-radius: 0.3rem;
        position: relative;
        .positionTitleOne{
          background-color: #EEF7FF;
          position: absolute;
          left: 12.5rem;
          top: 0.1rem;
          padding: 0rem 4rem;
          font-size: 0.8rem;
        };
        .positionTitleTwo{
          background-color: #EEF7FF;
          padding: 0 6.5rem;
          position: absolute;
          left: 12.5rem;
          font-size: 0.8rem;
          top: 4rem;
        }
        .secondItemThreeContentOne{
          height: 3.1rem;
          font-size: 0.8rem;
          color: #000;
          line-height: 1.8rem;
          padding-top: 0.5rem;
          border: 0.12rem dashed #1890FF !important;
          text-align: left;
          div{
            display: inline-block;
            margin-left:0.6rem;
            font-size: 0.8rem;
            background-color: #fff;
            border-radius: 0.4rem;
            padding: 0 0.6rem;
            text-align: center;
          }
        };
        .secondItemThreeContentTwo{
          text-align: left;
          height: 3.1rem;
          font-size: 0.8rem;
          color: #000;
          margin-top: 0.8rem;
          padding-top: 0.5rem;
          line-height: 1.8rem;
          border: 0.12rem dashed #D73E4D !important;
          div{
            text-align: center;
            display: inline-block;
            font-size: 0.8rem;
            margin-left:0.6rem;
            background-color: #fff;
            border-radius: 0.4rem;
            padding: 0 0.6rem;
          }
        }
      }
    };
    .thirdStyle{
      width: 100%;
      height: 4.8rem;
      margin-top: 1.5rem;
      padding-top: 1.2rem;
      padding-bottom: 0.6rem;
      line-height: 2.6rem;
      background-color: #EFF8E4;
      // justify-content: space-around;
      div{
        display:inline-block;
        margin-left:0.6rem;
        border:1px solid #417505;
        padding: 0 0.5rem;
        img{
          width: 1.5rem;
        };
        span{
          font-size: 1rem;
          margin-left: 0.1rem;
          vertical-align: middle;
          color: #000;
        };
      }
    };
    .fourthStyle{
      display: flex;
      width: 100%;
      height: 7.3rem;
      margin-top: 1.5rem;
      padding: 1.2rem 0.6rem 0.6rem;
      background-color: #F9F1DB;
      position: relative;
      .fourthTitle{
        color: #8D5800;
        font-size: 1rem;
        background: #F9F1DB;
        position: absolute;
        top: 0.4rem;
        padding: 0 1rem;
      };
      .fourthPositionOne{
        left: 18.4rem;
      };
      .fourthPositionTwo{
        left: 49rem;
      };
      .fourthLeft{
        width: 41rem;
        border-radius: 0.3rem;
        font-size: 0.8rem;
        border: 0.12rem dashed #417505;
        padding: 1rem 1rem 0.2rem;
        display: flex;
        justify-content: space-around;
        .fourthLeftContentOne{
          width: 15rem;
          text-align: center;
          z-index: 10;
          div{
            color: #000;
            background-color: #fff;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            margin: 0 2.5rem;
            border-radius: 1rem;
          }
        };
        .fourthLeftContentTwo{
          width: 4.2rem;
          text-align: center;
          border-radius: 50%;
          padding-top: 1rem;
          color: #000;
          background-color: #fff;
        };
        .fourthLeftContentThree{
          width: 15rem;
          text-align: center;
          div{
            color: #000;
            background-color: #fff;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            margin: 0 2.5rem;
            border-radius: 1rem;
          }
        };
      };
      .fourthRight{
        flex: 1;
        border-radius: 0.3rem;
        margin-left: 1.2rem;
        font-size: 0.8rem;
        padding: 1rem 0.4rem 0.2rem;
        color: #000;
        border: 0.12rem dashed #417505;
        .fourthRightOne{
          display: flex;
          justify-content: space-around;
          div{
            background-color: #fff;
            border-radius: 1rem;
            padding: 0.25rem 0.2rem;
          }
        };
        .fourthRightTwo{
          div{
            display: inline-block;
            background-color: #fff;
            border-radius: 1rem;
            padding: 0.25rem 0.2rem;
            margin-left: 0.8rem;
          }
        }
      };
    };
    .fifthStyle{
      display: flex;
      width: 100%;
      height: 16.5rem;
      margin-top: 1.5rem;
      .fifthLeft{
        width: 17.5rem;
        .fifthLeftTitle{
            color: #1890FF;
            font-size: 1rem;
          };
        .fifthLeftOne{
          width: 100%;
          height: 8.7rem;
          padding: 2.7rem 0.6rem 0.6rem;
          text-align: center;
          background-image: url('~@/assets/demo2/2lhtx4.png');
          background-size:100% 100%;
        };
        .fifthLeftTwo{
          width: 100%;
          height: 7rem;
          text-align: center;
          margin-top: 0.8rem;
          padding: 0.3rem 0.6rem;
          border: 0.12rem dashed #1890FF;
          background: #EEf7fe;
        };
        .fifthLeftContentOne{
            margin-top: 0.6rem;
            display: flex;
            justify-content: space-around;
            div{
              background-color: #fff;
              color: #000;
              font-size: 0.8rem;
              padding: 0.2rem 1rem;
              border-radius: 1rem;
            }
          };
          .fifthLeftContentTwo{
            display: flex;
            justify-content: flex-start;
            div{
              background-color: #fff;
              color: #000;
              font-size: 0.8rem;
              padding: 0.2rem 1rem;
              border-radius: 1rem;
              margin-top: 0.4rem;
              margin-left: 0.2rem;
            }
          }
      };
      .fifthRight{
        flex: 1;
        height: 100%;
        border: 0.12rem dashed #1890FF;
        margin-left: 0.7rem;
        padding: 1.2rem 0.8rem 0.7rem;
        .fifthRightTitle{
          width: 24rem;
          height: 2.5rem;
          color: #1890FE;
          border: 0.12rem solid #1890FE;
          text-align: center;
          font-size: 1.1rem;
          line-height: 2rem;
        };
        .fifthRightContent{
          margin-top: 2rem;
          width: 100%;
          display: flex;
          .fifthRightContentOne{
            width: 11rem;
            height: 10rem;
            background-image:url('~@/assets/demo2/jiasntou.png');
            background-size: 100% 100%;
            padding: 0.6rem 0.6rem 0.4rem;
            .fifthRightTitleOne{
              font-size: 0.9rem;
              color: #1890FF;
              margin-left: 0.3rem;
            };
            .fifthRightSubject{
              div{
                width: 6rem;
                height: 1.4rem;
                margin-top: 0.5rem;
                text-align: center;
                background-color: #1890FE;
                color: #fff;
                margin-left: 1rem;
                line-height: 1.4rem;
              }
            };
          };
          .fifthRightContentTwo{
            width: 9.5rem;
            height: 10rem;
            div{
              text-align: center;
              width: 100%;
              height: 2rem;
              line-height: 1.8rem;
              margin-top: 0.65rem;
              font-size: 0.8rem;
              color: #1890FE;
              border:0.08rem solid #1890FE;
              &:nth-child(1) {
                border:0.08rem solid #417505;
                color:#417505;
                background: #EFF8E4;
                margin-top: 0rem;
              }
            }
          };
          .fifthRightContentThree{
            width: 3rem;
            height: 8.2rem;
            margin-top: 0.8rem;
            background-image:url('~@/assets/demo2/2jtlv.png');
            background-size: 100% 100%;
          };
          .fifthRightContentFour{
            flex: 1;
            height: 10rem;
            .fifthRightContentFirst{
              width: 100%;
              height: 2rem;
              line-height: 1.8rem;
              margin-top: 0.65rem;
              padding: 0 0.8rem;
              border:0.08rem solid #417505;
              background-color: #EFF8E4;
              display: flex;
              &:nth-child(1) {
                margin-top: 0rem;
              };
              .fifthRightContentFirstTitle{
                width: 4rem;
                color: #417505;
                font-size: 0.9rem;
              };
              .fifthRightContentFirstContent{
                flex: 1;
                display: flex;
                div{
                  margin-top: 0.2rem;
                  height: 1.5rem;
                  color: #fff;
                  background-color: #417505;
                  margin-left: 0.4rem;
                  padding: 0 0.5rem;
                  line-height: 1.5rem;
                }
              }
            }
          }
        }
      }
    }
  };
  .jghsjkjt{
    width: 17rem;
    height:4.4rem;
    background: url('~@/assets/demo2/jgh.png');
    background-size:100% 100%;
    position: absolute;
    left: 12rem;
    top: 29.2rem;
    z-index: 0;
  };
  .leftTopLine{
    background: url('~@/assets/demo2/2jt1.png');
    background-size: 100% 100%;
    width: 5rem;
    height: 2rem;
    position:absolute;
    top: 3rem;
    left:4rem;
  };
  .leftBottomLine{
    background: url('~@/assets/demo2/2jt2.png');
    background-size: 100% 100%;
    width: 5rem;
    height: 2rem;
    position:absolute;
    top: 46rem;
    left:4rem;
  };
  .mainTitleOne{
    z-index: 100;
    font-size: 1rem;
    color:#fff;
    background: #1890FE;
    width: 7rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 1rem;
    text-align: center;
    position: absolute;
    right: 1rem;
    top: 5.8rem;
  };
  .mainTitleTwo{
    z-index: 100;
    font-size: 1rem;
    color:#fff;
    background: #417505;
    width: 7rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 1rem;
    text-align: center;
    position: absolute;
    right: 1rem;
    top: 17.8rem;
  };
  .mainTitleThree{
    z-index: 100;
    font-size: 1rem;
    color:#fff;
    background: #8D5800;
    width: 8rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 1rem;
    text-align: center;
    position: absolute;
    right: 1rem;
    top: 24.2rem;
  };
}
</style>
