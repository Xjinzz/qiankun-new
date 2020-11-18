<template>
  <a-modal
    :title="dialogTitle"
    centered
    v-model="visible"
    :footer="null"
    :width="1100"
  >
    <info-view
      :id="id"
      :detailId="detailId"
      :mode="mode"
      :code="code"
      :treeSelectCode="treeSelectCode"
      :treeSelectId="treeSelectId"
      :attrCode="attrCode"
      :relationValue="relationValue"
      ref="infoView"
    >
      <a-row slot="infoBtnGroup" style="text-align:center">
        <a-button :loading="savePadding" type="primary" @click="save">
          提交
        </a-button>
        <a-button @click="cancel">
          取消
        </a-button>
      </a-row>
    </info-view>
  </a-modal>

</template>
<script>
import infoView from './Info'
import Define from '../tool/define'
export default {
  components: {
    infoView
  },
  props: {
    id: {
      required: true,
      type: String
    },
    code: {
      required: true,
      type: String
    },
    treeSelectCode: {
      required: false,
      type: String,
      default: () => ''
    },
    treeSelectId: {
      required: false,
      type: String,
      default: () => ''
    },
    attrCode: {
      required: true,
      type: String
    },
    relationValue: {
      required: true,
      type: String
    }

  },
  data () {
    return {
      savePadding: false,
      visible: false,
      define: Define,
      mode: Define.MODE.CREATE,
      detailId: ''
    }
  },
  computed: {
    dialogTitle () {
      const titleList = {
        [Define.MODE.CREATE]: '新建',
        [Define.MODE.EDIT]: '修改',
        [Define.MODE.DETAIL]: '查看'
      }
      return titleList[this.mode]
    }
  },
  methods: {
    show (mode, options) {
      this.mode = mode
      if (this.mode === Define.MODE.DETAIL || this.mode === Define.MODE.EDIT) {
        this.detailId = options.detailId
      }
      this.$nextTick(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.infoView.reload()
        })
      })
    },
    cancel () {
      this.visible = false
    },
    save () {
      const _this = this
      this.savePadding = true
      this.$refs.infoView.saveForm()
        .finally(() => {
          this.savePadding = false
        })
        .then(x => {
          _this.cancel()
          _this.$emit('save')
        })
    }
  }
}
</script>
<style lang="less" scoped></style>
