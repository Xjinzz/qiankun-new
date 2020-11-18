<template>
  <div>
    <a-form-item label="导航背景">
      <div class="setting-drawer-index-blockChecbox">
        <a-tooltip>
          <template slot="title">暗色</template>
          <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
            <img src="@/assets/layout/dark.svg" alt="dark"/>
            <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>

        <a-tooltip>
          <template slot="title">亮色</template>
          <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
            <img src="@/assets/layout/light.svg" alt="light" />
            <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
      </div>
    </a-form-item>
    <a-form-item label="主题色">
      <a-tooltip
        class="setting-drawer-theme-color-colorBlock"
        v-for="(item, index) in colorList"
        :key="index"
      >
        <template slot="title">{{ item.key }}</template>
        <a-tag :color="item.color" @click="changeColor(item.color)">
          <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
        </a-tag>
      </a-tooltip>
    </a-form-item>
    <a-form-item label="导航模式">
      <div class="setting-drawer-index-blockChecbox">
        <a-tooltip>
          <template slot="title">侧边栏导航</template>
          <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
            <img src="@/assets/layout/sidemenu.svg" alt="sidemenu" />
            <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">顶部栏导航</template>
          <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
            <img src="@/assets/layout/topmenu.svg" alt="topmenu" />
            <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
      </div>
    </a-form-item>
    <a-list :split="false">
      <a-list-item>
        <a-tooltip slot="actions">
          <template slot="title">该设定仅 [顶部栏导航] 时有效</template>
          <a-select
            size="small"
            style="width: 80px;"
            :defaultValue="contentWidth"
            @change="handleContentWidthChange"
          >
            <a-select-option value="Fixed">固定</a-select-option>
            <a-select-option value="Fluid" v-if="layoutMode !== 'sidemenu'">流式</a-select-option>
          </a-select>
        </a-tooltip>
        <a-list-item-meta>
          <div slot="title">内容区域宽度</div>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-switch
          slot="actions"
          size="small"
          :defaultChecked="fixedHeader"
          @change="handleFixedHeader"
        />
        <a-list-item-meta>
          <div slot="title">固定 Header</div>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-switch
          slot="actions"
          size="small"
          :disabled="!fixedHeader"
          :defaultChecked="autoHideHeader"
          @change="handleFixedHeaderHidden"
        />
        <a-list-item-meta>
          <a-tooltip slot="title" placement="left">
            <template slot="title">固定 Header 时可配置</template>
            <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">下滑时隐藏 Header</div>
          </a-tooltip>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-switch
          slot="actions"
          size="small"
          :disabled="(layoutMode === 'topmenu')"
          :defaultChecked="fixSiderbar"
          @change="handleFixSiderbar"
        />
        <a-list-item-meta>
          <div
            slot="title"
            :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
          >固定侧边菜单</div>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-switch
          slot="actions"
          size="small"
          :defaultChecked="colorWeak"
          @change="onColorWeak"
        />
        <a-list-item-meta>
          <div slot="title">色弱模式</div>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-switch
          slot="actions"
          size="small"
          :defaultChecked="multiTab"
          @change="onMultiTab"
        />
        <a-list-item-meta>
          <div slot="title">多页签模式</div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { updateTheme, updateColorWeak, colorList } from './settingConfig'
import { mixin, mixinDevice } from '@/utils/mixin'
import { DetailList } from '@/components'
import config from '@/config/defaultSettings'

export default {
  name: 'SettingLayout',
  components: { DetailList },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      colorList
    }
  },
  mounted () {
    updateTheme(this.primaryColor)
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
  },
  methods: {
    handleMenuTheme (theme = '') {
      this.$store.dispatch('ToggleTheme', theme)
    },

    changeColor (color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color)
        updateTheme(color)
      }
    },

    handleLayout (mode) {
      this.$store.dispatch('ToggleLayoutMode', mode)
      this.handleFixSiderbar(false)
    },

    handleFixSiderbar (fixed = 'topmenu') {
      if (this.layoutMode === 'topmenu') {
        this.$store.dispatch('ToggleFixSiderbar', false)
        return
      }
      this.$store.dispatch('ToggleFixSiderbar', fixed)
    },

    onColorWeak (checked = true) {
      this.$store.dispatch('ToggleWeak', checked)
      updateColorWeak(checked)
    },

    onMultiTab (checked = true) {
      this.$store.dispatch('ToggleMultiTab', checked)
    },

    handleContentWidthChange (type) {
      this.$store.dispatch('ToggleContentWidth', type)
    },

    handleFixedHeader (fixed) {
      this.$store.dispatch('ToggleFixedHeader', fixed)
    },

    handleFixedHeaderHidden (autoHidden) {
      this.$store.dispatch('ToggleFixedHeaderHidden', autoHidden)
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
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
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
