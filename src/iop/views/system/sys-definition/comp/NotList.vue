<template>
  <div>
    <a-row style="width:100%;text-align:center">
      <img :src="state.notFountImg" style="width:80px;height:80px;margin-top:10px;margin-bottom:10px" alt="">
      <slot>
        <p style="text-align:center;font-size:16px;line-height:30px;margin-top:10px;color:#B9CDFE ">
          {{ state.notFountText }}
        </p>
      </slot>
    </a-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      state: {
        notFountImg: require('@/assets/icons/wusj.png'),
        notFountText: '暂无数据'
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
