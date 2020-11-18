<template>
  <div>
    <a-modal
      title="资源图谱"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="1300px"
    >
      <iop-sys-graph :option="graphOption" ref="graph"></iop-sys-graph>
      <template slot="footer">
        <div style="text-align: center">
          <a-button key="back" @click="handleCancel">
            关闭
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { IopSysGraph } from '@/iop/components'
export default {
  components: { IopSysGraph },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      url: '',
      objectCode: '',
      graphOption: {
        width: 1200,
        height: 400,
        autoList: false,
        color: {
          Attribute: '#ff5757',
          Foreign: '#7e4cef',
          Inherit: '#47ef1f',
          default: '#333'
        }
      }
    }
  },
  methods: {
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    show (data) {
      this.objectCode = data.objectCode
      this.visible = true
      this.graphOption = Object.assign(this.graphOption, {
        getUrl: () => {
          return '/iop/drms/data-graph/list/' + this.objectCode + '/' + data.objectId
        },
        getCurrentNodeId () {
          return data.objectId
        }
      })
      this.$nextTick(() => {
        this.$refs.graph.restart()
      })
    }
  }
}
</script>
