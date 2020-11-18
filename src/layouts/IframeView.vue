<template>
  <a-spin :spinning="loading">
    <iframe
      class="act-from"
      id="__iframe"
      frameborder="no"
      scrolling="yes"
      :src="src" />
  </a-spin>
</template>
<script>
import { iopTokenService } from '@/iop/service/index'
import { Base64 } from 'js-base64'
import config from '@/config/defaultSettings'

export default {
  name: 'IframeView',
  data () {
    return {
      src: '',
      loading: false
    }
  },
  created () {
    this.changeSrc()
  },
  mounted () {
    this.loading = true
    const self = this
    this.$nextTick(() => {
      const iframe = document.querySelector('#__iframe')
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function () {
          self.loading = false
          iframe.setAttribute('height', window.frames['__iframe'].document.body.scrollHeight)
        })
      } else {
        iframe.onload = function () {
          self.loading = false
          if (iframe.contentDocument) {
            iframe.height = iframe.contentDocument.body.scrollHeight
          }
        }
      }
    })
  },
  watch: {
    $route () {
      this.changeSrc()
    }
  },
  methods: {
    changeSrc () {
      const meta = this.$route.meta
      let url = meta.serverUrl
      const para = meta.para
      let context = meta.appIndexUrl
      if (!context || url.indexOf('http') === 0) {
        context = ''
      }
      if (para) {
        const ownAppCode = meta.ownAppCode
        let token
        if (config.oldToken) {
          const tokens = iopTokenService.getOldTokens()
          token = tokens[ownAppCode]
          if (token) {
            const tokenArray = token.split('.')
            const tokenEncode = tokenArray[1]
            const tokenJson = JSON.parse(Base64.decode(tokenEncode))
            token = tokenJson.DspToken
          }
        } else {
          token = iopTokenService.getCurrentToken()
        }
        url = url.indexOf('?') > 0 ? `${url}&${para}=${token}` : `${url}?${para}=${token}`
      }
      this.src = context + url
    }
  }
}
</script>
<style scoped>
.act-from {
  width: 100%;
  height: 1000px;
}
</style>
