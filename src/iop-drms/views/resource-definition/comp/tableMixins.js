import Define from '../tool/define'
import { objectTool } from 'mwutil'
const mixins = {
  methods: {
    mx_dealTableConfig (config, x) {
      const dealRes = {
        url: x.api.listDataUrl,
        rowKey: x.table.rowKey
      }
      if (x.hasOwnProperty('selectable')) {
        dealRes.selectable = x.selectable
      }
      x.table.columns.map(item => {
        if (item.fixed !== Define.FIXED.LEFT || item.fixed !== Define.FIXED.RIGHT) {
          delete item.fixed
        }
        if (!item.hyperlink && item.ellipsis) {
          item.customRender = (text, row, index) => {
            return (
              <a-tooltip placement="top">
                <template slot="title">
                  <span>{text}</span>
                </template>
                <p class='ellipsis'>
                  {{ text }}
                </p>
              </a-tooltip>
            )
          }
        }
        if (item.hyperlink) {
          delete item.hyperlink
          item.customRender = (text, row, index) => {
            if (item.ellipsis) {
              return (
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{text}</span>
                  </template>
                  <a href={text} target="_blank" title={text} class={ '__tableItemtd' + (item.ellipsis ? ' ellipsis' : '')}>
                    { item.title }
                  </a>
                </a-tooltip>
              )
            } else {
              return (
                <a href={text} target="_blank" title={text} class='__tableItemtd'>
                  { item.title }
                </a>
              )
            }
          }
        }
        if (!item.hyperlink && !item.ellipsis) {
          item.customRender = (text, row, index) => {
            return (
              <p class="__tableItemtd" style='margin-bottom:0px'>
                { text }
              </p>
            )
          }
        }
      })
      dealRes.columns = x.table.columns
      // 处理scroll
      if (!x.scroll.x || x.scroll.x === '') {
        delete x.scroll.x
      }
      if (!x.scroll.y || x.scroll.y === '') {
        delete x.scroll.y
      }
      dealRes.scroll = x.scroll
      return Object.assign(dealRes, objectTool.deepClone(config))
    }
  }
}
export default mixins
