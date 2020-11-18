const Define = {
  NODESTART: 'start_',
  NODEEND: 'end_'
}
const Business = {
  id: 9000,
  newId: () => {
    return Business.id++
  },
  // 制作合规的nodes
  makeNodes (data, alg) {
    const oWidth = document.body.clientWidth || document.documentElement.clientWidth
    // const flag = (1920 - oWidth - 250) * 0.1
    let flag = 0
    if (alg === 1) {
      flag = (1920 - oWidth) * 0.2
    }
    const flagX = (oWidth - flag) / 1920
    const flagY = oWidth / 1920
    const result = [
      {
        id: Define.NODESTART + data.__id,
        x: (data.form[0] * flagX) || 0,
        y: (data.form[1] * flagY) || 0
      },
      {
        id: Define.NODEEND + data.__id,
        x: (data.to[0] * flagX) || 0,
        y: (data.to[1] * flagY) || 0
      }
    ]
    // const result = [
    //   {
    //     id: Define.NODESTART + data.__id,
    //     x: (data.form[0]) || 0,
    //     y: (data.form[1]) || 0
    //   },
    //   {
    //     id: Define.NODEEND + data.__id,
    //     x: (data.to[0]) || 0,
    //     y: (data.to[1]) || 0
    //   }
    // ]
    return result
  },
  makeEdges (data) {
    return {
      source: Define.NODESTART + data.__id,
      target: Define.NODEEND + data.__id,
      duration: 2000,
      delay: data.delay,
      style: {
        lineWidth: data.lineWidth || 6,
        circleWidth: data.circleWidth || 9,
        stroke: data.stokeColor,
        circle: data.circleColor
      }
    }
  }
}
export default Business
