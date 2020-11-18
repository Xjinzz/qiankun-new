<template>
  <div class="content">
    <a-card class="demo" :bordered="false">
      <div class="left"></div>
      <div class="center">
        <div class="user">
          <div class="lay">用户层</div>
          <div class="userContent">
            <div class="userItem" v-for="(val, ind) in user" :key="ind">
              <div class="userType">{{ val.type }}</div>
              <div class="userCrowd" v-for="(v, i) in val.crowd" :key="'c+' + i">
                <img src="@/assets/demo/yhgl2.png" alt="">
                <span>{{ v }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="reveal">
          <div class="lay">展现层</div>
          <div class="revealCont">
            <div class="revealLeft">
              <div class="leftItem" v-for="(val, ind) in reveal" :key="'reveal-' + ind" @click="openWindow(val.link)" style="z-index: 100">
                <img src="@/assets/demo/dn.png" alt="">
                <span>{{ val.title }}</span>
              </div>
            </div>
            <div class="revealRight">
              <div class="rightImg">
                <img src="@/assets/demo/web (1).png" alt="">
                <img src="@/assets/demo/html.png" alt="">
                <img src="@/assets/demo/ui.png" alt="">
                <img src="@/assets/demo/web.png" alt="">
                <img src="@/assets/demo/app.png" alt="">
              </div>
              <div class="rightText">
                <p>Portal,</p>
                <p>HTML,</p>
                <p>EasyUI,</p>
                <p>web,</p>
                <p>APP</p>
              </div>
            </div>
          </div>
        </div>
        <div class="service">
          <div class="lay">业务服务层</div>
          <div class="serviceCont">
            <div class="serLeft">
              <div class="serLeftL">
                <img src="@/assets/demo/xt.png" alt="">
                <span>综合信息办公系统</span>
              </div>
              <div class="serLeftR" style="position:relative;z-index: 100">
                <!-- 点击可以跳转页面   传路径 -->
                <span class="pointer" @click="openWindow('http://118.190.199.44:9040/iop/doc.html')">REST接口</span>
              </div>
            </div>
            <div class="serRight">
              <span v-for="(item, ind) in serviceLay" :key="'ser'+ind">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="appLayStyle">
          <div class="lay">数据服务层</div>
          <div class="appContent">
            <div class="appContLeft">
              <div class="appLeftL">
                <img src="@/assets/demo/xt.png" alt="">
                <span>综合信息办公系统</span>
              </div>
              <div class="appLeftR" style="position:relative;z-index: 100">
                <!-- 点击可以跳转页面   传路径 -->
                <span class="pointer" @click="openWindow('http://118.190.199.44:9040/iop/doc.html')">Dubbo接口</span>
              </div>
            </div>
            <div class="appContRight">
              <div class="appItem" v-for="(val, i) in applicationLay" :key="'app' + i">
                <img :src="val.img" alt="">
                <span>{{ val.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="support">
          <div class="lay">支撑层</div>
          <div class="supportCont">
            <div class="supportItem pointer" v-for="(item, ind) in supportLay" :key="'support' + ind" @click="openWindow(item.link)" style="z-index: 100">
              <img :src="item.img" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="resource">
          <div class="lay">数据资源层</div>
          <div class="resourceCont">
            <div class="resourceItem" v-for="(item, i) in resourceLay" :key="'resource' + i" @click="openWindow(item.link)" style="z-index: 100">
              <img src="@/assets/demo/sjzy.png" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="operation">
          <div class="lay">运行环境层</div>
          <div class="operationCont">
            <div class="operationItem" v-for="(item, i) in operationLay" :key="'operation' + i">
              <img :src="item.img" alt="">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="basics">
          <div class="basicsLay">
            <span>基</span>
            <span>础</span>
            <span>支</span>
            <span>撑</span>
            <span>层</span>
          </div>
          <div class="basicsCont">
            <div class="basItem" v-for="(item, ind) in basicsLay" :key="'bas' + ind">
              <div class="basType">{{ item.type }}</div>
              <div class="typeDate">
                <span v-for="(val, i) in item.typeData" :key="'type' + i">{{ val.name }}</span>
              </div>
            </div>
            <div class="ieLay" v-for="(item, code) in ieLay" :key="'ie' + code">
              <div class="ieType">{{ item.type }}</div>
              <div class="ieTypeData">
                <span v-for="(val, index) in item.typeData" :key="'ieT' + index">{{ val.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
      <flow-line :referNumber="12000" style="position:absolute;top:0;left:0;width:100%;height:100%;zIndex:99" :dataSource="dataSource"></flow-line>
    </a-card>
  </div>
</template>

<script>
import yy1 from '@/assets/demo/yy1.png'
import yy2 from '@/assets/demo/yy2.png'
import yy3 from '@/assets/demo/yy3.png'
// import yy4 from '@/assets/demo/yy4.png'
// import yy5 from '@/assets/demo/yy5.png'
// import yy6 from '@/assets/demo/yy6.png'
import yhgl from '@/assets/demo/yhgl.png'
import jrgl from '@/assets/demo/jrgl.png'
import zygl from '@/assets/demo/zygl.png'
import sqgl from '@/assets/demo/sqgl.png'
import lcgl from '@/assets/demo/lcgl.png'
// import aqsj from '@/assets/demo/aqsj.png'
import wl from '@/assets/demo/wl.png'
import aq from '@/assets/demo/aq.png'
import yy from '@/assets/demo/yy.png'
// import Arrow from '@/iop/components/arrow/index.vue'
import FlowLine from './comp/FlowLine'
export default {
  name: '',
  components: {
    // Arrow
    FlowLine
  },
  data () {
    return {
      dataSource: [
        {
          form: [420, 70],
          to: [420, 125],
          delay: 0,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [420, 185],
          to: [420, 240],
          delay: 2000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [420, 288],
          to: [420, 345],
          delay: 4000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [720, 380],
          to: [720, 445],
          delay: 6000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [722, 445],
          to: [420, 445],
          delay: 8000,
          timer: 2000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [720, 445],
          to: [1410, 445],
          delay: 8000,
          timer: 2000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [422, 445],
          to: [422, 490],
          delay: 10000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [665, 445],
          to: [665, 490],
          delay: 10000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [905, 445],
          to: [905, 490],
          delay: 10000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [1115, 445],
          to: [1115, 490],
          delay: 10000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        },
        {
          form: [1410, 440],
          to: [1410, 490],
          delay: 10000,
          timer: 1000,
          stokeColor: '#1890FE',
          circleColor: '#417505',
          lineWidth: 10,
          circleWidth: 8
        }
      ],
      user: [
        {
          type: '业务用户',
          crowd: ['人大机关工作人员']
        },
        {
          type: '服务用户',
          crowd: ['人大代表', '地方人大', '公众用户']
        },
        {
          type: '协调用户',
          crowd: ['党政机关相关部门']
        }
      ],
      reveal: [
        {
          title: '办公门户',
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          title: '互联网门户',
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          title: '电子政务外网门户',
          link: 'http://118.190.199.44:9040/iop/doc.html'
        }
      ],
      serviceLay: [
        {
          title: '人事管理'
        },
        {
          title: '记者管理'
        },
        {
          title: '人事管理'
        },
        {
          title: '······'
        }
      ],
      applicationLay: [
        {
          name: '法工委业务',
          img: yy1
        },
        {
          name: '秘书局业务',
          img: yy2
        },
        {
          name: '联络局业务',
          img: yy3
        }
      ],
      supportLay: [
        {
          name: '统一用户',
          img: yhgl,
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          name: '统一接口',
          img: jrgl,
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          name: '统一资源',
          img: zygl,
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          name: '统一授权',
          img: sqgl,
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          name: '统一流程',
          img: lcgl,
          link: 'http://118.190.199.44:9040/iop/doc.html'
        }
      ],
      resourceLay: [
        {
          name: '数据库设计',
          link: 'http://118.190.199.44:9040/iop/doc.html'
        },
        {
          name: '数据交换平台'
        },
        {
          name: '信息资源目录'
        },
        {
          name: '表单设计'
        },
        {
          name: '应用支撑数据'
        }
      ],
      operationLay: [
        {
          name: '网络基础环境',
          img: wl
        },
        {
          name: '安全基础环境',
          img: aq
        },
        {
          name: '应用基础环境',
          img: yy
        }
      ],
      basicsLay: [
        {
          type: '基础软件层',
          typeData: [
            {
              name: '数据库系统'
            },
            {
              name: '文件系统'
            },
            {
              name: '中间件'
            },
            {
              name: '防病毒系统'
            },
            {
              name: '运维系统'
            },
            {
              name: '主机审计'
            },
            {
              name: '数据库审计'
            },
            {
              name: '服务器审计'
            }
          ]
        },
        {
          type: '硬件层',
          typeData: [
            {
              name: '应用集群服务器'
            },
            {
              name: '数据库集群服务器'
            },
            {
              name: '大数据集群服务器'
            },
            {
              name: 'redis集群服务器'
            },
            {
              name: 'sorl集群服务器'
            },
            {
              name: '应用集群服务器'
            },
            {
              name: '存储设备'
            },
            {
              name: '机房'
            },
            {
              name: '终端与外设'
            },
            {
              name: '多媒体设备'
            },
            {
              name: '安全设备'
            },
            {
              name: '空调系统'
            },
            {
              name: '供配电系统'
            },
            {
              name: '消防系统'
            },
            {
              name: '......'
            }
          ]
        }
      ],
      ieLay: [
        {
          type: '网络层',
          typeData: [
            {
              name: '电子政务外网'
            },
            {
              name: '互联网'
            }
          ]
        }
      ]
    }
  },
  methods: {
    openWindow (url) {
      if (url) {
        window.open(url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pointer{
  cursor: pointer;
}
.ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.demo {
  /deep/.ant-card-body {
    display: flex;
  }
  .left {
    width: 85px;
    height: 975px;
    background: url('~@/assets/demo/left.png') no-repeat;
  }
  .right {
    width: 85px;
    height: 975px;
    background: url('~@/assets/demo/right.png') no-repeat;
  }
  .center {
    /* width: 1350px; */
    flex: 1;
    .user {
      width: 100%;
      height: 50px;
      padding: 0 25px;
      box-sizing: border-box;
      background: #EEF7FF;
      border:1px dashed #1F93ee;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      .userLine {
        position: absolute;
        z-index: 999;
        bottom: -50px;
        left: 300px;
      }
      .lay {
        width: 200px;
        font-size: 24px;
        color: #1F93FF;
        text-align: left;
      }
      .userContent {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .userItem {
          display: flex;
          height: 32px;
          border: 1px solid RGB(18,141,255);
          .userType {
            width: 110px;
            text-align: center;
            background: RGB(18,141,255);
            font-size: 20px;
            color: #FFFFFF;
          }
          .userCrowd {
            display: flex;
            align-items: center;
            padding: 0 10px;
            box-sizing: border-box;
            img {
              width: 24px;
              height: 24px;
              margin-right: 6px;
            }
            span {
              font-size: 17px;
              color: #000000;
            }
          }
        }
      }
    }
    .reveal {
      width: 100%;
      height: 65px;
      padding: 0 25px;
      box-sizing: border-box;
      border:1px dashed #1F93FF;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      .revealLine {
        position: absolute;
        z-index: 999;
        bottom: -30px;
        left: 300px;
      }
      .lay {
        width: 200px;
        font-size: 24px;
        color: #1F93FF;
        text-align: left;
      }
      .revealCont {
        flex: 1;
        display: flex;
        .revealLeft {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 50px;
          box-sizing: border-box;
          .leftItem {
            display: flex;
            cursor: pointer;
            align-items: center;
            img {
              width: 50px;
              height: 50px;
            }
            span {
              margin-left: 10px;
              font-size: 20px;
              color: #000000;
            }
          }
        }
        .revealRight {
          width: 400px;
          height: 30px;
          .rightImg {
            width: 100%;
            height: 100%;
            background: #EEF7FF;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          .rightText {
            width: 100%;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            p {
              font-size: 20px;
              color: #000000;
              margin: 0;
              padding: 0;
            }
          }
        }
      }
    }
    .service {
      width: 100%;
      height: 55px;
      padding: 0 25px;
      box-sizing: border-box;
      background: #E0F0FE;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      .serviceLine {
        position: absolute;
        z-index: 999;
        bottom: -45px;
        left: 300px;
      }
      .lay {
        width: 200px;
        font-size: 24px;
        color: #0463BA;
        text-align: left;
      }
      .serviceCont {
        flex: 1;
        display: flex;
        .serLeft {
          flex: 5;
          display: flex;
          align-items: center;
          height: 42px;
          background: RGB(18,141,255);
          .serLeftL {
            flex: 1;
            display: flex;
            align-items: center;
            padding-left: 25px;
            box-sizing: border-box;
            img {
              width: 30px;
              height: 26px;
              margin: 0 4px;
            }
            span {
              font-size: 22px;
              color: #FFFFFF;
            }
          }
          .serLeftR {
            flex: 1;
            padding: 0 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              width: 80%;
              height: 32px;
              padding: 0 22px;
              box-sizing: border-box;
              line-height: 32px;
              text-align: center;
              background: #FFFFFF;
              border-radius: 16px;
              font-size: 18px;
              color: #000000;
            }
          }
        }
        .serRight {
          flex: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left:40px;
          box-sizing: border-box;
          span {
            height: 32px;
            padding: 0 14px 0 18px;
            box-sizing: border-box;
            line-height: 32px;
            border-radius: 16px;
            background: RGB(18,141,255);
            border-radius: 16px;
            font-size: 20px;
            color: #FFFFFF;
          }
        }
      }
    }
    .appLayStyle {
      width: 100%;
      height: 60px;
      padding: 0 25px;
      box-sizing: border-box;
      border:1px dashed #1F93FF;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      .appUserLine {
        position: absolute;
        z-index: 999;
        bottom: -34px;
        left: 41%;
      }
      .appPortLine {
        position: absolute;
        z-index: 999;
        bottom: -63px;
        left: 20.14%;
      }
      .appDataLine {
        position: absolute;
        z-index: 999;
        bottom: -62.6px;
        left: 42.68%;
      }
      .appVOneLine {
        position: absolute;
        z-index: 999;
        bottom: -84px;
        left: 18.6%;
      }
      .appVSecLine {
        position: absolute;
        z-index: 999;
        bottom: -84px;
        left: 38%;
      }
      .appVThrLine {
        position: absolute;
        z-index: 999;
        bottom: -84px;
        left: 56%;
      }
      .appVFouLine {
        position: absolute;
        z-index: 999;
        bottom: -84px;
        left: 75%;
      }
      .appVFifLine {
        position: absolute;
        z-index: 999;
        bottom: -84px;
        left: 92.7%;
      }
      .lay {
        width: 200px;
        font-size: 24px;
        color: #1F5CA2;
        text-align: left;
      }
      .appContent {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .appContLeft {
          flex: 5;
          display: flex;
          align-items: center;
          height: 42px;
          background: RGB(18,141,255);
          .appLeftL {
            flex: 1;
            display: flex;
            align-items: center;
            padding-left: 25px;
            box-sizing: border-box;
            img {
              width: 30px;
              height: 26px;
              margin: 0 4px;
            }
            span {
              font-size: 22px;
              color: #FFFFFF;
            }
          }
          .appLeftR {
            flex: 1;
            padding: 0 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              width: 80%;
              height: 32px;
              padding: 0 22px;
              box-sizing: border-box;
              line-height: 32px;
              text-align: center;
              background: #FFFFFF;
              border-radius: 16px;
              font-size: 18px;
              color: #000000;
            }
          }
        }
        .appContRight {
          flex: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding:0 20px;
          box-sizing: border-box;
          .appItem {
            display: flex;
            /* flex-direction: column; */
            /* justify-content: space-between; */
            align-items: center;
            img {
              width: 27px;
              height: 30px;
            }
            span {
              margin-left: 10px;
              font-size: 20px;
              color: #000000;
            }
          }
        }
      }
    }
    .support {
      width: 100%;
      height: 50px;
      padding: 0 25px;
      box-sizing: border-box;
      background: rgba(174,218,122,0.20);
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .lay {
        width: 200px;
        font-size: 24px;
        color: #325B02;
        text-align: left;
      }
      .supportCont {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .supportItem {
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          span {
            font-size: 20px;
            color: #000000;
          }
        }
      }
    }
    .resource {
      width: 100%;
      height: 50px;
      padding: 0 25px;
      box-sizing: border-box;
      border:1px dashed #1F93FF;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .lay {
        width: 200px;
        font-size: 24px;
        color: #325B02;
        text-align: left;
      }
      .resourceCont {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .resourceItem {
          width: 216px;
          height: 40px;
          border: 1px solid #58AFFF;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          span {
            font-size: 20px;
            color: #00C1DE;
          }
        }
      }
    }
    .operation {
      width: 100%;
      height: 50px;
      padding: 0 25px;
      box-sizing: border-box;
      background: rgba(226,184,74,0.20);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .lay {
        width: 200px;
        font-size: 24px;
        color: #C37900;
        text-align: left;
      }
      .operationCont {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .operationItem {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          span {
            font-size: 20px;
            color: #000;
          }
        }
      }
    }
    .basics {
      width: 100%;
      height: 245px;
      padding:5px;
      box-sizing: border-box;
      border:1px dashed #1F93FF;
      display: flex;
      align-items: center;
      .basicsLay {
        width: 126px;
        height: 100%;
        font-size: 24px;
        color: RGB(18,141,255);
        background: url('~@/assets/demo/di.png') no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .basicsCont {
        flex: 1;
        height: 100%;
        margin-left: 17px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .basItem {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          padding: 11px 15px;
          box-sizing: border-box;
          background: #EEF7FF;
          .basType {
            font-size: 20px;
            color: RGB(18,141,255);
            text-align: left;
          }
          .typeDate {
            margin-left: 10px;
            display: flex;
            flex-wrap: wrap;
            span {
              margin: 3px 5px;
              height: 38px;
              line-height: 38px;
              padding: 0 15px;
              box-sizing: border-box;
              background: #FFFFFF;
              border-radius: 19px;
            }
          }
        }
        .ieLay {
          width: 100%;
          height: auto;
          padding:11px 15px;
          box-sizing: border-box;
          background: #EEF7FF;
          display: flex;
          .ieType {
            width: 113px;
            font-size: 20px;
            color: RGB(18,141,255);
            text-align: left;
          }
          .ieTypeData {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              flex: 1;
              margin-left: 10px;
              background: #FFFFFF;
              height: 38px;
              border-radius: 19px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
