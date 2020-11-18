<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="接口服务" key="1">
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in oneTags"
            :key="i"
          >
            <a @click="openSerClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
        </a-row>
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in twoTags"
            :key="i"
          >
            <a @click="openSerClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i + 4}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
          <a-col :lg="6" :md="6" :sm="6" :xs="12">
            <a @click="openSerClick('0')">
              <img style="" src="@/assets/drms/icon7.png">
              <span style="">更多</span>
            </a>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="数据集" key="2" forceRender>
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in oneTags"
            :key="i"
          >
            <a @click="openObjClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
        </a-row>
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in twoTags"
            :key="i"
          >
            <a @click="openObjClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i + 4}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
          <a-col :lg="6" :md="6" :sm="6" :xs="12">
            <a @click="openObjClick('0')">
              <img style="" src="@/assets/drms/icon7.png">
              <span style="">更多</span>
            </a>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="资源目录" key="3" forceRender>
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in oneTags"
            :key="i"
          >
            <a @click="openCatClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
        </a-row>
        <a-row style="height:106px;margin: 0 20px 30px 20px;">
          <a-col
            :lg="6"
            :md="6"
            :sm="6"
            :xs="12"
            v-for="(item, i) in twoTags"
            :key="i"
          >
            <a @click="openCatClick(item.id)">
              <img :src="require(`@/assets/drms/icon${i + 4}.png`)" alt>
              <span>{{ item.name }}</span>
            </a>
          </a-col>
          <a-col :lg="6" :md="6" :sm="6" :xs="12">
            <a @click="openCatClick('0')">
              <img style="" src="@/assets/drms/icon7.png">
              <span style="">更多</span>
            </a>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { iopAuthService } from '@/iop/service'
import { DRMS_FORM_URL } from '@/iop-drms/constants'
import portals from '@/iop-drms/service/server/portal'
export default {
  data () {
    return {
      oneTags: [],
      twoTags: []
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    getData () {
      portals.objTree({ id: 0 }).then((res) => {
        res.children.map((item, key) => {
          if (key <= 3) {
            this.oneTags.push(item)
          } else if (key <= 6) {
            this.twoTags.push(item)
          }
        })
      })
    },
    compare (data) {
      return function (a, b) {
        var value1 = a[data]
        var value2 = b[data]
        return value1 - value2
      }
    },
    openSerClick (id) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_SERVICE.LIST, { serverTreeId: id })
    },
    openObjClick (id) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_OBJECT.LIST, { objectTreeId: id })
    },
    openCatClick (id) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_CATALOG.LIST, { catalogTreeId: id })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>
.ant-row {
  padding-top: 15px;
  text-align: center;
}
.ant-row img, .ant-row span {
  display: block;
}
.ant-row img {
  width: 44px;
  height: 44px;
  margin: 0 auto 5px;
}
</style>
