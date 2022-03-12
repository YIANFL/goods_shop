// 对于axios进行二次封装
// 引入axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 在当前模块中引入store
import store from '@/store'
console.log(nprogress)
// 利用axios的create()对象方法创建一个axios实例,可以传入一个配置对象
// request就是axios
const requests = axios.create({
  // 基础路径,路径中会出现api
  baseURL: 'api',
  // 代表请求超时的时间是5s
  timeout: 5000
})

// 请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在请求发送之前做一些事情

requests.interceptors.request.use((config) => {
  // config就是配置对象,,对象中有一个属性很重要,header请求头
  // 进度条开始启动
  // console.log(store)
  if (store.state.detail.uuid_token) {
    // 给请求头添加一个字段{userTempId},这个字段已经和后台商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 判断是不是有token，如果有发送请求前就要携带上
  if (store.state.users.token) {
    config.headers.token = store.state.users.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 服务器响应成功的回调函数,响应数据回来之后,响应拦截器可以检测到,做一些事情
  // 返回响应结果的data字段
  return res.data
}, (error) => {
  // 服务器响应失败的回调函数
  console.log(error)
  // 进度条结束
  nprogress.done()
  return Promise.reject(new Error('fail'))
})
// 对外暴露axios
export default requests
