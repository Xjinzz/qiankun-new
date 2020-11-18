<template>
  <div>
    <search-gaine
      :depeatId="id"
      :depeatCode="code"
      :filter="filter"
    >
      <template #searchArea>
        <div></div>
      </template>
      <template #afterGraphButton>
        <a-button type="primary" @click="showImportModal">导入</a-button>
      </template>
    </search-gaine>
    <import-modal ref="importModal" />
  </div>
</template>
<script>
import searchGaine from '@/iop-drms/views/resource-definition/comp/SearchGaine'
import ImportModal from './comp/ImportModal'
export default {
  components: {
    searchGaine,
    ImportModal
  },
  data () {
    return {
      id: '',
      code: '',
      filter: {}
      // tableSelectedList: []
    }
  },
  mounted () {
    this.id = this.getUrlParams('id') || ''
    this.code = this.getUrlParams('code') || ''
    const filterStr = this.getUrlParams('_filter_') || '{}'
    this.filter = JSON.parse(filterStr)
  },
  methods: {
    showImportModal () {
      this.$refs.importModal.show()
    },
    // tableSelected ({ data }) {
    //   this.tableSelectedList = data.original.selectedRows
    // },
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
