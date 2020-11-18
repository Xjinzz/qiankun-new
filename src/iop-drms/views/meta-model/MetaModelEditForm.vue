<template>
  <a-modal :width="1200" :visible="visible" @cancel="hideModal" title="编辑">
    <a-tabs v-if="isRefer" defaultActiveKey="1">
      <a-tab-pane tab="基本信息" key="1">
        <meta-model-form
          ref="form"
          mode="edit"
          :objectId="objectId"
          :catalogId="catalogId"
          :catalogType="catalogType"
          @onSubmitSuccess="onSubmitSuccess">
          <template #afterCataClick>
            <a-divider type="vertical" />
            <a-button @click="remove()">删除</a-button>
            <a-divider type="vertical" />
            <a-button type="primary" @click="submit()">提交</a-button>
          </template>
        </meta-model-form>
      </a-tab-pane>
      <a-tab-pane tab="资源描述" key="2">
        <desc-list ref="descList" :objectId="objectId" />
      </a-tab-pane>
      <a-tab-pane tab="资源标识" key="3">
        <segment-list ref="segmentList" :objectId="objectId" />
      </a-tab-pane>
      <a-tab-pane tab="资源文件" key="4">
        <file-list ref="fileList" :objectId="objectId" />
      </a-tab-pane>
      <a-tab-pane tab="资源关系" key="5">
        <relation-list ref="relaList" :objectName="objectName" :objectId="objectId" />
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hideModal">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import MetaModelForm from './MetaModelForm'
import RelationList from '../manage/object/rela/RelationList'
import DescList from '../manage/object/desc/DescList'
import SegmentList from '../manage/object/segment/SegmentList'
import FileList from '../manage/object/file/FileList'
import MessageUtils from '@/utils/message'
import { iopDrmsObjectService } from '@/iop-drms/service/index'

export default {
  name: 'MetaModelEditForm',
  components: { MetaModelForm, RelationList, DescList, SegmentList, FileList },
  props: {
    catalogType: {
      type: String,
      required: true
    },
    catalogId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      objectId: '',
      objectName: '',
      isRefer: false
    }
  },
  methods: {
    onSubmitSuccess () {
      this.$emit('onSubmitSuccess')
    },

    submit () {
      this.$refs.form.submit()
    },

    show (objectId = '', objectName = '') {
      this.isRefer = false
      this.$nextTick(() => {
        this.isRefer = true
        this.objectId = objectId
        this.objectName = objectName
        this.visible = true
        this.$refs.form && this.$refs.form.load()
        const tableRefsArray = ['descList', 'segmentList', 'fileList', 'relaList']
        for (const name of tableRefsArray) {
          this.$refs[name] && this.$refs[name].resetSearchForm()
        }
      })
    },

    hideModal () {
      this.visible = false
    },

    remove () {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            await iopDrmsObjectService.remove(this.objectId)
            this.hideModal()
            this.$emit('onRemove')
          } catch (err) {
            MessageUtils.error(err)
          }
        }
      })
    }
  }
}
</script>
