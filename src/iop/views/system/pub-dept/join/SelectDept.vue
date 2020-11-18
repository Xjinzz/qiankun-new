<template>
  <div>
    <a-form :form="form">
      <a-form-item label="机构1" :label-col="{ span: 5, offset: 3 }" :wrapper-col="{ span: 8 }">
        <iop-data-tree-select
          ref="mergeDeptId1"
          :url="treeUrl"
          :selectLeafOnly="true"
          v-decorator="[
            'mergeDeptId1',
            { rules: [{ required: true, whitespace: true, message: '机构不能为空' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="机构2" :label-col="{ span: 5, offset: 3 }" :wrapper-col="{ span: 8 }">
        <iop-data-tree-select
          ref="mergeDeptId2"
          :url="treeUrl"
          :selectLeafOnly="true"
          v-decorator="[
            'mergeDeptId2',
            { rules: [{ required: true, whitespace: true, message: '机构不能为空' }] },
          ]" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 11 }">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import path from '@/iop/api'
import { IopDataTreeSelect } from '@/iop/components'
import MessageUtils from '@/utils/message'

export default {
  name: 'SelectDept',
  components: { IopDataTreeSelect },
  data () {
    return {
      form: this.$form.createForm(this),
      treeUrl: path.system.pubDept.tree
    }
  },
  methods: {
    nextStep () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const { mergeDeptId1, mergeDeptId2 } = { ...values }
          if (mergeDeptId1 !== mergeDeptId2) {
            this.$emit('nextStep', { mergeDeptId1, mergeDeptId2 })
          } else {
            MessageUtils.error('不能是同一个部门')
          }
        }
      })
    },

    rest () {
      this.$refs.mergeDeptId1.cleanSelected()
      this.$refs.mergeDeptId2.cleanSelected()
    }
  }
}
</script>
