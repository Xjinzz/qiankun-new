<template>
  <div>
    <view-gaine
      :depeatId="id"
      :detailId="detailId"
      :mode="mode"
      :depeatCode="code"
      :treeSelectCode="treeSelectCode"
      :treeSelectId="treeSelectId"
      :hideRealtion="true"
    >
      <template #baseForm>
        <a-card title="基本信息">
          <info-view
            :id="id"
            :detailId="detailId"
            :mode="mode"
            :code="code"
            :treeSelectCode="treeSelectCode"
            :treeSelectId="treeSelectId"
            ref="infoView"
            :submitConvertor="submitConvertor"
            :loadConvertor="loadConvertor"
          >
            <template #appendFormItem>
              <a-row :gutter="48">
                <a-col :span="12">
                  <a-form-item label="算法公式">
                    <div style="display:flex;">
                      <a-textarea style="flex:1" v-model="entity.algo"></a-textarea>
                      <a-button type="primary" @click="showFormulaModal" style="margin-left:10px">
                        公式
                      </a-button>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </template>
          </info-view>
          <a-row style="text-align:center">
            <a-button v-if="mode===define.MODE.EDIT || mode===define.MODE.CREATE" :loading="savePadding" type="primary" @click="save">
              提交
            </a-button>
            <a-button @click="goBack">
              取消
            </a-button>
          </a-row>
        </a-card>
      </template>
    </view-gaine>
    <formula-modal @submitHandle="wenSubmitHandle" ref="formulaModal" />
  </div>
</template>
<script>
import ViewGaine from '@/iop-drms/views/resource-definition/comp/ViewGaine'
import infoView from '@/iop-drms/views/resource-definition/comp/Info'
import formulaModal from './comp/formulaModal'

import Define from '@/iop-drms/views/resource-definition/tool/define'
export default {
  components: {
    ViewGaine,
    infoView,
    formulaModal
  },
  data () {
    return {
      define: Define,
      savePadding: false,
      entity: {
        algo: ''
      }
    }
  },
  computed: {
    id () {
      return this.$route.query.id || ''
    },
    detailId () {
      return this.$route.query.detailId || ''
    },
    mode () {
      return this.$route.query.mode || Define.MODE.CREATE
    },
    code () {
      return this.$route.query.code || ''
    },
    treeSelectCode () {
      return this.$route.query.treeSelectCode || ''
    },
    treeSelectId () {
      return this.$route.query.treeSelectId || ''
    }
  },
  methods: {
    wenSubmitHandle (val) {
      this.entity.algo = val
    },
    showFormulaModal () {
      this.$refs.formulaModal.show()
    },
    goBack () {
      this.$router.go(-1)
    },
    submitConvertor (val) {
      val.algo = this.entity.algo
      return val
    },
    loadConvertor (entity) {
      this.entity.algo = entity.algo || ''
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
