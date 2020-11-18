<template>
  <a-modal title="合并" :visible="visible" @cancel="hide" :footer="null" width="900px">
    <div style="margin:-24px;margin-bottom:30px;">
      <a-alert
        type="warning"
        showIcon
        banner
        message="机构合并后将产生新的机构，管理员可以重新录入新机构的基本信息，同时被合并机构将被标记为注销状态，并将用户全部转移到新机构下"
      />
    </div>
    <div style="margin:30px;">
      <a-steps :current="currentTab">
        <a-step title="选择机构" />
        <a-step title="填写信息" />
        <a-step title="完成" />
      </a-steps>
    </div>
    <div class="content" style="margin: 20px;">
      <select-dept ref="selectDept" v-show="currentTab === 0" @nextStep="getDepts"/>
      <pub-dept-form ref="pubDeptForm" :deptIds="deptIds" v-show="currentTab === 1" @nextStep="toFinish" @prevStep="prevStep"/>
      <success v-show="currentTab === 2" @first="toFirst" @finish="finish"/>
    </div>
  </a-modal>
</template>
<script>
import SelectDept from './SelectDept'
import PubDeptForm from './PubDeptForm'
import Success from './Success'

export default {
  name: 'PubDeptJoin',
  components: { SelectDept, PubDeptForm, Success },
  data () {
    return {
      visible: false,
      currentTab: 0,
      deptIds: {}
    }
  },
  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    getDepts ({ mergeDeptId1 = '', mergeDeptId2 = '' }) {
      this.currentTab = 1
      this.deptIds = { mergeDeptId1, mergeDeptId2 }
    },

    prevStep () {
      this.currentTab = 0
    },

    finish () {
      this.hide()
      this.toFirst()
    },

    toFinish () {
      this.currentTab = 2
    },

    toFirst () {
      this.currentTab = 0
      this.$refs.selectDept.rest()
      this.$refs.pubDeptForm.reset()
    }
  }
}
</script>
