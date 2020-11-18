<template>
  <div>
    <a-row>
      <h4>1 基本信息</h4>
      <div style="width:90%;margin:0 auto;text-align:left;">
        <a-row>
          <a-col :span="8" class="ellipsis">
            系统编号：{{ infoData.appCode }}
          </a-col>
          <a-col :span="8" class="ellipsis">
            系统名称：{{ infoData.appName }}
          </a-col>
          <a-col :span="8">
            内部系统：
            <a-switch checked-children="是" un-checked-children="否" disabled :checked="infoData.appType?true:false"/>
          </a-col>
        </a-row>
        <a-row style="margin-top:10px">
          <a-col :span="8" class="ellipsis">
            上下文根：{{ infoData.appContext }}
          </a-col>
        </a-row>
      </div>
    </a-row>
    <a-row v-if="infoData.appType" class="mar10">
      <h4>2 系统初始化</h4>
      <a-row class="contineBox">
        <a-col :span="5" class="contineTitle">
          菜单
        </a-col>
        <a-col :span="19">
          <a-col
            :span="6"
            v-for="(item,index) in filterList(dataSource.menusList,infoData.menusList)"
            :key="index"
          >
            <a-checkbox :value="item.key" disabled checked>
              {{ item.val }}
            </a-checkbox>
          </a-col>
        </a-col>
      </a-row>
      <a-row class="contineBox">
        <a-col :span="5" class="contineTitle">
          角色
        </a-col>
        <a-col :span="19">
          <a-col v-if="infoData.createRoot" :span="6">
            <a-checkbox disabled checked>
              系统管理员
            </a-checkbox>
          </a-col>
          <a-col
            :span="6"
            v-for="(item,index) in filterList(dataSource.roleList,infoData.roleList)"
            :key="index"
          >
            <a-checkbox disabled checked>
              {{ item.val }}
            </a-checkbox>
          </a-col>
        </a-col>
      </a-row>
    </a-row>
    <a-row v-if="infoData.appType">
      <h4>3 基础配置</h4>
      <div style="width:90%;margin:0 auto">
        <a-row>
          <a-col :span="8">
            是否同步：
            <!--
            <a-checkbox
            v-for="(item,index) in dataSource.syncList"
            :key="index"
            :value="item.key"
            disabled
            checked
            >
            {{ item.val }}
            </a-checkbox>
            -->
            <a-switch checked-children="是" un-checked-children="否" disabled :checked="infoData.isAccept?true:false"/>
          </a-col>
          <a-col v-if="infoData.isAccept" :span="8" class="ellipsis">
            机构节点：{{ infoData.acceptDeptSelectItem ? infoData.acceptDeptSelectItem.name:'' }}
          </a-col>
          <a-col :span="7" class="flex">
            <span style="margin-top:4px">系统皮肤：</span><iop-data-dict-select disabled style="flex:1" type="skin" v-model="infoData.skinId"></iop-data-dict-select>
          </a-col>
          <a-col v-if="infoData.isAccept" :span="8">
            同步用户：
            <!--
            <a-checkbox
            v-for="(item,index) in dataSource.syncList"
            :key="index"
            :value="item.key"
            disabled
            checked
            >
            {{ item.val }}
            </a-checkbox>
            -->
            <a-switch checked-children="是" un-checked-children="否" disabled :checked="infoData.acceptUser?true:false"/>
          </a-col>
        </a-row>
        <!--
        <a-row class="mar10">
        <a-col :span="24" class="flex box-row-check">
        <label style="width:100px">
        系统依赖组件:
        </label>
        <a-col style="flex:1">
        <a-row
        v-for="(item,index) in filterList(dataSource.rektCompList,infoData.rektCompList)"
        :key="index">
        <a-checkbox
        :value="item.key"
        disabled
        checked
        >
        {{ item.val }}
        </a-checkbox>
        </a-row>
        </a-col>
        </a-col>
        </a-row>
        -->
      </div>
    </a-row>
  </div>
</template>
<script>
import { IopDataDictRadio, IopDataTreeSelect, IopDataDictSelect } from '@/iop/components'
export default {
  props: {
    infoData: {
      type: Object,
      required: true
    },
    dataSource: {
      type: Object,
      required: true
    }
  },
  components: {
    IopDataDictRadio,
    IopDataTreeSelect,
    IopDataDictSelect
  },
  methods: {
    // 过滤列表内选中的
    filterList (arr, filterList) {
      return arr.filter((item) => {
        if (filterList) {
          return filterList.includes(item.key)
        }
        return ''
      })
    },
    validate (cb) {
      // TODO: 需要对所有数据进行校验时候需要执行
      const result = {
        success: true,
        message: '校验成功'
      }
      cb(result)
    }
  }
}
</script>
<style scoped>
.box-row-check >>> .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left:0!important;
}
</style>
<style lang="less" scoped>
.ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.flex{
  display:flex;
}
.mar10{
  margin-top:10px
}
.contineBox{
  padding-top:20px;
  padding-bottom:20px;
  display:flex;
  line-height:100%;
  align-items: center;
  &:not(:last-child){
    border-bottom:1px solid #f2f2f2;
  }
  .contineTitle{
    font-size: 16px;
    color: rgba(0,0,0,0.50);
    text-align: center;
  }
}
</style>
