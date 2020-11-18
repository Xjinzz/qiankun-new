<template>
  <div>
    <search-gaine
      :depeatId="id"
      :depeatCode="code"
      :filter="filter"
    >
      <template v-if="hasGoBack" #afterRemoveSelectedButton>
        <a-button @click="goFrom">返回</a-button>
      </template>
    </search-gaine>
  </div>
</template>
<script>
import searchGaine from '@/iop-drms/views/resource-definition/comp/SearchGaine'
export default {
  components: {
    searchGaine
  },
  data () {
    return {
      id: '',
      code: '',
      filter: {}
    }
  },
  computed: {
    hasGoBack () {
      return this.getUrlParams('from') !== null
    }
  },
  mounted () {
    this.id = this.getUrlParams('id') || ''
    this.code = this.getUrlParams('code') || ''
    const filterStr = this.getUrlParams('_filter_') || '{}'
    // const filterStr = '{"regist_date": "1596729600000~1597939200000","regist_capital": "1~2", "type": "2"}'
    this.filter = JSON.parse(filterStr)
  },
  methods: {
    goFrom () {
      this.$goPage(decodeURIComponent(this.getUrlParams('from')), {})
    },
    // 获取url参数，解决菜单配置query不生效的问题
    getUrlParams (queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      const url = window.location.href.split('?')
      const href = this.$route.meta.para || url[url.length - 1]
      if (!href) {
        return null
      }
      const search = href
      var r = search.match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return null
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
