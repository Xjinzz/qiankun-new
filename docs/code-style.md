## 编程风格

### 块级作用域

* 用`let`取代`var`。

* 在`let`和`const`之间，优先使用`const`。尤其在全局环境，不应该设置变量，只应该设置常量。

  

### 字符串

静态字符串一律使用单引号，动态字符串使用反引号。

```javascript
const a = 'foobar'
const b = `foot${a}bar`
```



### 优先使用解构赋值

* 数组成员赋值

```javascript
const arr = [1, 2, 3, 4]
const [first, second] = arr
```

* 函数的参数是对象

```javascript
function getFullName ({ firstName, lastName }) {
  ...
}
```

* 函数返回多个返回值，优先使用对象的解构赋值，而不是数组的解构赋值

```javascript
function processInput (input) {
  return { left, right, top, buttom }
}
  
const { left, right } = processInput(input)
```



### 对象

对象尽量静态化，一旦定义就不允许随意添加属性。如果必须添加属性，使用`Object.assign`方法，如

```javascript
const a = {}
Object.assign(a, { x: 3 })
```



### 数组

* 使用扩展运算符拷贝数组

```javascript
const copyItems = [...items]
```

* 使用`Array.from`方法，将类似数组的对象转化为数组

```javascript
const foo = document.querySelectorAll('.foo')
const nodes = Array.from(foo)
```



### 函数

* 立即执行的函数写成箭头函数的形式。使用匿名函数作为参数的场合，尽量使用箭头函数代替。
* 箭头函数取代`Function.portotype.bind`，不再使用`self/_this/that`绑定`this`。

```javascript
const bindMethod = (...params) => method.apply(this, params)
```

* 如果函数体较为复杂，行数较多，还是应该使用传统的函数写法。
* 所有的配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以作为参数。

```javascript
function divide(a, b, { option = false } = {}) {
  ...
}
```

* 不要在函数内部使用arguments变量，使用rest运算符代替。

```javascript
function concatenateAll(...args) {
  return args.join('')
}
```

* 使用默认值语法设置函数参数的默认值

```javascript
function handleThings (opts = {}) {
  ...
}
```



### 遍历

`for...of`可以使用的范围包括数组、Set和Map结构、某些类似数组的对象以及字符串。

* 数组

```javascript
const arr = ['red', 'green', 'blue']
arr.foo = 'hello'

for(const i of arr) {
  console.log(i) 
}
// red
// green
// blue
for(const i of arr.entries()) {
  console.log(i) 
}
// [0, "red"]
// [1, "green"]
// [2, "blue"]
for(const i of arr.keys()) {
  console.log(i) 
}
// 0
// 1
// 2
for(const i of arr.values()) {
  console.log(i) 
}
// red
// green
// blue
```

* Set

```javascript
const engines = new Set(['red', 'green', 'blue'])
for (const e of engines) {
  console.log(e)
}
// red
// green
// blue
for (const e of engines.entries()) {
  console.log(e)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
for (const e of engines.keys()) {
  console.log(e)
}
// red
// green
// blue
for (const e of engines.values()) {
  console.log(e)
}
// red
// green
// blue
```

* Map

```javascript
const map = new Map().set('a', 1).set('b', 2);
for (const pair of map) {
  console.log(pair);
}
// ["a", 1]
// ["b", 2]
for (const [ key, value ] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
for (const pair of map.entries()) {
  console.log(pair);
}
// ["a", 1]
// ["b", 2]
for (const pair of map.keys()) {
  console.log(pair);
}
// a
// b
for (const pair of map.values()) {
  console.log(pair);
}
// 1
// 2
```

* 类似数组的对象

```javascript
// DOM NodeList对象
const paras = document.querySelectorAll('p')
for (const p of paras) {
  p.classList.add('test')
}

// arguments对象
function printArgs() {
  for (const x of arguments) {
    console.log(x)
  }
}
printArgs('a', 'b')
// a
// b

const arrayLike = { length: 2, 0: 'a', 1: 'b' }
for (const x of Array.from(arrayLike)) {
  console.log(x);
}
// a
// b
```

* 字符串

```javascript
const str = 'hello'
for (const s of str) {
  console.log(s)
}
// h
// e
// l
// l
// o
```

* 对象

```javascript
const es6 = {
  edition: 6,
  committee: 'TC39',
  standard: 'ECMA-262'
}
for (const key of Object.keys(es6)) {
  console.log(key + ': ' + es6[key])
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

* break

```javascript
const arr = [ 0, 1, 200000, 500, 9999 ]
for (const n of arr) {
  if (n > 1000) {
    break
  }
  console.log(n)
}
// 0
// 1
```



### export

将`export`放在文件的尾部，便于查看，如：

```javascript
const firstName = 'Michael'
const lastName = 'Jackson'
const year = 1958

export { firstName, lastName, year }
```



### 注释

TBD

