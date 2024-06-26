//axiosInstance.js
//导入axios
import axios from 'axios'
import { Message } from '@arco-design/web-vue'
//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const instance = axios.create({
	baseURL:'http://127.0.0.1:9090/api', //请求后端数据的基本地址，自定义
	timeout: 2000                   //请求超时设置，单位ms
})
instance.interceptors.request.use(
	(config) => {
	  let token = localStorage.getItem('token')
	  if (!token) token = ''
  
	  config.headers.Authorization = 'Bearer ' + token
	  return config
	},
	(error) => {
	  return Promise.reject(error)
	}
  )
  
  instance.interceptors.response.use(
	(response) => {
	  return response
	},
	(error) => {
	  if (!error.response) {
		return Promise.reject(error)
	  }
	  if (error.response.status === 401) {
		Message.error('请先登录账号')
		// router.push('/login')
	  }
	  if (error.response.status === 403) {
		Message.error('无操作权限')
	  }
	  return Promise.reject(error)
	}
  )
//导出我们建立的axios实例模块，ES6 export用法
export default instance
