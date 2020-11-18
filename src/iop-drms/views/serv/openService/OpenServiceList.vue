<template>
  <div>
    <div style="background:#fff;padding: 24px 32px;">
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
    <a-card :bordered="false" class="ant-pro-components-tag-select" style="margin-top:10px">
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
    <div class="size">
      <a-row>
        <a-col :lg="12" :md="12" :sm="12" :xs="12">
          共<span style="color: #1890FF;"> {{ this.size }} </span>条数据
        </a-col>
        <!-- <a-col :lg="4" :md="4" :sm="4" :xs="4">
          <div @click="visit()">
            访问量<a-icon :type="vis"/>
          </div>
        </a-col>
        <a-col :lg="4" :md="4" :sm="4" :xs="4">
          <div @click="times()">
            更新时间<a-icon :type="time"/>
          </div>
        </a-col>
        <a-col :lg="4" :md="4" :sm="4" :xs="4">
          <div @click="download()">
            调用量<a-icon :type="down"/>
          </div>
        </a-col> -->
      </a-row>
    </div>
    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list style="width:100%">
        <a-list-item v-for="(item, i) in data" :key="i">
          <a-card style="width:100%" hoverable>
            <a-row>
              <a-col :lg="12" :md="12" :sm="12" :xs="24">
                <p style="font-size: 18px;color: #1890FF;font-weight: bold;" @click="show(item)">{{ item.objectName }}</p>
              </a-col>
              <a-col :lg="12" :md="12" :sm="12" :xs="24" style="text-align:right">
                <a-tag v-if="item.serviceType === '审核中'" class="tag-button">审核中</a-tag>
                <a-tag v-else-if="item.serviceType === '已申请'" class="tag-disabled">已申请</a-tag>
                <a-tag v-else @click="createApply(item)" class="tag-button">接口申请</a-tag>
                <a-tag @click="showModal(item)" class="tag-button">数据预览</a-tag>
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
            <a-row>
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <p style="font-size: 14px;color: rgba(0,0,0,0.65);">数据领域：{{ item.objectDomain }}</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="4" :md="24" :sm="24" :xs="24">
                <p style="font-size: 14px;color: rgba(0,0,0,0.45);">调用次数：{{ item.downNum }}次</p>
              </a-col>
              <a-col :lg="4" :md="24" :sm="24" :xs="24">
                <p style="font-size: 14px;color: rgba(0,0,0,0.45)">发布时间：{{ item.releaseDate }}</p>
              </a-col>
              <a-col :lg="12" :md="12" :sm="12" :xs="12">
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div class="pages">
      <a-pagination :defaultPageSize="3" @change="onChange" :current="current" :total="size" />
    </div>
    <div>
      <modal ref="modal"></modal>
      <apply-modal ref="applyModal" :serviceIds="serviceIds" :services="services" @onSubmitSuccess="applySuccess" />
    </div>
  </div>
</template>

