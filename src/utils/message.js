import { message } from 'ant-design-vue/es'
/**
   * 消息提示
   */
class MessageUtils {
  static error (content = '') {
    if (content instanceof Error) {
      this.warn(content.message)
      return
    }
    if (content.includes('错误码4100')) {
      this.warn('服务异常，请稍后再试')
    } else if (content.includes('错误码6000') || content.includes('错误码4000')) {
      this.warn(content)
    } else {
      message.error(content || '请求错误，请稍后再试')
      console.error('请求错误', content)
    }
  }
  static success (content = '') {
    message.success(content || '操作成功')
  }
  static warn (content = '') {
    message.warn(content)
    console.warn('请求错误', content)
  }
  static loading (content = '', duration = 3) {
    message.loading(content, duration)
  }
}

export default MessageUtils
