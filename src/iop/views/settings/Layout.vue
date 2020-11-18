<template>
  <a-card title="皮肤布局" :bordered="false">
    <a-row>
      <a-col :span="10" :offset="2">
        <setting />
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import Setting from './layout/Setting'

export default {
  name: 'SettingLayoutForm',
  components: { Setting }
}
</script>
