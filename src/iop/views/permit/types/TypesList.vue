<template>
  <div>
    <div class="page">
      <iop-data-card-list
        style="width: 100%"
        ref="typesList"
        :table="table"
        :hiddenTop="true"
        :permission="permission"
        @onAction="onAction"
        :tree="true"
      >
        <template #tree>
          <types-tree ref="typesTree" @onSelect="onTreeSelect" />
        </template>
        <template #content="{ record }">
          <div>
            <a-avatar class="card-avatar" slot="avatar" icon="key" />
            <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
              <ellipsis :length="14">{{ record.typeName }}</ellipsis>
            </span>
          </div>
          <div style="margin-top: 10px;">类型编码：{{ record.typeCode }}</div>
          <div style="margin-top: 10px;">节点类型：{{ record.authUrl ? '授权对象' : '授权目录' }}</div>
        </template>

        <template #rowButtons="{ record }">
          <a @click="edit(record.typeId)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
          <a @click="deleteData(record.typeId)"><a-icon style="margin-right: 5px;" type="delete" />删除</a>
        </template>
      </iop-data-card-list>
    </div>
    <types-form
      v-if="appId !== ''"
      ref="typesForm"
      :mode="formMode"
      :id="id"
      :appId="appId"
      :treeUrl="treeUrl"
      :parentId="parentId"
      :parentName="parentName"
      :submitSuccess="submitSuccess"
    >
    </types-form>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import { IopDataDictSelect, IopDataCardList, IopEllipsis } from '@/iop/components'
import { iopPermitService } from '@/iop/service/index'
import TypesForm from './TypesForm'
import path from '@/iop/api/index'
import typesTree from './TypesTree'

const tableQueryName = 'parentId'
export default {
  name: 'TypesList',
  components: {
    IopDataDictSelect,
    IopDataCardList,
    Ellipsis: IopEllipsis,
    ATree: Tree,
    TypesForm,
    typesTree
  },
  data () {
    return {
      table: {
        url: path.permit.types.list,
        rowKey: 'typeId'
      },
      permission: ['create', 'edit', 'remove'],
      hideTree: false,
      treeData: [
        {
          name: '全部',
          id: '0'
        }
      ],
      listData: [],
      formMode: 'create',
      id: '',
      replaceFields: {
        title: 'name',
        key: 'id'
      },
      parentId: '0',
      parentName: '',
      treeUrl: '',
      appChange: true,
      selectedKeys: [],
      appId: ''
    }
  },
  mounted () {
    this.selectedKeys = [this.appId]
  },
  methods: {
    onTreeSelect ({ key }, appId) {
      this.appId = appId
      this.selectedNode = key
      this.$refs.typesList.reload({
        [tableQueryName]: key,
        appId: this.appId
      })
    },
    getList (params) {
      this.$refs.typesList.search(Object.assign({ appId: this.appId, parentId: this.parentId ? this.parentId : '0' }, params))
    },
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.create()
          break
      }
    },
    // 编辑
    edit (id) {
      this.id = id
      this.formMode = 'edit'
      this.$refs.typesForm.show()
    },
    // 删除
    deleteData (id) {
      this.$confirm({
        title: '提示',
        content: '确定要删除 ?',
        onOk: () => {
          iopPermitService.deleteData(id).then(res => {
            this.appChange = false
            this.$nextTick(() => {
              this.appChange = true
              this.treeData = [{
                name: '全部',
                id: '0'
              }]
              this.getList()
              this.getTree(this.appId, this.parentId)
              this.selectedKeys = [this.parentId]
            })
          }).catch(e => {
            this.$message.error(e)
          })
        }
      })
    },
    // 新增
    create () {
      this.formMode = 'create'
      this.id = ''
      this.$refs.typesForm.show()
    },
    // 表单提交成功后
    submitSuccess () {
      this.appChange = false
      this.$nextTick(() => {
        this.appChange = true
        this.treeData = [{
          name: '全部',
          id: '0'
        }]
        this.getList()
        this.getTree(this.appId, this.parentId)
        this.selectedKeys = [this.parentId]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  cursor:pointer;
}
.ellpsis {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.page{
  width: 100%;
  height: 100%;
  display: flex;
  .treeHide {
    width: 35px;
    padding: 20px 15px;
    box-sizing: border-box;
  }
  .leftTree {
    width: 260px;
    flex-shrink: 0;
    // border-right: 1px solid #ccc;
    padding: 20px 15px;
    box-sizing: border-box;
    background: #fff;
  }
  .treeTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(24,144,255,0.65);
    .treeTit {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba(24,144,255,0.65);
      margin: 0;
    }
  }
  .treeIpt {
    width:100%;
    padding: 19px 0 14px 0;
    box-sizing: border-box;
  }
  .cardList {
    flex-grow: 1;
    flex-basis: 0;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-left:10px;
    background: #fff;
    .listItem {
      width: 350px;
      height: 180px;
      flex-shrink: 1;
      background: #fff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
      margin-left: 20px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .itemTop {
        width:100%;
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #e9e9e9;
        display: flex;
        flex-direction: column;
        .titName {
          width:100%;
          height: 40px;
          font-size: 16px;
          font-weight: 400;
          line-height: 40px;
          overflow: hidden;
          flex-shrink: 1;
        }
        .capacity {
          width: 100%;
          height: 30px;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          flex-shrink: 1;
        }
        .code {
          width: 100%;
          height: 30px;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
          // overflow: hidden;
          flex-shrink: 1;
        }
      }
      .itemBottom {
        width: 100%;
        height: 45px;
        flex-shrink: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .addCard {
      width: 350px;
      height: 180px;
      margin-left: 20px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f2f2f2;
      border: 1px dashed #979797;
      border-radius: 2px;
      border-radius: 2px;
      .text {
        color: #000;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
