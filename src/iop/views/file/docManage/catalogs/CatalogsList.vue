<template>
  <div>
    <iop-data-card-list ref="catalogsList" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <div style="width: 100%; text-align: center;">
          <a-input-search
            enter-button="搜索"
            v-model="ctlgName"
            @search="search"
            placeholder="请输入名称"
            style="width:50%; margin: 0 auto;"
            allowClear />
        </div>
      </template>

      <template #content="{ record }">
        <div>
          <a-avatar class="card-avatar" slot="avatar" icon="key" />
          <span style="margin-left: 15px;font-size: 16px;color: rgba(0,0,0,0.85);">
            <ellipsis :length="14">{{ record.ctlgName }}</ellipsis>
          </span>
        </div>
        <div style="margin-top: 10px;">分配空间：{{ record.capacity }} GB</div>
        <div style="margin-top: 10px;">编码：{{ record.ctlgCode }}</div>
      </template>

      <template #rowButtons="{ record }">
        <a @click="edit(record.ctlgId)"><a-icon style="margin-right: 5px;" type="edit" />编辑</a>
        <a @click="issue(record.ctlgId, record.ctlgName)"><a-icon style="margin-right: 5px;" type="branches" />发布</a>
        <a @click="deleteData(record.ctlgId)"><a-icon style="margin-right: 5px;" type="delete" />删除</a>
      </template>
    </iop-data-card-list>
    <a-modal v-model="visible" title="发布" :destroyOnClose="true" :afterClose="cancel">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="选择系统">
          <a-select v-model="appId" style="width: 100%" @change="changeApp">
            <a-select-option v-for="(item, ind) in appOpt" :value="item.appId" :key="ind" >{{ item.appName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="菜单名称">
          <a-input placeholder="请输入菜单名称" v-decorator="['progName', { rules: [{ required: true, whitespace: true, message: '菜单名称不能为空' }] }]"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="父级菜单">
          <iop-data-tree-select
            v-if="appChange"
            ref="progParentId"
            :url="treeUrl"
            :placeHolderSelected="placeHolderSelected"
            v-decorator="['progParentId']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="图标名称">
          <a-input placeholder="请输入图标名称" v-decorator="['progIcon']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="排序号">
          <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]" />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button @click="cancel">取消</a-button>
        <a-button @click="save" type="primary">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { iopAppService, iopCatalogsService } from '@/iop/service/index'
import { IopDataTreeSelect, IopDataCardList, IopEllipsis } from '@/iop/components'
import path from '@/iop/api/index'
export default {
  name: '',
  components: {
    IopDataTreeSelect,
    IopDataCardList,
    Ellipsis: IopEllipsis
  },
  data () {
    return {
      table: {
        url: path.file.catalogs.table,
        rowKey: 'ctlgId',
        query: {
          currentLoginAppId: this.appId
        }
      },
      permission: ['create', 'edit', 'remove'],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      ctlgName: '',
      appOpt: iopAppService.getAllApps(),
      dbClickFlag: [],
      listData: [],
      visible: false,
      issueId: '',
      replaceFields: {
        title: 'name',
        key: 'id'
      },
      appId: iopAppService.getCurrentApp().appId,
      treeUrl: '',
      appChange: true,
      placeHolderSelected: {
        title: '请选择',
        value: this.appId,
        key: this.appId
      },
      issueName: '',
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.loadList()
    this.treeUrl = `${path.file.catalogs.menuTree}?currentLoginAppId=${this.appId}`
  },
  methods: {
    loadList (params = {}) {
      this.$refs.catalogsList.search(params)
    },
    // 搜索
    search (val) {
      this.ctlgName = val
      this.loadList({
        ctlgName: this.ctlgName
      })
    },
    // 清空搜索
    clearSearch () {
      console.log(1)
      this.ctlgName = ''
      this.loadList()
    },
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.create()
          break
      }
    },
    // 新增
    create () {
      this.$goPage('file/catalogsForm', {
        mode: 'create'
      })
    },
    // 编辑
    edit (ctlgId) {
      this.$goPage('file/catalogsForm', {
        mode: 'edit',
        ctlgId: ctlgId
      })
    },
    // 发布
    issue (ctlgId, name) {
      this.issueId = ctlgId
      this.issueName = name
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue({
            progName: this.issueName
          })
        }, 100)
      })
      this.visible = true
    },
    // 取消发布
    cancel () {
      this.appId = this.appOpt[0].appId
      this.form.resetFields()
      this.visible = false
    },
    // 保存发布
    save (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!values.progParentId) {
            values.progParentId = '0'
          }
          Object.assign(values, { ctlgId: this.issueId })
          iopCatalogsService.issue(values).then(res => {
            this.$message.success('发布成功')
            this.cancel()
          })
        }
      })
    },
    // 切换系统
    changeApp (val) {
      this.appChange = false
      this.appId = val
      this.treeUrl = `${path.file.catalogs.menuTree}?currentLoginAppId=${val}`
      this.$nextTick(() => {
        this.appChange = true
      })
    },
    // selectProgParentId (val) {
    //   this.progParentId = val
    // },
    // 删除
    deleteData (id) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          iopCatalogsService.del(id).then(res => {
            if (res.success) {
              this.$message.success('删除成功')
              this.loadList()
            }
          }).catch(error => {
            this.$message.error(error)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  margin-bottom: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topText {
    width: 30%;
    padding-left: 15px;
    box-sizing: border-box;
  }
}
.active {
  cursor:pointer;
}
.listContent {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .listItem {
    width: 280px;
    height: 180px;
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
      padding: 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      .topLeft{
        flex:9;
        display: flex;
        padding-top:20px;
        box-sizing: border-box;
        .leftIcon{
          flex: 2;
          .titIcon {
            width: 32px;
            height: 32px;
            margin-left: 17px;
            text-align: center;
            line-height: 32px;
            border-radius: 100%;
            background: #8a8a8a;
            color: #fff;
          }
        }
        .leftContent{
          flex: 8;
          margin-left: 13px;
          .titName {
            width:100%;
            height: 30px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: PingFangSC-Medium;
            font-size: 20px;
            font-weight: 600;
            line-height: 30px;
          }
          .capacity {
            width: 100%;
            height: 30px;
            font-size: 18px;
            line-height: 30px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ctlgCode {
            width: 100%;
            height: 30px;
            font-size: 18px;
            line-height: 30px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .topRight{
        flex:1;
        .titT {
          width: 14px;
          height: 100%;
          font-size: 14px;
          color: #8a8a8a;
        }
      }
    }
    .itemBottom {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .addCard {
    width: 280px;
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
</style>
