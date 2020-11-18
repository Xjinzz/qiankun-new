<template>
  <div>
    <iop-data-table ref="physicsList" :removeUrl="removeUrl" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入文件名称" />
          </a-col>
        </a-row>
      </template>
      <template #removeButton="{ record }">
        <a href="javascript:;" @click="handleRemove(record)">删除</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="handleReName(record)">重命名</a>
            </a-menu-item>
            <a-menu-item v-if="record.fileType !== '文件'">
              <a href="javascript:;" @click="handleFolder(record)">统计</a>
            </a-menu-item>
            <a-menu-item v-if="record.fileType !== '目录'">
              <a href="javascript:;" @click="handleDown(record)">下载</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新增目录</a-button>
        <a-button type="primary" @click="handleMerge()">合并目录</a-button>
        <a-button type="primary" @click="handleMove()">移动</a-button>
        <a-button type="primary" @click="handleImport()">导入</a-button>
        <a-button type="primary" @click="handleExport()">导出</a-button>
      </template>
      <template #removeSelectedButton>
        <a-button type="primary" @click="handleRemoveSelected()">删除</a-button>
      </template>
    </iop-data-table>
    <physicsForm ref="physicsForm" @submitSuccess="submitSuccess"></physicsForm>
    <folder ref="folder"></folder>
    <move v-if="showMove" ref="move" @search="search"></move>
    <merge v-if="showMerge" ref="merge" @search="search"></merge>
    <import-file v-if="showImport" ref="importFile" @search="search"></import-file>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import physicsListVO from './vo/physics-list-vo'
import physicsForm from './PhysicsForm'
import folder from './Folder'
import move from './Move'
import files from '@/iop/service/file/files'
import merge from './Merge'
import importFile from './ImportFile'
import { iopTokenService } from '@/iop/service/index'
export default {
  name: 'CtlgsList',
  components: { IopDataTable, physicsForm, folder, move, merge, importFile },
  data () {
    return {
      showMerge: true,
      showMove: true,
      table: {
        /** 列表查询地址 */
        url: path.file.files.physicsList,
        /** rowKey，必填 */
        rowKey: 'filePath',
        /** 列定义 */
        columns: physicsListVO,
        actionsWidth: 150,
        query: {
          filePath: '/'
        }
      },
      removeUrl: path.file.files.filesDelete,
      queryParam: {
        filePath: '',
        fileName: ''
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      fileId: '',
      selcetOne: true,
      selectedRowKeys: [],
      selectTreeKey: '',
      selectType: true,
      showImport: true
    }
  },
  methods: {
    show (code) {
      this.selectTreeKey = code
      this.queryParam = { filePath: code, fileName: '' }
      if (this.selcetOne) {
        this.selcetOne = !this.selcetOne
      } else {
        this.search()
      }
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      const code = this.queryParam.filePath
      this.queryParam = {}
      this.queryParam = { filePath: code }
      this.search()
    },
    /**
     * 搜索
     */
    async search (fileName = '') {
      try {
        await this.$refs.physicsList.reload(Object.assign(this.queryParam, { fileName }))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
      this.$emit('reloadNode')
    },
    /**
     * 表格选中
     */
    onAction ({ data = {} }) {
      this.selectType = true
      this.selectedRowKeys = data.original.selectedRowKeys
      const arr = data.original.selectedRows
      for (var key in arr) {
        if (arr[key].fileType === '文件') {
          this.selectType = false
        }
      }
    },
    /**
     * 新增
     */
    handleCreate () {
      this.$refs.physicsForm.show('create', this.queryParam.filePath, '', '新增文件夹')
    },
    /**
     * 删除
     */
    handleRemove (record) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          files.filesDelete({ filePaths: record.filePath }).then((res) => {
            this.submitSuccess()
          }).catch((err) => {
            this.$message.error(err)
          })
        }
      })
    },
    // 批量删除
    handleRemoveSelected () {
      this.$confirm({
        title: `确定删除吗`,
        onOk: () => {
          files.filesDelete({ filePaths: this.selectedRowKeys }).then((res) => {
            this.submitSuccess()
          }).catch((err) => {
            this.$message.error(err)
          })
        }
      })
    },
    /**
     * 重命名
     */
    handleReName (record) {
      this.$refs.physicsForm.show('edit', record.filePath, record.fileName, record.fileType === '目录' ? '修改目录名称' : '修改文件名称')
    },
    /**
     * 统计
     */
    handleFolder (record) {
      this.$refs.folder.show(record.filePath)
    },
    /**
     * 移动文件夹
     */
    handleMove () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择要移动的文件夹')
      } else {
        this.showMove = false
        this.$nextTick(() => {
          this.showMove = true
          this.$nextTick(() => {
            this.$refs.move.show(this.selectedRowKeys)
          })
        })
      }
    },
    /**
     * 合并文件夹
     */
    handleMerge () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择要合并的文件夹')
      } else if (!this.selectType) {
        this.$message.warning('合并目录操作只能选择目录')
      } else {
        this.showMerge = false
        this.$nextTick(() => {
          this.showMerge = true
          this.$nextTick(() => {
            this.$refs.merge.show(this.selectedRowKeys)
          })
        })
      }
    },
    /**
     * 导入
     */
    handleImport () {
      this.showImport = false
      this.$nextTick(() => {
        this.showImport = true
        this.$nextTick(() => {
          this.$refs.importFile.show(this.selectTreeKey)
        })
      })
    },
    /**
     * 下载
     */
    handleDown (record) {
      const url = `${path.file.files.filesDown}?filePath=${record.filePath}`
      this.downLown(url)
    },
    /**
     * 导出
     */
    handleExport () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择要导出的文件或目录')
      } else {
        const url = `${path.file.files.filesExport}?filePaths=${this.selectedRowKeys}`
        this.downLown(url)
        this.clearSelected()
      }
    },
    /**
     * 下载方法
     */
    downLown (url) {
      const token = iopTokenService.getCurrentToken()
      url += `&token=${token}`
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.click()
    },
    clearSelected () {
      this.$refs.physicsList.clearSelected()
      this.selectedRowKeys = []
    }
  }
}
</script>
