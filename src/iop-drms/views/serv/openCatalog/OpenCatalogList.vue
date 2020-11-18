<template>
  <div>
    <div style="background:#fff;padding: 24px 32px;margin-bottom: 24px">
      <div>
        <a-row>
          <a-col :lg="2" :md="3" :sm="4" :xs="4">
            <div style="font-size:16px;height:24px">领域：</div>
          </a-col>
          <a-col :lg="2" :md="2" :sm="4" :xs="4">
            <div id="all" @click="allClikc">全部</div>
          </a-col>
          <a-col :lg="20" :md="19" :sm="16" :xs="16">
            <template v-for=" tag in tags">
              <a-checkable-tag
                :key="tag.code"
                :checked="selectedTags.indexOf(tag.code) > -1"
                @change="(checked) => handleChange(tag.code, checked)"
              >
                {{ tag.name }}
              </a-checkable-tag>
            </template>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row grid last>
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="12" :offset="6">
              <a-input-search
                allowClear
                enter-button="查询"
                v-model="queryParam.objectName"
                @search="search" />
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>
    <div class="size">共<span style="color: #1890FF;"> {{ this.size }} </span>条数据</div>
    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list style="width:100%">
        <a-list-item v-for="(item, i) in data" :key="i">
          <a-card style="width:100%" hoverable>
            <a-row>
              <a-col :lg="12" :md="12" :sm="12" :xs="24">
                <p style="font-size: 18px;color: #1890FF;font-weight: bold;" @click="showModal(item)">{{ item.objectName }}</p>
              </a-col>
              <a-col :lg="12" :md="12" :sm="12" :xs="24" style="text-align:right">
                <p style="font-size: 14px;color: rgba(0,0,0,0.45);">目录发布时间：{{ item.releaseDate }}</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <p style="font-size: 16px;color: rgba(0,0,0,0.65);">资源单位：{{ item.deptName }}</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <p style="font-size: 16px;color: rgba(0,0,0,0.65);">信息项：{{ item.items }}</p>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div class="pages">
      <a-pagination :defaultPageSize="3" @change="onChange" :current="current" :total="size" />
    </div>
    <modal ref="modal"></modal>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis } from '@/components'
import catalogs from '@/iop-drms/service/server/open-catalog'
import modal from './OpenCatalogModal'
export default {
  components: {
    Ellipsis,
    TagSelect,
    StandardFormRow,
    modal,
    id: '',
    treeKey: ''
  },
  data () {
    return {
      data: [],
      tags: [],
      size: 0,
      form: this.$form.createForm(this),
      queryParam: {},
      current: 1,
      selectedTags: []
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  methods: {
    handleChange (tag, checked) {
      this.selectedTags = []
      this.selectedTags.push(tag)
      const data = {
        catalogId: this.treeKey === '0' ? '' : this.treeKey,
        objectDomain: this.selectedTags[0],
        page: 1,
        size: 3
      }
      this.getData(data)
    },
    allClikc () {
      this.selectedTags = []
      const data = {
        catalogId: this.treeKey === '0' ? '' : this.treeKey,
        page: 1,
        size: 3
      }
      this.getData(data)
    },
    selectData () {
      catalogs.objectDomain().then((res) => {
        const list = []
        res.map((item, key) => {
          list.push(item)
        })
        this.tags = list
      })
    },
    getData (data) {
      catalogs.getList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
      })
    },
    getList (page) {
      if (page === undefined || page === '') {
        catalogs.getList({ objectDomain: this.selectedTags[0], page: 1, size: 3 }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
        })
      } else {
        catalogs.getList({ objectDomain: this.selectedTags[0], page: page, size: 3 }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
        })
      }
    },
    getTreeList (key) {
      this.queryParam = {}
      this.treeKey = key
      const data = {
        page: 1,
        size: 3,
        catalogId: key === '0' ? '' : key,
        objectDomain: this.selectedTags[0]
      }
      catalogs.getList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
      })
    },
    onChange (current) {
      this.current = current
      this.getList(current)
    },
    search () {
      this.queryParam.objectDomain = this.selectedTags[0]
      this.queryParam.catalogId = this.treeKey === '0' ? '' : this.treeKey
      catalogs.getList(this.queryParam).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
      })
    },
    resetSearchForm () {
      this.queryParam = {}
      this.getList()
    },
    showModal (item) {
      this.$refs.modal.show(item)
    },
    jumpData (id) {
      this.treeKey = id
      const data = {
        page: 1,
        size: 3,
        catalogId: id === '0' ? '' : id
      }
      catalogs.getList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
      })
    }
  },
  mounted () {
    this.selectData()
    this.$emit('selectKey', this.$route.query.catalogTreeId)
    console.log(this.$route.query.catalogTreeId)
    if (this.$route.query.catalogTreeId === undefined) {
      this.getList()
    } else if (this.$route.query.catalogTreeId !== undefined) {
      this.jumpData(this.$route.query.catalogTreeId)
    }
  },
  watch: {
    $route: function () {
      this.$emit('selectKey', this.$route.query.catalogTreeId)
      console.log(this.$route.query.catalogTreeId)
      if (this.$route.query.catalogTreeId !== undefined) {
        this.selectData()
        this.jumpData(this.$route.query.catalogTreeId)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
.ant-list-item {
  padding: 0;
}
.size {
  margin-top: 24px;
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  font-size: 16px;
  background: #fff;
}
.pages {
  height: 68px;
  background: #fff;
  padding: 18px 10px;
}
#all {
  font-size:16px;
  height:24px;
  text-align: center;
  border-radius: 4px;
}
#all:active {
  background: #1890ff;
  color: #fff;
}
#all:hover {
  cursor:pointer;
  opacity: 0.85;
  color: #1890ff;
}
.ant-tag {
  width: 100px;
  height: 24px;
  font-size:16px;
  text-align: center;
}
</style>
