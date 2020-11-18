<template>
  <a-modal
    title="新增依赖组件"
    :visible="state.visible"
    @cancel="hide"
    :width="900"
  >
    <a-row style="height:100px">
      <a-form :form="form">
        <a-col :span="11">
          <a-form-item label="依赖组件" class="flex" style="width:100%">
            <iop-data-tree-select
              :url="dataUrl.tree"
              ref="treeSelect"
              v-decorator="['dependId', { rules: rules.dependId }]"
              :resultConvertor="resultConvertor"
            >
            </iop-data-tree-select>
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <template slot="footer">
      <a-row style="text-align:center">
        <a-button :loading="state.savePadding" type="primary" @click="save">
          提交
        </a-button>
        <a-button @click="hide">
          取消
        </a-button>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
import Path from '@/iop/api/index'
import Service from '@/iop/service/system/sys-definition'
import { objectTool } from 'mwutil'
import { IopDataTreeSelect } from '@/iop/components'
import Define from '../enum'
const entity = {
  dependId: ''
}
export default {
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  components: {
    IopDataTreeSelect
  },
  data () {
    return {
      form: this.$form.createForm(this),
      dataUrl: {
        tree: Path.sysDefinition.asyncTree
      },
      rules: {
        dependId: [
          { required: true, whitespace: true, message: '上级分类不能为空' }
        ]
      },
      state: {
        visible: false,
        savePadding: false
      },
      entity: objectTool.deepClone(entity)
    }
  },
  methods: {
    resultConvertor (data) {
      data.forEach(item => {
        item.selectable = (item.data.type === Define.TYPE.COMP)
      })
      return data
    },
    show () {
      this.state.visible = true
    },
    reset () {
      this.entity = objectTool.deepClone(entity)
      this.$refs.treeSelect.cleanSelected()
      this.form.resetFields()
    },
    hide () {
      this.state.visible = false
      this.reset()
    },
    save () {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.entity = this.form.getFieldsValue(objectTool.getKeyList(this.entity))
          Service.doSaveDepend({
            appId: this.appId,
            ...this.entity
          })
            .then(() => {
              this.$emit('saveCallBack')
              this.hide()
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.flex >>> .ant-form-item-control-wrapper {
  flex:1
}
.flex >>> .ant-form-item-label {
  width:100px;
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
</style>
