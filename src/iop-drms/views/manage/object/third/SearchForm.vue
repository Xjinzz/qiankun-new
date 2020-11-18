<template>
  <div class="table-page-search-wrapper">
    <a-form layout="inline">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="8" :sm="24">
          <a-form-item label="资源编号">
            <a-input @pressEnter="search" v-model="queryParam.objectCode" placeholder="请输入资源编号" allowClear />
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="资源领域">
            <iop-data-dict-select ref="objectDomain" type="objectDomain" v-model="queryParam.objectDomain" />
          </a-form-item>
        </a-col>
        <div v-show="advanced">
          <a-col :md="8" :sm="24">
            <a-form-item label="标签">
              <a-input @pressEnter="search" v-model="queryParam.objectLabel" placeholder="请输入标签名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="资源名称" style="margin-top: 20px;">
              <a-input @pressEnter="search" v-model="queryParam.objectName" placeholder="请输入资源名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="资源性质" style="margin-top: 20px;">
              <iop-data-dict-select ref="objectNat" type="objectNat" v-model="queryParam.objectNat" />
            </a-form-item>
          </a-col>
        </div>
        <a-col :md="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
          <a-button type="primary" @click="search()">查询</a-button>
          <a-button @click="resetSearchForm()">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? '收起' : '高级' }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { IopDataDictSelect } from '@/iop/components'

export default {
  name: 'ServObjectSearchForm',
  components: { IopDataDictSelect },
  data () {
    return {
      advanced: false,
      queryParam: {}
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    search () {
      this.$emit('search', this.queryParam)
    },

    resetSearchForm () {
      this.queryParam = {}
      this.$refs.objectDomain.cleanSelected()
      this.$refs.objectNat.cleanSelected()
      this.$emit('reset')
    }
  }
}
</script>
