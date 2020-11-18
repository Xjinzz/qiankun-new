<template>
  <div>
    <iop-data-form
      ref="dataSummary"
      mode="view"
      :url="url"
      :id="id"
      :submitSuccess="submitSuccess"
      :vo="vo"
      showType="page"
    >
      <template #form="{ record }">
        <a-row :gutter="rowLayout">
          <a-col :span="12" v-for="(item) in vo" :key="item.dataIndex">
            <a-form-item :label="item.title" v-bind="formItemLayout">
              <a-input :type="item.type||'input'" v-decorator="[item.dataIndex]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <div style="text-align:center">
          <a-button @click="goBack">返回</a-button>
        </div>
      </template>
    </iop-data-form>
  </div>
</template>
<script>
import API from '@/iop-drms/api/index'
import { IopDataForm } from '@/iop/components/index'
export default {
  components: {
    IopDataForm
  },
  data () {
    return {
      rowLayout: { xs: 8, sm: 16, md: 24, lg: 32 },
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      url: API.zhuangfa.getInfo,
      vo: [
        {
          title: '指标名称',
          dataIndex: 'indexName'
        },
        {
          title: '版本号',
          dataIndex: 'versionNum'
        },
        {
          title: '2015',
          dataIndex: 'item1'
        },
        {
          title: '2020',
          dataIndex: 'item2'
        },
        {
          title: '量纲',
          dataIndex: 'lg'
        },
        {
          title: '超额实现',
          dataIndex: 'cesx'
        },
        {
          title: '实现',
          dataIndex: 'sx'
        },
        {
          title: '未实现',
          dataIndex: 'wsx'
        },
        {
          title: '未实现原因',
          dataIndex: 'wsxyy',
          type: 'textarea'
        }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  mounted () {
    this.$refs.dataSummary.load()
  },
  methods: {
    submitSuccess () {
      this.$router.go(-1)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
