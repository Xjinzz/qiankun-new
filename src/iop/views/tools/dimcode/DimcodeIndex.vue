<template>
  <div class="card-container">
    <a-tabs @change="callback">
      <a-tab-pane key="1" tab="生成服务" >
        <encode-form ref="encodeForm" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="解析服务">
        <decode-form ref="decodeForm"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { IopUploadDragger } from '@/iop/components/index'
import EncodeForm from './EncodeForm'
import DecodeForm from './DecodeForm'

export default {
  /** 条码管理组件 */
  name: 'DimcodeIndex',
  components: { EncodeForm, DecodeForm, IopUploadDragger },

  mounted () {
    this.$refs.encodeForm.reLoad()
  },
  methods: {
    callback (key) {
      this.form = {}
      if (key === '1') this.$refs.encodeForm.load()
      else if (key === '2') {
        this.$nextTick(() => {
          this.$refs.decodeForm.loada()
        })
      }
    }
  }

}

</script>
<style lang="less">
  .ant-tabs {
    /deep/ .ant-tabs-nav-wrap {
      background: #fff;
      padding-left: 30px;
      padding-top: 7px !important;
      .ant-tabs-tab {
        padding-bottom: 19px;
      }
    }
  }
</style>
