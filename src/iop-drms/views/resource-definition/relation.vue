<template>
  <div>
    <a-card title="详情">
      <div class="tab">
        <div class="tabColumn">
          <div
            class="tabTitle"
            :class="selecter && (item.objectId==selecter.objectId) ? 'current':''"
            v-for="(item, index) in relationList"
            :key="index"
            @click="toggleTab(item)"
          >
            {{ item.objectName }}
          </div>
        </div>
        <div class="tabContent">
          <!-- 一对多 -->
          <p v-if="selecter && selecter.type===define.RELATIONTYPE.LIST">
            <info-table
              :id="selecter.objectId"
              :relationValue="selecter.relationValue"
              :attrCode="selecter.attrCode"
              :code="selecter.objectCode"
              :mode="mode"
            />
          </p>
          <!-- 一对一 -->
          <p v-else-if="selecter && selecter.type===define.RELATIONTYPE.INFO">
            <info-view
              :id="selecter.objectId"
              :detailId="selecter.relationValue"
              :mode="mode"
              :code="selecter.objectCode"
              :ref="selecter.objectId+'-'+index"
              :attrCode="selecter.attrCode"
              :relationValue="selecter.relationValue"
            >
              <a-row slot="infoBtnGroup" style="text-align:center">
                <a-button v-show="mode===define.MODE.EDIT" :loading="saveChildrenPadding" type="primary" @click="saveChildren(selecter, index)">
                  提交
                </a-button>
              </a-row>
            </info-view>
          </p>
          <a-spin v-else/>
        </div>
      </div>
      <a-row style="text-align:center">
        <a-button @click="goBack">
          取消
        </a-button>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import infoView from './comp/Info'
import InfoTable from './comp/InfoTable'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import Define from './tool/define'
import { objectTool } from 'mwutil'
export default {
  components: {
    infoView,
    InfoTable
  },
  data () {
    return {
      selecter: null,
      relationList: [],
      define: Define,
      saveChildrenPadding: false
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
     * @description objectCode请求form接口使用
     * @requires
     * @readonly
     * @returns { String } query.code
     * @default ''
     */
    code () {
      return this.$route.query.code || ''
    },
    mode () {
      return this.$route.query.mode || ''
    }
  },
  mounted () {
    Service.getRelationList({
      id: this.detailId,
      objectId: this.id
    })
      .then(x => {
        x.unshift({
          relationValue: this.detailId,
          objectCode: this.code,
          objectId: this.id,
          type: Define.RELATIONTYPE.INFO,
          objectName: '基本信息'
        })
        this.relationList = x
        this.$nextTick(() => {
          this.selecter = this.toggleTab(this.relationList[0])
        })
      })
  },
  methods: {
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
    toggleTab (item) {
      // 判断非当前tab
      if (!objectTool.equalsObject((this.selecter ? this.selecter : {}), item)) {
        this.selecter = null
        this.$nextTick(() => {
          this.selecter = item
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tab{
  width: 100%;
  display: flex;
  justify-content: space-around;
  .tabColumn{
    line-height:40px;
    user-select:none;
    .tabTitle{
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
    flex:1;
    margin-left:10px
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
