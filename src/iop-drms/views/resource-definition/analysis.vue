<template>
  <div class="assalysisForm">
    <a-button type="link" @click="goBack" style="position:absolute;top:20px;right:20px;z-index:10">
      返回
    </a-button>
    <a-form layout="inline" :ref="state.formID" :form="form">
      <a-card class="myformItem noBorder noMargin" :class="state.showSecoundDimesion ? '':'noPadding-bottom'">
        <a-row style="display:flex;flex-wrap:wrap;align-items:center">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:10px;vertical-align:middle">
            统计维度
            <a-icon
              :type="state.showSecoundDimesion ? 'up' : 'down'"
              @click="toggleSecoundDimesion"
              style="font-size:12px;vertical-align:baseline;position: relative;top:-2px"
            />
          </label>
          <radio-button-fold
            v-model="dataSet.dimension"
            :data-source="dataSource.dimensionList"
            :max-layout="state.maxLayout"
            style="flex:1"
          />
        </a-row>
      </a-card>
      <a-row
        class="myformItem gold"
        style="flex-wrap:wrap;align-items:baseline;padding-top:15px;padding-bottom:15px;background:#f8f8f8;"
        :style="state.showSecoundDimesion ? 'display:flex;' : 'display:none'"
      >
        <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:26px;margin-left: 10px;vertical-align:middle">
          第二维度
        </label>
        <radio-button-fold
          v-model="dataSet.dimension2"
          :data-source="dataSource.dimensionList"
          :max-layout="state.maxLayout"
          style="flex:1"
        />
      </a-row>
      <a-card class="myformItem noBorder" :class="state.showSecoundDimesion ? '':'noPadding-top'">
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:10px;vertical-align:middle">
            统计指标
          </label>
          <a-row style="flex:1;vertical-align:middle">
            <a-col :span="8">
              <a-form-item label="选择指标" class="formItem">
                <a-select v-model="dataSet.indexCode" @change="()=>{dataSet.indexType=''}">
                  <a-select-option
                    v-for="(item, index) in dataSource.changeIndexList"
                    :key="index"
                    :value="item.code">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="指标值" class="formItem">
                <a-select v-model="dataSet.indexType" :disabled="!dataSet.indexCode">
                  <a-select-option
                    v-for="(item, index) in dataSource.indicatorsList"
                    :key="index"
                    :value="item.code"
                    :disabled="chartIndexTypeDisabled(item)">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-button type="primary" :disabled="dataSet.indexCode === '' || dataSet.indexType === ''" @click="addIndicators" style="position:relative;top:4px;left:10px">添加</a-button>
          </a-row>
        </a-row>
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px" v-if="!isHasTime">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:66px;vertical-align:middle"></label>
          <a-row style="flex:1;vertical-align:middle">
            <a-col :span="18">
              <a-form-item label="时间范围" class="formItem">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="startValue"
                  placeholder="请选择开始时间"
                />
                <span style="margin-left:10px;margin-right:10px">
                  至
                </span>
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择结束时间"
                  v-model="endValue"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px" v-if="!isHasTime">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:66px;vertical-align:middle"></label>
          <a-row style="flex:1;vertical-align:middle">
            <a-col :span="8">
              <a-form-item label="时间颗粒" class="formItem">
                <a-select v-model="dataSet.timeUnit">
                  <a-select-option
                    v-for="(item, index) in dataSource.timeUnitList"
                    :key="index"
                    :value="item.code">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-button type="primary" @click="searchAnalysis" class="spaceLeft" style="top:6px">查询</a-button>
          </a-row>
        </a-row>
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:40px;vertical-align:middle">
            图表切换
          </label>
          <a-row style="flex:1;vertical-align:middle">`
            <a-col :span="10">
              <a-form-item class="formItem">
                <img
                  v-for="(item, index) in dataSource.chartTypeList"
                  :key="index"
                  :src="chatIconMap[item.code + '-' + chartTypeDisable(item)]"
                  style="margin-right:27px;cursor:pointer"
                  @click="setChartType(item)"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        <!--
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px" v-show="searchState.dimensionList.length">
        <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:40px;vertical-align:middle" v-show="searchState.dimensionList.length">
        已选维度
        </label>
        <a-row style="flex:1;vertical-align:middle" v-show="searchState.dimensionList.length">
        <template v-for="(item, index) in searchState.dimensionList">
        <a-tag v-if="item && item.code && item.value" :key="item.code" closable @close="() => removeDimension(item, index)">
        {{ item.value }}
        </a-tag>
        </template>
        </a-row>
        </a-row>
        -->
        <a-row style="border-top:1px dashed #e9e9e9" v-show="searchState.indexList.length" />
        <a-row style="display:flex;flex-wrap:wrap;align-items:center;margin-top:10px" v-show="searchState.indexList.length">
          <label style="font-size:14px;line-height:22px;color: rgba(0,0,0,0.85);margin-right:40px;vertical-align:middle" v-show="searchState.indexList.length">
            已选指标
          </label>
          <a-row style="flex:1;vertical-align:middle" v-show="searchState.indexList.length">
            <template v-for="item in searchState.indexList">
              <a-tag :key="item.indexCodeValue+'-'+item.indexTypeValue" closable @close="() => removeIndex(item)">
                {{ item.indexCodeValue+'-'+item.indexTypeValue }}
              </a-tag>
            </template>
          </a-row>
        </a-row>
      </a-card>
    </a-form>
    <a-card v-show="chartState.chartDataReadyed" title="分析图表">
      <a-row style="height:500px">
        <a-col id="chart1" style="width:100%;height:500px"></a-col>
      </a-row>
      <a-table
        :columns="tableOpt.columns"
        :data-source="tableOpt.data"
        bordered
        rowkey="id"
        size="middle"
      >
      </a-table>
    </a-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import _idSeed from './tool/idSeed'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import Define from './tool/define'
import RadioButtonFold from './comp/RadioButtonFold'
import { arrayTool } from 'mwutil'
import getuuid from '@/utils/uuid.js'
export default {
  components: {
    RadioButtonFold
  },
  data () {
    return {
      getuuid,
      tableOpt: {
        data: [
          {
            dimesion: '维度1',
            index1: '指标1',
            index2: '指标2'
          },
          {
            dimesion: '维度1',
            index1: '指标3',
            index2: '指标4'
          },
          {
            dimesion: '维度2',
            index1: '指标1',
            index2: '指标2'
          }
        ],
        columns: []
      },
      chatIconMap: {
        'pie-off': require('@/assets/resource-definition/pie-off.png'),
        'pie-normal': require('@/assets/resource-definition/pie-normal.png'),
        'pie-on': require('@/assets/resource-definition/pie-on.png'),
        'line-off': require('@/assets/resource-definition/line-off.png'),
        'line-normal': require('@/assets/resource-definition/line-normal.png'),
        'line-on': require('@/assets/resource-definition/line-on.png'),
        'bar-off': require('@/assets/resource-definition/bar-off.png'),
        'bar-normal': require('@/assets/resource-definition/bar-normal.png'),
        'bar-on': require('@/assets/resource-definition/bar-on.png'),
        'stack-off': require('@/assets/resource-definition/stack-off.png'),
        'stack-normal': require('@/assets/resource-definition/stack-normal.png'),
        'stack-on': require('@/assets/resource-definition/stack-on.png')
      },
      define: Define,
      form: this.$form.createForm(this),
      state: {
        formID: _idSeed.newId(),
        // 保留原始deal过后的数据
        analySearchData: [],
        maxLayout: Define.SHOWMORENUM,
        showSecoundDimesion: false
      },
      startValue: null,
      endValue: null,
      // 图表相关
      chartState: {
        chart: null,
        // 主题
        // chart数据是否加载完毕
        chartDataReadyed: false,
        // 图表类型
        chartType: ''
      },
      // 暂存数据的空间
      dataSet: {
        indexCode: '',
        indexType: '',
        dimension: '', // 维度
        dimension2: '', // 维度2
        timeUnit: ''
      },
      // 查询条件项
      searchState: {
        indexList: [],
        dimensionList: []
      },
      // 下拉数据源
      dataSource: {
        dimensionList: [], // 维度
        changeIndexList: [], // 指数
        indicatorsList: [], // 指标
        chartTypeList: [], // 图表切换
        timeUnitList: [] // 时间颗粒下拉
      }
    }
  },
  watch: {
    'dataSet.dimension' (val) {
      this.addDimension(val)
    },
    'dataSet.dimension2' (val) {
      this.addDimension(val)
    }
  },
  computed: {
    objectId () {
      return this.$route.query.objectId || ''
    },
    objectCode () {
      return this.$route.query.objectCode || ''
    },
    searchCondition () {
      return this.$route.query.searchCondition ? JSON.parse(this.$route.query.searchCondition) : {}
    },
    isHasTime () {
      return this.searchState.dimensionList.filter(item => item.type === Define.DEMITIONTYPE.TIME).length <= 0
    }
  },
  mounted () {
    // 获取维度和选择指标的下拉
    this.getDimensionList()
    // 获取时间颗粒下拉
    this.dataSource.timeUnitList = Service.getTimeUnitList()
    // 指标值下拉
    this.dataSource.indicatorsList = Service.getIndicatorsList()
    // 图表类型下拉
    this.dataSource.chartTypeList = Service.getChartTypeList()
  },
  methods: {
    // 设置图表类型
    setChartType (item) {
      // 判断禁用
      if (this.chartTypeDisable(item) === Define.CHARTTYPEDISABLE.NORMAL) {
        this.chartState.chartType = item.code
        this.renderChart()
      }
    },
    // 切换显示第二维度
    toggleSecoundDimesion () {
      if (this.searchState.indexList.length > 1) {
        return
      }
      this.state.showSecoundDimesion = !this.state.showSecoundDimesion
    },
    // 获取维度和选择指标下拉datasource
    getDimensionList () {
      Service.getDimesionList(this.objectId)
        .then(x => {
          this.dataSource.dimensionList = x
          this.dataSource.changeIndexList = x
        })
    },
    // 处理图表切换的options是否禁用(20200525 => 返回on off normal 判断三种状态)
    chartTypeDisable (item) {
      // 如果选中的等于当前的
      if (item.code === this.chartState.chartType) {
        return Define.CHARTTYPEDISABLE.ON
      }
      const activeList = {
        // 单维度多指标
        singleDimension: [Define.CHARTTYPE.LINE, Define.CHARTTYPE.BAR],
        // 多维度
        doubleDimension: [Define.CHARTTYPE.STACK],
        // 单维度单指标
        singleIndex: [Define.CHARTTYPE.LINE, Define.CHARTTYPE.BAR, Define.CHARTTYPE.PIE],
        noChoose: []
      }
      let r
      // 多维度
      if (this.searchState.dimensionList.length > 1) {
        r = activeList['doubleDimension']
      } else if (this.searchState.dimensionList.length === 1 && this.searchState.indexList.length === 1) {
        // 单维度单指标
        r = activeList['singleIndex']
      } else if (this.searchState.dimensionList.length === 1 && this.searchState.indexList.length > 1) {
        // 单维度单指标
        r = activeList['singleDimension']
      } else {
        r = activeList['noChoose']
      }
      return !r.includes(item.code) ? Define.CHARTTYPEDISABLE.OFF : Define.CHARTTYPEDISABLE.NORMAL
    },
    // 处理指标值禁用状态
    chartIndexTypeDisabled (item) {
      let r = null
      this.dataSource.changeIndexList.map(item => {
        if (item.code === this.dataSet.indexCode) {
          r = item
        }
      })
      if (r) {
        return !item.type.includes(r.type)
      } else {
        return true
      }
    },
    // 根据code获取item
    getItemByCode (array, code) {
      const filterArr = arrayTool.deepClone(array).filter(item => item.code === code)
      return filterArr[0] ? filterArr[0] : {}
    },
    // 添加指标
    addIndicators () {
      if (this.searchState.dimensionList.length > 1 && this.searchState.indexList.length > 0) {
        this.$message.error('多维度只能选择一个指标')
        return
      }
      const indexItem = {
        indexCode: this.dataSet.indexCode,
        indexCodeValue: this.getItemByCode(this.dataSource.changeIndexList, this.dataSet.indexCode).value,
        indexType: this.dataSet.indexType,
        indexTypeValue: this.getItemByCode(this.dataSource.indicatorsList, this.dataSet.indexType).value,
        order: 'desc'
      }
      if (arrayTool.findIndex(this.searchState.indexList, indexItem) === -1) {
        this.searchState.indexList.push(indexItem)
        if (this.searchState.indexList.length > 1) {
          if (this.searchState.dimensionList.length > 1) {
            this.searchState.dimensionList = arrayTool.removeItem(this.searchState.dimensionList, this.searchState.dimensionList[1])
          }
          this.dataSet.dimension2 = ''
          this.state.showSecoundDimesion = false
        }
      }
      this.$nextTick(() => {
        this.searchAnalysis()
        this.dataSet.indexCode = ''
        this.dataSet.indexType = ''
      })
    },
    // 添加维度
    addDimension () {
      this.searchState.dimensionList = []
      if (this.dataSet.dimension === '' && this.dataSet.dimension2 === '') {
        return
      }
      if (this.dataSet.dimension) {
        this.searchState.dimensionList[0] = this.getItemByCode(this.dataSource.dimensionList, this.dataSet.dimension)
      }
      if (this.dataSet.dimension2) {
        this.searchState.dimensionList[1] = this.getItemByCode(this.dataSource.dimensionList, this.dataSet.dimension2)
      }
      this.$nextTick(() => {
        this.searchAnalysis()
      })
    },
    // 删除维度
    // removeDimension (item, index) {
    //   this.searchState.dimensionList = arrayTool.removeItem(this.searchState.dimensionList, item)
    //   if (index === 1) {
    //     this.dataSet.dimension2 = ''
    //   } else {
    //     this.dataSet.dimension = ''
    //   }
    //   this.searchAnalysis()
    // },
    // 删除指标
    removeIndex (item) {
      this.searchState.indexList = arrayTool.removeItem(this.searchState.indexList, item)
      this.searchAnalysis()
    },
    // 处理chart数据
    dealChartResult (x) {
      const result = {}
      this.searchState.dimensionList.map(item => {
        result[item.code] = arrayTool.unique(arrayTool.getSimpleValuesByField(x, item.code))
      })
      // 多维度
      result.data = {}
      this.searchState.indexList.map(indexItem => {
        const dataFieldName = indexItem.indexCodeValue + '-' + indexItem.indexTypeValue
        const dataFielCode = indexItem.indexCode + '-' + indexItem.indexType

        result.data[dataFieldName] = {}
        this.searchState.dimensionList.map(dimensionItem => {
          const dimensionItemCode = dimensionItem.code
          const dimensionItemValue = dimensionItem.value
          if (!result.data[dataFieldName][dimensionItemValue]) {
            result.data[dataFieldName][dimensionItemValue] = {}
          }
          x.map(xItem => {
            if (!result.data[dataFieldName][dimensionItemValue][xItem[dimensionItemCode]]) {
              result.data[dataFieldName][dimensionItemValue][xItem[dimensionItemCode]] = []
            }
            result.data[dataFieldName][dimensionItemValue][xItem[dimensionItemCode]].push(xItem[dataFielCode])
          })
        })
      })
      // debugger
      return result
    },
    // 查询
    searchAnalysis () {
      this.chartDestory()
      this.chartState.chartDataReadyed = false
      if (!this.searchState.indexList.length || !this.searchState.dimensionList[0]) {
        return
      }

      const time = {}
      let timeUnit = ''
      // 判断是时间并且开始和结束至少有一个  则拼接
      if (!this.isHasTime) {
        if (this.startValue || this.endValue) {
          this.searchState.dimensionList.map(item => {
            if (item.type === Define.DEMITIONTYPE.TIME) {
              time[item.code] = (this.startValue ? new Date(this.startValue).getTime() : '') + '~' + (this.endValue ? new Date(this.endValue).getTime() : '')
            }
          })
        }
        if (this.dataSet.timeUnit) {
          timeUnit = this.dataSet.timeUnit ? this.dataSet.timeUnit : ''
        }
      }
      Service.getAnalysis({
        objectCode: this.objectCode,
        objectId: this.objectId,
        conditionMap: {
          ...this.searchCondition,
          ...time
        },
        timeUnit,
        indexList: this.searchState.indexList,
        dimensionList: arrayTool.getSimpleValuesByField(this.searchState.dimensionList, 'code')
      })
        .then((x) => {
          this.chartState.chartType = this.searchState.dimensionList.length > 1 ? Define.CHARTTYPE.STACK : Define.CHARTTYPE.LINE
          this.state.analySearchData = this.dealChartResult(x)
          this.tableOpt.data = x
          x.map(item => {
            item.id = getuuid.generate()
          })
          this.$nextTick(() => {
            this.tableOpt.columns = this.getColumnList()
          })
          this.chartState.chartDataReadyed = true
          // 自动选择匹配第一的chart
          // 单维度 ====> line
          // 多维度 ====> stack
          this.$nextTick(() => {
            this.renderChart()
          })
        })
    },
    // 处理tableColumnConfig
    getColumnList () {
      const result = []
      this.searchState.dimensionList.map(item => {
        result.push({
          title: item.value,
          dataIndex: item.code
        })
      })
      this.searchState.indexList.map(item => {
        result.push({
          title: item.indexCodeValue + '-' + item.indexTypeValue,
          dataIndex: item.indexCode + '-' + item.indexType
        })
      })
      return result
    },
    // 注销chart
    chartDestory () {
      this.chartState.chart && this.chartState.chart.dispose()
      this.chartState.chart = null
    },
    /**
    * 组合堆积图option
    * 可能出现情况为：
    * 1、多维度，单指标（）
    */
    mixStackOption (options) {
      // 拿到指标的组合key
      const indexCode = this.searchState.indexList[0].indexCodeValue + '-' + this.searchState.indexList[0].indexTypeValue
      // 获取正确的chart数据集合列表（即多维度时候为最后一个维度的数据）
      const chartData = this.state.analySearchData.data[indexCode][this.searchState.dimensionList[this.searchState.dimensionList.length - 1].value]
      for (const key in chartData) {
        options.legend.data.push(key)
        options.series.push({
          name: key,
          stack: indexCode,
          type: Define.CHARTTYPE.BAR,
          data: chartData[key]
        })
      }
      return options
    },
    /**
    * 组合线图和柱状图option
    * 可能出现情况为：
    * 1、单维度，单指标
    * 2、单维度，多指标
    */
    mixBarLineOption (options) {
      // 单维度 多指标
      for (const key in this.state.analySearchData.data) {
        const item = this.state.analySearchData.data[key]
        let data = []
        for (const dataKey in item[this.searchState.dimensionList[0].value]) {
          data = [...data, ...item[this.searchState.dimensionList[0].value][dataKey]]
        }
        options.legend.data.push(key)
        options.series.push({
          type: this.chartState.chartType,
          data,
          name: key
        })
      }
      return options
    },
    /**
    * 组合饼状图options
    * 可能出现情况为：
    * 1、单维度，单指标
    */
    mixPieOption (options) {
      // 单独处理饼状图数据
      const indexCode = this.searchState.indexList[0].indexCodeValue + '-' + this.searchState.indexList[0].indexTypeValue
      const dimensionCode = this.searchState.dimensionList[0].value
      const analySearchDataData = this.state.analySearchData.data[indexCode][dimensionCode]
      options.series[0] = {
        type: 'pie',
        name: indexCode,
        data: []
      }
      options.tooltip = {
        show: true,
        trigger: 'item',
        axisPointer: {
          type: 'line'
        }
      }
      options.legend.data = []
      for (const key in analySearchDataData) {
        options.series[0].data.push({
          name: key,
          value: analySearchDataData[key]
        })
        options.legend.data.push(key)
      }
      options.tooltip = {
        show: true,
        trigger: 'item',
        axisPointer: {
          type: 'line'
        }
      }
      return options
    },
    // 获取图表option
    chartOption () {
      // 通用基础option
      let options = {
        // 标题
        title: {
          left: 'left',
          text: '主标题',
          textStyle: {
            lineHeight: 20
          },
          subtext: '次要标题',
          subtextStyle: {
            lineHeight: 20
          }
        },
        // 图例
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 10,
          top: 60,
          data: [],
          show: true,
          tooltip: {
            show: true
          }
        },
        tooltip: {},
        series: []
      }
      // 非饼图的option
      const notPieOption = {
        xAxis: {
          type: 'category',
          data: this.state.analySearchData[this.searchState.dimensionList[0].code],
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            label: '12',
            type: 'cross'
          }
        }
      }
      // 堆积图数据处理
      const obj = {
        [Define.CHARTTYPE.STACK]: this.mixStackOption,
        [Define.CHARTTYPE.BAR]: this.mixBarLineOption,
        [Define.CHARTTYPE.LINE]: this.mixBarLineOption,
        [Define.CHARTTYPE.PIE]: this.mixPieOption
      }
      options = this.chartState.chartType !== Define.CHARTTYPE.PIE ? Object.assign(options, notPieOption) : options
      // 根据当前图表类型进行不同的option解析
      return obj[this.chartState.chartType](options)
    },
    // 根据数据渲染chart
    renderChart () {
      this.chartDestory()
      if (!this.chartState.chartDataReadyed) {
        return
      }
      this.chartState.chart = echarts.init(document.getElementById('chart1'))
      this.chartState.chart.setOption(this.chartOption())
    },
    // 禁用开始时间
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    // 禁用结束时间
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.assalysisForm{
  position: relative;
}
.assalysisForm >>> .ant-form-inline .ant-form-item > .ant-form-item-control-wrapper,.assalysisForm >>> .ant-form-inline .ant-form-item > .ant-form-item-label{
  width:100px!important
}

.formItem {
  width: 100%;
  display:flex
}
.formItem >>> .ant-form-item-control-wrapper {
  flex:1
}
.spaceLeft {
  margin-left: 20px
}
.text-top {
  vertical-align:text-top
}
/** 新样式 */
.myformItem >>> .ant-radio-button-wrapper {
  border:0px solid #fff;
}
.myformItem.gold {
  padding: 24px;
}
.myformItem.gold >>>.ant-radio-button-wrapper{
  position: inherit!important;
}
.myformItem.gold >>> .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked)  {
  background:#f8f8f8;
}

.myformItem >>> .ant-layout, .ant-layout *{
  vertical-align: middle;
}
.myformItem >>> .ant-radio-button-wrapper::before {
  background: #fff!important;
}
.myformItem.noBorder >>> .ant-layout, .ant-layout * {
  border:0px solid #000
}
.myformItem.noPadding-top >>> .ant-card-body {
  padding-top:0px;
}
.myformItem.noPadding-bottom >>> .ant-card-body {
  padding-bottom: 0px
}
.myformItem.noMargin {
  margin-bottom: 0px!important
}
</style>
