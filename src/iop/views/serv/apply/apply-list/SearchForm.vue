<template>
  <div>
    <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <a-col :span="8">
        <a-form-item label="申请单编码">
          <a-input @pressEnter="search" placeholder="请输入申请单编码" :maxLength="100" v-model="form.applyCode" allowClear />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="申请时间">
          <a-range-picker v-model="createDate" @change="onChange">
          </a-range-picker>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="申请类型" v-show="advanced">
          <iop-data-dict-select ref="applyType" type="applyType" v-model="form.applyType" />
        </a-form-item>
      </a-col>
      <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
        <a-button type="primary" @click="search()">查询</a-button>
        <a-button @click="resetSearchForm()">重置</a-button>
        <a @click="toggleAdvanced()" style="margin-left: 8px">
          {{ advanced ? '收起' : '高级' }}
          <a-icon :type="advanced ? 'up' : 'down'" />
        </a>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { IopDataDictSelect } from '@/iop/components'
export default {
  name: 'SearchForm',
  components: { IopDataDictSelect },
  data () {
    return {
      form: {},
      createDate: [],
      advanced: false
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onChange (date, dateString) {
      const beginDate = new Date(dateString[0])
      const endDate = new Date(dateString[1])
      this.form.applyStartDate = beginDate.getTime()
      this.form.applyEndDate = endDate.getTime()
    },
    search () {
      this.$emit('search', this.form)
    },
    resetSearchForm () {
      this.form = {}
      this.$refs.applyType.cleanSelected()
      this.createDate = []
      this.$emit('resetSearchForm')
    }
  }
}
</script>
