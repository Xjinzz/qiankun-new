<template>
  <a-modal
    title="认证配置"
    :visible="state.visible"
    :width="900"
    @cancel="hide"
  >
    <a-row style="height:500px;overflow:scroll">
      <a-row
        v-for="(item,index) in state.list"
        :key="index"
        class="listItem"
      >
        <a-row class="listTitle" @click.self.native="relaChecked(item)">
          <a-checkbox :checked="item.status==1" @change="relaChecked(item)">
            {{ item.policyName }}
          </a-checkbox>
        </a-row>
        <div class="listContent" v-if="item.status==1">
          <a-col :span="11">
            <a-form-item label="密码最小长度" class="flex" style="width:100%">
              <a-input v-model="item.__formList.minLength"/>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="是否包含字母" class="flex" style="width:100%">
              <iop-data-dict-radio type="A104" v-model="item.__formList.letter"></iop-data-dict-radio>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="是否包含数字" class="flex" style="width:100%">
              <iop-data-dict-radio type="A104" v-model="item.__formList.numbers"></iop-data-dict-radio>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="含有特殊字符" class="flex" style="width:100%">
              <iop-data-dict-radio type="A104" v-model="item.__formList.special"></iop-data-dict-radio>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="口令更换周期" class="flex" style="width:100%">
              <a-input placeholder="请输入口令更换周期" suffix="天" v-model="item.__formList.cycle"/>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="登录失败次数" class="flex" style="width:100%">
              <a-input placeholder="请输入登录失败次数" suffix="锁定账号" v-model="item.__formList.loginFail"/>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="账号锁定时间" class="flex" style="width:100%">
              <a-select v-model="item.__formList.unlockTime" style="width:100%">
                <a-select-option :value="1">
                  1小时
                </a-select-option>
                <a-select-option :value="6">
                  6小时
                </a-select-option>
                <a-select-option :value="24">
                  24小时
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-row style="text-align:center;padding-bottom:10px;clear:both">
            <a-button type="primary" @click="save(item)">
              提交
            </a-button>
          </a-row>
        </div>
      </a-row>
    </a-row>
    <template slot="footer">
      <a-row></a-row>
    </template>
  </a-modal>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import { arrayTool, objectTool } from 'mwutil'
import { IopDataDictRadio } from '@/iop/components'
export default {
  components: {
    IopDataDictRadio
  },
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      state: {
        visible: false,
        savePadding: false,
        roadId: null,
        wayId: null,
        list: []
      }
    }
  },
  methods: {
    init () {
      this.state.list = []
      this.getList()
    },
    show (roadId, wayId) {
      this.state.roadId = roadId
      this.state.wayId = wayId
      this.state.visible = true
      this.init()
    },
    reset () {
      this.state.roadId = null
      this.state.wayId = null
    },
    hide () {
      this.state.visible = false
      this.reset()
    },
    getList () {
      Service.getRelaList({
        appId: this.appId,
        roadId: this.state.roadId,
        wayId: this.state.wayId
      })
        .then(x => {
          x.data.map(item => {
            item.__formList = {}
            if (item.status === '1') {
              this.getRelaForm(item)
            }
          })
          this.state.list = x.data
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    // 勾选
    relaChecked (item) {
      Service.relaChecked({
        appId: this.appId,
        roadId: this.state.roadId,
        wayId: this.state.wayId,
        status: item.status === '1' ? '0' : '1',
        policyConfId: item.policyConfId,
        xtrzclbs: item.xtrzclbs
      })
        .then(x => {
          // 虽然对象可以直接修改，但不建议这么做，需要遵循vue规范，使用set进行更改
          const params = objectTool.deepClone(item)
          params.status = (item.status === '1' ? '0' : '1')
          params.xtrzclbs = x.xtrzclbs
          params.__formList = {}
          this.$set(this.state.list, arrayTool.findIndex(this.state.list, item), params)
          if (params.status === '1') {
            this.getRelaForm(params)
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
      // item.status=(item.status==1?0:1)
    },
    // 获取下方表单
    getRelaForm (item) {
      Service.getRelaFormInfo({
        policyConfId: item.policyConfId,
        xtrzclbs: item.xtrzclbs
      })
        .then(x => {
          const params = objectTool.deepClone(item)
          params.__formList = x
          this.$set(this.state.list, arrayTool.findIndex(this.state.list, item), params)
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    save (item) {
      if (item.__formList.policyParamId) {
        // 更新
        Service.doUpdatePolic(item.__formList.policyParamId, item.__formList)
          .then(x => {
            this.$message.success('保存成功')
          })
          .catch(e => {
            this.$message.error(e)
          })
      } else {
        // 新建
        Service.doSavePolic(item.__formList)
          .then(x => {
            const params = objectTool.deepClone(item)
            params.__formList.policyParamId = x.policyParamId
            this.$set(this.state.list, arrayTool.findIndex(this.state.list, item), params)
            this.$message.success('保存成功')
          })
          .catch(e => {
            this.$message.error(e)
          })
      }
    }
  }
}
</script>
<style scoped>
.flex >>> .ant-form-item-control-wrapper {
  flex:1
}
.flex >>> .ant-form-item-label {
  width:140px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="less" scoped>
.flex{
  display:flex;
  margin-top:10px;
}
.listItem{
  margin-bottom:10px;
  user-select:none;
  .listTitle{
    width:100%;
    padding-top:8px;
    padding-bottom:8px;
    background:#EBEBEB;
    position: relative;
    padding-left:10px;
    line-height:30px;
    cursor:pointer;
    .rightIcon {
      position: absolute;
      right:10px;
      line-height:30px;
      top:10px
    }
  }
  .listContent{
    border:1px solid #ebebeb;
  }
}
</style>
