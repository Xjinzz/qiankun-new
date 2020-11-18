<template>
  <div class="settings-tab3">
    <p class="title">个人通讯方式</p>
    <div class="form" v-if="this.form.length != 0">
      <div v-for="(item, index) in form" :key="index">
        <p class="settings-tab3-name">{{ item.contactType }}</p>
        <a-input v-model="item.contactValue"/>
      </div>
      <div class="settings-tab3-btn">
        <a-button type="primary" @click="save">保存</a-button>
        <!-- <a-button style="margin-left: 8px">保存</a-button> -->
      </div>
    </div>
    <div class="imgBox" v-else>
      <img src="../images/noData.png" alt="">
    </div>
  </div>
</template>
<script>
import { iopSettingService } from '@/iop/service/index'
export default {
  data () {
    return {
      form: []
    }
  },
  created () {
    this.getLine()
    console.log(this.form)
  },
  methods: {
    getLine () {
      iopSettingService.getUserContact().then(res => {
        this.form = res
      })
    },
    save () {
      iopSettingService.saveUserContact(this.form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped  lang="less">
    .settings-tab3{
        height: 100%;
        list-style: none;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
      /deep/ .ant-input{
        width: 60%;
        height: 32px;
        margin-top: 0;
      }
      /deep/ .ant-form-item{
        margin-bottom: 0;
      }
      .settings-tab3-name{
        padding-top: 10px;
        margin-bottom: 6px;;
      }
      .settings-tab3-btn{
        margin-top: 10px;
      }
      .imgBox{
        text-align: center;
        img{
          padding-top: 38px;
        }
      }
    }
</style>
