<template>
  <div>
    <a-card :title="'服务名称：'+servDetail.chName+'服务'" v-if="servDetail !== null">
      <a-button slot="extra" @click="goBack">返回</a-button>
      <a-row>
        <a-col :span="8">
          <!-- <p>应用系统：{{ servDetail.appName }}</p> -->
          <p v-ellipsis.size="30">应用系统：{{ servDetail.appName }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务编码：{{ servDetail.serviceCode }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务中文名称：{{ servDetail.chName }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p v-ellipsis.size="30">业务分类编码：{{ servDetail.serviceType }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务分类：{{ servDetail.serviceKind }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">运行模式：{{ servDetail.runType === '0' ? "本地服务" : "远程服务" }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务出口地址：{{ servDetail.outAddr }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务入口地址：{{ servDetail.inAddr }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">授权方式：{{ servDetail.authType === '0' ? '无授权控制' : '有授权控制' }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p v-ellipsis.size="30">是否启用：{{ servDetail.isValide === '0' ? '否' : '是' }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">开放条件：{{ servDetail.openCond === '0' ? '半开放' : '全开放' }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">测试方法：{{ servDetail.testMethod }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p v-ellipsis.size="30">实现类：{{ servDetail.classDef }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">展现类：{{ servDetail.showAddr }}</p>
        </a-col>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务说明：<iop-upload-dragger :id="servDetail.serviceId" :mode="mode" :attrName="'helpDoc'" :businessName="'servService'" style="width:200px;display:inline-block;vertical-align:bottom;"/></p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p v-ellipsis.size="30">服务备注：{{ servDetail.remark }}</p>
        </a-col>
        <a-col :span="8">
          <p>示例代码：<iop-upload-dragger :id="servDetail.serviceId" :mode="mode" :attrName="'sampleCode'" :businessName="'servService'" style="width:200px;display:inline-block;vertical-align:text-top;"/></p>
        </a-col>
        <a-col :span="8">
        </a-col>
      </a-row>
    </a-card>
    <a-tabs defaultActiveKey="0">
      <a-tab-pane key="0" tab="方法">
        <auth-method-list :serviceId="id" :authType="authType" :mode="$route.query.mode"/>
      </a-tab-pane>
      <a-tab-pane key="1" tab="服务授权">
        <serv-auth-list :mode="$route.query.mode"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import AuthMethodList from './AuthMethodList'
import ServAuthList from './ServAuthList'
import { iopServService } from '@/iop/service/index'
import { IopUploadDragger } from '@/iop/components'
const Define = {
  ELLIPSISMODE: {
    SIZE: 'size',
    LINE: 'line'
  }
}
function lineClip (el, value) {
  if (!value) value = 1
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  if (value > 1) {
    el.style.display = '-webkit-box'
    el.style['-webkit-box-orient'] = 'vertical'
    el.style['-webkit-line-clamp'] = '2'
  } else {
    el.style.whiteSpace = 'nowrap'
  }
}
function sizeClip (el, value) {
  if (!value) value = 30
  const text = el.textContent
  if (text.length > value) el.innerText = text.substring(0, value) + '...'
}
export default {
  name: 'AuthView',
  components: { AuthMethodList, ServAuthList, IopUploadDragger },
  data () {
    return {
      servDetail: null,
      id: '',
      authType: '',
      mode: 'view'
    }
  },
  directives: {
    'ellipsis': {
      inserted (el, binding) {
        const mode = binding.modifiers.size ? Define.ELLIPSISMODE.SIZE : Define.ELLIPSISMODE.LINE
        const BINDSTYLEMAP = {
          [Define.ELLIPSISMODE.LINE]: lineClip,
          [Define.ELLIPSISMODE.SIZE]: sizeClip
        }
        BINDSTYLEMAP[mode].call(this, el, binding.value)
      }
    }
  },
  created () {
    this.id = this.$route.query.serviceId
    iopServService.detail(this.id).then(res => {
      this.servDetail = res
      this.authType = res.authType ? res.authType : ''
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-tabs-nav-scroll{
    overflow: hidden;
    white-space: nowrap;
    background: #fff;
}
</style>
