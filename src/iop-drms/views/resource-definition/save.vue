<template>
  <a-card
    :title="mode===define.MODE.CREATE ? '新建' : '修改'"
  >
    <info-view
      :id="id"
      :detailId="detailId"
      :mode="mode"
      :code="code"
      :treeSelectCode="treeSelectCode"
      :treeSelectId="treeSelectId"
      ref="infoView"
    >
      <a-row slot="infoBtnGroup" style="text-align:center">
        <a-button :loading="savePadding" type="primary" @click="save">
          提交
        </a-button>
        <a-button @click="goBack">
          取消
        </a-button>
      </a-row>
    </info-view>
  </a-card>
</template>
<script>
import infoView from './comp/Info'
import Define from './tool/define'
export default {
  components: {
    infoView
  },
  data () {
    return {
      savePadding: false,
      define: Define
    }
  },
  computed: {
    /**
     * @description 请求信息的id 对应objectid
     * @requires
     * @readonly
     * @returns { String } query.id
     */
    id () {
      return this.$route.query.id || ''
    },
    /**
     * @description 修改或者查看时候的详情id 对应数据id
     * @readonly
     * @returns { String } query.detailId
     * @default ''
     */
    detailId () {
      return this.$route.query.detailId || ''
    },
    /**
     * @description 表单状态
     * @requires
     * @readonly
     * @returns { String } query.mode
     * @default create
     *  create => 新增
     *  edit => 修改
     *  view => 查看
     */
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    /**
     * @description objectCode请求form接口使用
     * @requires
     * @readonly
     * @returns { String } query.code
     * @default ''
     */
    code () {
      return this.$route.query.code || ''
    },
    // tree选中的节点code
    treeSelectCode () {
      return this.$route.query.treeSelectCode || ''
    },
    // tree选中的节点Id
    treeSelectId () {
      return this.$route.query.treeSelectId || ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    save () {
      const _this = this
      this.savePadding = true
      this.$refs.infoView.saveForm()
        .finally(() => {
          this.savePadding = false
        })
        .then(x => {
          _this.goBack()
        })
    }
  }
}
</script>
<style lang="less" scoped></style>