<script>
import { StandardFormRow } from '@/components'
import services from '@/iop-drms/service/server/open-service'
import { iopAuthService } from '@/iop/service/index'
import { DRMS_FORM_URL } from '@/iop-drms/constants'
import modal from '../openObject/OpenObjectModal'
import ApplyModal from '@/iop/views/serv/call/ApplyModal'
export default {
  components: {
    StandardFormRow,
    modal,
    ApplyModal
  },
  data () {
    return {
      data: [],
      size: 0,
      form: this.$form.createForm(this),
      queryParam: {},
      current: 1,
      tags: [],
      selectedTags: [],
      // 图标
      vis: 'caret-down',
      time: 'caret-down',
      down: 'caret-down',
      treeKey: '',
      serviceIds: [],
      services: []
    }
  },
  methods: {
    showModal (item) {
      this.$refs.modal.show(item)
    },
    show (item) {
      iopAuthService.goPage(DRMS_FORM_URL.OPEN_SERVICE.VIEW, {
        objectId: item.objectId,
        serviceId: item.serviceId
      })
    },
    visit () {
      if (this.vis === 'caret-down') {
        this.vis = 'caret-up'
      } else {
        this.vis = 'caret-down'
      }
    },
    times () {
      if (this.time === 'caret-down') {
        this.time = 'caret-up'
      } else {
        this.time = 'caret-down'
      }
    },
    download () {
      if (this.down === 'caret-down') {
        this.down = 'caret-up'
      } else {
        this.down = 'caret-down'
      }
    },
    handleChange (tag, checked) {
      this.selectedTags = []
      this.selectedTags.push(tag)
      const data = {
        objectDomain: this.selectedTags[0],
        page: 1,
        size: 3,
        catalogId: this.treeKey === '0' ? '' : this.treeKey
      }
      services.getSerList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
      })
    },
    allClikc () {
      this.selectedTags = []
      this.getSerList()
    },
    getSerList (page) {
      if (page === undefined || page === '') {
        services.getSerList({ page: 1, size: 3, catalogId: this.treeKey === '0' ? '' : this.treeKey }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
          this.getCont()
        })
      } else {
        services.getSerList({ page: page, size: 3, catalogId: this.treeKey === '0' ? '' : this.treeKey }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
          this.getCont()
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
      services.getSerList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
        this.getCont()
      })
    },
    onChange (current) {
      this.current = current
      this.getSerList(current)
    },
    search () {
      this.queryParam.objectDomain = this.selectedTags[0]
      this.queryParam.catalogId = this.treeKey === '0' ? '' : this.treeKey
      services.getSerList(this.queryParam).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
        this.getCont()
      })
    },
    resetSearchForm () {
      this.queryParam = {}
      this.getSerList()
    },
    selectData () {
      services.serviceDomain().then((res) => {
        const list = []
        res.map((item, key) => {
          list.push(item)
        })
        this.tags = list
      })
    },
    getList (page) {
      if (this.$route.query.code === '' || this.$route.query.code === '0') {
        services.getSerList({ page: 1, size: 3 }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
          this.getCont()
        })
      } else {
        this.selectedTags = []
        this.selectedTags.push(this.$route.query.code)
        services.getSerList({ page: 1, size: 3, objectDomain: this.$route.query.code }).then((res) => {
          this.data = res.data
          this.size = res.totalSizes
          this.getCont()
        })
      }
      this.selectData()
    },
    getCont () {
      this.data.map((item, key) => {
        services.servCount(item.objectCode).then((res) => {
          this.data[key].downNum = res.count
        })
      })
    },
    createApply (item) {
      this.serviceIds = [item.serviceId]
      this.services = [{
        serviceId: item.serviceId,
        chName: item.objectName,
        serviceCode: item.objectCode,
        deptName: item.deptName
      }]
      this.$refs.applyModal.show()
    },
    applySuccess () {
      this.jumpData()
    },
    jumpData (id) {
      this.treeKey = id
      const data = {
        page: 1,
        size: 3,
        catalogId: id === '0' ? '' : id
      }
      services.getSerList(data).then((res) => {
        this.data = res.data
        this.size = res.totalSizes
        this.getCont()
      })
    }
  },
  mounted () {
    this.selectData()
    this.$emit('selectKey', this.$route.query.serverTreeId)
    if (this.$route.query.serverTreeId === undefined) {
      this.getList()
    } else if (this.$route.query.serverTreeId !== undefined) {
      this.jumpData(this.$route.query.serverTreeId)
    }
  },
  watch: {
    $route: function () {
      this.$emit('selectKey', this.$route.query.serverTreeId)
      if (this.$route.query.serverTreeId !== undefined) {
        this.selectData()
        this.jumpData(this.$route.query.serverTreeId)
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
.ant-tag {
  width: 100px;
  height: 24px;
  font-size:16px;
  text-align: center;
}
.tag-button {
  width: 80px;
  height: 25px;
  line-height: 23px;
  font-size:14px;
  text-align: center;
  color: #1890FF;
  background-color: #fff;
  border-color: #1890FF;
  border-radius: 0;
}
#all {
  float:left;
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
.size {
  margin-top: 10px;
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
.tag-disabled {
  width: 80px;
  height: 25px;
  line-height: 23px;
  font-size:14px;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  border-radius: 0;
}
</style>
