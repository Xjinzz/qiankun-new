<template>
  <a-select v-model="value" @change="onChange">
    <a-select-option
      v-for="item in systemList"
      :key="item.appId"
      :value="item.appId">
      {{ item.appName }}
    </a-select-option>
  </a-select>
</template>
<script>
import { iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'ServiceAppSelect',
  props: {
    applyType: {
      type: String,
      required: false,
      default: '0'
    }
  },
  data () {
    return {
      value: '',
      systemList: []
    }
  },
  created () {
    iopServApplyService.appTree({ applyType: this.applyType })
      .then(res => {
        this.systemList = res
        if (res.length === 0) {
          MessageUtils.warn('没有查询到可选的系统，请先创建接入【系统信息】')
          return
        }
        if (!this.value) {
          this.$nextTick(() => {
            this.onChange(res[0].appId)
          })
        }
      })
      .catch(err => MessageUtils.error(err))
  },
  watch: {
    value (selected) {
      this.$emit('input', selected)
    }
  },
  methods: {
    onChange (selected = '') {
      this.value = selected
      this.$emit('change', selected)
    },
    setSelected (value) {
      this.value = value
    }
  }
}
</script>
