<template>
  <div class="settings-tab5">
    <p class="title">皮肤与布局指定</p>
    <a-table :dataSource="data">
      <a-table-column
        title="皮肤名称"
        dataIndex="skinName"
        width="200px"
        key="skinName"
      />
      <a-table-column
        title="效果图"
        dataIndex="css"
        width="200px"
        key="css"
      >
        <!-- <template slot-scope="img">
          <span>
            <img style="width:50px;height:50px;" :src="img" alt="">
          </span>
        </template> -->
      </a-table-column>
      <a-table-column
        title="说明"
        width="300px"
        dataIndex="remark"
        key="remark"
      />
      <a-table-column
        title="是否启用"
        key="item"
      >
        <template slot-scope="item">
          <span>
            <a-switch v-model="item.isTrue" checkedChildren="开" unCheckedChildren="关" defaultChecked @change="changeState(item)"/>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
import { iopSettingService } from '@/iop/service/index'
export default {
  data () {
    return {
      columns: [{
        title: '皮肤名称',
        dataIndex: 'name',
        width: 200
      }, {
        title: '效果图',
        dataIndex: 'img',
        width: 200
      }, {
        title: '说明',
        dataIndex: 'remark',
        width: 280
      }, {
        title: '是否启用'
      }],
      data: [],
      isSwitch: ''
    }
  },
  created () {
    this.getSkinColor()
  },
  methods: {
    changeState (item, index) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].skinName === item.skinName) {
          this.data[i].isTrue = true
        } else {
          this.data[i].isTrue = false
        }
      }
      iopSettingService.saveSkin({ skinId: item.skinId }).then(res => {
        console.log(res)
      })
    },
    getSkinColor () {
      iopSettingService.getSkin().then(res => {
        this.data = res
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].isTrue === '是') {
            this.data[i].isTrue = true
          } else {
            this.data[i].isTrue = false
          }
        }
      })
    }
  }
}
</script>
<style scoped  lang="less">
    .settings-tab5{
        height: 100%;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
    }
</style>
