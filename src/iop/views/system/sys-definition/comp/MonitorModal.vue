<template>
  <a-modal
    title="监控信息"
    v-if="state.visible"
    :visible="true"
    @cancel="hide"
    :width="1128"
  >
    <a-row class="flex">
      <img class="icon" :src="instance.iconSam ? instance.iconSam : state.defaultIcon" alt="">
      <span class="ellipsis title" style="width:100px" :title="instance.serviceName">
        {{ instance.applicationName }}
      </span>
      <a-row class="flex flex-auto-width" style="margin-top:10px;line-height:100%">
        <a-col :span="6" class="context ellipsis" :title="instance.applicationId">
          <label>部署ip：</label>{{ instance.ip }}
        </a-col>
        <a-col :span="4" class="context ellipsis">
          <label>部署端口：</label>{{ instance.port }}
        </a-col>
        <a-col :span="5" class="context ellipsis">
          <label>注册来源：</label>{{ instance.source }}
        </a-col>
        <a-col :span="5" class="context ellipsis">
          <label>健康状态：</label>
          <a-tag v-if="!instance.healthy || instance.healthy==='false'" color="#FFA39E">异常</a-tag>
          <a-tag v-if="instance.healthy==='true'" color="#B7EB8F">正常</a-tag>
        </a-col>
        <a-col :span="4" class="context ellipsis">
          <label>状态：</label>
          <a-switch disabled :key="'status-'+instance.status" checked-children="启用" un-checked-children="停用" :defaultChecked="instance.status === '1'"></a-switch>
        </a-col>
      </a-row>
    </a-row>
    <a-divider />
    <a-row class="serveInfo">
      <p class="info-title">
        服务器信息
      </p>
      <div class="flex alignEnd serveInfoContent">
        <div class="content" style="width:66px">
          <p class="content-title" style="margin-bottom:5px;">CPU核数</p>
          <p class="content-value big">{{ entity.serverInfo[state.define.MonitorModal.SERVERINFO.CPUCOUNT] }}</p>
        </div>
        <div style="height:38px;border-right:1px solid #e8e8e8;margin: 20px;margin-top:31px;"></div>
        <div class="content" style="width:206px">
          <p class="content-title">应用启动时间点</p>
          <p class="content-value">
            {{ getStrSplit(entity.serverInfo[state.define.MonitorModal.SERVERINFO.STARTTIME], ' ', 1) }}
            <span>{{ getStrSplit(entity.serverInfo[state.define.MonitorModal.SERVERINFO.STARTTIME], ' ', 0) }}</span>
          </p>
        </div>
        <div class="content" style="width:225px">
          <p class="content-title">应用已运行时间</p>
          <p class="content-value">
            {{ entity.serverInfo[state.define.MonitorModal.SERVERINFO.UPDATETIME] }}
          </p>
          <!-- <p class="content-value">6042.156<span>秒</span></p> -->
        </div>
        <pie-chart-server-info
          class="content"
          ref="cpuUsage"
          style="width:153px;height:119px"
          title="系统CPU使用率"
          color="blue"
        />
        <pie-chart-server-info
          class="content"
          ref="cpuUsageCurrent"
          style="width:153px;height:119px"
          title="当前应用cpu使用率"
          color="#ffa42d"
        />
      </div>
    </a-row>
    <a-divider />
    <a-tabs @change="changeTabs" default-active-key="1">
      <a-tab-pane key="1" tab="JVM信息">
        <jvm-info ref="jvmInfo" v-model="id"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tomcat信息">
        <tomcat-info ref="tomcatInfo" v-model="id"/>
      </a-tab-pane>
    </a-tabs>
    <template slot="footer">
      <a-row style="text-align:center">
        <a-button @click="hide">
          取消
        </a-button>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import Define from '../enum'
import PieChartServerInfo from './PieChartServerInfo'
import TomcatInfo from './TomcatInfo'
import JvmInfo from './JvmInfo'
export default {
  components: {
    PieChartServerInfo,
    TomcatInfo,
    JvmInfo
  },
  data () {
    return {
      chartList: {},
      imgSrc: require('@/assets/jiankong.png'),
      state: {
        visible: false,
        defaultIcon: require('@/assets/static/defaultIcon.png'),
        define: Define
      },
      entity: {
        serverInfo: {}
      },
      timer: null,
      instance: {}
    }
  },
  computed: {
    id () {
      return this.instance.applicationId
    }
  },
  methods: {
    changeTabs (key) {
      if (key === '2') {
        this.$nextTick(() => {
          this.$refs.tomcatInfo.startLoop()
          this.$refs.jvmInfo && this.$refs.jvmInfo.endLoop()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.jvmInfo.startLoop()
          this.$refs.tomcatInfo && this.$refs.tomcatInfo.endLoop()
        })
      }
    },
    getStrSplit (str, splitTag, num) {
      if (!str) {
        return ''
      }
      return str.split(splitTag)[num]
    },
    show (instance) {
      this.instance = instance
      // eslint-disable-next-line
      this.state.visible = true
      this.startLoop()
      this.changeTabs('1')
    },
    startLoop () {
      this.endLoop()
      this.getServerInfo()
      this.timer = setTimeout(() => {
        this.startLoop()
      }, 1000)
    },
    endLoop () {
      clearTimeout(this.timer)
      this.timer = null
    },
    getServerInfo () {
      Service.getServerInfo(this.id)
        .then(x => {
          this.entity.serverInfo = x
          this.$refs.cpuUsage.draw(this.entity.serverInfo[Define.MonitorModal.SERVERINFO.CPUUSAGE])
          this.$refs.cpuUsageCurrent.draw(this.entity.serverInfo[Define.MonitorModal.SERVERINFO.CPUUSAGECURRENT])
        })
    },
    hide () {
      this.endLoop()
      this.$refs.tomcatInfo && this.$refs.tomcatInfo.endLoop()
      Service.cleanState()
      this.state.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
p {
  margin-bottom: 0;
}
.flex{
  display: flex;
}
.alignEnd {
  align-items: center
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
.context{
  text-align:left;
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
.serveInfo {
  .info-title{
    font-size: 18px;
    font-weight: 600;
    color:#333;
  }
}
.serveInfoContent {
  .content {
    .content-title {
      font-size:16px;
      color:#666666;
    }
    .content-value {
      line-height:30px;
      margin-top: 10px;
      &.big {
        margin-top:0px;
        font-size: 36px;
      }
      font-size:22px;
      color:#000;
      span {
        font-size: 16px;
        color:#666666;
        margin-left:10px;
      }
    }
  }
}
</style>
