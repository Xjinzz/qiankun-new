<template>
  <div class="relaCompContine">
    <a-row class="subTitle">我依赖的组件</a-row>
    <a-row class="flex flex-speen relaCompBox flex-wrap">
      <template v-if="dataSource.dependList.length">
        <div
          v-for="(item,index) in dataSource.dependList"
          :key="index"
          class="relaCompItem"
        >
          <a-row class="flex">
            <img class="icon" :src="item.iconSam ? item.iconSam : state.defaultIcon" alt="">
            <span class="ellipsis flex-auto-width title" :title="item.appName">
              {{ item.appName }}
            </span>
            <div style="width:50px;text-align:center;line-height:32px;cursor:pointer" v-if="!disabled" @click="doDelete(item.appId)">
              <a-icon type="delete" class="icon"/>
            </div>
          </a-row>
          <a-row class="flex" style="margin-top:10px">
            <a-col :span="12" class="context ellipsis" :title="item.appName">
              <label>组件类型：</label>{{ item.systype == '0' ? '组件' : item.systype == '1' ? '系统' :'分组' }}
            </a-col>
            <a-col :span="12" class="context-right ellipsis" :title="item.appName">
              <label>物理实例数：</label><span class="context-weight">{{ item.instancesNum }}</span>
            </a-col>
          </a-row>
        </div>
      </template>
      <div class="addRealComp" :class="disabled?'disabled':''" @click="addRealComp">
        <div class="addItem">
          <a-icon type="plus" /><br>新增
        </div>
      </div>
    </a-row>
    <!-- 依赖我的组件 -->
    <a-row class="subTitle">依赖我的组件</a-row>
    <a-row v-if="dataSource.beDependList.length" class="flex flex-speen relaCompBox flex-wrap">
      <div
        v-for="(item,index) in dataSource.beDependList"
        :key="index"
        class="relaCompItem"
      >
        <a-row class="flex">
          <img class="icon" :src="item.iconSam ? item.iconSam : state.defaultIcon" alt="">
          <span class="ellipsis flex-auto-width title" :title="item.appName">
            {{ item.appName }}
          </span>
          <div style="width:92px" class="ellipsis appCode" :title="item.appCode">
            {{ item.appCode }}
          </div>
        </a-row>
        <a-row class="flex" style="margin-top:10px">
          <a-col :span="12" class="context ellipsis" :title="item.appName">
            <label>组件类型：</label>{{ item.systype == '0' ? '组件' : item.systype == '1' ? '系统' :'分组' }}
          </a-col>
          <a-col :span="12" class="context-right ellipsis" :title="item.appName">
            <label>物理实例数：</label><span class="context-weight">{{ item.instancesNum }}</span>
          </a-col>
        </a-row>
      </div>
    </a-row>
    <not-list style="width:100%" v-else></not-list>
    <add-real-comp ref="addRealComp" @saveCallBack="search" :appId="id"></add-real-comp>
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import AddRealComp from './AddRealComp'
import NotList from './NotList'
export default {
  components: {
    AddRealComp,
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
        dependList: [],
        beDependList: []
      },
      state: {
        defaultIcon: require('@/assets/static/defaultIcon.png')
      }
    }
  },
  methods: {
    search () {
      Service.getDependList(this.id)
        .then(x => {
          this.dataSource.dependList = x.data
        })
      Service.getBeDependList(this.id)
        .then(x => {
          this.dataSource.beDependList = x.data
        })
    },
    doDelete (id) {
      const _this = this
      this.$confirm({
        title: '确定删除吗',
        onOk () {
          return new Promise((resolve, reject) => {
            Service.doDelDepend(id)
              .then(x => {
                _this.search()
                resolve()
                _this.$message.success('删除成功')
              })
              .catch(e => {
                resolve()
                _this.$message.error('删除失败')
              })
          })
        }
      })
    },
    addRealComp () {
      if (this.disabled) return
      this.$refs.addRealComp.show()
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
.relaCompContine {
  .appCode{
    line-height:32px;
    font-size: 15px;
  }
  .relaCompItem {
    border: 1px solid #D9D9D9;
    padding:10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.05);
    width:31%;
    margin-left:10px;
    margin-top:10px;
    margin-bottom:10px;
    border-radius: 3px;
    .subTitle{
      font-size:14px;
      line-height:30px;
    }
  }
  .addRealComp{
    border: 1px dotted #979797;
    height: 102px;
    box-sizing: border-box;
    width:31%;
    margin-left:10px;
    margin-top:10px;
    margin-bottom:10px;
    border-radius: 3px;
    background: #f2f2f2;
    cursor: pointer;
    display:flex;
    align-items: center;
    justify-content: center;
    .addItem{
      text-align: center;
      line-height:25px;
      color:#545454
    }
    &.disabled {
      border: 1px dotted #cbcbcb;
      background: #F9F9F9;
      .addItem{
        color:#aaa
      }
    }
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
  .context-right{
    text-align: right;
  }
  .context,.context-right{
    color:#999;
    font-size:14px;
    line-height:30px;
    .context-weight{
      font-weight: 600;
      font-size:1.2em;
      color:tomato
    }
  }
}
</style>
