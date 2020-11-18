<template>
  <div style="display:flex">
    <a-col :span="8" style="margin-right:10px">
      <a-card title="配置表单">
        <a-form :form="form" ref="skinForm">
          <a-form-item label="皮肤编码" v-bind="formItemLayout">
            <a-input placeholder="请输入皮肤编码" v-decorator="['skinCode', {rules: rules.skinCode}]" />
          </a-form-item>
          <a-form-item label="皮肤名称" v-bind="formItemLayout">
            <a-input placeholder="请输入皮肤名称" v-decorator="['skinName', {rules: rules.skinName}]" />
          </a-form-item>
          <a-form-item label="导航背景" v-bind="formItemLayout">
            <div class="setting-drawer-index-blockChecbox">
              <a-tooltip>
                <template slot="title">暗色</template>
                <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                  <img src="@/assets/layout/dark.svg" alt="dark"/>
                  <div class="setting-drawer-index-selectIcon" v-if="entity.json.navTheme === 'dark'">
                    <a-icon type="check" />
                  </div>
                </div>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">亮色</template>
                <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                  <img src="@/assets/layout/light.svg" alt="light" />
                  <div class="setting-drawer-index-selectIcon" v-if="entity.json.navTheme !== 'dark'">
                    <a-icon type="check" />
                  </div>
                </div>
              </a-tooltip>
            </div>
          </a-form-item>
          <a-form-item label="主题色" v-bind="formItemLayout" style="display: flex;align-items: center;">
            <a-tooltip
              class="setting-drawer-theme-color-colorBlock"
              v-for="(item, index) in dataSource.colorList"
              :key="index"
            >
              <template slot="title">{{ item.key }}</template>
              <a-tag :color="item.color" @click="changeColor(item.color, item.colorKey)">
                <a-icon type="check" v-if="item.color === entity.json.primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </a-form-item>
          <a-form-item label="导航模式" v-bind="formItemLayout">
            <div class="setting-drawer-index-blockChecbox">
              <a-tooltip>
                <template slot="title">侧边栏导航</template>
                <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                  <img src="@/assets/layout/sidemenu.svg" alt="sidemenu" />
                  <div class="setting-drawer-index-selectIcon" v-if="entity.json.layoutMode === 'sidemenu'">
                    <a-icon type="check" />
                  </div>
                </div>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">顶部栏导航</template>
                <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                  <img src="@/assets/layout/topmenu.svg" alt="topmenu" />
                  <div class="setting-drawer-index-selectIcon" v-if="entity.json.layoutMode !== 'sidemenu'">
                    <a-icon type="check" />
                  </div>
                </div>
              </a-tooltip>
            </div>
          </a-form-item>
          <a-form-item label="内容区域宽度" v-bind="formItemLayout">
            <a-tooltip>
              <template slot="title">该设定仅 [顶部栏导航] 时有效</template>
              <a-select v-model="entity.json.contentWidth">
                <a-select-option value="Fixed">固定</a-select-option>
                <a-select-option value="Fluid" v-if="entity.json.layoutMode !== 'sidemenu'">流式</a-select-option>
              </a-select>
            </a-tooltip>
          </a-form-item>
          <a-form-item label="固定头部" v-bind="formItemLayout">
            <a-switch v-model="entity.json.fixedHeader"/>
          </a-form-item>
          <a-form-item label="下滑隐藏头部" v-bind="formItemLayout">
            <a-tooltip placement="top" title="下滑时隐藏 Header">
              <a-switch :disabled="!entity.json.fixedHeader" v-model="entity.json.autoHideHeader"/>
            </a-tooltip>
          </a-form-item>
          <a-form-item label="固定侧边菜单" v-bind="formItemLayout">
            <a-switch :disabled="(entity.json.layoutMode === 'topmenu')" v-model="entity.json.fixSiderbar"/>
          </a-form-item>
          <a-form-item label="色弱模式" v-bind="formItemLayout">
            <a-switch v-model="entity.json.colorWeak"/>
          </a-form-item>
          <a-form-item label="多页签模式" v-bind="formItemLayout">
            <a-switch v-model="entity.json.multiTab"/>
          </a-form-item>
          <a-form-item label="备注" v-bind="formItemLayout">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: rules.remark}]" />
          </a-form-item>
        </a-form>
        <a-row style="text-align:center">
          <a-button v-if="mode !== 'view'" @click="saveForm" type="primary">提交</a-button>
          <a-button @click="goBack">返回</a-button>
        </a-row>
      </a-card>
    </a-col>
    <a-card title="预览" style="flex:1;">
      <div style="display:flex;align-items:center">
        <iop-sys-skin-preview
          style="border:1px solid #c8c8c8;vertical-align:center"
          :multi-tab="entity.json.multiTab"
          :layout-mode="entity.json.layoutMode"
          :color="entity.json.primaryColorKey"
          :color-weak="entity.json.colorWeak"
          :theme="entity.json.navTheme"
        />
      </div>
    </a-card>
  </div>
