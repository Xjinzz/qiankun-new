<template>
  <a-card>
    <div class="title">
      <a-row>
        <a-col :lg="3" :md="3" :sm="3" :xs="24">
          <p style="font-size: 18px;color: rgba(0,0,0,0.65);">存储空间</p>
        </a-col>
        <a-col :lg="3" :md="3" :sm="3" :xs="24">
          <p>总容量：<span>{{ analyData.totalSpaceStr }}</span></p>
        </a-col>
        <a-col :lg="3" :md="3" :sm="3" :xs="24">
          <p>已用空间：<span>{{ analyData.usedSpaceStr }}</span></p>
        </a-col>
        <a-col :lg="3" :md="3" :sm="3" :xs="24">
          <p>文件夹数：<span>{{ analyData.dirCount }}个</span></p>
        </a-col>
        <a-col :lg="3" :md="3" :sm="3" :xs="24">
          <p>文件数：<span>{{ analyData.fileCount }}个</span></p>
        </a-col>
      </a-row>
    </div>
    <div class="pie">
      <pieChart ref="pieChart"></pieChart>
    </div>
  </a-card>
</template>
<script>
import stores from '@/iop/service/file/stores'
import pieChart from './PieChart'
export default {
  components: { pieChart },
  data () {
    return {
      analyData: {},
      pieData: {}
    }
  },
  methods: {
    show (id) {
      stores.analysis(id).then((res) => {
        this.analyData = res
        const totle = res.totalSpace ? res.totalSpace : '0'
        this.pieData = [
          { name: '已用空间', value: res.usedSpace },
          { name: '未用空间', value: totle - res.usedSpace }
        ]
        console.log(this.pieData)
        this.$refs.pieChart.show(this.pieData)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  font-family: 'PingFangSC-Medium';
  p {
    font-size: 14px;
    color: rgba(0,0,0,0.45);
    display: block;
    height: 40px;
    line-height: 40px
  }
  span {
    color:#1890FF
  }
}
.pie {
  height: 500px;
}
</style>
