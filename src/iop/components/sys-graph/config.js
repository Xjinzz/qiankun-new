import d3 from './d3'
const config = {
  width: 1160,
  height: 460,
  colorMap: {
    'Attribute': '#ff5757',
    'Foreign': '#7e4cef',
    'Inherit': '#47ef1f',
    'default': '#333'
  },
  color: d3.scale.category20(),
  nodeTextFieldKey: 'name',
  urlFixed: 'http://118.190.199.44:7476'
}

export default config
