<template>
  <a-card :title="cardTitle">
    <Tab
      :dataSource="relationList"
      display-name="objectName"
      display-value="objectId"
      v-model="currentTab"
      v-if="mode==define.MODE.EDIT || mode==define.MODE.DETAIL"
    ></Tab>
    <!-- 详情 -->
    <a-row v-if="currentTab==this.id">
      <slot name="baseForm">
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
                <a-button v-show="mode===define.MODE.EDIT || mode===define.MODE.CREATE" :loading="saveChildrenPadding" type="primary" @click="save">
                  提交
                </a-button>
              </slot>
              <slot name="afterConfirm" />
              <slot name="befornCancel" />
              <slot name="cancelBtn">
                <a-button @click="cancel">
                  取消
                </a-button>
              </slot>
              <slot name="afterCancel" />
            </slot>
          </a-row>
        </info-view>
      </slot>
    </a-row>
    <!-- 关联板块 -->
    <template
      v-for="(item, index) in originRelationList"
    >
      <a-row :key="index" v-if="item.objectId==currentTab">
        <slot :name="item.objectId">
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
                <a-button v-show="mode===define.MODE.EDIT" :loading="saveChildrenPadding" type="primary" @click="saveChildren(item, index)">
                  提交
                </a-button>
              </a-row>
            </info-view>
          </p>
        </slot>
      </a-row>
    </template>
    <a-row>
      <slot></slot>
    </a-row>
  </a-card>
</template>
<script>
import infoView from './Info'
import InfoTable from './InfoTable'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import Tab from './Tab'
import Define from '../tool/define'
import { arrayTool } from 'mwutil'
export default {
  props: {
    // 自定义标签list
    paneList: {
      type: Array,
      default: () => []
    },
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
    InfoTable,
    Tab
  },
  data () {
    return {
      originRelationList: [],
      currentTab: this.depeatId,
      selecter: null,
      relationList: [],
      define: Define,
      savePadding: false,
      state: {
        _referRenderFlag: false
      },
      saveChildrenPadding: false
    }
  },
  computed: {
    id () {
      return this.depeatId
    },
    code () {
      return this.depeatCode
    },
    cardTitle () {
      const obj = {
        [Define.MODE.CREATE]: '新增',
        [Define.MODE.EDIT]: '修改',
        [Define.MODE.DETAIL]: '详情'
      }
      return obj[this.mode]
    }
  },
  mounted () {
    this.pageStart()
  },
  methods: {
    pageStart () {
      this.state._referRenderFlag = true
      const baseObj = {
        relationValue: this.detailId,
        objectCode: this.code,
        objectId: this.id,
        type: Define.RELATIONTYPE.INFO,
        objectName: '基本信息'
      }
      let paneList = []
      if (this.mode === Define.MODE.EDIT || this.mode === Define.MODE.DETAIL) {
        if ((this.paneList && this.paneList.length) || this.hideRealtion) {
          if (!this.hideRealtion) {
            paneList = this.paneList
          }
          this.originRelationList = arrayTool.deepClone(paneList)
          paneList.unshift(baseObj)
          this.relationList = paneList
        } else {
          Service.getRelationList({
            id: this.detailId,
            objectId: this.id
          })
            .then(x => {
              this.originRelationList = arrayTool.deepClone(x)
              x.unshift(baseObj)
              this.relationList = x
              this.$nextTick(() => {
                this.state._referRenderFlag = false
              })
            })
        }
      } else {
        this.relationList = [{
          relationValue: this.detailId,
          objectCode: this.code,
          objectId: this.id,
          type: Define.RELATIONTYPE.INFO,
          objectName: '基本信息',
          refName: 'infoView'
        }]
        this.$nextTick(() => {
          this.state._referRenderFlag = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    // 关联数据保存
    saveChildren (item, index) {
      this.saveChildrenPadding = true
      this.$refs[item.objectId + '-' + index][0].saveForm()
        .finally(() => {
          this.saveChildrenPadding = false
        })
    },
    cancel () {
      this.$router.go(-1)
    },
    save () {
      const _this = this
      this.savePadding = true
      this.$refs['infoView'].saveForm()
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
<style lang="less" scoped>
.tab{
  width: 100%;
  .tabColumn{
    line-height:40px;
    user-select:none;
    .tabTitle{
      display:inline-block;
      width:150px;
      cursor: pointer;
      text-align: center;
      &.current{
        background: #e9f7fe;
        color:#4291f7;
      }
    }
  }
  .tabContent{
    margin-top:20px
  }
  .example {
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
}
</style>
