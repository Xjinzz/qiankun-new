<template>
  <!-- 认证配置 -->
  <div class="tabAuthBox">
    <div
      v-for="(item,index) in dataSource.tableList"
      :key="index"
      class="tabAuthItem"
    >
      <a-row class="flex">
        <img class="icon" :src="item.iconSam ? item.iconSam : state.defaultIcon" alt="">
        <span class="ellipsis flex-auto-width title" :title="item.serviceName">
          {{ item.roadName }}
        </span>
        <div style="width:92px" :title="item.appCode">
          <a-icon class="btn-icon" type="edit" v-if="!disabled" @click="doEdit(item.roadId)"/>
          <a-icon class="btn-icon" type="delete" v-if="!disabled" @click="doDel(item.roadId)"/>
        </div>
      </a-row>
      <a-row class="flex" style="margin-top:10px">
        <a-col
          v-for="wayItem in item.wayList"
          :key="wayItem.wayId"
          :span="6"
          class="context"
        >
          <label class="ellipsis" style="max-width:100px">{{ wayItem.wayName }}</label>
          <a-switch
            class="ml-10"
            :checked="wayItem.status==1"
            @change="(checked)=>{toggleWayStatus(wayItem,item.roadId,checked)}"
            :disabled="disabled"
          />
          <span
            class="ml-10"
            :class="wayItem.status==1?'buttonOpen':'buttonClose'"
            @click="openRela(item.roadId, wayItem)"
          >
            认证配置
          </span>
        </a-col>
      </a-row>
    </div>
    <div class="addPhyConfig" :class="disabled?'disabled':''" @click="doCreate">
      <div class="addItem">
        <a-icon type="plus" /><br>新增
      </div>
    </div>
    <add-auth-config ref="addAuthConfig" :appId="id" @saveCallBack="search"></add-auth-config>
    <rela-config ref="relaConfig" :appId="id" @saveCallBack="search"></rela-config>
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import AddAuthConfig from './AddAuthConfig'
import RelaConfig from './RelaConfig'
export default {
  components: {
    AddAuthConfig,
    RelaConfig
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
    search () {
      Service.getAuthList({
        appId: this.id
      })
        .then(x => {
          this.dataSource.tableList = x.data
        })
        .catch(e => {
        })
    },
    toggleWayStatus (item, roadId, status) {
      const params = {
        appId: this.id,
        roadId,
        status: status ? 1 : 0,
        wayId: item.wayId
      }
      Service.doRela(params)
        .then(x => {
          this.search()
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    doEdit (id) {
      this.$refs.addAuthConfig.show(id)
    },
    doDel (id) {
      const _this = this
      this.$confirm({
        title: '确定删除吗',
        onOk () {
          return new Promise((resolve, reject) => {
            Service.doDelAuth(id)
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
    doCreate () {
      if (this.disabled) {
        return
      }
      this.$refs.addAuthConfig.show()
    },
    openRela (roadId, wayItem) {
      if (wayItem.status !== '1' || this.disabled) {
        return false
      }
      this.$refs.relaConfig.show(roadId, wayItem.wayId)
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
.tabAuthBox {
  .ml-10{
    margin-left:10px
  }
  .buttonClose,.buttonOpen{
    border-radius: 4px;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    line-height:32px;
    padding-left:5px;
    padding-right:5px;
    padding-top:5px;
    padding-bottom:5px;
    cursor: pointer;
  }
  .buttonClose{
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    color: #666666;
  }
  .buttonOpen{
    color:#fff;
    background: #0095F6;
  }
  .appCode{
    line-height:32px;
    font-size: 15px;
  }
  .tabAuthItem {
    border: 1px solid #D9D9D9;
    padding:10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.05);
    width:100%;
    margin-bottom:10px;
    border-radius: 3px;
  }
  .addPhyConfig{
    border: 1px dotted #979797;
    height:92px;
    box-sizing: border-box;
    width:100%;
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
      color: #545454
    }
    &.disabled {
      border: 1px dotted #CBCBCB;
      background: #F9F9F9;
      .addItem{
        color:#AAAAAA
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
    margin-bottom:10px;
    color:#999;
    font-size:14px;
    line-height:30px;
  }
}
</style>
