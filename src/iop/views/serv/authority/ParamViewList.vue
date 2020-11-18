<template>
  <div>
    <iop-data-table ref="paramViewList" :table="table" :hiddenTop="true">
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'ParamViewList',
  components: { IopDataTable },
  data () {
    const paramViewListVo = [
      {
        title: '参数名称',
        dataIndex: 'paraName',
        align: 'center',
        sorter: false
      },
      {
        title: '可选值清单',
        align: 'center',
        dataIndex: 'valDef',
        sorter: false
      },
      {
        title: '参数说明',
        align: 'left',
        dataIndex: 'remark',
        sorter: false
      },
      {
        title: '参数类型',
        align: 'left',
        dataIndex: 'paraType',
        sorter: false,
        customRender: (val, row, ind) => {
          return <a-tag color="purple">{ row.paraType }</a-tag>
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.paramsIndex,
        /** rowKey，必填 */
        rowKey: 'paraId',
        /** 不显示序号列 */

        serial: true,
        selectable: false,
        /** 列定义 */
        columns: paramViewListVo,
        actions: false,
        query: {
          methodId: this.$route.query.methodId
        }
      }
    }
  }
}
</script>
