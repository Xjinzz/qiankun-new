## 表单组件

基于官方form组件的二次封装。提供数据查询、提交等功能。



### 规约

* 包含表单的文件命名一般以`Form`结尾
* 表单项的定义单独保存为`.js`文件，放在页面文件同级的`vo`文件夹下，一般以`-form-vo`结尾



### 预备知识

* 官方form组件中页面布局、`v-decorator`和表单验证



### 引入

```javascript
import { IopDataForm } from '@/iop/components'
```



### 属性

| 序号 | 名称            | 类型                             | 必填 | 默认值                 | 说明                                                         |
| ---- | --------------- | -------------------------------- | ---- | ---------------------- | ------------------------------------------------------------ |
| 1    | vo              | Array<Object>                    | 是   | --                     | 表单控件绑定定义                                             |
| 2    | url             | string                           | 否   | --                     | 表单加载数据、提交数据的接口地址。加载数据的get请求地址为`${url}/${id}`；新建数据的post请求地址为`${url}`；更新数据的put请求地址为`${url}/${id}` |
| 3    | id              | string                           | 是   | --                     | 表单项的主键值，允许为空字符串                               |
| 4    | mode            | 'create'&#124;'view'&#124;'edit' | 是   | --                     | 表单的模式。表单的提交方法根据mode设置执行新建post或put请求  |
| 5    | submitHidden    | boolean                          | 否   | true                   | 提交请求成功后是否关闭弹窗                                   |
| 6    | width           | number                           | 否   | 520                    | 弹窗的宽度                                                   |
| 7    | loadConvertor   | Function (values)                | 否   | (values) **=>** values | 执行查询详情方法后，将数据赋值到控件之前执行，可以对查询的数据做格式转换、设置默认值等操作 |
| 8    | submitConvertor | Function (values)                | 否   | (values) **=>** values | 执行提交请求之前，获取到页面的控件输入值之后执行，可以对输入的数据做格式转换等操作 |
| 9    | submitSuccess   | Function ()                      | 否   | () **=>** { }          | 执行提交请求之后执行                                         |
| 10   | title           | string                           | 否   | --                     | 如未设置，执行显示弹窗方法前会根据mode设置弹窗标题属性，'create'、'view'、'edit'分别对应'新建'、'查看'、'编辑 |

> loadConvertor和submitConvertor必须有返回数据，否则可能导致表单项赋值失败或者提交数据为空
>
> 表单控件赋值只支持`v-decorator`修饰的项，字典组件暂不支持

* vo

| 序号 | 名称      | 类型    | 必填 | 默认值 | 说明                                                         |
| ---- | --------- | ------- | ---- | ------ | ------------------------------------------------------------ |
| 1    | title     | string  | 否   | --     | 预留，一般                                                   |
| 2    | dataIndex | string  | 是   | --     | 控件对应的dto属性名                                          |
| 3    | hidden    | boolean | 否   | false  | 设置为false则加载数据后不给控件赋值(避免给表单控件赋值时，因不存在的dto属性命对应的控件而提示的警告信息) |



### 方法

* showModal ()，显示弹窗，并根据`mode`和`id`加载数据。若`mode`为'create'，则将已定义的控件值置空。

| 序号 | 属性  | 说明     |
| ---- | ----- | -------- |
| 1    | value | 选择的值 |



### 事件

* onSubmitSuccess (data = { })，提交成功触发，返回提交接口返回的数据对象



### 插槽

名称为`form`，变量`record`为根据`id`查询到的数据对象

```vue
<template #form="{ record }">
  <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <a-col :span="9" :offset="2">
      <a-form-item label="机构名称：" v-bind="formItemLayout">
        <a-input v-decorator="['deptName', { rules: [{ required: true, whitespace: true, message: '机构名称不能为空' }] }]" />
    </a-form-item>
    </a-col>
    <a-col :span="10">
      <a-form-item label="机构编码" v-bind="formItemLayout">
        <a-input v-decorator="['deptCode', { rules: [{ required: true, whitespace: true, message: '机构编码不能为空' }] }]" />
    	</a-form-item>
    </a-col>
  </a-row>
	<!-- 是否删除 -->
  <input type="hidden" id="isDel" :value="record.isDel" />
  <!-- LDAP同步标志 -->
  <input type="hidden" id="ldapFlag" :value="record.ldapFlag" />
  <!-- LDAP上次同步时间 -->
  <input type="hidden" id="ldapLastTime" :value="record.ldapLastTime" />
</template>
```



### 隐藏控件

建议放在表单的尾部，使用`v-bind`绑定`record`的属性值

```vue
<!-- 是否删除 -->
<input type="hidden" id="isDel" :value="record.isDel" />
<!-- LDAP同步标志 -->
<input type="hidden" id="ldapFlag" :value="record.ldapFlag" />
<!-- LDAP上次同步时间 -->
<input type="hidden" id="ldapLastTime" :value="record.ldapLastTime" />
```

