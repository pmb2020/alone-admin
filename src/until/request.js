import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';

const instance = axios.create({
	baseURL:'https://alone.usemock.com/api/',
	timeout: 5000,
})

// 响应拦截器
instance.interceptors.response.use(function(response){
	if(response.data.code != 0){
		ElMessage.error(response.data.code+'：'+response.data.msg)
	}
	return response.data.data
},function(error){
	return Promise.reject(error)
})

// 封装get方法
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.get(url, {
				params: params
			}).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err)
			})
	})
}

export function post(url, data = {}){
	return new Promise((resolve, reject)=>{
		instance.post(url,data).then(res=>{
			resolve(res);
		}).catch(err=>{
			reject(err)
		})
	})
}
