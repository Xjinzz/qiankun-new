<template>
  <!-- 集群部署 -->
  <div class="tabPhyBox">
    <div
      v-for="(item,index) in dataSource.tableList"
      :key="index"
      class="tabPhyItem"
    >
      <a-row class="flex">
        <img class="icon" :src="item.iconSam ? item.iconSam : state.defaultIcon" alt="">
        <span class="ellipsis flex-auto-width title" :title="item.serviceName">
          {{ item.applicationName }}
        </span>
        <div style="width:122px">
          <a-icon class="btn-icon" v-if="!disabled && item.healthy==='true'" type="bar-chart" @click="doMonitor(item)"/>
          <a-icon class="btn-icon" :style="item.healthy!=='true'?'margin-left:30px':''" v-if="!disabled" type="eye" @click="doView(item.applicationId)"/>
          <a-icon class="btn-icon" v-if="!disabled" type="form" @click="doEdit(item.applicationId)"/>
          <a-icon class="btn-icon" v-if="!disabled" type="delete" @click="doDel(item.applicationId)"/>
        </div>
      </a-row>
      <a-row class="flex" style="margin-top:10px">
        <a-col :span="6" class="context ellipsis" :title="item.applicationId">
          <label>部署ip：</label>{{ item.ip }}
        </a-col>
        <a-col :span="4" class="context ellipsis">
          <label>部署端口：</label>{{ item.port }}
        </a-col>
        <a-col :span="5" class="context ellipsis">
          <label>注册来源：</label>{{ item.source }}
        </a-col>
        <a-col :span="5" class="context ellipsis">
          <label>健康状态：</label>
          <a-tag v-if="!item.healthy || item.healthy==='false'" color="#FFA39E">异常</a-tag>
          <a-tag v-if="item.healthy==='true'" color="#B7EB8F">正常</a-tag>
        </a-col>
        <a-col :span="4" class="context ellipsis">
          <label>状态：</label>
          <a-switch disabled :key="'status-'+item.status" checked-children="启用" un-checked-children="停用" :defaultChecked="item.status === '1'"></a-switch>
        </a-col>
      </a-row>
    </div>
    <div class="addPhyConfig" :class="disabled?'disabled':''" @click="doCreate">
      <div class="addItem">
        <a-icon type="plus" /><br>新增
      </div>
    </div>
    <add-pgy-config ref="addPgyConfig" :appId="id" @saveCallBack="search"></add-pgy-config>
    <monitor-modal ref="monitorModal"/>
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import AddPgyConfig from './AddPgyConfig'
import MonitorModal from './MonitorModal'
import NotList from './NotList'
export default {
  components: {
    AddPgyConfig,
    MonitorModal,
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
    search () {
      Service.getPhyList({
        appId: this.id
      })
        .then(x => {
          // debugger
          this.dataSource.tableList = x.data
        })
        .catch(e => {
          // debugger
        })
    },
    doDel (id) {
      if (this.disabled) return
      const _this = this
      this.$confirm({
        title: '确定删除吗',
        onOk () {
          return new Promise((resolve, reject) => {
            Service.doDelPhy(id)
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
    // 监控
    doMonitor (instance) {
      if (this.disabled) return
      this.$refs.monitorModal.show(instance)
    },
    // 查看
    doView (id) {
      this.$refs.addPgyConfig.show(id).doView()
    },
    // 编辑
    doEdit (id) {
      if (this.disabled) return
      this.$refs.addPgyConfig.show(id).doEdit()
    },
    // 新建
    doCreate () {
      if (this.disabled) return
      this.$refs.addPgyConfig.show().doCreate()
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
.tabPhyBox {
  .appCode{
    line-height:32px;
    font-size: 15px;
  }
  .tabPhyItem {
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
    height: 92px;
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
    color:#999;
    font-size:14px;
    line-height:30px;
  }
}
</style>
