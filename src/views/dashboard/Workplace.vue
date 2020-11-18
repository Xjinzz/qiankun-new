<template>
  <a-card>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="首页">
        <img src="@/assets/confIcon/sy.jpg" style="width: 100%;">
      </a-tab-pane>
      <a-tab-pane key="2" tab="业务架构">
        <!-- <business-bigger v-if="screen <= 2560 && screen > 1920" />
        <business-big v-if="screen <=1920 && screen > 1680"/>
        <business-middle v-if="screen <= 1680 && screen >1440 " />
        <business-small v-if="screen <=1440 " /> -->
        <!-- <business-big v-if="screen <=1920 && screen > 1680"/> -->
        <business-rem />
      </a-tab-pane>
      <a-tab-pane key="3" tab="数据架构">
        <!-- <home-page v-if="screen <=1920 && screen > 1680"/>
        <home-page2 v-if="screen <= 1680 && screen >1440 " />
        <home-page3 v-if="screen <= 2560 && screen > 1920" />
        <home-page4 v-if="screen <=1440 " /> -->
        <data-rem></data-rem>
        <!-- <home-page /> -->
        <!-- <home-page2 /> -->
        <!-- <home-page3 /> -->
        <!-- <home-page4 /> -->
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
// import HomePage2 from './IndexDemo3' // 1680
// import HomePage3 from './IndexDemo4' // 2560
// import HomePage4 from './IndexDemo5' // 1440
import DataRem from './DataRem' // 1920
// import DataRem from ''

import BusinessRem from './BusinessRem'
// import BusinessSmall from './IndexDemo1440' // 1440
// import BusinessMiddle from './IndexDemo1680' // 1680
// import BusinessBig from './IndexDemo1920' // 1920
// import BusinessBigger from './IndexDemo2560' // 2560

import { PageView } from '@/layouts'

export default {
  components: {
    // HomePage,
    PageView,
    // HomePage2,
    // HomePage3,
    // HomePage4,
    DataRem,
    BusinessRem
    // BusinessSmall,
    // BusinessMiddle,
    // BusinessBig
    // BusinessBigger
  },
  name: 'Workplace',
  data () {
    return {
      // screenWidth: document.documentElement.clientWidth,
      // screen: null
    }
  },
  created () {
    function recalc () {
      const oWidth = document.body.clientWidth || document.documentElement.clientWidth
      document.getElementsByTagName('html')[0].style.fontSize = oWidth / 96 + 'px'
    }
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt, recalc, false)
    recalc()
    // this.getScreen()
  },
  methods: {
    // window.onr
    // getScreen () {
    //   this.screen = window.screen.width
    // }
  }
}
</script>
