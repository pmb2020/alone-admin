import axios from 'axios'
// import ElementUI from 'element-ui';
import Qs from 'qs'
import {
	Message
} from 'element-ui'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
	axios.defaults.baseURL = 'http://api.gold404.cn/api/alone-admin'
	console.log('切换为本地开发环境')
} else if (process.env.NODE_ENV === 'test') {
	axios.defaults.baseURL = 'http://www.alone.test/api/alone-admin'
	console.log('切换为debug调试环境')
} else if (process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = 'http://api.gold404.cn/api/alone-admin'
	console.log('切换为正式生产环境')
}
const instance = axios.create({
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	}
})
// 请求拦截器
instance.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// config.headers['Content-Type'] = 'application/json';
	var token = localStorage.getItem('token') || '';
	if (token){
		// config.headers.token  = token;
		config.params = {
			"token":token
		};
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function(response) {
	if(response.data.error_code != 0){
		Message.error(response.data.msg);
	}
	return response.data;
}, function(error) {
	if(window.location.href.indexOf('login') == -1){//是login
		if(error.response.status==401){
			Message('身份未通过验证或身份验证已过期！')
			localStorage.setItem('adInfo','')
			localStorage.setItem('token','')
		}else{
			Message('出现了未知错误！')
		}
	}
	return Promise.reject(error);
});

// 封装get方法
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.get(url, {
				params: params
			})
			.then(res => {
				resolve(res);
			}).catch(err => {
				reject(err)
			})
	})
}

/**
 * 封装post方法
 */
export function post(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.post(url, Qs.stringify(params))
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err)
			})
	})
}
/**
 * 封装put方法
 */
export function put(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.put(url + "/" + params.id, Qs.stringify(params))
			.then(res => {
				resolve(res);
			}).catch(err => {
				reject(err)
			})
	})
}
/**
 * 封装delete请求
 */
export function del(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.delete(url + "/" + params.id)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}
