<template>
  <div v-if="refer" :id="state.boxId"></div>
</template>
<script>
import BusinessInstance from './business'
import Config from './config.js'
// import { graphLoad } from './graph'
import Service from '@/iop/service/components/data'
export default {
  name: 'SysGraph',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      refer: false,
      state: {
        boxId: 'graphBox_' + BusinessInstance.newId()
      }
    }
  },
  computed: {
    width () {
      return this.option.width || Config.width
    },
    height () {
      return this.option.height || Config.height
    },
    autoList () {
      /* eslint-disable-next-line */
      return this.option.autoList === false ? false : true
    },
    currentId () {
      return this.option.getCurrentNodeId() || ''
    }
  },
  mounted () {
    if (this.autoList) {
      this.restart()
    }
  },
  methods: {
    restart () {
      this.refer = false
      this.$nextTick(() => {
        this.refer = true
        BusinessInstance.resetCanvas()
        BusinessInstance.setConfig({
          width: this.option.width,
          height: this.option.height,
          colorMap: this.option.color
        })
        setTimeout(() => {
          this.graphLoad()
          // graphLoad('#' + this.state.boxId, null)
        }, 0)
      })
    },
    // 获取数据
    graphLoad () {
      const url = this.option.getUrl()
      if (!url) {
        return
      }
      BusinessInstance.setCurrent(this.currentId)
      BusinessInstance.setContext(this.state.boxId)
      Service.getSysGraphData(url)
        .then(x => {
          BusinessInstance.insertData(x, {
            customNodeText: this.option.customNodeText ? this.option.customNodeText : (d) => {
              return d.name
            }
          })
          BusinessInstance.run()
          BusinessInstance.build()
          BusinessInstance.polling()
        })
        .catch(e => {
          console.error(e)
          this.$message.error('数据加载失败')
        })
    }
  }

}
</script>
<style lang="less" scoped>
  .tooltip {
    font-family: simsun;
    font-size: 16px;
    width: 200px;
    height: auto;
    position: absolute;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    background-color: white;
    border-radius: 5px;
}
</style>
