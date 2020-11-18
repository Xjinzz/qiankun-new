#### v-model 图片id
### option 
#### width: 图片宽度（同css，默认100px）
#### height: 图片高度（同css，默认100px）
#### circle: 是否圆形（默认否）
#### autoLoad: 是否自动请求（默认true）
---
### 对外周期
#### onBeforeLoad
#### onSuccess
#### onError
---
### 外部可调用方法
#### load(id) 获取图片渲染
---
### 对外slot
#### default 失败的占位
#### loading loading占位
---
### 使用demo
```html
  <iop-preview v-model="picId" :options="option">
    啊  失败了
    <template #loading>加载中</template>
  </iop-preview>
  <a-button @click="changePicId">
    修改id
  </a-button>
```
```javascript
option: {
  width: '1000px',
  height: '300px',
  circle: true
},
picId: 'f63e47ac72dc51ed0172e094eb9101b4'
changePicId () {
  this.picId = 'f63e47ac72dc51ed0172e09592ba01ba'
},
```