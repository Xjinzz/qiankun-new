## 下拉树组件

基于官方TreeSelect组件的二次封装。提供节点加载等功能。



### 引入

```javascript
import { IopDataTreeSelect } from '@/iop/components'
```



### 属性

| 序号 | 名称           | 类型    | 必填 | 默认值                                   | 说明                                                         |
| ---- | -------------- | ------- | ---- | ---------------------------------------- | ------------------------------------------------------------ |
| 1    | url            | string  | 是   | --                                       | 加载数据请求的url                                            |
| 2    | query          | string  | 否   | 'id'                                     | 加载下一级请求url的参数名，参数值为树节点对应的key值。如默认根节点加载下一级节点的请求地址为`${url}?${queryName}=0` |
| 3    | dropdownStyle  | Object  | 否   | { maxHeight: '400px', overflow: 'auto' } | 下拉项区域的演示                                             |
| 4    | selectLeafOnly | boolean | 否   | false                                    | 只允许叶子节点被选中                                         |





### 事件

* change，节点被选中触发

| 序号 | 属性  | 说明            |
| ---- | ----- | --------------- |
| 1    | value | 选中的节点key值 |



### 方法

* setSelected ({ title = '', value = '' })，设置选中项，暂不支持设置多个选中项

| 序号 | 参数  | 必填 | 默认值 | 说明     |
| ---- | ----- | ---- | ------ | -------- |
| 1    | value | 是   | --     | 选中的值 |
| 2    | title | 是   | --     | 显示的值 |

* cleanSelected ()，清除选中项