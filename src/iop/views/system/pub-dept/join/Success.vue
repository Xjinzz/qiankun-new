<template>
  <div>
    <a-form style="margin: 40px auto 0;">
      <result title="合并成功" :is-success="true">
        <div slot="action">
          <a-button type="primary" @click="toFirst">继续合并</a-button>
          <a-button style="margin-left: 8px" @click="finish">关闭</a-button>
        </div>
      </result>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'JoinSuccess',
  components: {
    Result
  },
  methods: {
    finish () {
      this.$emit('finish')
    },
    toFirst () {
      this.$emit('first')
    }
  }
}
</script>
