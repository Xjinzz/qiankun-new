<template>
  <div>
    <a-row>
      <slot name="baseForm">
        <a-card title="基本信息">
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
              <slot name="infoBtnGroup">
                <slot name="beforeConfirm" />
                <slot name="confirmBtn" v-if="mode===define.MODE.EDIT || mode===define.MODE.CREATE">
                  <a-button :loading="savePadding" type="primary" @click="save">
                    提交
                  </a-button>
                </slot>
                <slot name="afterConfirm" />
                <slot name="befornCancel" />
                <slot name="cancelBtn">
                  <a-button @click="goBack">
                    取消
                  </a-button>
                </slot>
                <slot name="afterCancel" />
              </slot>
            </a-row>
          </info-view>
        </a-card>
      </slot>
    </a-row>
    <slot name="relation" v-if="!hideRealtion">
      <a-row v-for="(item, index) in relationList" :key="index">
        <a-card :title="item.objectName">
          <div>
            <!-- 一对多 -->
            <p v-if="item.type===define.RELATIONTYPE.LIST">
              <info-table
                :id="item.objectId"
                :relationValue="item.relationValue"
                :attrCode="item.attrCode"
                :code="item.objectCode"
                :mode="mode"
              />
            </p>
            <!-- 一对一 -->
            <p v-if="item.type===define.RELATIONTYPE.INFO">
              <info-view
                :id="item.objectId"
                :detailId="item.relationValue"
                :mode="mode"
                :code="item.objectCode"
                :ref="item.objectId+'-'+index"
                :attrCode="item.attrCode"
                :relationValue="item.relationValue"
              >
                <a-row slot="infoBtnGroup" style="text-align:center">
                  <a-button v-show="mode===define.MODE.EDIT" :loading="saveRelationPadding" type="primary" @click="saveRelationItem(item, index)">
                    提交
                  </a-button>
                </a-row>
              </info-view>
            </p>
          </div>
        </a-card>
      </a-row>
    </slot>
    <slot></slot>
  </div>
</template>
<script>
import infoView from './Info'
import InfoTable from './InfoTable'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import Define from '../tool/define'
export default {
  props: {
    hideRealtion: {
      type: Boolean,
      default: () => false
    },
    /**
     * @description 请求信息的id 对应objectid
     * @requires
     * @readonly
     * @returns { String } query.id
     */
    depeatId: {
      type: String,
      required: true,
      default: ''
    },
    /**
     * @description 修改或者查看时候的详情id 对应数据id
     * @readonly
     * @returns { String } query.detailId
     * @default ''
     */
    detailId: {
      type: String,
      default: ''
    },
    /**
     * @description 表单状态
     * @default create
     *  create => 新增
     *  edit => 修改
     *  view => 查看
     */
    mode: {
      type: String,
      required: true,
      default: Define.MODE.CREATE
    },
    /**
     * @description objectCode请求form接口使用
     * @requires
     * @default ''
     */
    depeatCode: {
      type: String,
      required: true,
      default: ''
    },
    // tree选中的节点code
    treeSelectCode: {
      type: String,
      default: ''
    },
    // tree选中的节点id
    treeSelectId: {
      type: String,
      default: ''
    }
  },
  components: {
    infoView,
    InfoTable
  },
  data () {
    return {
      relationList: [],
      define: Define,
      savePadding: false,
      saveRelationPadding: false
    }
  },
  mounted () {
    this.pageStart()
  },
  computed: {
    id () {
      return this.depeatId
    },
    code () {
      return this.depeatCode
    }
  },
  methods: {
    pageStart () {
      if (!this.$slots.relation && !this.hideRealtion) {
        Service.getRelationList({
          id: this.detailId,
          objectId: this.id
        })
          .then(x => {
            this.relationList = x
          })
      }
    },
    // 取消
    goBack () {
      this.$router.go(-1)
    },
    // 关联数据保存
    saveRelationItem (item, index) {
      this.saveRelationPadding = true
      this.$refs[item.objectId + '-' + index][0].saveForm()
        .finally(() => {
          this.saveRelationPadding = false
        })
    },
    // 主数据保存
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
