<template>
  <div class="box">
    <a-row>
      <a-form :form="form">
        <a-col :span="11">
          <a-form-item :label="title+'编号'" class="flex" style="width:100%">
            <a-input @change="(e)=>{appCodeChange(e.target.value)}" placeholder="请输入编号" :disabled="isView" v-decorator="['appCode', { rules: rules.appCode }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11" class="flex">
          <a-form-item :label="title+'名称'" class="flex" style="width:100%">
            <a-input placeholder="请输入名称" :disabled="isView" v-decorator="['appName', { rules: rules.appName }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="上级分组" class="flex" style="width:100%">
            <iop-data-tree-select
              ref="dataTree"
              :url="dataUrl.tree"
              v-decorator="['parentId']"
              queryName="id"
            />
          </a-form-item>
        </a-col>
        <a-col :span="11" v-if="!isGroup && !isComp">
          <a-form-item label="内部系统" class="flex" style="width:100%">
            <a-switch
              disabled
              checked-children="是"
              un-checked-children="否"
              v-model="entity.appType"
            >
            </a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="11" v-if="!isGroup">
          <a-form-item label="上下文根" class="flex" style="width:100%">
            <a-input placeholder="请输入上下文根" :disabled="isView" v-decorator="['appContext', { rules: rules.appContext }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11" class="flex" v-if="!isComp && !isGroup">
          <a-col :span="20">
            <a-form-item label="系统皮肤" class="flex" style="width:100%">
              <a-select v-decorator="['skinId']" @change="handleChangeSkin" allowClear>
                <a-select-option v-for="item in dataSource.skinList" :value="item.skinId" :key="item.skinId">
                  {{ item.skinName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" style="margin-top:4px">
            <a-button @click="showPreview" type="link" :disabled="state.selectedSkin?false:true">皮肤预览</a-button>
          </a-col>
        </a-col>
        <a-col :span="11" class="flex">
          <a-form-item label="排序号码" class="flex" style="width:100%">
            <a-input :disabled="isView" v-decorator="['orderNum', { rules: rules.orderNum }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11" class="flex" v-if="!isGroup">
          <a-form-item label="首页地址" class="flex" style="width:100%">
            <a-input placeholder="请输入首页地址" :disabled="isView" v-decorator="['indexUrl', { rules: rules.indexUrl }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11" class="flex" v-if="!isGroup">
          <a-form-item label="登录地址" class="flex" style="width:100%">
            <a-input placeholder="请输入登陆地址" :disabled="isView" v-decorator="['loginUrl', { rules: rules.loginUrl }]" />
          </a-form-item>
        </a-col>
        <!--
        <a-col :span="11" class="flex" v-if="isSys">
        <a-form-item label="是否同步" class="flex" style="width:100%">
        <a-switch :disabled="isView" checked-children="是" un-checked-children="否" v-model="entity.isAccept"/>
        </a-form-item>
        </a-col>
        -->
        <a-col :span="24" class="flex" v-if="!isGroup">
          <!-- <a-form-item :label="title+'图标'" class="flex" style="width:100%">
            <a-input :disabled="isView" v-decorator="['iconBig']" />
          </a-form-item> -->
          <a-col :span="11">
            <a-form-item v-if="entity.appId" :label="title+'图标'" class="flex" style="width:100%">
              <iop-upload-dragger :mode="$route.query.mode" :id="entity.appId" businessName="sysApp" attrName="iconBig" @progress="handleUploaded"/>
            </a-form-item>
          </a-col>
        </a-col>
        <!-- <a-col :span="11" class="flex">
          <a-form-item label="同步节点" class="flex" style="width:100%">
            <a-input :disabled="isView" v-decorator="['iconBig']" />
          </a-form-item>
        </a-col> -->
        <a-col :span="22" class="flex">
          <a-form-item label="备注说明" class="flex" style="width:100%">
            <a-textarea
              placeholder="请输入介绍"
              :autoSize="{ minRows: 2, maxRows: 4 }"
              v-decorator="['remark', {rules: [{ max: 500, message: '系统介绍最多500位' }]}]"
              :disabled="isView"
            />
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <a-row v-if="!isGroup" style="margin-top:10px;margin-bottom:10px">
      <a-tabs v-model="state.defaultActiveKey" v-if="!state._referRenderFlag">
        <a-tab-pane tab="子组件" :key="1">
          <tab-sub-comp ref="tabSubComp" :id="id" :disabled="isView" />
        </a-tab-pane>
        <a-tab-pane tab="依赖组件" key="2">
          <tab-rely-comp ref="tabRelyComp" :id="id" :disabled="isView" />
        </a-tab-pane>
        <a-tab-pane v-if="isSys" tab="认证配置" key="3">
          <tab-auth-config ref="tabAuthConfig" :id="id" :disabled="isView" />
        </a-tab-pane>
        <a-tab-pane tab="集群部署" key="4">
          <tab-phy-config ref="tabPhyConfig" :id="id" :disabled="isView" />
        </a-tab-pane>
        <!--
        <a-tab-pane tab="配置参数" key="5">
        <tab-config-param ref="tabConfigParam" :id="id" :disabled="isView" />
        </a-tab-pane>
        <a-tab-pane tab="系统拓扑图" key="6">
        <tab-topolo-img ref="tabTopoloImg" :id="id" :disabled="isView" />
        </a-tab-pane>
        -->
      </a-tabs>
    </a-row>
    <a-row style="text-align:center">
      <a-button :loading="state.savePadding" v-show="isEdit" type="primary" @click="save">
        提交
      </a-button>
      <a-button @click="goBack">
        取消
      </a-button>
    </a-row>
    <!--皮肤预览-->
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
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import TabSubComp from './comp/TabSubComp'
import TabRelyComp from './comp/TabRelyComp'
import TabAuthConfig from './comp/TabAuthConfig'
import TabPhyConfig from './comp/TabPhyConfig'
import TabTopoloImg from './comp/TabTopoloImg'
import TabConfigParam from './comp/TabConfigParam'
import { IopDataTreeSelect, IopDataDictSelect, IopDataDictRadio, IopUploadDragger, IopSysSkinPreview } from '@/iop/components'
import { objectTool, arrayTool } from 'mwutil'
import appService from '@/iop/service/auth/app'
import Path from '@/iop/api'
import { mapActions } from 'vuex'
import { iopAppService } from '@/iop/service/index'
const entity = {
  // systype: '',
  // appType: '',
  appContext: '',
  skinId: '',
  orderNum: '',
  indexUrl: '',
  loginUrl: '',
  // isAccept: '',
  remark: '',
  appName: '',
  appCode: '',
  appId: '',
  parentId: ''
}
const conversionList = [
  'appType'
]
export default {
  components: {
    IopDataTreeSelect,
    IopDataDictSelect,
    IopDataDictRadio,
    TabSubComp,
    TabRelyComp,
    TabAuthConfig,
    TabPhyConfig,
    TabTopoloImg,
    IopUploadDragger,
    TabConfigParam,
    IopSysSkinPreview
  },
  mounted () {
    this.reset()
    // this.dataSource.sysType = Service.getSysType()
    Service.getInfo(this.id)
      .then(x => {
        this.state.defaultActiveKey = this.$route.query.activekey || this.state.defaultActiveKey
        this.entity = this.dealInitState(x)
        // 如果是系统才获取皮肤列表
        if (this.entity.systype === '1') {
          this.getSkinList()
        }
        this.$nextTick(() => {
          this.setFormValueByEntity()
        })
      })
      .catch(e => {
        // debugger
      })
  },
  data () {
    return {
      id: '',
      rules: {
        appCode: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道编码最多100位' }
        ],
        appName: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '通道名称最多100位' }
        ],
        orderNum: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { pattern: /^[0-9]{0,7}$/, message: '排序号最多7位' }
        ],
        appContext: [
          { required: true, whitespace: true, message: '该字段必须选择' },
          { max: 100, message: '上下文根最多100位' }
        ],
        indexUrl: [
          { required: true, whitespace: true, message: '该字段必须选择' },
          { max: 200, message: '首页地址最多200位' }
        ],
        loginUrl: [
          { max: 100, message: '登陆地址最多100位' }
        ],
        parentId: [
          { required: true, whitespace: true, message: '该字段必须选择' }
        ]
      },
      entity: objectTool.deepClone(entity),
      dataSource: {
        sysType: [],
        skinList: []
      },
      dataUrl: {
        tree: Path.sysDefinition.asyncTree
      },
      state: {
        defaultActiveKey: 1,
        savePadding: false,
        selectedSkin: null,
        previewTag: false
      },
      form: this.$form.createForm(this)
    }
  },
  computed: {
    isEdit () {
      return this.$route.query.mode === 'edit'
    },
    isView () {
      return this.$route.query.mode === 'view'
    },
    title () {
      return this.entity.systype === '1' ? '系统' : (this.entity.systype === '0' ? '组件' : '分组')
    },
    isGroup () {
      return this.entity.systype === '9'
    },
    isSys () {
      return this.entity.systype === '1'
    },
    isComp () {
      return this.entity.systype === '0'
    },
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
    ...mapActions({
      setSkinByJson: 'SetSkinByJson'
    }),
    appCodeChange (val) {
      if (this.isComp || this.isSys) {
        this.form.setFieldsValue({
          appContext: '/' + val
        })
      }
    },
    getSkinList () {
      Service.getSkinList()
        .then(x => {
          this.dataSource.skinList = x
          if (this.isSys && this.entity.skinId) {
            this.handleChangeSkin(this.entity.skinId)
          }
        })
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
    reset () {
      this.id = this.$route.query.id
      this.state._referRenderFlag = true
      this.$nextTick(() => {
        this.state._referRenderFlag = false
      })
    },
    // 获取keys数组
    getAllFormKeyList () {
      let keysList = {}
      // 分组list
      if (this.isGroup) {
        keysList = {
          remark: '',
          appName: '',
          orderNum: '',
          appCode: '',
          appId: ''
        }
      } else {
        keysList = objectTool.deepClone(entity)
      }
      if (this.isComp) {
        delete keysList.skinId
      }
      delete keysList.appId
      return objectTool.getKeyList(keysList)
    },
    // 根据entity设置表单
    setFormValueByEntity () {
      const keys = {}
      this.getAllFormKeyList().map(x => {
        keys[x] = this.entity[x]
      })
      this.form.setFieldsValue(keys)
      this.$refs.dataTree.setSelected({
        title: this.entity.parentName,
        value: this.entity.parentId
      })
    },
    dealInitState (data) {
      const result = {}
      for (const key in data) {
        let x = data[key]
        if (conversionList.includes(key)) {
          x = x === '1'
        }
        result[key] = x
      }
      return result
    },
    dealSaveState (data) {
      const result = {}
      for (const key in data) {
        let x = data[key]
        if (conversionList.includes(key)) {
          x = x ? '1' : '0'
        }
        result[key] = x
      }
      return result
    },
    goBack () {
      this.$router.go(-1)
    },
    handleUploaded (file) {
      this.entity.iconBig = file.uid
    },
    updateAppList (x) {
      const apps = appService.getAllApps()
      let tag = false
      apps.map(item => {
        if (item.appId === x.appId && item.iconBig !== x.iconBig) {
          tag = true
          item.iconBig = x.iconBig
        }
      })
      if (tag) {
        appService.setApps(apps)
        this.$event.broadcast('updateAppSelector')
        this.$event.broadcast('updateLogo')
      }
    },
    save () {
      const _this = this
      this.state.savePadding = true
      this.form.validateFields((error, values) => {
        if (!error) {
          const entity = this.dealSaveState(objectTool.deepClone(_this.entity))
          const data = Object.assign(entity, _this.form.getFieldsValue(this.getAllFormKeyList()))
          Service.doEdit(_this.id, data)
            .finally(() => {
              _this.state.savePadding = false
            })
            .then(x => {
              _this.$message.success('更新成功')
              const currentApp = iopAppService.getCurrentApp()
              if (currentApp.appId === _this.id) {
                _this.setSkinByJson(_this.state.selectedSkin)
              }
              _this.updateAppList(x)
              _this.goBack()
            })
            .catch(e => {
              _this.$message.error(e)
            })
        } else {
          this.state.savePadding = false
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
  }
  .formItem{
    flex:1;
    margin-left:10px
  }
  .box{
    margin:0 auto;
    background:#fff;
    box-sizing: border-box;
    padding:30px;
  }
</style>
