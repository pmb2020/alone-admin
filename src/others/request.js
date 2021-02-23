import axios from 'axios'
import ElementUI from 'element-ui';
import Qs from 'qs'
import {
	Message
} from 'element-ui'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
	axios.defaults.baseURL = '/datas'
	console.log('切换为本地开发环境')
} else if (process.env.NODE_ENV === 'debug') {
	axios.defaults.baseURL = '/datas'
	console.log('切换为debug调试环境')
} else if (process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = 'datas'
	console.log('切换为正式生产环境')
}
const fetch = axios.create({
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	}
})
// 请求拦截器
// fetch.interceptors.request.use(function(config) {
// 	// 在发送请求之前做些什么
// 	// config.headers['Content-Type'] = 'application/json';
// 	let token = localStorage.getItem('token');
// 	if (token){
// 		config.params['token'] = token
// 	}
// 	return config;
// }, function(error) {
// 	// 对请求错误做些什么
// 	return Promise.reject(error);
// });

// 响应拦截器
// fetch.interceptors.response.use(function(response) {
// 	if(response.data.code===200){
// 		return response.data.data;
// 	}else{
// 		Message("错误："+response.data.msg);
// 		return 'error';
// 	}
// }, function(error) {
// 	return Promise.reject(error);
// });

// 封装get方法
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		fetch.get(url, {
				params: params
			})
			.then(res => {
				if(res.data.error_code==0){
					resolve(res.data.data);
				}else{
					Message("查看错误信息");
				}
				
				// if(res!='error'){
				// 	resolve(res);
				// }
			}).catch(err=>{
				Message("请求错误！");
			})
	})
}

/**
 * 封装post方法
 */
export function post(url, params = {}) {
	return new Promise((resolve, reject) => {
		fetch.post(url, Qs.stringify(params))
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

/**
 * 封装delete请求
 */
export function del(url, params = {}) {
	return new Promise((resolve, reject) => {
		fetch.delete(url, {
				params: params,
			})
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err)
			})
	})
}
