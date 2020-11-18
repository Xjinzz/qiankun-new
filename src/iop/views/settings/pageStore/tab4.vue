<template>
  <div class="settings-tab2">
    <p class="title">消息与代办事项</p>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
          </span>
        </a-list-item-meta>
        <div slot="actions" v-if="item.title === '消息与代办事项'">
          <a-switch v-model="sysFlag" checkedChildren="开" unCheckedChildren="关" defaultChecked @change="changeOne"/>
        </div>
        <div slot="actions" v-if="item.title === '待办任务'">
          <a-switch v-model="agencyFlag" checkedChildren="开" unCheckedChildren="关" defaultChecked @change="changeTwo"/>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { iopSettingService } from '@/iop/service/index'
export default {
  data () {
    return {
      data: [
        { title: '消息与代办事项', description: '系统消息将以站内信的形式通知' },
        { title: '待办任务', description: '待办任务将以站内信的形式通知' }
      ],
      sysFlag: false,
      agencyFlag: false,
      val1: ''
    }
  },
  created () {
    this.getSysInfo()
    this.getagencySysmsgs()
  },
  methods: {
    getSysInfo () {
      iopSettingService.getUserSysmsg().then(res => {
        this.sysFlag = res
      })
    },
    getagencySysmsgs () {
      iopSettingService.getagencySysmsg().then(res => {
        this.agencyFlag = res
      })
    },
    changeOne (checked) {
      if (checked) {
        this.val = 1
        iopSettingService.saveuserSysmsg({ val: 1 }).then(res => {
          console.log(res)
        })
      } else {
        this.val = 0
        iopSettingService.saveuserSysmsg({ val: 0 }).then(res => {
          console.log(res)
        })
      }
    },
    changeTwo (checked) {
      if (checked) {
        this.val = 1
        iopSettingService.saveserTodoConf({ val: 1 }).then(res => {
          console.log(res)
        })
      } else {
        this.val = 0
        iopSettingService.saveserTodoConf({ val: 0 }).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .settings-tab2{
        height: 100%;
        position: relative;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
    }
</style>
