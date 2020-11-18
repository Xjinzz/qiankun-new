<template>
  <div style="position:relative">
    <a-button class="return" @click="$router.go(-1)">返回</a-button>
    <!-- 申请单 -->
    <apply-form
      v-if="show"
      ref="applyForm"
      :applyId="applyId"
      :applyType="form.applyType"
      :mode="mode"
      :status="form.status"
    />
    <!-- 申请明细 -->
    <apply-view-list
      v-if="show"
      :id="applyId"
      :appId="form.appId"
      :applyId="applyId"
      :applyType="form.applyType"
      :status="form.status"
      :mode="mode"
    />
    <!-- 审批 -->
    <!-- <apply-examine-approve v-if="form.status!='0'||show" :historyData="historyData" /> -->
  </div>
</template>

<script>
import ApplyForm from './ApplyForm'
import ApplyViewList from './ApplyViewList'
// import ApplyExamineApprove from './ApplyExamineApprove'
import { iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  data () {
    return {
      form: {},
      show: true,
      applyId: '',
      mode: '',
      businessId: '',
      historyData: []
    }
  },
  components: { ApplyForm, ApplyViewList },
  created () {
    this.applyId = this.$route.query.applyId
    this.mode = this.$route.query.mode
    this.getInfo()
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.query.applyId) {
        this.applyId = this.$route.query.applyId
        this.mode = this.$route.query.mode
        this.getInfo()
      }
    }
  },
  methods: {
    getInfo () {
      this.show = false
      iopServApplyService.formInfo(this.applyId)
        .then(res => {
          this.show = true
          this.form = res
          this.form.businessId = res.applyId
          this.form.status = this.$route.query.status ? this.$route.query.status : res.status
          // iopServApplyService.opinionList(res.applyId)
          //   .then((res) => {
          //     this.historyData = res
          //   })
          //   .catch(err => MessageUtils.error(err))
        })
        .catch(err => MessageUtils.error(err))
    }
  }

}
</script>
<style  scoped>
.return{
  position: absolute;
  right: 30px;
  z-index: 1;
  top: 10px;
}
</style>
