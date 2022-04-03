// 该文件是axios封装用到的一些配置变量
let BASE_URL = ''
const TIME_OUT = 10000

// 根据不同环境变量，使用不同的BASE_URL
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000/prod'
} else {
  BASE_URL = 'http://123.207.32.32:8000/test'
}

export { BASE_URL, TIME_OUT }
