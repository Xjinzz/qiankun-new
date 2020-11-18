<template>
  <div>
    <div v-if="dataSource.tableList.length" class="flex flex-speen subCompBox flex-wrap">
      <div
        v-for="(item,index) in dataSource.tableList"
        :key="index"
        class="subCompItem"
      >
        <a-row class="flex">
          <img class="icon" :src="item.iconSam ? item.iconSam : state.defaultIcon" alt="">
          <span class="ellipsis flex-auto-width title" :title="item.appName">
            {{ item.appName }}
          </span>
          <div style="width:120px" class="ellipsis appCode" :title="item.appCode">
            {{ item.appCode }}
          </div>
        </a-row>
        <a-row class="flex" style="margin-top:10px">
          <div class="context ellipsis flex-auto-width" :title="item.appName">
            <label>组件类型：</label>{{ item.systype == '0' ? '组件' : item.systype == '1' ? '系统' :'分组' }}
          </div>
          <div class="context-right ellipsis" :title="item.appName">
            <label>物理实例数：</label>
            <span @click.stop="gotoItemPhy(item)" class="context-weight">{{ item.instancesNum }}</span>
          </div>
        </a-row>
      </div>
    </div>
    <not-list style="width:100%" v-else></not-list>
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import NotList from './NotList'
export default {
  components: {
    NotList
  },
  props: {
    disabled: {
      type: Boolean
    },
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.search()
  },
  data () {
    return {
      dataSource: {
        tableList: []
      },
      state: {
        defaultIcon: require('@/assets/static/defaultIcon.png')
      }
    }
  },
  methods: {
    gotoItemPhy (item) {
      this.$goPage(`sys/app/sysDefinitionSave`, {
        mode: this.$route.query.mode,
        id: item.appId,
        activekey: 4
      })
    },
    search () {
      Service.getSubCompList(this.id)
        .then(x => {
          this.dataSource.tableList = x.data
        })
        .catch(e => {
          // debugger
        })
    }
  }
}
</script>
<style lang="less" scoped>
.flex{
  display: flex;
}
.flex-wrap{
  flex-wrap: wrap;
}
.flex-speen {
  justify-content: start;
}
.flex-auto-width{
  flex:1
}
.subCompBox {
  .appCode{
    line-height:32px;
    font-size: 15px;
  }
  .subCompItem {
    border: 1px solid #D9D9D9;
    padding:10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.05);
    width:31%;
    margin-left:10px;
    margin-bottom:10px;
    border-radius: 3px;
  }
  .icon{
    width:32px;
    height:32px
  }
  .btn-icon{
    width:30px;
    text-align: center;
    line-height:32px
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .title{
    margin-left:10px;
    line-height:32px;
    font-size: 15px;
    font-weight: 800;
  }
  .context{
    text-align:left;
  }
  .context,.context-right{
    color:#999;
    font-size:14px;
    line-height:30px;
    width:120px;
    .context-weight{
      cursor:pointer;
      font-weight: 600;
      font-size:1.2em;
      color:tomato
    }
  }
}
</style>
