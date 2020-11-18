<template>
  <div class="settings-tab1">
    <p class="title">基本信息</p>
    <a-form layout="vertical">
      <a-form-item label="姓名" v-model="form">
        <a-input v-model="form.userName" />
      </a-form-item>
      <a-form-item label="用户性别">
        <iop-data-dict-select type="sex" v-model="form.sex" />
      </a-form-item>
      <a-form-item label="证件类型">
        <iop-data-dict-select type="paperType" v-model="form.paperType" />
      </a-form-item>
      <a-form-item label="证件号码">
        <a-input placeholder="请输入证件号码" v-model="form.paperNum"/>
      </a-form-item>
      <a-form-item label="出生日期">
        <a-input v-model="form.birthday"/>
      </a-form-item>
      <a-form-item label="国籍">
        <a-input v-model="form.nationality"/>
      </a-form-item>
      <a-form-item label="通讯地址">
        <a-input v-model="form.address"/>
      </a-form-item>
      <a-form-item label="个人描述">
        <a-textarea v-model="form.remark" :autosize="{ minRows: 4, maxRows: 6 }" />
      </a-form-item>
      <a-form-item>
        <a-button style="margin-left: 8px" type="primary" @click="save">保存</a-button>
      </a-form-item>
    </a-form>
    <div v-show="false" class="ant-upload-preview" @click="$refs.modal.edit(1)">
      <a-icon type="cloud-upload-o" class="upload-icon" />
      <div class="mask">
        <a-icon type="plus" />
      </div>
      <img :src="option.img">
    </div>
    <avatar-modal :userid="userid" ref="modal" @ok="setavatar" />
  </div>
</template>
<script>
import AvatarModal from './AvatarModal'
import { iopSettingService } from '@/iop/service/index'
import { IopDataDictSelect } from '@/iop/components'
import MessageUtils from '@/utils/message'

export default {
  data () {
    return {
      form: {},
      option: {
        img: '/avatar.png'
      },
      userid: ''
    }
  },
  components: {
    AvatarModal,
    IopDataDictSelect
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    },
    getUserInfo () {
      iopSettingService.getPubUser().then(res => {
        this.form = res
        this.userid = res.userId
      })
    },
    save () {
      iopSettingService.savePubUser(this.form, this.form.userId)
        .then(() => {
          MessageUtils.success()
        })
        .catch(err => MessageUtils.error(err))
    }
  }
}
</script>
<style scoped  lang="less">
    .settings-tab1{
        height: 100%;
        position: relative;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #333333;
          font-weight: 500;
        }
    }
    /deep/ .ant-form-item{
      margin-bottom: 0;
    }
    /deep/ .ant-form-item-control{
      width: 60%;
    }
    .ant-upload-preview{
      width: 180px;
      height: 180px;
      border-radius: 50%;
      box-shadow: 0 0 4px #ccc;
      position: absolute;
      top: 70px;
      left: 70%;
      .upload-icon {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 1.4rem;
        padding: 0.5rem;
        background: rgba(222, 221, 221, 0.7);
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      .mask {
        opacity: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        cursor: pointer;
        transition: opacity 0.4s;
        &:hover {
          opacity: 1;
        }
        i {
          font-size: 2rem;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -1rem;
          margin-top: -1rem;
          color: #d6d6d6;
        }
      }
      img,
      .mask {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
</style>
