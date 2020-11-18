<template>
  <a-modal
    title="添加到菜单"
    :visible="state.visible"
    @cancel="hide"
    :width="600"
  >
    <a-row>
      <a-form :form="form">
        <a-form-item label="菜单图标名称" class="flex" style="width:100%">
          <a-input v-decorator="['progIcon']" />
        </a-form-item>
        <a-form-item label="菜单名称" class="flex" style="width:100%">
          <a-input v-decorator="['progName', { rules: [{ required: true, whitespace: true, message: '该字段必须填写' }] }]" />
        </a-form-item>
        <a-form-item label="菜单排序号码" class="flex" style="width:100%">
          <a-input-number v-decorator="['progOrderNum', { rules: rules.progOrderNum }, { pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}]" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="父级菜单标识" class="flex" style="width:100%">
          <iop-data-tree-select
            ref="progParentId"
            :url="state.progParentTreeUrl"
            v-decorator="['progParentId']"
            queryName="id" />
        </a-form-item>
        <a-row style="margin-left:120px;margin-top:-16px;color:#aeaeae">
          不选择将直接添加到根菜单
        </a-row>
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
import { objectTool } from 'mwutil'
import path from '@/iop/api'
import { IopDataTreeSelect } from '@/iop/components'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
const Entity = {
  drmsObjCode: '',
  drmsObjId: '',
  progIcon: '',
  progName: '',
  progOrderNum: '',
  progParentId: ''
}
export default {
  components: {
    IopDataTreeSelect
  },
  data () {
    return {
      form: this.$form.createForm(this),
      rules: {
        progName: [
          { required: true, whitespace: true, message: '该字段必须填写' }
        ],
        progOrderNum: [
          { required: true, whitespace: true, message: '该字段必须填写' }
        ]
      },
      state: {
        visible: false,
        savePadding: false,
        progParentTreeUrl: path.system.program.tree
      },
      entity: objectTool.deepClone(Entity)
    }
  },
  methods: {
    hide () {
      this.state.visible = false
      this.reset()
    },
    reset () {
      this.entity = objectTool.deepClone(Entity)
    },
    show (params) {
      this.state.visible = true
      this.entity.drmsObjCode = params.code
      this.entity.drmsObjId = params.id
      this.$nextTick(() => {
        this.$refs.progParentId.cleanSelected()
        this.form.setFieldsValue({
          progName: params.name,
          progIcon: '',
          progOrderNum: ''
        })
      })
    },
    save () {
      const _this = this
      this.form.validateFields((error, values) => {
        if (!error) {
          _this.state.savePadding = true
          const data = _this.form.getFieldsValue(objectTool.getKeyList(Entity))
          data.drmsObjCode = this.entity.drmsObjCode
          data.drmsObjId = this.entity.drmsObjId
          data.progParentId = data.progParentId ? data.progParentId : '0'
          Service.doAddToMenu(data)
            .then(x => {
              this.$message.success('添加成功')
              this.state.savePadding = false
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
  width:120px;
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
