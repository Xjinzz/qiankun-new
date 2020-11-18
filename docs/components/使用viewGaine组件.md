### 组件目前支持自定义的slot
- 默认 添加到整个页面最下面
- baseForm 替换整个表单区域（包含按钮组）
- infoBtnGroup 替换整个按钮组
- beforeConfirm 替换表单区域确认按钮前
- confirmBtn 替换表单区域确认按钮
- afterConfirm 替换表单区域确认按钮后
- befornCancel 替换表单区域取消按钮前（在afterConfirm之后）
- confirmBtn 替换表单区域取消按钮
- afterConfirm 替换表单区域取消按钮后
- relation 替换整个关联

### attrs
- hideRealtion 是否隐藏关联模块 require: false
- depeatId 请求页面信息的id 一般为querypath的id(也就是数据的objectId) require: true
- detailId 修改或者查看时候的详情id 一般为querypath的detailId(也就是数据的id) require: false
- mode 表单状态 require: true
   - create => 新增
   - edit => 修改
   - view => 查看

- depeatCode objectCode请求form接口使用 一般为querypath的code(也就是数据的objectCode) require: false
- treeSelectCode tree选中的节点code 一般为querypath的treeSelectCode(也就是数据的code) require: false
- treeSelectId tree选中的节点id 一般为querypath的treeSelectId(也就是树的id) require: false

### 如果是view-vertical-gaine组件, 增加一个attr
- paneList 关联标签的tablist 至少包含objectName(标签显示文字) 和 objcetId（标签匹配唯一id）

### 注意：
1、使用panelist需要声明slot=objcetId的节点(不声明不会报错，但会导致点击tab什么都不显示), example:
```javascript
// paneList = [{ objectName:'测试', objectId="test" }]
<div slot="test">xxxxx</div>
```

2、hideRealtion为true时，声明了也不会生效！
