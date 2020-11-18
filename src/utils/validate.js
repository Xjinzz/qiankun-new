import { stringTool } from 'mwutil'
const space = (str) => {
  return stringTool.trim(str, 3).length === 0
}
export {
  space
}
