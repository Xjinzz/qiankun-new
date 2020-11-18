<template>
  <div style="width:100%;border:1px solid #f2f2f2">
    <div class="cardTitle">
      <a-row v-if="!isCreate" style="position:relative">
        {{ entity.methodName }}
        <a-icon @click="doDel" style="position:absolute;right:0;width:20px;height:20px" type="delete"></a-icon>
      </a-row>
      <a-row v-else>
        <a-select
          style="width: 100%"
          v-model="entity.method"
        >
          <a-select-option
            v-for="item in dataSource.typeList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-row>
    </div>
    <a-card :bordered="false">
      <switch-form v-model="entity.timeSwitch" ref="reality" title="限时开关" form-title="授权时段">
        <a-time-picker v-model="entity.begin"/>
        <a-time-picker v-model="entity.end" style="margin-left:5px"/>
      </switch-form>
      <switch-form v-model="entity.limitSwitch" ref="limiting" title="限流开关" form-title="访问次数">
        <a-input v-model="entity.limit" style="width: 262px;vertical-align: middle;">
          <!--
          <a-select v-model="entity.limitUnit" slot="addonAfter" style="width: 70px">
          <a-select-option
          v-for="item in dataSource.timeUnitList"
          :value="item.value"
          :key="item.value"
          >
          {{ item.name }}
          </a-select-option>
          </a-select>
          -->
          <p slot="addonAfter" style="margin-bottom:0;width:60px;">次/天</p>
        </a-input>
      </switch-form>
      <switch-form v-model="entity.sizeSwitch" ref="quantity" title="限量开关" :form-title="!isComposition?'执行文件数':'执行记录数'">
        <a-input v-model="entity.dataSize" style="width: 262px;vertical-align: middle;">
          <p slot="addonAfter" style="margin-bottom:0;width:60px;">
            {{ !isComposition ? '件/次':'条/次' }}
          </p>
        </a-input>
      </switch-form>
      <switch-form v-model="entity.capacitySwitch" ref="volume" v-if="!isComposition" title="容量开关" form-title="文件容量">
        <a-input v-model="entity.fileSize" style="width: 262px;vertical-align: middle;">
          <!--
          <a-select v-model="entity.fileSizeUnit" slot="addonAfter" style="width: 70px">
          <a-select-option
          v-for="item in dataSource.volumeUnitList"
          :value="item.value"
          :key="item.value"
          >
          {{ item.name }}
          </a-select-option>
          </a-select>
          -->
          <p slot="addonAfter" style="margin-bottom:0;width:60px;">MB/件</p>
        </a-input>
      </switch-form>
      <switch-form v-model="entity.logSwitch" ref="log" title="日志开关" form-title="">
        <a-button v-if="!isCreate" type="primary" @click="showLog">
          查看日志
        </a-button>
      </switch-form>
      <a-row style="text-align:center">
        <a-button type="primary" @click="doSave">
          保存
        </a-button>
        <a-button v-if="isCreate" @click="$emit('cancel')">
          取消
        </a-button>
      </a-row>
    </a-card>
    <a-row style="margin-top:10px"></a-row>
  </div>
</template>
<script>
import SwitchForm from './SwitchForm'
import { objectTool } from 'mwutil'
import Service from '@/iop/service/dataSourceSet/index'
import Monment from 'moment'
// const Helper = {
//   fizeSizeToKb: (unit, size) => {
//     const converter = {
//       K: Math.pow(2, 0),
//       M: Math.pow(2, 10),
//       G: Math.pow(2, 20),
//       T: Math.pow(2, 30)
//     }
//     return mathTool.mul(converter[unit], Number(size))
//   }
// }
function isEmpty (str) {
  if (str === '' || str === undefined || str === null) return true
  console.log(str)
  return (str && str.length <= 0)
}
const Entity = {
  begin: null,
  end: null,
  limit: '',
  // limitUnit: 'sec',
  fileSize: '',
  // fileSizeUnit: 'K',
  capacitySwitch: false,
  limitSwitch: false,
  logSwitch: false,
  sizeSwitch: false,
  timeSwitch: false,
  method: '',
  dataSize: ''
}
export default {
  components: {
    SwitchForm
  },
  props: {
    isComposition: {
      type: Boolean,
      default: true,
      required: true
    },
    isCreate: {
      type: Boolean,
      default: true,
      required: true
    },
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      dataSource: {
        typeList: []
        // timeUnitList: [],
        // volumeUnitList: []
      },
      entity: objectTool.deepClone(Entity),
      state: {
        typeMap: {}
      }
    }
  },
  mounted () {
    this.getTypeList()
    // this.dataSource.volumeUnitList = Service.getVolumeUnit()
    // this.dataSource.timeUnitList = Service.getTimeUnit()
  },
  watch: {
    data: {
      handler (newValue) {
        if (!this.isCreate) {
          this.$nextTick(() => {
            this.dealData(newValue)
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    doDel () {
      this.$emit('delete', this.getData())
    },
    dealData (data) {
      this.entity = Object.assign(data, {
        begin: data.timeSwitch ? Monment().set({
          hour: String(data.begin).substr(0, 2),
          minute: String(data.begin).substr(2, 2),
          second: String(data.begin).substr(4, 2)
        }) : null,
        end: data.timeSwitch ? Monment().set({
          hour: String(data.end).substr(0, 2),
          minute: String(data.end).substr(2, 2),
          second: String(data.end).substr(4, 2)
        }) : null
      })
    },
    checkData  (data) {
      if (isEmpty(data.method)) {
        return {
          result: false,
          message: '请选择方法'
        }
      }
      const map = {
        timeSwitch: ['begin', 'end'],
        limitSwitch: ['limit'],
        sizeSwitch: ['dataSize'],
        capacitySwitch: ['fileSize']
      }
      const errorMessage = {
        timeSwitch: '时间不完整',
        limitSwitch: '请输入访问次数',
        sizeSwitch: '请输入执行文件数',
        capacitySwitch: '请输入文件容量'
      }
      let result = {
        message: '',
        result: true
      }
      for (const key in map) {
        if (data[key]) {
          let flag = true
          map[key].map(x => {
            isEmpty(data[x]) && (flag = false)
            console.log(data[x], flag)
          })
          if (!flag) {
            result = {
              result: false,
              message: errorMessage[key]
            }
            break
          }
        }
      }
      return result
    },
    doSave () {
      const data = this.getData()
      const check = this.checkData(data)
      if (!check.result) {
        this.$message.error(check.message)
        return
      }
      this.$emit('save', data)
    },
    getData () {
      const dataEntity = objectTool.deepClone(this.entity)
      // dataEntity.method = ''
      const data = Object.assign(dataEntity, {
        // fileSize: Helper.fizeSizeToKb(this.entity.fileSizeUnit, this.entity.fileSize),
        methodName: this.getMethodsNameById(dataEntity.method),
        begin: dataEntity.begin && Monment(dataEntity.begin).format('HHmmss'),
        end: dataEntity.end && Monment(dataEntity.end).format('HHmmss')
      })
      return data
    },
    getMethodsNameById (id) {
      return this.state.typeMap[id]
    },
    getTypeList () {
      Service.getTypeList()
        .then(x => {
          this.dataSource.typeList = objectTool.toJsonArray(x, 'value', 'name')
          this.state.typeMap = x
        })
    },
    showLog () {
      this.$emit('log', this.getData())
    }
  }
}
</script>
<style lang="less" scoped>
  .cardTitle {
    background: #f7f7f7;
    padding: 10px;
    font-weight:800;
  }
</style>
