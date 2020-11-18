<template>
  <div class="box">
    <a-steps :current="state.currentStep" size="small">
      <!-- <a-steps v-model="state.currentStep" size="small"> -->
      <a-step title="基本信息" />
      <a-step title="系统初始化" />
      <a-step title="基础配置" />
      <a-step title="信息确认" />
      <a-step title="完成" />
    </a-steps>
    <a-row style="padding-left:50px;padding-right:50px;padding-top:20px">
      <div style="min-height:500px;">
        <base-info-form
          mode="sys"
          ref="baseInfoForm"
          v-show="state.currentStep==0"
          :dataSource="dataSource"
          @appTypeChange="appTypeChange">
        </base-info-form>
        <sysinit-form ref="sysinitForm" v-show="state.currentStep==1" :dataSource="dataSource"></sysinit-form>
        <base-config-form ref="baseConfigForm" v-show="state.currentStep==2" :dataSource="dataSource"></base-config-form>
        <info-confirm ref="infoConfirm" v-if="state.currentStep==3" :infoData="state.infoData" :dataSource="dataSource"></info-confirm>
        <finish-box ref="finishBox" v-show="state.currentStep==4"></finish-box>
      </div>
    </a-row>
    <a-row style="text-align:center">
      <a-button v-show="state.currentStep!=0 && state.currentStep!=4" @click="backStep">
        上一步
      </a-button>
      <a-button style="margin-left:10px" v-show="state.currentStep<3" type="primary" @click="nextStep">
        下一步
      </a-button>
      <a-button style="margin-left:10px" :loading="state.savePadding" v-show="state.currentStep==3" type="primary" @click="save">
        提交
      </a-button>
      <a-button style="margin-left:10px" v-show="state.currentStep==4" type="primary" @click="seeSys">
        查看子系统
      </a-button>
      <a-button style="margin-left:10px" @click="goBack">
        取消
      </a-button>
    </a-row>
  </div>
</template>
<script>
import BaseInfoForm from './comp/BaseInfoForm'
import SysinitForm from './comp/SysinitForm'
import BaseConfigForm from './comp/BaseConfigForm'
import InfoConfirm from './comp/InfoConfirm'
import FinishBox from './comp/FinishBox'
import Service from '@/iop/service/system/sys-definition'
import { arrayTool, objectTool } from 'mwutil'

export default {
  name: 'CreateSysModel',
  components: {
    BaseInfoForm,
    SysinitForm,
    BaseConfigForm,
    InfoConfirm,
    FinishBox
  },
  data () {
    return {
      state: {
        // 控制弹层显示
        visible: false,
        // 当前第几步
        currentStep: 0,
        // save按钮padding
        savePadding: false,
        // 提交后台的数据
        infoData: {}
      },
      dataSource: {
        // 菜单list
        menusList: [],
        // 角色列表
        roleList: [],
        // 同步内容的list
        syncList: [],
        // 系统依赖组件的list
        rektCompList: [],
        // 皮肤list
        skinList: []
      }
    }
  },
  mounted () {
    this.reset()
    this.dataSource.menusList = Service.getMenusList()
    this.dataSource.roleList = Service.getRoleList()
    this.dataSource.syncList = Service.getSyncList()
    this.dataSource.rektCompList = Service.getRektCompList()
    Service.getSkinList()
      .then(x => {
        this.dataSource.skinList = x
      })
  },
  methods: {
    reset () {
      this.$refs.baseInfoForm.reset()
      this.$refs.sysinitForm.reset()
      this.$refs.baseConfigForm.reset()
      this.state.infoData = {}
      this.state.currentStep = 0
    },
    appTypeChange () {
      this.$refs.sysinitForm.reset()
      this.$refs.baseConfigForm.reset()
      this.state.infoData = {}
    },
    // 隐藏model
    goBack () {
      this.$router.go(-1)
    },
    // 上一步
    backStep () {
      if (this.state.currentStep === 3) {
        if (!this.$refs.baseInfoForm.getData().appType) {
          this.state.currentStep = 0
          return
        }
      }
      this.state.currentStep--
    },
    // 下一步
    nextStep () {
      if (this.state.currentStep <= 2) {
        const compList = {
          0: 'baseInfoForm',
          1: 'sysinitForm',
          2: 'baseConfigForm'
        }
        this.$refs[compList[this.state.currentStep]].validate(x => {
          if (x.success) {
            // 如果是在第一步 并且内部系统为false
            if (this.state.currentStep === 0) {
              const data = this.$refs.baseInfoForm.getData()
              if (!data.appType) {
                // 获取第一步内容
                this.state.currentStep = 3
                this.state.infoData = Object.assign({
                  isAccept: '0'
                }, this.$refs.baseInfoForm.getData(), this.getDefaultData())
                return
              }
            }
            this.state.currentStep++
            if (this.state.currentStep === 3) {
              this.state.infoData = Object.assign({}, this.$refs.baseInfoForm.getData(), this.$refs.sysinitForm.getData(), this.$refs.baseConfigForm.getData(), this.getDefaultData())
            }
          }
        })
      } else {
        this.state.currentStep++
      }
    },
    // 处理state array
    dealState (obj) {
      // 不需要处理的数组列表
      const exceList = [
        'userList'
      ]
      // 需要将true/false转换为'1'和'0'的
      const conversionList = [
        'acceptUser',
        'isAccept',
        'appType'
      ]
      for (const key in obj) {
        const x = obj[key]
        if (arrayTool.isArray(x) && !exceList.includes(key)) {
          obj[key] = x.join('$')
        }
        if (conversionList.includes(key)) {
          obj[key] = obj[key] ? '1' : '0'
        }
      }
      return obj
    },
    // 保存时候需要的默认数据（隐藏数据）
    getDefaultData () {
      return {
        systype: '1'
      }
    },
    // 保存
    save () {
      this.state.savePadding = true
      const data = objectTool.deepClone(this.state.infoData)
      // 不需要提交后台的
      const exclusiveList = [
        'acceptDeptSelectItem',
        'createRoot'
      ]
      exclusiveList.map(item => {
        delete data[item]
      })
      Service.doSave(this.dealState(data))
        .finally(() => {
          this.state.savePadding = false
        })
        .then(x => {
          this.$message.success('保存成功')
          this.nextStep()
        })
        .catch(e => {
          // debugger
          this.$message.error(e)
        })
    },
    // 查看子系统
    seeSys () {
      this.goBack()
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  margin:0 auto;
  background:#fff;
  box-sizing: border-box;
  padding:30px;
}
</style>
