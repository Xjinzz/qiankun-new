<template>
  <div>
    <a-row class="contineBox">
      <a-col :span="5" class="contineTitle">
        菜单
      </a-col>
      <a-col :span="19">
        <a-checkbox-group v-model="entity.menusList">
          <a-col
            :span="6"
            v-for="(item,index) in dataSource.menusList"
            :key="index"
          >
            <a-checkbox :value="item.key" :disabled="item.key==='0'" :checked="item.key<4">
              {{ item.val }}
            </a-checkbox>
          </a-col>
        </a-checkbox-group>
      </a-col>
    </a-row>
    <a-row class="contineBox">
      <a-col :span="5" class="contineTitle">
        角色
      </a-col>
      <a-col :span="19">
        <a-row>
          <span>
            是否创建超级管理员：
            <a-switch
              v-model="entity.createRoot"
              size="small"
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </span>
        </a-row>
        <a-checkbox-group v-model="entity.roleList" style="width:100%;margin-top:10px">
          <a-col
            :span="6"
            v-for="(item,index) in dataSource.roleList"
            :key="index"
          >
            <a-checkbox :value="item.key">
              {{ item.val }}
            </a-checkbox>
          </a-col>
        </a-checkbox-group>
      </a-col>
    </a-row>
    <a-row class="contineBox">
      <a-col :span="5" class="contineTitle">
        用户
      </a-col>
      <a-col :span="19">
        <a-row v-show="entity.createRoot" style="margin-bottom:10px">
          <label style="line-height:35px">
            超级管理员
          </label>
          <iop-data-tree-select
            ref="deptTree"
            :url="dataUrl.userTree"
            style="display:inline-block;width:150px;margin-left:15px"
            @onSelect="({ key })=>{selectUser('0',key)}"
          />
          <span style="margin-left:10px">
            <a-tag color="pink">全部菜单</a-tag>
          </span>
        </a-row>
        <a-row
          v-for="(item) in dataSource.roleList"
          :key="'roleItem'+item.key"
          v-show="getCompShow(item.key)"
          style="margin-bottom:10px"
        >
          <label style="line-height:35px">
            {{ item.val }}
          </label>
          <iop-data-tree-select
            ref="deptTree"
            :url="dataUrl.userTree"
            style="display:inline-block;width:150px;margin-left:15px"
            @onSelect="({ key })=>{selectUser(item.key,key)}"
          />
          <span style="margin-left:10px">
            <a-tag
              v-for="menusItem in getMenusByRole(item.key)"
              :key="'roleMenus'+menusItem.val"
              :color="entity.menusList.includes(menusItem.key) ? 'pink' : ''"
            >
              {{ menusItem.val }}
            </a-tag>
          </span>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { objectTool, arrayTool } from 'mwutil'
// import define from '../define'
import path from '@/iop/api'
import { IopDataTreeSelect } from '@/iop/components'
const entity = {
  menusList: ['0'],
  createRoot: false,
  roleList: [],
  userList: []
}
export default {
  components: {
    IopDataTreeSelect
  },
  props: {
    dataSource: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      entity: objectTool.deepClone(entity),
      state: {
        userList: {
          0: '',
          1: '',
          2: '',
          3: ''
        }
      },
      dataUrl: {
        userTree: path.sysDefinition.userTree
      }
    }
  },
  methods: {
    // 根据角色权限获取菜单
    getMenusByRole (roleKey) {
      return this.dataSource.menusList.filter((item) => {
        return item.roleKey.includes(roleKey)
      })
    },
    // 获取数据
    getData () {
      const result = objectTool.deepClone(this.entity)
      // 如果是选择创建超级管理员
      if (this.entity.createRoot) {
        result.roleList.unshift('0')
      }
      for (const key in this.state.userList) {
        const element = this.state.userList[key]
        if (element) {
          result.userList.push({
            userId: element,
            role: key
          })
        }
      }
      console.log(result)
      return result
    },
    // 重置表单
    reset () {
      this.entity = objectTool.deepClone(entity)
    },
    // 联动角色和用户
    getCompShow (item) {
      return arrayTool.findIndex(this.entity.roleList, parseInt(item)) !== -1
    },
    // 选择用户
    selectUser (userKey, value) {
      this.state.userList[userKey] = value
    },
    validate (cb) {
      if (this.entity.roleList.length === 0 && this.entity.createRoot === false) {
        const msg = '请至少选择一个角色'
        this.$message.error(msg)
      } else {
        const _validateArr = arrayTool.deepClone(this.entity.roleList)
        this.entity.createRoot && _validateArr.unshift('0')
        const result = {
          success: true,
          messgae: '校验成功'
        }
        const roleMapList = {
          '0': '超级管理员',
          '1': '系统管理员',
          '2': '权限管理员',
          '3': '审计管理员'
        }
        for (const item of _validateArr) {
          if (!this.state.userList[item]) {
            result.success = false
            result.messgae = '已勾选' + roleMapList[item] + '但是并未选择用户'
            break
          }
        }
        if (!result.success) {
          this.$message.error(result.messgae)
        }
        cb(result)
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
