import { v4 as uuidv4 } from 'uuid'

class UUIDUtils {
  static generate () {
    return uuidv4().replace(/-/g, '')
  }
}
export default UUIDUtils
