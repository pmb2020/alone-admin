import axios from 'axios'
import qs from 'qs';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
const instance = axios.create({
	baseURL:'https://alone.usemock.com/api/',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	},
})

// 响应拦截器
instance.interceptors.response.use(function(response){
	if(response.data.code != 0){
		ElMessage.error(response.data.msg)
	}
	return response.data
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
		instance.post(url,qs.stringify(data)).then(res=>{
			resolve(res);
		}).catch(err=>{
			reject(err)
		})
	})
}
