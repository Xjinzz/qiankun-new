import Define from '../../tool/define'
import { IopDataTreeSelect } from '@/iop/components'
import _idSeed from '../../tool/idSeed'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
const Components = {
  IopDataTreeSelect
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
    this.$refs['selectTree' + this.data.symbalId].cleanSelected()
  }
}

const Data = {
  id: _idSeed.newId()
}
const Mounted = function () {
  // 如果是编辑、详情、新增 并且treeSelector、typeCode不为空时 请求选中中文
  if (this.mode === Define.MODE.EDIT || this.mode === Define.MODE.DETAIL || this.mode === Define.MODE.CREATE) {
    this.$nextTick(() => {
      if (this.data.treeSelector && this.data.typeCode) {
        Service.getSelectorName(this.data.typeCode, this.data.treeSelector)
          .then(x => {
            this.$refs[this.id].setSelected({ title: x, value: this.data.treeSelector })
          })
      }
    })
  }
}
const Render = function (h) {
  const bindValue = {
    on: { ...this.$listeners },
    attrs: { ...this.$attrs }
  }
  const treeUrl = `/iop/drms/data-manage/data/obj/${this.data.typeCode}/tree`
  return (
    <a-form-item label={this.data.title}>
      <iop-data-tree-select
        url={treeUrl}
        ref={'selectTree' + this.data.symbalId}
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        queryName="id"
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
        { ...bindValue }
      />
    </a-form-item>
  )
}
export default {
  components: Components,
  props: Props,
  render: Render,
  data: function () {
    return Data
  },
  mounted: Mounted,
  methods: Methods
}
