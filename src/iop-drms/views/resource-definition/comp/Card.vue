<template>
  <div class="card-box">
    <div class="card-top">
      <a-row class="flex">
        <img class="icon" :src="dataSource[iconField] ? dataSource[iconField] : state.defaultIcon" alt="">
        <span class="ellipsis flex-auto-width title" :title="dataSource[titleName]">
          {{ dataSource[titleName] }}
        </span>
      </a-row>
      <a-row>
        <slot name="info"></slot>
      </a-row>
    </div>

    <a-row class="btn-group">
      <slot name="btnGroup"></slot>
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
    },
    dataSource: {
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
    iconField () {
      return this.options.icon ? this.options.icon : 'icon'
    },
    titleName () {
      return this.options.title ? this.options.title : 'title'
    }
  },
  methods: {}
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
    }
    .flex{
      display:flex
    }
    .flex-auto-width{
      flex:1
    }
    .__tableItemtd{
      word-break: break-all;
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
    }
  }
</style>
