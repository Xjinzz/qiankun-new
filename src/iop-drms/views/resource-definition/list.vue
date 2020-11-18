<template>
  <!-- 列表页 -->
  <div>
    <iop-data-card-list ref="cardTableList" :table="table" :autoLoad="false">
      <template #top>
        <a-row class="search">
          <a-col :span="12" :offset="6">
            <a-input-search
              placeholder="请输入名称"
              allowClear
              @search="search"
              v-model="searchValue"
              enterButton="搜索"
              size="large"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-tabs
            default-active-key="1"
            @change="changeTab"
            class="resource-list-cc7f6240997211eabb370242ac130002"
          >
            <a-tab-pane
              v-for="(item) in tab.dataSource"
              :key="item.id"
              :tab="item.name"
            >
            </a-tab-pane>
          </a-tabs>
        </a-row>
      </template>
      <template #content="{ record }">
        <div>
          <a-avatar class="card-avatar" slot="avatar" icon="profile" />
          <span class="ellipsis" style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            {{ record.objectName }}
          </span>
        </div>
        <div style="margin-top: 10px;" class="ellipsis">
          资源领域：{{ record.objectDomain }}
        </div>
        <div style="margin-top: 10px;" class="ellipsis">
          授权权限：{{ record.accessRights }}
        </div>
        <div style="margin-top: 10px;" class="ellipsis">
          资源数量：{{ record.count }}
        </div>
        <div style="margin-top: 10px;" class="ellipsis">
          发布时间：{{ record.releaseTime }}
        </div>
      </template>
      <template #rowButtons="{ record }">
        <a @click="doEdit(record)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
      </template>
    </iop-data-card-list>
  </div>
</template>
<script>
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import { IopDataCardList } from '@/iop/components/index'
import path from '@/iop-drms/api/index'
import Define from './tool/define'
import { iopAppService } from '@/iop/service/index'
export default {
  components: {
    IopDataCardList
  },
  data () {
    return {
      searchValue: '',
      tab: {
        dataSource: [],
        // 当前的tab页
        crt: 1
      },
      table: {
        url: '',
        rowKey: 'objectId'
      }
    }
  },
  mounted () {
    this.search()
    Service.getTabList({
      catalogType: this.$route.meta.para ? this.$route.meta.para : ''
    })
      .then(x => {
        this.tab.dataSource = x
        this.$nextTick(() => {
          if (this.tab.dataSource[0]) {
            this.changeTab(this.tab.dataSource[0].id)
          }
        })
      })
      .catch(e => {

      })
  },
  methods: {
    changeTab (activeKey) {
      // 如果传来activeKEY
      if (activeKey) {
        this.tab.crt = activeKey
      }
      this.$nextTick(() => {
        this.search()
      })
    },
    doEdit (item) {
      this.$goPage(Define.PAGEURL.SEARCH, {
        id: item.objectId,
        code: item.objectCode,
        from: encodeURIComponent(this.$route.fullPath.replace(`/${iopAppService.getCurrentAppCode()}/`, ''))
      })
    },
    async search () {
      this.table.url = `${path.resource.list}/${this.tab.crt}`
      this.$refs.cardTableList.reload({ name: this.searchValue })
    }
  }
}
</script>
<style>
  .resource-list-cc7f6240997211eabb370242ac130002 {
    background:#fff
  }
  .resource-list-cc7f6240997211eabb370242ac130002 .ant-tabs-bar {
    margin: 0px!important;
  }
</style>
<style lang="less" scoped>
  .search{
    padding-top:20px;
    padding-bottom:20px;
    background:#fff;
    text-align: center;
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
