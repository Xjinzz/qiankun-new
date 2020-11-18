<template>
  <div>
    <a-modal
      title="公式"
      width="850px"
      :visible="formulaModal"
      :destroyOnClose="true"
      @cancel="hide"
    >
      <a-form :form="form">
        <!--
        <a-form-item label="当前指标" v-bind="layout">
        <p>指标一</p>
        </a-form-item>
        -->
        <a-form-item label="下级指标" v-bind="layout">
          <!--
          <a-tag v-for="item in picList" :key="item.value" closable @close="removePic(item)">
          {{ item.name }}
          </a-tag>
          -->
          <a-button type="primary" @click="showPicChangeModal" style="margin-left:10px">
            选择指标
          </a-button>
          <!--
          <a-button type="primary" @click="showPreViewModal" style="margin-left:10px">
          查看指标
          </a-button>
          -->
        </a-form-item>
        <a-form-item label="表单式设置" v-bind="layout">
          <a-row>
            <a-textarea style="height:120px" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="calculateStr"/>
          </a-row>
          <!--
          <a-row>
          <a-button type="primary" @click="showSelect">选择公式</a-button>
          <a-button type="primary">保存表达式</a-button>
          <a-button style="margin-left:10px" @click="addPen(0)">+</a-button>
          <a-button style="margin-left:10px" @click="addPen(1)">-</a-button>
          <a-button style="margin-left:10px" @click="addPen(2)">*</a-button>
          <a-button style="margin-left:10px" @click="addPen(3)">/</a-button>
          </a-row>
          -->
        </a-form-item>
        <!--
        <a-form-item label="公式预览" v-bind="layout">
        <a-input />
        </a-form-item>
        -->
      </a-form>
      <template #footer>
        <div style="text-align:center;">
          <a-button @click="hide">取消</a-button>
          <a-button type="primary" @click="submitHandle">确定</a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      title="指标选择"
      width="850px"
      :visible="changeModal"
      :destroyOnClose="true"
      @cancel="hidePicChangeModal"
    >
      <iop-data-table
        ref="changeModalTable"
        :table="table"
        @onAction="onAction"
      >
        <template #top>
          <a-col :span="8">
            <a-form-item label="指标名称">
              <a-input @pressEnter="searchChandeModal" v-model="changModalEntity.indexName"/>
            </a-form-item>
          </a-col>
          <a-col class="search-buttons">
            <a-button @click="searchChandeModal" type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-col>
        </template>
      </iop-data-table>
      <template #footer>
        <div style="text-align:center;">
          <a-button @click="confirmChangeModal" type="primary">选择指标</a-button>
          <a-button @click="hidePicChangeModal">取消</a-button>
        </div>
      </template>
    </a-modal>
    <!--
    <a-modal
    title="选择公式"
    width="850px"
    :visible="selectModal"
    :destroyOnClose="true"
    @cancel="hideSelect"
    >
    <a-radio-group v-model="selectValue">
    <a-radio v-for="item in formulaList" style="display:block;height:30px;line-height:30px" :value="item.value" :key="item.value">
    {{ item.name }}
    </a-radio>
    </a-radio-group>
    <template #footer>
    <div style="text-align:center;">
    <a-button @click="submitSelect" type="primary">确定</a-button>
    <a-button @click="hideSelect">取消</a-button>
    </div>
    </template>
    </a-modal>
    -->
    <!--
    <a-modal
    title="指标预览"
    width="850px"
    :visible="previewModal"
    :destroyOnClose="true"
    @cancel="hidePreview"
    >
    <a-table :pagination="false" :columns="preColumns" :data-source="picList">
    </a-table>
    <template #footer>
    <div style="text-align:center;">
    <a-button @click="hidePreview">取消</a-button>
    </div>
    </template>
    </a-modal>
    -->
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
// import { arrayTool } from 'mwutil'
// const Enum = {
//   formulaList: [
//     {
//       name: 'SUM',
//       value: 'SUM'
//     },
//     {
//       name: 'SUM2',
//       value: 'SUM2'
//     }
//   ]
// }
export default {
  components: {
    IopDataTable
  },
  data () {
    return {
      // 指标弹窗
      changeModal: false,
      // 公式弹窗
      // selectModal: false,
      // 预览弹窗
      // previewModal: false,
      // 主弹窗
      formulaModal: false,
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this),
      // 公式数据源
      // formulaList: Enum.formulaList,
      // 公式选中value
      // selectValue: '',
      // 表达式
      calculateStr: '',
      // 选择指标entity
      changModalEntity: {
        indexName: ''
      },
      // 选中指标列表
      changeModalSelected: [],
      // 指标表格列
      preColumns: [
        {
          title: '指标名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '指标值',
          dataIndex: 'value',
          key: 'value'
        }
      ],
      // 指标选中list
      picList: [],
      table: {
        /** 列表查询地址 */
        url: '/iop/drms/data-manage/data/indexInfo1/page/list/f63e47ac737f8faa0173891c881c00c2',
        /** rowKey，必填 */
        rowKey: (record, index) => record.urId,
        /** 显示序号列 */
        serial: true,
        /** 列定义 */
        columns: [
          {
            title: '所属单位',
            dataIndex: 'deptId',
            align: 'center'
          },
          {
            title: '指标名称',
            dataIndex: 'indexName',
            align: 'center'
          },
          {
            title: '指标编码',
            dataIndex: 'indexCode',
            align: 'center'
          }
        ]
      }
    }
  },
  methods: {
    // 添加运算符
    // addPen (tag) {
    //   const sign = {
    //     0: '+',
    //     1: '-',
    //     2: '*',
    //     3: '/'
    //   }
    //   this.addCalculateStr(sign[tag])
    // },
    // 展示
    show () {
      this.formulaModal = true
    },
    // 展示指标
    showPicChangeModal () {
      this.changeModal = true
    },
    // 展示选择公式
    // showSelect () {
    //   this.selectModal = true
    // },
    // 展示预览指标
    // showPreViewModal () {
    //   this.previewModal = true
    // },
    // 隐藏指标选择
    hidePicChangeModal () {
      this.changeModal = false
    },
    // 隐藏
    hide () {
      this.formulaModal = false
    },
    //  隐藏公式选择
    // hideSelect () {
    //   this.selectModal = false
    // },
    // 隐藏预览指标
    // hidePreview () {
    //   this.previewModal = false
    // },
    // 提交
    submitHandle () {
      this.$emit('submitHandle', this.calculateStr)
      this.hide()
    },
    // 增加表达式设置
    addCalculateStr (str) {
      this.calculateStr += str
    },
    // 选择公式
    // submitSelect () {
    //   const str = this.selectValue + `(${arrayTool.getSimpleValuesByField(this.picList, 'name').join(',')})`
    //   this.addCalculateStr(str)
    //   this.selectValue = ''
    //   this.hideSelect()
    // },
    // addPic (item) {
    //   if (!arrayTool.getSimpleValuesByField(this.picList, 'value').includes(item.value)) {
    //     this.picList.push(item)
    //   }
    // },
    addPic (item) {
      this.addCalculateStr(item.value)
    },
    // 选择指标提交
    confirmChangeModal () {
      // this.changeModalSelected.forEach(x => {
      if (this.changeModalSelected.length !== 1) {
        this.$message.error('请选择一条数据')
        return
      }
      const x = this.changeModalSelected[0]
      this.addPic({
        name: x.deptId + '#' + x.indexCode,
        value: x.deptId + '#' + x.indexCode
      })
      // })
      this.hidePicChangeModal()
      // this.$nextTick(() => {
      //   this.changeModalSelected = []
      // })
    },
    // 删除指标
    // removePic (item) {
    //   this.picList = arrayTool.removeItem(this.picList, item)
    // },
    // 指标表格变化
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onSelectedChange': this.selectChange(data.original.selectedRows)
      }
    },
    selectChange (rows) {
      this.changeModalSelected = rows
    },
    // 查询指标
    searchChandeModal () {
      this.$refs.changeModalTable.reload(this.changModalEntity)
    }
  }
}
</script>
