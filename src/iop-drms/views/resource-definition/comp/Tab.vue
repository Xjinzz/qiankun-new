<template>
  <div>
    <a-row class="tabList">
      <a-col
        class="tabItem"
        :class="state.current==item[displayValue]?'current':''"
        v-for="(item,index) in dataSource"
        :key="index"
        @click="change(item)"
      >
        {{ item[displayName] }}
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'Tab',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    displayValue: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: () => {
        return ''
      }
    },
    // 预留的扩展空间
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      state: {
        current: this.value
      }
    }
  },
  watch: {
    value (val) {
      this.state.current = val
    }
  },
  methods: {
    change (item) {
      this.state.current = item[this.displayValue]
      this.$emit('input', this.state.current)
      this.$emit('change', this.state.current, item)
    }
  }
}
</script>
<style lang="less" scoped>
  .tabList{
    display:flex;
    padding-bottom:30px;
    .tabItem{
      padding-left:10px;
      padding-right:10px;
      color:#333;
      font-size:14px;
      line-height: 50px;
      margin-left:20px;
      cursor:pointer;
      &.current {
        border-bottom: 1px solid #578fcd;
        color: #578fcd
      }
    }
  }
</style>
