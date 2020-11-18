<template>
  <a-col :span="18" :offset="3">
    <a-form :form="form">
      <a-form-item label="是否同步" class="flex" style="width:100%">
        <a-switch checked-children="是" un-checked-children="否" v-decorator="['isAccept']" @change="showDept"/>
        <span v-show="!this.state.deptFlag" style="color:#c2c2c2;margin-left:5px">
          系统只创建根节点机构、上一步中选择的用户
        </span>
      </a-form-item>
      <a-row v-if="state.deptFlag">
        <a-col :span="15">
          <a-form-item label="同步机构" class="flex" style="width:100%">
            <iop-data-tree-select
              ref="deptTree"
              :url="dataUrl.tree"
              v-decorator="['acceptDeptId', { rules: rules.acceptDeptId }]"
              @onSelect="selectTreeItem"
            />
          </a-form-item>
        </a-col>
        <a-col :span="9" style="margin-top:20px">
          <span style="color:#c2c2c2;margin-left:15px;">
            同步选择的机构节点下的所有机构
          </span>
        </a-col>
      </a-row>
      <a-form-item v-if="state.deptFlag" label="同步用户" class="flex" style="width:100%">
        <a-switch checked-children="是" un-checked-children="否" v-decorator="['acceptUser']"/>
        <span style="color:#c2c2c2">
          同步选择的机构节点下的所有用户
        </span>
        <!--
        <a-checkbox-group v-decorator="['syncList']">
        <a-checkbox
        v-for="(item,index) in dataSource.syncList"
        :key="index"
        :value="item.key"
        >{{ item.val }}</a-checkbox>
        </a-checkbox-group>
        -->

      </a-form-item>
      <!--
      <a-col :span="11" v-if="dataSource.rektCompList.length>1">
      <a-form-item label="系统依赖组件" class="flex box-row-check" style="width:100%">
      <a-checkbox-group class="formItem" v-decorator="['rektCompList']">
      <a-checkbox
      v-for="(item,index) in dataSource.rektCompList"
      :key="index"
      :value="item.key"
      >
      {{ item.val }}
      </a-checkbox>
      <br />
      </a-checkbox-group>
      </a-form-item>
      </a-col>
      -->
      <a-row>
        <a-col :span="15">
          <a-form-item label="系统皮肤" class="flex" style="width:100%">
            <a-select v-decorator="['skinId', { rules: rules.skinId }]" @change="handleChangeSkin" allowClear>
              <a-select-option
                v-for="item in dataSource.skinList"
                :value="item.skinId"
                :key="item.skinId"
              >{{ item.skinName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="9" style="margin-top:14px">
          <a-button @click="showPreview" type="link" :disabled="state.selectedSkin?false:true">皮肤预览</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal v-if="state.previewTag" v-model="state.previewTag" title="皮肤预览" width="1000px">
      <template slot="footer">
        <a-button @click="cloasePreview">关闭</a-button>
      </template>
      <iop-sys-skin-preview
        style="border:1px solid #c8c8c8;vertical-align:center"
        :multi-tab="state.selectedSkin.multiTab"
        :layout-mode="state.selectedSkin.layoutMode"
        :color="state.selectedSkin.primaryColorKey"
        :color-weak="state.selectedSkin.colorWeak"
        :theme="state.selectedSkin.navTheme"
      />
    </a-modal>
  </a-col>
</template>
<script>
import path from '@/iop/api'
import { IopDataDictRadio, IopDataTreeSelect, IopDataDictSelect, IopSysSkinPreview } from '@/iop/components'
import { objectTool, arrayTool } from 'mwutil'
const entity = {
  isAccept: '', // 是否同步
  acceptDeptId: '', // 机构节点
  // syncList: [], // 同步内容
  // rektCompList: [], // 系统依赖组件
  skinId: '', // 系统皮肤
  acceptUser: false
}
export default {
  props: {
    dataSource: {
      type: Object,
      required: true
    }
  },
  components: {
    IopDataDictRadio,
    IopDataTreeSelect,
    IopDataDictSelect,
    IopSysSkinPreview
  },
  data () {
    return {
      dataUrl: {
        tree: path.system.pubDept.tree
      },
      entity: objectTool.deepClone(entity),
      form: this.$form.createForm(this),
      state: {
        acceptDeptSelectItem: null,
        selectedSkin: null,
        previewTag: false,
        deptFlag: false
      },
      rules: {
        skinId: [{ required: true, whitespace: true, message: '该字段必须选择' }],
        acceptDeptId: [{ required: true, whitespace: true, message: '该字段必须选择' }]
      }
    }
  },
  computed: {
    // this.$once('hook:updated', () => {
    //   debugger
    // })
    skinMap () {
      const list = arrayTool.deepClone(this.dataSource.skinList)
      const skinMap = {}
      list.forEach(item => {
        skinMap[item.skinId] = item.json
      })
      return skinMap
    }
  },
  methods: {
    showDept (flag) {
      this.state.acceptDeptSelectItem = null
      this.state.deptFlag = flag
    },
    // 选中皮肤
    handleChangeSkin (x) {
      const _selected = this.skinMap[x] || null
      this.state.selectedSkin = _selected
    },
    // 打开预览弹窗
    showPreview () {
      this.state.previewTag = true
    },
    // 关闭预览弹窗
    cloasePreview () {
      this.state.previewTag = false
    },
    // 获取数据
    getData () {
      this.entity = {
        ...this.form.getFieldsValue(objectTool.getKeyList(this.entity)),
        acceptDeptSelectItem: this.state.acceptDeptSelectItem
      }
      if (this.entity.isAccept === undefined) this.entity.isAccept = false
      return this.entity
    },
    // 重置表单
    reset () {
      this.entity = objectTool.deepClone(entity)
      this.form.resetFields()
      // this.$refs.deptTree.cleanSelected()
    },
    // 验证表单内容
    validate (cb) {
      this.form.validateFields((error, values) => {
        if (!error) {
          const result = {
            success: true,
            messgae: '校验成功'
          }
          cb(result)
        }
      })
    },
    // 选择机构节点树
    selectTreeItem ({ data }) {
      this.state.acceptDeptSelectItem = data
    }
  }
}
</script>
<style scoped>
.box-row-check >>> .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0 !important;
}
.flex >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.flex >>> .ant-form-item-label {
  width: 100px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="less" scoped>
.flex {
  display: flex;
  margin-top: 10px;
  // align-items: center;
  > label {
    width: 80px;
    line-height: 32px;
    text-align: right;
  }
}
.formItem {
  flex: 1;
  margin-left: 10px;
}
</style>
