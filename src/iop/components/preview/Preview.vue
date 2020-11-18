<template>
  <div :style="{width,height}">
    <!-- 成功的状态 -->
    <div v-if="state.status===state.statusDefine.SUCCESS" class="fullScreenBox">
      <!-- display:block 解决图片不垂直居中的问题 -->
      <img :class="{circle}" style="width:100%;height:100%;display:block" :src="state.picUrl" :alt="alt">
    </div>
    <!-- 失败的状态 -->
    <div v-if="state.status===state.statusDefine.ERROR" class="fullScreenBox">
      <slot/>
    </div>
    <!-- 等待的状态 -->
    <div v-if="state.status===state.statusDefine.PADDING" class="fullScreenBox">
      <slot name="loading"/>
    </div>
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
const Define = {
  status: {
    SUCCESS: 'success',
    ERROR: 'error',
    PADDING: 'padding'
  }
}
export default {
  name: 'Preview',
  props: {
    value: {
      type: [Number, String],
      require: true,
      default: ''
    },
    options: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      state: {
        picId: '',
        picUrl: '',
        statusDefine: Define.status,
        status: Define.status.PADDING
      }
    }
  },
  watch: {
    value: {
      handler (newId) {
        this.state.picId = newId
        if (this.autoLoad) {
          this.load()
        }
      },
      immediate: true
    }
  },
  computed: {
    opt () {
      return this.options || {}
    },
    autoLoad () {
      return this.opt.autoLoad || true
    },
    width () {
      return this.opt.width || '100px'
    },
    height () {
      return this.opt.height || '100px'
    },
    circle () {
      return this.opt.circle || false
    },
    alt () {
      return this.opt.alt || ''
    }
  },
  methods: {
    async load (id = this.state.picId) {
      this.$emit('onBeforeLoad')
      this.state.status = Define.status.PADDING
      this.state.picUrl = ''
      iopDataService.get({
        url: `/iop/file/operation/preview/${id}`
      })
        .then(x => {
          this.state.picUrl = x.result
          this.state.status = Define.status.SUCCESS
          this.$emit('onSuccess')
        })
        .catch(e => {
          this.state.status = Define.status.ERROR
          // this.$message.error('加载失败：' + String(e))
          this.$emit('onError')
        })
    }
  }
}
</script>
<style lang="less" scoped>
  .circle {
    border-radius: 50%;
  }
  .fullScreenBox{
    width: 100%;
    height: 100%;
    position:relative
  }
</style>
