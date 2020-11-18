<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item) in breadList" :key="item.name">
      {{ item.meta.title }}
      <!-- <a-breadcrumb-item v-for="item in breadList" :key="item.name">
      <router-link
        :to="{ path: item.path ? item.path : '/'}"
      >{{ item.meta.title }}</router-link>
    </a-breadcrumb-item> -->
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      breadList: []
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []

      this.name = this.$route.name
      const breadcrumbArray = [...this.$route.matched]
      breadcrumbArray.shift()
      breadcrumbArray.forEach(item => {
        this.breadList.push(item)
      })
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>
