<template>
  <div class="box">
    <a-radio-group :value="state.value" button-style="solid">
      <a-radio-button
        v-for="(item, index) in dataSource"
        :key="index"
        :value="item.code"
        style="margin-right:10px;"
        v-if="index < maxLayout || state.showMore"
        @click="(e)=>{changeEvent(e)}"
      >
        <span style="width:130px;display:block;text-align:left">
          {{ valueFilter(item.value, 8) }}
        </span>
      </a-radio-button>
      <a-button type="link" v-if="showMoreBtn" @click="toggleShowMore">
        {{ state.showMore ? '收起' : '更多' }}
        <a-icon :type="state.showMore ? 'up':'down'" />
      </a-button>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  name: 'RadioButtonFold',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    maxLayout: {
      type: Number || String,
      required: false,
      default: 5
    },
    value: {
      type: String,
      required: true
    }
  },
  watch: {
    'value' (val) {
      this.state.value = val
    },
    'state.value' (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      state: {
        value: '',
        showMore: false
      }
    }
  },
  computed: {
    showMoreBtn () {
      return this.dataSource.length > this.maxLayout
    }
  },
  methods: {
    valueFilter (value, num) {
      if (!value) {
        return ''
      }
      if (value.toString().length > num) {
        return value.substr(0, num) + '...'
      }
      return value
    },
    toggleShowMore () {
      this.state.showMore = !this.state.showMore
    },
    changeEvent (e) {
      if (e.target.value === this.state.value) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.state.value = ''
          }, 0)
        })
      } else {
        this.$nextTick(() => {
          this.state.value = e.target.value
        })
      }
    }
  }
}
</script>
<style>
</style>
