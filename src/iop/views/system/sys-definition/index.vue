<template>
  <div>
    <iop-data-card-list
      ref="sysDefinition"
      :tree="true"
      :table="table"
      :buttons="true"
    >
      <template #top>
        <a-form ref="searchForm" layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="分类">
                <a-radio-group v-model="searchModel.systype">
                  <a-radio
                    v-for="(item,index) in dataSource.sysType"
                    :key="index"
                    :value="item.key"
                  >
                    {{ item.val }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="系统名称">
                <a-input @pressEnter="search" placeholder="请输入系统名称" v-model="searchModel.appName" allowClear />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :span="8">
                <a-form-item label="系统编码">
                  <a-input @pressEnter="search" placeholder="请输入系统编码" v-model="searchModel.appCode" allowClear />
                </a-form-item>
              </a-col>
            </template>
            <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button @click="resetSearch()">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '高级' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </a-col>
          </a-row>
        </a-form>
      </template>
      <template #tree>
        <iop-data-tree
          ref="iopDataTree"
          :url="dataUrl.tree"
          queryName="id"
          @onSelect="selectByAsyncTree"
          :analysis="converterTree"
        >
        </iop-data-tree>
      </template>
      <template #headerButtons>
        <a-button type="primary" @click="doCreateSys">新增系统</a-button>
        <a-button type="primary" @click="doCreateComp">新增组件</a-button>
        <a-button type="primary" @click="doCreateGroup">新增分组</a-button>
      </template>
      <template #content="{ record }">
        <div style="display:flex;align-items:center">
          <iop-preview style="display:block" v-model="record.iconBig" :options="preViewOption">
            <div>
              <a-avatar class="card-avatar" slot="avatar" icon="profile" />
            </div>
          </iop-preview>
          <span class="ellipsis" style="flex:1;margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            {{ record.appName }}
          </span>
        </div>
        <a-row class="ellipsis" style="margin-top: 10px;">
          系统编码：{{ record.appCode }}
        </a-row>
        <a-row class="ellipsis" style="margin-top: 10px;">
          上下文：{{ record.appContext }}
        </a-row>
        <a-row style="margin-top: 10px;">
          内部系统 <a-switch checked-children="是" un-checked-children="否" :checked="record.appType === '1'" disabled />
        </a-row>
      </template>
      <template #rowButtons="{ record }">
        <a @click="doViewItem(record.appId)"><a-icon style="margin-right: 5px;" type="eye" />查看</a>
        <a @click="doEditItem(record.appId)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
        <a @click="doDelItem(record.appId)"><a-icon style="margin-right: 5px;" type="delete" />删除</a>
      </template>
    </iop-data-card-list>
    <!--
    <iop-sys-skin-preview style="width:800px"></iop-sys-skin-preview>
    -->
  </div>
</template>
<script>
import Service from '@/iop/service/system/sys-definition'
import Path from '@/iop/api/index'
// IopSysSkinPreview
import { IopDataTree, IopDataCardList, IopPreview } from '@/iop/components'
import { objectTool } from 'mwutil'
const __searchModel = {
  systype: '',
  appName: '',
  appCode: ''
}
export default {
  // customRender:(text,row,index)=>{}
  components: {
    IopDataTree,
    IopDataCardList,
    IopPreview
    // IopSysSkinPreview
  },
  mounted () {
    this.dataSource.sysType = Service.getSysType()
    // this.reloadPage()
  },
  data () {
    return {
      preViewOption: {
        width: '32px',
        height: '32px',
        circle: true
      },
      table: {
        url: Path.sysDefinition.currency,
        rowKey: 'appId'
      },
      // 查询条件
      searchModel: objectTool.deepClone(__searchModel),
      // 数据源
      dataSource: {
        sysType: []
      },
      // url管理器
      dataUrl: {
        tree: Path.sysDefinition.asyncTree
      },
      // 业务私有代码
      state: {
        treeSelectorId: '0',
        customList: {
          9: 'shua',
          0: 'shub',
          1: 'shuc'
        }
      },
      advanced: false
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    converterTree (treeData) {
      treeData.forEach(item => {
        item.iconType = 'custom'
        item.icon = this.state.customList[item.type || '9']
      })
      return treeData
    },
    // getIconProxy (type) {
    //   if (type === '9' || type === null) {
    //     type = 2
    //   }
    //   return this.getIconItem(type)
    // },
    // 获取icon
    // getIconItem (type) {
    //   return this.state.customList[type]
    // },
    reloadPage () {
      this.search()
      this.reloadTree()
    },
    reloadTree () {
      this.$refs.iopDataTree.reload()
    },
    // 查询
    search () {
      const model = objectTool.deepClone(this.searchModel)
      this.state.treeSelectorId && (model.parentId = this.state.treeSelectorId)
      this.$nextTick(() => {
        this.$refs.sysDefinition.reload(model)
      })
    },
    // 重置
    resetSearch () {
      this.searchModel = objectTool.deepClone(__searchModel)
      // this.search()
    },
    // 选择树
    selectByAsyncTree ({ key }) {
      this.state.treeSelectorId = key
      this.$nextTick(() => {
        this.search()
      })
    },
    // 创建系统
    doCreateSys () {
      this.$goPage('sys/app/createSys')
      // this.$router.push('/iop/sys/app/createSys')
    },
    // 创建组件
    doCreateComp () {
      this.$goPage('sys/app/createComp')
    },
    // 创建分组
    doCreateGroup () {
      this.$goPage('sys/app/createGroup')
    },
    // 查看单条
    doViewItem (id) {
      this.$goPage(`sys/app/sysDefinitionSave`, {
        mode: 'view',
        id: id
      })
    },
    // 修改单条
    doEditItem (id) {
      this.$goPage(`sys/app/sysDefinitionSave`, {
        mode: 'edit',
        id: id
      })
    },
    // 删除单条
    doDelItem (id) {
      const _this = this
      this.$confirm({
        title: '确定删除吗',
        onOk () {
          return new Promise((resolve, reject) => {
            Service.doRemove(id)
              .then(x => {
                _this.reloadPage()
                resolve()
                _this.$message.success('删除成功')
              })
              .catch(e => {
                resolve()
                _this.$message.error('删除失败')
              })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
