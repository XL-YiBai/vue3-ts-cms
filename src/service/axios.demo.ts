import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

// // 模拟get请求，并且传入参数
// axios
//   .get('/get', {
//     params: {
//       name: 'yibai',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 模拟post请求，并传入参数
// axios
//   .post('/post', {
//     data: {
//       name: 'yibai',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'yibai', age: 18 } }),
    axios.post('/post', { data: { name: 'yibai', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// axios 拦截器
// fn1：请求发送成功会执行的函数，fn2请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1. 给请求添加token
    // 2. 请求添加Loading动画
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1：数据响应成功（服务器正常的返回了数据，2xx）
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
