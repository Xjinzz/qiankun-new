<template>
  <div style="width:100%">
    <div class="titleClass">
      {{ title }}
    </div>
    <a-menu mode="inline" :default-selected-keys="['0']" :selected-keys="selectKey" style="width: 100%;margin:0 auto" @select="menuSelect">
      <a-menu-item v-for="(item) in treeData" :key="item.key">
        <a-icon type="arrow-right" />
        {{ item.title }}
        <span style="color:#1890FF"> ({{ item.num }})</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import menuTree from '@/iop-drms/service/server/menu-tree'
export default {
  name: 'MenuTree',
  props: {
    url: {
      type: String,
      required: false,
      default: ''
    },
    menuKey: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      treeData: [],
      selectKey: ['0'],
      num: 0
    }
  },
  methods: {
    getData () {
      menuTree.getData(this.url).then((res) => {
        const list = []
        res.map((item) => {
          this.num += item.countNum * 1
          list.push({ title: `${item.catalogName}`, key: item.catalogId, num: item.countNum })
        })
        list.unshift({ title: `全部`, key: '0', num: this.num })
        this.treeData = list
      })
    },
    menuSelect ({ item, key, selectedKeys }) {
      this.selectKey = [key]
      this.$emit('menuSelect', key)
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    menuKey (value) {
      value === '' ? this.selectKey = ['0'] : this.selectKey = [value]
    }
  }
}
</script>
<style lang="less" scoped>
.ant-menu {
  /deep/ .ant-menu-item {
    border-right: 0;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 16px;
    color: rgba(0,0,0,0.65);
    height: 40px;
    line-height: 40px;
    padding-left: 10% !important;
  }
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #1890FF;
  color: #fff;
  span {
    color: #fff !important;
  }
}
.titleClass {
  width: 100%;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  padding-left: 10%;
  font-weight: bold;
}
</style>
