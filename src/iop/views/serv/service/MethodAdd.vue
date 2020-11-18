<template>
  <div>
    <method-form
      :serviceId="this.$route.query.parentId"
      :mode="newMode"
      :submitSuccess="submitSuccess"
    />
    <a-card v-if="newMode !== 'create'">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="参数" key="1">
          <paramList/>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import MethodForm from './MethodDefForm'
import { iopAuthService } from '@/iop/service/index'
import paramList from './ParamList'
import MethodViewList from '../authority/MethodViewList'
export default {
  name: 'MethodDef',
  components: { MethodForm, paramList, MethodViewList },
  data () {
    return {}
  },
  computed: {
    newMode () {
      return this.$route.query.mode
    }
  },
  methods: {
    submitSuccess () {
      iopAuthService.goPage(`serv/service/add`, {
        serviceId: this.$route.query.serviceId,
        mode: 'edit'
      })
    }
  }
}
</script>

<style>

</style>
