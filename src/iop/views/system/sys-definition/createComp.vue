<template>
  <div class="box">
    <a-row>
      <base-info-form ref="baseInfoForm" mode="comp" :dataSource="dataSource"></base-info-form>
    </a-row>
    <a-row style="text-align:center">
      <a-button :loading="state.savePadding" type="primary" @click="save">
        提交
      </a-button>
      <a-button @click="goBack">
        取消
      </a-button>
    </a-row>
  </div>
</template>
<script>
import BaseInfoForm from './comp/BaseInfoForm'
import Service from '@/iop/service/system/sys-definition'
import { arrayTool } from 'mwutil'
export default {
  name: 'CreateCompModel',
  components: {
    BaseInfoForm
  },
  data () {
    return {
      state: {
        // save按钮padding
        savePadding: false
      },
      dataSource: {}
    }
  },
  activated () {
    this.reset()
  },
  methods: {
    reset () {
      this.$refs.baseInfoForm.reset()
    },
    // 保存时候需要的默认数据（隐藏数据）
    getDefaultData () {
      return {
        systype: '0',
        isAccept: 0,
        appType: '1'
      }
    },
    // 隐藏model
    goBack () {
      this.$router.go(-1)
    },
    // 处理state array
    dealState (obj) {
      for (const key in obj) {
        const x = obj[key]
        if (arrayTool.isArray(x)) {
          obj[key] = x.join('$')
        }
      }
      return obj
    },
    // 保存
    save () {
      this.state.savePadding = true
      Service.doSave(this.dealState(Object.assign({}, this.$refs.baseInfoForm.getData(), this.getDefaultData())))
        .finally(() => {
          this.state.savePadding = false
        })
        .then(x => {
          this.$message.success('保存成功')
          this.goBack()
        })
        .catch(e => {
          // debugger
          this.$message.error(e)
        })
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
