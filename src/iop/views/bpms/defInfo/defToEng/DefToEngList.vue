<template>
  <div style="padding:20px;background:#fff;height:100%;">
    <!-- <a-list :grid="{ gutter: 16, column: 3 }" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item" >
        <a-card >
          <a slot="title">
            <a-avatar icon="desktop" style="backgroundColor:#8768f8;margin-right:10px;" />
            <a style="color:#888">{{ item.engName }}</a>
          </a>
          <a slot="extra" >
            <a-icon key="edit" type="edit" @click="edit(item.id)" style="margin-right:10px;"/>
            <a-icon key="delete" type="delete" @click="remove(item.id)"/>
          </a>
          备注：{{ item.remark }}
        </a-card>
      </a-list-item>
      <a-list-item >
        <a-card @click="add()" class="addCard">
          <div>
            <div>
              <a-icon type="plus"/>
            </div>
            <div>新增</div>
          </div>
        </a-card>
      </a-list-item>
    </a-list> -->
    <a-row :gutter="16">
      <a-col :md="6" :sm="4" v-for="(item,index) in data" :key="index">
        <a-card >
          <a slot="title">
            <a-avatar icon="desktop" style="backgroundColor:#8768f8;margin-right:10px;" />
            <a style="color:#888">{{ item.engName }}</a>
          </a>
          <a slot="extra" >
            <a-icon key="edit" type="edit" @click="edit(item.id)" style="margin-right:10px;"/>
            <a-icon key="delete" type="delete" @click="remove(item.id)"/>
          </a>
          <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
            备注：{{ item.remark }}
          </p>
        </a-card>
      </a-col>
      <a-col :md="6" :sm="4">
        <a-card @click="add()" class="addCard">
          <div>
            <div>
              <a-icon type="plus"/>
            </div>
            <div>新增</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <def-to-eng-form
      ref="defToEngForm"
      :defId="defId"
      :mode="formMode"
      :submitSuccess="load"
    />
  </div>
</template>

<script>
import { IopDataTable } from '@/iop/components'
import MessageUtils from '@/utils/message'
import { iopBpmsDefInfoService } from '@/iop/service'

import DefToEngForm from './DefToEngForm'
export default {
  /** 定义与引擎 列表 */
  name: 'DefToEngList',
  data () {
    return {
      data: [],
      formMode: 'create',
      /** 表单主键id */
      id: '',
      defId: ''
    }
  },
  components: { IopDataTable, DefToEngForm },
  methods: {
    async load (id) {
      id ? this.defId = id : this.defId = this.$route.query.defid
      try {
        const res = await iopBpmsDefInfoService.getDefToEngList(this.defId)
        this.data = res.data
      } catch (error) {
        MessageUtils.error(error)
      }
    },
    /**
     * 点击新建按钮事件
     */
    add () {
      this.formMode = 'create'
      // 先赋值，后显示
      this.$refs.defToEngForm.show(this.formMode)
    },

    /**
     * 点击删除按钮事件
     *
     *  @param {string} id 主键
     */
    remove (id = '') {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            await iopBpmsDefInfoService.delDefToEng(id)
            MessageUtils.success()
            this.load()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} id 主键
     */
    edit (id = '') {
      this.formMode = 'edit'
      this.id = id
      this.$refs.defToEngForm.show(this.formMode, id)
    }

  }

}

</script>
<style scoped>
.addCard {
  text-align: center;
  border: 1px dashed #979797;
  background: #F2F2F2;
  cursor: pointer;
  min-height: 140px;
  line-height: 45px;
}
</style>
