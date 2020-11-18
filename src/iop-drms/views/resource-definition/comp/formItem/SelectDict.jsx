import Define from '../../tool/define'
import { IopDataDictSelect } from '@/iop/components'
const Components = {
  IopDataDictSelect
}
const Props = {
  data: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
}

const Methods = {
  reset () {
    this.$refs['selectDict' + this.data.symbalId].cleanSelected()
  }
}

const Render = function (h) {
  const bindValue = {
    on: {
      ...this.$listeners
    },
    attrs: { ...this.$attrs }
  }
  // 如果包含数据源则不能用字典组件 需要自己写组件
  // if (this.data.dataSource && this.data.dataSource.length > 0 && this.data.dataSource !== 'null' && this.data.dataSource !== '[]') {
  //   return (
  //     <a-form-item label={this.data.title}>
  //       <a-select
  //         v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
  //       >
  //         {
  //           this.data.dataSource.map(x => {
  //             return (
  //               <a-select-option value={x.value}>
  //                 {x.title}
  //               </a-select-option>
  //             )
  //           })
  //         }
  //       </a-select>
  //     </a-form-item>
  //   )
  // } else {
  return (
    <a-form-item label={this.data.title}>
      <iop-data-dict-select
        type={this.data.typeCode}
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        placeholder={this.data.placeholder}
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
        ref={'selectDict' + this.data.symbalId}
        { ...bindValue }
      />
    </a-form-item>
  )
  // }
}
export default {
  components: Components,
  props: Props,
  render: Render,
  methods: Methods
}
