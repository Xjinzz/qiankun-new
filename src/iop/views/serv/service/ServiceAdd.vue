<template>
  <div>
    <service-form
      :thirdparty="$route.query.thirdparty"
      :serviceId="$route.query.serviceId"
      :parentId="$route.query.parentId"
      :mode="$route.query.mode"
      :submitSuccess="submitSuccess"
    />
    <a-card v-if="$route.query.mode !== 'create'">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="方法" key="1">
          <methodList/>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import serviceForm from './ServiceForm'
import methodList from './MethodList'
import { iopAuthService } from '@/iop/service/index'
export default {
  name: 'ServiceAdd',
  components: { serviceForm, methodList },
  data () {
    return {}
  },
  methods: {
    submitSuccess () {
      this.$route.query.thirdparty === 'invoke' ? iopAuthService.goPage(`serv/provider`) : iopAuthService.goPage(`serv/service`, { parentId: this.$route.query.parentId })
      // iopAuthService.goPage(`serv/service`, { parentId: this.$route.query.parentId })
    }
  }
}
</script>

<style>

</style>
