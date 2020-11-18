<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]" v-cloak>
    <div class="container bg">
      <div class="left" style="color:#fff">
        <div class="left-top">
          <img src="~@/assets/login/logo.png" style="margin-right:2%;" alt />
          <span>{{ bannerStateMap.title }}</span>
        </div>
        <div class="left-center">
          <p v-html="bannerStateMap.littleTitle"></p>
          <span v-html="bannerStateMap.description"></span>
        </div>
      </div>
      <route-view></route-view>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {
      bannerState: 1,
      bannerStateMap: {
        title: '互联开放式应用支撑平台',
        littleTitle: '<span style="color:#82EEFF">大平台</span>&nbsp 大系统&nbsp 大数据',
        description: '互联开放式应用支撑中的大平台，以提升组件和微服务为宗旨'
      },
      intervId: 0
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
    this.intervId = setInterval(this.flashText, 3000)
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
    clearInterval(this.intervId)
  },
  methods: {
    flashText () {
      this.bannerState > 2 ? this.bannerState = 1 : this.bannerState++
      const bannerStateMap = new Map()
        .set(1, {
          title: '互联开放式应用支撑平台',
          littleTitle: `<span style="color:#82EEFF">大平台</span>&nbsp 大系统&nbsp 大数据`,
          description: '互联开放式应用支撑中的大平台，以提升组件和微服务为宗旨'
        })
        .set(2, {
          title: '互联开放式应用支撑平台',
          littleTitle: `大平台&nbsp <span style="color:#82EEFF">大系统</span>&nbsp 大数据`,
          description: '互联开放式应用支撑中的大平台，以提升组件和微服务为宗旨'
        })
        .set(3, {
          title: '互联开放式应用支撑平台',
          littleTitle: `大平台 &nbsp大系统&nbsp <span style="color:#82EEFF">大数据</span>`,
          description: '互联开放式应用支撑中的大平台，以提升组件和微服务为宗旨'
        })
      this.bannerStateMap = bannerStateMap.get(this.bannerState)
      document.getElementsByClassName('bg')[0].className = 'container bg backGround_' + this.bannerState
    }
  }
}
</script>

<style lang="less" scoped>
[v-cloak] {display: none;}
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }
    // 1920
    @media screen and (max-width: 4096px) and (min-width: 1920px) {
      .bg {
        background: url(~@/assets/login/bj1-1920.jpg) no-repeat;
        background-size: 100% 100%;
      }
      .backGround_1 {
        background-image: url(~@/assets/login/bj1-1920.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_2 {
        background-image: url(~@/assets/login/bj2-1920.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_3 {
        background-image: url(~@/assets/login/bj3-1920.jpg) !important;
        background-size: 100% 100%
      }
      .left .left-center {
        color: #ffffff;
        width: 57%;
        position: absolute;
        left: 18%;
        top: 21%;
      }
      .left .left-center p {
        font-size: 70px;
        margin-bottom: 3%;
      }
      .left .left-center span {
        font-size: 35px;
      }
    }
    // 1440
    @media screen and (max-width: 1920px) and (min-width: 1440px) {
      .bg {
        background: url(~@/assets/login/bj1-1366.jpg) no-repeat;
        background-size: 100% 100%;
      }
      .backGround_1 {
        background-image: url(~@/assets/login/bj1-1366.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_2 {
        background-image: url(~@/assets/login/bj2-1366.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_3 {
        background-image: url(~@/assets/login/bj3-1366.jpg) !important;
        background-size: 100% 100%
      }
      .left .left-center {
        color: #ffffff;
        width: 60%;
        position: absolute;
        left: 18%;
        top: 21%;
      }
      .left .left-center p {
        font-size: 55px;
        margin-bottom: 3%;
      }
      .left .left-center span {
        font-size: 29px;
      }
    }
    // 1366
    @media screen and (max-width: 1440px) and (min-width: 1366px) {
      .bg {
        background: url(~@/assets/login/bj1-1440.jpg) no-repeat;
        background-size: 100% 100%;
      }
      .backGround_1 {
        background-image: url(~@/assets/login/bj1-1440.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_2 {
        background-image: url(~@/assets/login/bj2-1440.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_3 {
        background-image: url(~@/assets/login/bj3-1440.jpg) !important;
        background-size: 100% 100%
      }
      .left .left-center {
        color: #ffffff;
        width: 60%;
        position: absolute;
        left: 18%;
        top: 23%;
      }
      .left .left-center p {
        font-size: 52px;
        margin-bottom: 3%;
      }
      .left .left-center span {
        font-size: 26px;
      }
    }
    // 1024
    @media screen and (max-width: 1366px) and (min-width: 1024px) {
      .bg {
        background: url(~@/assets/login/bj1-1024.jpg) no-repeat;
        background-size: 100% 100%;
      }
      .backGround_1 {
        background-image: url(~@/assets/login/bj1-1024.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_2 {
        background-image: url(~@/assets/login/bj2-1024.jpg) !important;
        background-size: 100% 100%
      }

      .backGround_3 {
        background-image: url(~@/assets/login/bj3-1024.jpg) !important;
        background-size: 100% 100%
      }
      .left .left-center {
        color: #ffffff;
        width: 69%;
        position: absolute;
        left: 11%;
        top: 25%;
      }
      .left .left-center p {
        font-size: 45px;
        margin-bottom: 3%;
      }
      .left .left-center span {
        font-size: 20px;
      }
    }
  .container {
    width: 100%;
    min-height: 100%;
    // background
    position: relative;
    transition: all 2s;
    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .left {
      position: absolute;
      top: 0;
      left: 0;
      width: 65%;
      height: 100%;
      display: flex;
    }
    .left .left-top {
      width: 100%;
      font-size: 36px;
      color: #4ebafb;
      text-align: left;
      padding: 2% 0 0 5%;
      height: 4.6%;
    }
    // .left .left-center p {
    //   font-size: 5rem;
    //   margin-bottom: 3%;
    // }
    // .left .left-center span {
    //   font-size: 3rem;
    // }
    .footer {
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 10px 0 24px;
      text-align: center;
      .links {
        margin-bottom: 8px;
        font-size: 12px;
        a {
          color: #646464;
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: #646464;
        font-size: 12px;
      }
    }
  }
}
</style>
