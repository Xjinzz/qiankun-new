<template>
  <div>
    <a-modal
      title="修改排序号"
      @ok="handleOk"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="300px"
    >
      <div style="display:inline-block;width:25%">排序号：</div>
      <a-input style="display:inline-block;width:70%" v-model="num"></a-input>
    </a-modal>
  </div>
</template>
<script>
import attrs from '@/iop-drms/service/server/attr'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      num: '',
      attrId: ''
    }
  },
  methods: {
    show (item) {
      // 显示
      this.visible = true
      this.num = item.orderNum
      this.attrId = item.attrId
    },
    handleOk () {
      attrs.other(`/iop/drms/attr/${this.attrId}/set-order/${this.num}`).then((res) => {
        this.$emit('submitSuccess')
        this.visible = false
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
