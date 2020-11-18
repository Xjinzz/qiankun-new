<script>
import Edit from './formItem/EditHoc'
import Define from '../tool/define'
import searchDomManage from '../tool/searchDomManage'
// 生成表单的文件
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    dataSource () {
      return this.options.dataSource || []
    }
  },
  data () {
    return {
      allComp: {}
    }
  },
  mounted () {
    this.dataSource.forEach(x => {
      // 收集所有comp
      this.allComp[x.name] = this.$refs['editRef' + x.name]
    })
  },
  methods: {
    // 重置所有
    reset () {
      for (const compKey in this.allComp) {
        if (this.allComp[compKey].reset) {
          this.allComp[compKey].reset()
        }
      }
    },
    // 清除单条
    resetByField (name) {
      if (this.allComp[name].reset) {
        this.allComp[name].reset()
      }
    }
  },
  render: function (h) {
    // inputsearch事件
    function inputSearchEvent () {
      return {
        'pressEnter': (val) => {
          this.$emit('inputEnter', val)
        }
      }
    }
    return (
      <ARow gutter={48}>
        {
          this.dataSource.map((x) => {
            if (x.hidden) {
              return (
                <a-form-item style="display:none">
                  <a-input
                    type="hidden"
                    v-decorator={[x.name]}
                  />
                </a-form-item>
              )
            } else {
              let listenerList = {}
              // 如果是search页面则监听回车
              if (this.mode === Define.MODE.SEARCH) {
                const strategyMap = {
                  [Define.COMPTYPE.DATE]: searchDomManage.dateStrategy,
                  [Define.COMPTYPE.DATETIME]: searchDomManage.dateTimeStrategy
                }
                if (strategyMap[x.type]) {
                  x = strategyMap[x.type].apply(this, [x])
                }
              }
              if (this.mode === Define.MODE.SEARCH && x.type === Define.COMPTYPE.INPUT) {
                listenerList = inputSearchEvent.apply(this)
              }
              return (
                <a-col style={x.__show ? '' : 'display:none'} span={this.options.layoutColumn ? (24 / this.options.layoutColumn) : 8}>
                  <Edit
                    data={x}
                    mode={this.mode}
                    ref={ 'editRef' + x.name }
                    {
                    ...{
                      on: listenerList
                    }
                    }
                  />
                </a-col>
              )
            }
          })
        }
      </ARow>
    )
  }
}
</script>
