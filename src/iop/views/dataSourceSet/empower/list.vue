<template>
  <a-row style="display:flex;background:#fff;">
    <div style="border-right:1px solid #f2f2f2;width:230px;padding-left:10px;">
      <iop-data-tree
        ref="empowerTree"
        maxHeight="800px"
        :url="treeState.url"
        :loadQuery="treeState.loadQuery"
        :rootNode="{show: false}"
        @onSelect="onSelect"
        :analysis="converterTree"
      />
    </div>
    <div style="flex:1;height:auto">
      <a-tabs default-active-key="0" @change="changeTab">
        <a-tab-pane key="0" tab="结构化数据">
          <a-row style="width:90%;margin: 0 auto;height: auto">
            <a-row style="text-align:center">
              <label style="font-size: 14px;">
                当前数据源：
              </label>
              <a-select
                show-search
                option-filter-prop="children"
                style="width: 80%"
                :filter-option="filterOption"
                @change="handleChange"
                v-model="entity.jndiId"
                :disabled="entity.jndiId!=''"
              >
                <a-select-option
                  v-for="item in dataSource.dataSource"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-row>
            <p style="font-size: 14px;margin-top:30px;">
              系统配置
            </p>
            <config-card
              v-for="(item, index) in dataSource.configList['0']"
              :key="index"
              :isComposition="true"
              :isCreate="false"
              :data="item"
              style="margin-top:20px;"
              @save="addConfig"
              @delete="delConfig"
              @log="showLog"
            >
            </config-card>
            <config-card
              v-if="state.addFlag"
              :isComposition="true"
              :isCreate="true"
              style="margin-top:20px;margin-bottom:20px;"
              @cancel="changeAddFlag"
              @save="addConfig"
            >
            </config-card>
            <a-row v-else @click.native="changeAddFlag" style="margin-bottom:20px;margin-top:20px;line-height:50px;text-align:center;background:#f2f2f2;color:#999">
              <a-icon type="plus" />
            </a-row>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="1" tab="非结构化数据">
          <a-row style="width:90%;margin: 0 auto">
            <p style="font-size: 14px;margin-top:30px;">
              系统配置
            </p>
            <config-card
              v-for="(item, index) in dataSource.configList['1']"
              :key="index"
              :isComposition="false"
              :isCreate="false"
              :data="item"
              style="margin-top:20px;"
              @save="addConfig"
              @delete="delConfig"
              @log="showLog"
            >
            </config-card>
            <config-card
              v-if="state.addFlag"
              :isComposition="false"
              :isCreate="true"
              style="margin-top:20px;margin-bottom:20px;"
              @cancel="changeAddFlag"
              @save="addConfig"
            >
            </config-card>
            <a-row v-else @click.native="changeAddFlag" style="margin-bottom:20px;margin-top:20px;line-height:50px;text-align:center;background:#f2f2f2;color:#999">
              <a-icon type="plus" />
            </a-row>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal width="900" v-model="state.logVisible" title="查看日志">
      <log-search ref="logSearch" :appId="log.appId" :method="log.method" logModel></log-search>
    </a-modal>
  </a-row>
</template>
<script>
import path from '@/iop/api'
import ConfigCard from '../comp/ConfigCard'
import Service from '@/iop/service/dataSourceSet/index'
import LogSearch from '@/iop/views/dataSourceSet/log/logSearch'
import { objectTool } from 'mwutil'
import {
  IopDataTree
} from '@/iop/components'
const Entity = {
  jndiId: ''
}
export default {
  components: {
    IopDataTree,
    ConfigCard,
    LogSearch
  },
  data () {
    return {
      entity: objectTool.deepClone(Entity),
      log: {
        appId: '',
        method: ''
      },
      treeState: {
        url: path.sysDefinition.asyncTree,
        loadQuery: {},
        selector: '',
        selectorCode: ''
      },
      dataSource: {
        dataSource: [
        ],
        configList: {
          '0': [],
          '1': []
        }
      },
      state: {
        addFlag: false,
        activeTab: '0',
        logVisible: false,
        treeSelectorId: '0',
        customList: {
          9: 'shua',
          0: 'shub',
          1: 'shuc'
        }
      }
    }
  },
  mounted () {
    this.getDataSource()
  },
  methods: {
    converterTree (treeData) {
      treeData.forEach(item => {
        item.iconType = 'custom'
        item.icon = this.state.customList[item.type || '9']
      })
      return treeData
    },
    showLog (data) {
      this.state.logVisible = true
      this.log = {
        appId: data.appId,
        method: data.method
      }
      this.$nextTick(() => {
        this.$refs.logSearch.reset()
      })
    },
    delConfig (data) {
      Service.delConfig({
        appId: data.appId,
        method: data.method,
        type: this.state.activeTab
      })
        .then(x => {
          this.$message.success('删除成功')
          this.getConfigList(this.treeState.selector)
        })
    },
    addConfig (data) {
      Service.addConfig(Object.assign(data, {
        appCode: this.treeState.selectorCode,
        appId: this.treeState.selector,
        type: this.state.activeTab
      }))
        .then(x => {
          this.$message.success('保存成功')
          this.state.addFlag = false
          this.getConfigList(this.treeState.selector)
        })
    },
    setEntity (data) {
      this.entity.jndiId = data.jndiId || ''
    },
    // 获取数据源下拉
    getDataSource () {
      Service.getDataSource()
        .then(x => {
          this.dataSource.dataSource = x
        })
    },
    // 树选择
    onSelect ({ key, data }) {
      this.treeState.selector = key
      this.treeState.selectorCode = data.code
      this.getDataSourceById(key)
      this.getConfigList(key)
    },
    // 获取顶部下拉value
    getDataSourceById (key) {
      Service.getDataSourceById(key)
        .then(x => {
          this.setEntity({
            jndiId: x.jndiId
          })
        })
    },
    // 获取下方列表
    getConfigList (key) {
      Service.getConfigList({
        type: this.state.activeTab,
        appId: key
      })
        .then(x => {
          const { result } = x
          this.dataSource.configList[this.state.activeTab] = result
        })
        .catch(e => {
          this.dataSource.configList[this.state.activeTab] = []
        })
    },
    changeAddFlag () {
      this.state.addFlag = !this.state.addFlag
    },
    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.empowerTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.empowerTree.reload()
    },
    // 切换tab
    changeTab (key) {
      this.state.activeTab = key
      this.getConfigList(this.treeState.selector)
    },
    // 数据源选择
    handleChange (key) {
      Service.setDataSource({
        appId: this.treeState.selector,
        jndiId: key
      })
        .then(x => {
        })
        .catch(e => {
          this.$message.error(e)
          this.setEntity({
            jndiId: null
          })
        })
    },
    // 搜索过滤
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
