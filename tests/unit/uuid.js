const uuidv4 = require('uuid/v4')
const str = uuidv4().replace(/-/g, '')
console.log(str)
console.log(str.length)
