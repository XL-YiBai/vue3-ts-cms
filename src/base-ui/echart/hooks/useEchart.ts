import * as echarts from 'echarts'

// 封装对echart初始化的操作
export default function (el: HTMLElement) {
  // 接收一个dom，生成一个echart实例
  const echartInstance = echarts.init(el)

  // 提供一个函数，接收外界传入的options
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  // 当浏览器重置大小时，让ecahrt实例也重置大小，实现响应式
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
