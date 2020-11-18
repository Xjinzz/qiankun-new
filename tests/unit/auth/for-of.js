// // Object
// const es6 = {
//   edition: 6,
//   committee: 'TC39',
//   standard: 'ECMA-262'
// }
// for (const key of Object.keys(es6)) {
//   console.log(key + ': ' + es6[key])
// }

// // Array Like
// const arrayLike = {
//   length: 2,
//   0: 'a',
//   1: 'b'
// }
// const arr1 = Array.from(arrayLike)
// for (const e of arr1) {
//   console.log(e)
// }

// // Map
// const map = new Map().set('a', 1).set('b', 2)
// for (const pair of map) {
//   console.log(pair)
// }
// for (const [ key, value ] of map) {
//   console.log(key + ' : ' + value)
// }
// for (const pair of map.entries()) {
//   console.log(pair)
// }
// for (const pair of map.keys()) {
//   console.log(pair)
// }
// for (const pair of map.values()) {
//   console.log(pair)
// }

// // Set
// const engines = new Set([ 'red', 'green', 'blue' ])
// for (const e of engines) {
//   console.log(e)
// }
// for (const pair of engines.entries()) {
//   console.log(pair)
// }
// for (const pair of engines.keys()) {
//   console.log(pair)
// }
// for (const pair of engines.values()) {
//   console.log(pair)
// }

// // Array
// const arr = [ 'red1', 'green1', 'blue1' ]
// arr.foo = 'hello'
// for (const i of arr) {
//   console.log(i)
// }
// for (const pair of arr.entries()) {
//   console.log(pair)
// }
// for (const pair of arr.keys()) {
//   console.log(pair)
// }
// for (const pair of arr.values()) {
//   console.log(pair)
// }

// // arguments对象
// function printArgs () {
//   for (const x of arguments) {
//     console.log(x)
//   }
// }
// printArgs('a', 'b')

// const arrayLike = { length: 2, 0: 'a', 1: 'b' }
// for (const x of Array.from(arrayLike)) {
//   console.log(x)
// }

// const str = 'hello'
// for (const s of str) {
//   console.log(s)
// }

// for (const x of 'a\uA83D\uAC0A') {
//   console.log(x)
// }

const arr = [ 0, 1, 200000, 500, 9999 ]
for (var n of arr) {
  if (n > 1000) {
    break
  }
  console.log(n)
}