</template>
<script>
import { IopDataForm, IopSysSkinPreview } from '@/iop/components'
import { colorList } from '@/iop/views/settings/layout/settingConfig'
import Service from '@/iop/service/settings/settings'
import { objectTool } from 'mwutil'
import Define from './Define'
const formFieldList = [
  'skinName',
  'skinCode',
  'remark'
]
export default {
  name: 'SkinForm',
  components: { IopDataForm, IopSysSkinPreview },
  data () {
    return {
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      dataSource: {
        colorList
      },
      rules: {
        skinCode: [{ required: true, whitespace: true, message: '不能为空' }, { max: 200, message: '皮肤编码最多200字' }],
        skinName: [{ required: true, whitespace: true, message: '不能为空' }, { max: 200, message: '皮肤名称最多200字' }],
        remark: [{ max: 500, message: '备注最多500字' }]
      },
      form: this.$form.createForm(this),
      entity: {
        skinCode: '',
        skinName: '',
        json: Define.DEFAULT_THEME,
        remark: ''
      }
    }
  },
  computed: {
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    skinId () {
      return this.$route.query.skinId || ''
    }
  },
  mounted () {
    if (this.mode === Define.MODE.EDIT || this.mode === Define.MODE.VIEW) {
      this.getInfo(this.skinId)
    }
  },
  watch: {
    'entity.json.fixedHeader': {
      handler (newValue) {
        if (!newValue) {
          this.entity.json.autoHideHeader = false
        }
      }
    }
  },
  methods: {
    changeColor (color, key) {
      this.entity.json.primaryColor = color
      this.entity.json.primaryColorKey = key
    },
    goBack () {
      this.$router.go(-1)
    },
    submitForm () {
      this.$refs.skinForm.submitForm()
    },
    submitSuccess () {
      this.$message.success('保存成功')
      this.goBack()
    },
    handleMenuTheme (theme = '') {
      this.$set(this.entity.json, 'navTheme', theme)
    },
    handleLayout (layout) {
      if (this.entity.json.layoutMode === layout) return
      this.entity.json.contentWidth = 'Fixed'
      this.$set(this.entity.json, 'layoutMode', layout)
      this.$set(this.entity.json, 'fixSiderbar', false)
    },
    getInfo (id) {
      Service.getSkinV2(id)
        .then(x => {
          this.setEntity(x)
          const formValue = {}
          formFieldList.forEach(x => {
            formValue[x] = this.entity[x]
          })
          this.form.setFieldsValue(formValue)
        })
    },
    setEntity (data) {
      if (data.json) {
        data.json = JSON.parse(data.json)
      } else {
        data.json = Define.DEFAULT_THEME
      }
      delete data.skinId
      this.entity = data
    },
    getSaveParams () {
      const entity = objectTool.deepClone(this.entity)
      if (this.mode === Define.MODE.EDIT) {
        entity.skinId = this.skinId
      }
      return Object.assign(entity, {
        json: JSON.stringify(this.entity.json)
      }, this.form.getFieldsValue(formFieldList))
    },
    // 保存
    saveForm () {
      this.form.validateFields((err) => {
        if (!err) {
          Service.saveSkinV2(this.getSaveParams())
            .then(x => {
              this.$message.success('保存成功')
              this.goBack()
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 18px;
    height: 18px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 6px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
// }

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
