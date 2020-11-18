// import MessageUtils from '@/utils/message'
import { message } from 'ant-design-vue/es'
import themeColor from './themeColor.js'

const colorList = [
  {
    key: '薄暮',
    color: '#F5222D',
    colorKey: 'dusk'
  },
  {
    key: '火山',
    color: '#FA541C',
    colorKey: 'volcano'
  },
  {
    key: '日暮',
    color: '#FAAD14',
    colorKey: 'nightfall'
  },
  {
    key: '明青',
    color: '#13C2C2',
    colorKey: 'mingqing'
  },
  {
    key: '极光绿',
    color: '#52C41A',
    colorKey: 'auroraGreen'
  },
  {
    key: '拂晓蓝（默认）',
    color: '#1890FF',
    colorKey: 'dawn'
  },
  {
    key: '极客蓝',
    color: '#2F54EB',
    colorKey: 'geekBlue'
  },
  {
    key: '酱紫',
    color: '#722ED1',
    colorKey: 'purple'
  }
]

const updateTheme = (newPrimaryColor) => {
  const hideMessage = message.loading('正在切换主题！', 0)
  themeColor.changeColor(newPrimaryColor).finally(() => {
    setTimeout(() => {
      hideMessage()
    })
  })
}

const updateColorWeak = (colorWeak) => {
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
