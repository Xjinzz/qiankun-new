<template>
  <div class="wrap-settings">
    <div class="settings-left">
      <li v-for="(item, index) in listArr" :key="item.id" @click="listClick(item, index)" ref="list" :class="{backBg: bg == index}">
        {{ item.name }}
      </li>
    </div>
    <div class="settings-right">
      <component :is="currentView"></component>
    </div>
  </div>
</template>
<script>
import tab1 from './pageStore/tab1.vue'
import tab2 from './pageStore/Voucher.vue'
import tab3 from './pageStore/tab3.vue'
import tab4 from './pageStore/tab4.vue'
import tab5 from './pageStore/tab5.vue'
export default {
  data () {
    return {
      listArr: [
        {
          name: '基本信息',
          id: 0,
          type: 'tab1'
        },
        {
          name: '个人凭证密码',
          id: 1,
          type: 'tab2'
        },
        {
          name: '个人通讯方式',
          id: 2,
          type: 'tab3'
        },
        {
          name: '消息与代办事项',
          id: 3,
          type: 'tab4'
        },
        {
          name: '皮肤与布局指定',
          id: 4,
          type: 'tab5'
        }
      ],
      bg: '',
      currentView: 'tab1'
    }
  },
  components: {
    tab1,
    tab2,
    tab3,
    tab4,
    tab5
  },
  created () {
  },
  methods: {
    listClick (item, index) {
      this.bg = index
      this.currentView = item.type
    }
  }
}
</script>
<style scoped  lang="less">
.wrap-settings {
    height: 100%;
    background: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
    .settings-left {
        width: 220px;
        height: 100%;
        box-sizing: border-box;
        float: left;
        margin-top: 6px;
        li {
            list-style: none;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            margin-top: 10px;
            width: 100%;
            line-height: 40px;
            cursor: pointer;
            padding-left: 20px;
        }
    }
    .backBg {
        background: #ABD4FA;
        color: #1890FF;
        border-right: 4px solid #1890FF;
    }
    .settings-right {
        width: calc(100% - 220px);
        float: right;
        height: 100%;
        min-height: 240px;
        padding: 10px 20px;
        margin:10px 0;
        border-left: 1px solid #ccc;
    }
}
</style>
