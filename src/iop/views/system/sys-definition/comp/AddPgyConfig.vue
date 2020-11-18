<template>
  <a-modal
    :title="modelTitle"
    :visible="state.visible"
    @cancel="hide"
    :width="900"
  >
    <a-row style="height:700px">
      <a-form :form="form">
        <a-col :span="11">
          <a-form-item label="实例名称" class="flex" style="width:100%">
            <a-input :disabled="isView" placeholder="请输入实例名称" v-decorator="['applicationName', { rules: rules.applicationName }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="实例权重" class="flex" style="width:100%">
            <a-input :disabled="isView" placeholder="请输入实例权重" v-decorator="['weight', { rules: rules.weight }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="部署IP" class="flex" style="width:100%">
            <a-input :disabled="isView" placeholder="请输入部署IP" v-decorator="['ip', { rules: rules.ip }]" />
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="端口" class="flex" style="width:100%">
            <a-input :disabled="isView" placeholder="请输入端口" v-decorator="['port', { rules: rules.port }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="DUBBO地址" class="flex" style="width:100%">
            <a-input :disabled="!isCreate" placeholder="请输入DUBBO地址" v-decorator="['dubboUrl', { rules: rules.dubboUrl }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="DUBBO端口" class="flex" style="width:100%">
            <a-input :disabled="!isCreate" placeholder="请输入DUBBO端口" v-decorator="['dubboPort', { rules: rules.dubboPort }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="URI" class="flex" style="width:100%">
            <a-input :disabled="!isCreate" placeholder="请输入URI" v-decorator="['uri', { rules: rules.uri }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="注册来源" class="flex" style="width:100%">
            <a-input :disabled="!isCreate" placeholder="请输入注册来源" v-decorator="['source', { rules: rules.source }]" />
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="健康状态" class="flex" style="width:100%">
            <a-tag v-if="entity.healthy!='true'" color="#FFA39E">异常</a-tag>
            <a-tag v-if="entity.healthy=='true'" color="#B7EB8F">正常</a-tag>
          </a-form-item>
        </a-col>
        <a-col v-if="!isCreate" :span="11">
          <a-form-item label="状态" class="flex" style="width:100%">
            <a-switch
              :disabled="isView"
              checked-children="启用"
              un-checked-children="停用"
              placeholder="请输入状态"
              v-model="status"
            />
          </a-form-item>
        </a-col>
        <a-col :span="22" class="flex">
          <a-form-item label="备注" class="flex" style="width:100%">
            <a-textarea
              :disabled="isView"
              placeholder="请输入备注"
              :autoSize="{ minRows: 2, maxRows: 4 }"
              v-decorator="['remark', { rules: rules.remark }]"
            />
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <template slot="footer">
      <a-row style="text-align:center">
        <a-button v-if="!isView" :loading="state.savePadding" type="primary" @click="save">
          提交
        </a-button>
        <a-button @click="hide">
          取消
        </a-button>
      </a-row>
    </template>
  </a-modal>
</template>
<script>
import Path from '@/iop/api/index'
import Service from '@/iop/service/system/sys-definition'
import { objectTool } from 'mwutil'
import { IopDataDictRadio } from '@/iop/components'
import Define from '../enum'
// import { IopDataDictRadio, IopDataTreeSelect, IopDataDictSelect } from '@/iop/components'
const entity = {
  applicationName: '',
  dubboPort: '',
  dubboUrl: '',
  healthy: '',
  ip: '',
  port: '',
  source: '',
  uri: '',
  weight: '',
  remark: ''
}
export default {
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  components: {
    IopDataDictRadio
  },
  computed: {
    modelTitle () {
      return this.isView ? '查看集群部署' : this.isEdit ? '编辑集群部署' : '新增集群部署'
    },
    isView () {
      return this.mode === Define.MODE.VIEW
    },
    isEdit () {
      return this.mode === Define.MODE.EDIT
    },
    isCreate () {
      return this.mode === Define.MODE.CREATE
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      dataUrl: {
        tree: Path.sysDefinition.asyncTree
      },
      status: false,
      rules: {
        applicationName: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '实例名称最多100位' }
        ],
        weight: [
          { max: 100, message: '权重最多100位' }
        ],
        ip: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '部署IP最多100位' }
        ],
        port: [
          { required: true, whitespace: true, message: '该字段必须填写' },
          { max: 100, message: '端口最多100位' }
        ],
        uri: [
          { max: 100, message: 'URI最多100位' }
        ],
        dubboPort: [
          { max: 100, message: 'dubbo端口最多100位' }
        ],
        dubboUrl: [
          { max: 100, message: 'dubboUrl最多100位' }
        ],
        source: [
          { max: 100, message: '来源最多100位' }
        ],
        healthy: [
          { max: 100, message: '健康最多100位' }
        ],
        remark: [
          { max: 500, message: '备注最多500位' }
        ]
      },
      state: {
        isView: false,
        visible: false,
        savePadding: false
      },
      dataSource: {
        sysStatusList: []
      },
      entity: objectTool.deepClone(entity),
      mode: Define.MODE.CREATE,
      id: null
    }
  },
  mounted () {
    this.dataSource.sysStatusList = Service.getSysStatusList()
  },
  methods: {
    getAllFormKeyList () {
      const keysList = objectTool.deepClone(entity)
      return objectTool.getKeyList(keysList)
    },
    getInfo () {
      Service.getPgyInfo(this.id)
        .then(x => {
          this.status = x.status === '1'
          delete x.status
          this.entity = x
          const keys = {}
          this.getAllFormKeyList().map(x => {
            keys[x] = this.entity[x]
          })
          this.form.setFieldsValue(keys)
        })
    },
    show (id) {
      this.id = id
      // eslint-disable-next-line
      this.state.visible = true
      return {
        doCreate: () => {
          this.mode = Define.MODE.CREATE
        },
        doEdit: () => {
          this.mode = Define.MODE.EDIT
          this.getInfo()
        },
        doView: () => {
          this.mode = Define.MODE.VIEW
          this.getInfo()
        }
      }
    },
    reset () {
      this.entity = objectTool.deepClone(entity)
      // this.$refs.treeSelect.cleanSelected()
      this.form.resetFields()
      this.id = null
    },
    hide () {
      this.state.visible = false
      this.reset()
    },
    save () {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.entity = this.form.getFieldsValue(objectTool.getKeyList(this.entity))
          this.entity.status = this.status ? '1' : '0'
          const data = {
            ...this.entity,
            appId: this.appId
          }
          if (this.isCreate) {
            Service.doSavePgy(data)
              .then((d) => {
                this.$emit('saveCallBack')
                this.hide()
              })
              .catch((e) => {
              })
          } else {
            Service.doUpdatePgy(this.id, data)
              .then((d) => {
                this.$emit('saveCallBack')
                this.hide()
              })
              .catch((e) => {
              })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.flex >>> .ant-form-item-control-wrapper {
  flex:1
}
.flex >>> .ant-form-item-label {
  width:100px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="less" scoped>
.flex{
  display:flex;
  margin-top:10px;
}
</style>
