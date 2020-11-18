<template>
  <div>
    <iop-data-table ref="skinList" :table="table" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="皮肤编码">
              <a-input @pressEnter="search" v-model="queryParam.skinCode" placeholder="请输入皮肤编码" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="皮肤名称">
              <a-input @pressEnter="search" v-model="queryParam.skinName" placeholder="请输入皮肤名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record.skinId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.skinId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import skinListVO from './vo/skin-list-vo'
import Define from './Define'
export default {
  name: 'SkinList',
  components: { IopDataTable },
  data () {
    return {
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.system.skin.index,
        /** rowKey，必填 */
        rowKey: 'skinId',
        /** 列定义 */
        columns: skinListVO
      },
      /** 表格组件按钮权限 */
      // 'view', 'remove', 'removeSelected'
      permission: ['create', 'edit'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      skinId: ''
    }
  },
  methods: {
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },

    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.skinList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    },

    /**
     * 打开新建窗口
     */
    handleCreate () {
      // // 改变弹出框标题
      // this.formMode = 'create'
      // // 显示弹出框
      // this.$refs.skinForm.show('新增')
      // // 清空表单项
      // this.skinId = ''
      this.$goPage('sys/skin/save', {
        mode: Define.MODE.CREATE,
        skinId: ''
      })
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} skinId 主键
     */
    async handleEdit (skinId = '') {
      // this.formMode = 'edit'
      // this.$refs.skinForm.show()
      // this.skinId = skinId
      this.$goPage('sys/skin/save', {
        mode: Define.MODE.EDIT,
        skinId: skinId
      })
    },

    /**
     * 打开查看窗口
     * @param {string} skinId 主键
     */
    async handleView (skinId = '') {
      this.$goPage('sys/skin/save', {
        mode: Define.MODE.VIEW,
        skinId: skinId
      })
    }
  }

}
</script>
