<template>
  <div class="card-box">
    <div class="card-top">
      <a-row class="flex">
        <img class="icon" :src="dataSource.iconSam ? dataSource.iconSam : state.defaultIcon" alt="">
        <span class="ellipsis flex-auto-width title" :title="dataSource.appName">
          {{ dataSource.appName }}
        </span>
      </a-row>
      <a-row class="line">
        <a-col class="ellipsis staicTitle" :span="12" :title="dataSource.appCode">
          系统编码：{{ dataSource.appCode }}
        </a-col>
        <a-col class="ellipsis staicTitle" :span="12" :title="dataSource.appContext">
          上下文：{{ dataSource.appContext }}
        </a-col>
      </a-row>
      <a-row class="line staicTitle">
        内部系统
        <a-switch :defaultChecked="isInSys" disabled />
      </a-row>
    </div>

    <a-row class="btn-group">
      <a-col :span="8" style="border-right:1px solid #e9e9e9" @click="doView">
        <a-icon class="btn-icon" type="eye" />查看
      </a-col>
      <a-col :span="8" style="border-right:1px solid #e9e9e9" @click="doEdit">
        <a-icon class="btn-icon" type="edit" />编辑
      </a-col>
      <a-col :span="8" @click="doDel">
        <a-icon class="btn-icon" type="delete" />删除
      </a-col>
    </a-row>
    <slot></slot>
  </div>
</template>
<script>
import Ellipsis from '@/components/Ellipsis'
export default {
  components: {
    Ellipsis
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      state: {
        defaultIcon: require('@/assets/static/defaultIcon.png')
      }
    }
  },
  computed: {
    dataSource () {
      return this.options.dataSource ? this.options.dataSource : {}
    },
    id () {
      return this.dataSource.appId
    },
    // 是否是内部系统
    isInSys () {
      return this.dataSource.appType === '1'
    }
  },
  methods: {
    doView () {
      this.$emit('view', this.id, this.dataSource)
    },
    doEdit () {
      this.$emit('edit', this.id, this.dataSource)
    },
    doDel () {
      this.$emit('delete', this.id, this.dataSource)
    }
  }
}
</script>
<style lang="less" scoped>
  .card-box{
    position: relative;
    width:100%;
    background:#fff;
    border:1px solid #d9d9d9;
    .card-top{
      padding-top:15px;
      padding-left:15px;
      padding-right:15px;
      .line{
        margin-top:10px
      }
      .title{
        margin-left:10px;
        line-height:32px;
        font-weight: 800;
      }
      .icon{
        width:32px;
        height:32px
      }
      .staicTitle{
        font-size: 14px;
        color: rgba(0,0,0,0.65);
      }
    }
    .flex{
      display:flex
    }
    .flex-auto-width{
      flex:1
    }
    .ellipsis{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .btn-group{
      width:100%;
      height:48px;
      line-height: 48px;
      color: rgba(0,0,0,0.45);
      text-align:center;
      border-top:1px solid #e9e9e9;
      border-bottom:1px solid #e9e9e9;
      margin-top:10px;
      cursor: pointer;
      .btn-icon{
        margin-right:5px
      }
    }
  }
</style>
