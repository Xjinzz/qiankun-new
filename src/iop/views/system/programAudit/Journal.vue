<template>
  <a-modal
    title="审计日志"
    :visible="visible"
    @ok="companyOk"
    :confirmLoading="confirmLoading"
    @cancel="comCancel"
    width="400px"
  >
    <div style="display: inline-block;">日志级别：</div>
    <a-radio-group :options="plainOptions" v-model="radioData" />
  </a-modal>
</template>
<script>
import { IopDataDictRadio } from '@/iop/components'
import programs from '@/iop/service/system/program'
import path from '@/iop/api/index'
import { iopDataService } from '@/iop/service/index'

export default {
  name: 'SysProgramForm',
  components: { DataRadio: IopDataDictRadio },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      radioData: '0',
      plainOptions: [],
      data: {}
    }
  },
  methods: {
    companyOk () {
      const data = { logLevel: this.radioData }
      programs.logLeve(this.data.programId, data).then((res) => {
        this.$emit('loadData')
        this.visible = false
        this.data = {}
      })
    },
    comCancel () {
      this.visible = false
      this.data = {}
    },
    selectData () {
      iopDataService
        .get({
          url: `${path.system.dict.code}/logLevel`
        })
        .then((res) => {
          const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'label').replace(/code/g, 'value'))
          this.plainOptions = data.result
          this.visible = true
        })
    }
  }
}
</script>
