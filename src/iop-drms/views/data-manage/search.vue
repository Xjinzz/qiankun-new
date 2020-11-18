<template>
  <div>
    <search-gaine :options="searchOpt" ref="searchGaine" :depeatId="id" :depeatCode="code">
      <template #afterGraphButton>
        <a-button type="primary" @click="showImportModal">导入</a-button>
      </template>
    </search-gaine>
    <a-modal
      title="导入"
      width="850px"
      :visible="importModal"
      @cancel="hideImportModal"
      @ok="submitHandle"
    >
      <import-modal
        ref="importModal"
        :id="id"
        :code="code"
      />
    </a-modal>
    <a-modal
      title="转数据资源对象"
      width="850px"
      :visible="resultSetModal"
      @cancel="hideResultSetModal"
      @ok="saveResultSetForm"
    >
      <result-set
        ref="resultSet"
        :id="id"
        :code="code"
        :itemId="itemId"
        :treeUrl="apiMap.treeUrl"
      />
    </a-modal>
  </div>
</template>
<script>
import SearchGaine from '@/iop-drms/views/resource-definition/comp/SearchGaine'
// import Service from '@/iop-drms/service/data-manage/data-manage'
import ResultSet from './comp/ResultSet'
import ImportModal from './comp/ImportModal'
export default {
  components: {
    SearchGaine,
    ResultSet,
    ImportModal
  },
  data () {
    return {
      id: '',
      code: '',
      itemId: '',
      importModal: false,
      resultSetModal: false,
      apiMap: {},
      searchOpt: {
        btn: [
          {
            key: '转资源对象',
            action: this.toResultSet
          }
        ]
      }
    }
  },
  mounted () {
    this.id = this.getUrlParams('id') || ''
    this.code = this.getUrlParams('code') || ''
  },
  methods: {
    hideResultSetModal () {
      this.resultSetModal = false
    },
    saveResultSetForm () {
      this.$refs['resultSet'].save()
        .then(x => {
          this.$message.success('转换成功')
          this.$refs['searchGaine'].search()
          this.hideResultSetModal()
        })
        .catch((e) => {
          this.$message.error(e)
        })
    },
    toResultSet (item) {
      this.itemId = item.id
      this.resultSetModal = true
      this.apiMap = this.$refs.searchGaine.getApiMap()
      this.$nextTick(() => {
        this.$refs.resultSet.reset()
      })
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
    },
    showImportModal () {
      const treeSelect = this.$refs.searchGaine.getTreeSelector()
      if (treeSelect.id === 'OBJdataMetaCatalog') {
        this.$message.info('请选择左侧树节点')
        return
      }
      this.importModal = true
      this.$nextTick(() => {
        this.$refs['importModal'].init()
      })
    },
    hideImportModal () {
      this.importModal = false
    },
    submitHandle () {
      const treeSelect = this.$refs.searchGaine.getTreeSelector()
      const catalogId = treeSelect.id && treeSelect.id !== '0' ? treeSelect.id : ''
      this.$refs['importModal'].save(catalogId)
        .then(x => {
          if (x) {
            this.$message.success('导入成功')
            this.$refs['searchGaine'].search()
            this.hideImportModal()
          } else {
            this.$message.error('导入失败')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
