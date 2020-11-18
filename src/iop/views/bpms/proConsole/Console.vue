<template>
  <div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="datares">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card hoverable @click="openMng(item)">
          <a slot="title">
            <a-icon type="cluster" style="fontSize:40px"/>
            <a style="color:#888;margin-left:10px;">{{ item.engName }}</a>
          </a>
          <div style="float:left">
            <p>厂商: {{ item.corp }}</p>
            <p>版本号: {{ item.version }}</p>
          </div>
          <a-icon type="login" style="float:right;line-height: 80px;fontSize:40px;" />
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import MessageUtils from '@/utils/message'
import { iopBpmsDefInfoService } from '@/iop/service'

export default {
  name: 'AreaList',
  data () {
    return {
      datares: ''
    }
  },
  created () {
    this.handelData()
  },
  methods: {
    /**
     * 跳转管理入口地址
     */
    openMng (url) {
      window.open(url.mngUrl)
    },
    async handelData () {
      try {
        const res = await iopBpmsDefInfoService.getEngRegList()
        this.datares = res.data
      } catch (error) {
        MessageUtils.error(error)
      }
    }
  }
}
</script>
