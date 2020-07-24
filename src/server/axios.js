import axios from 'axios'
import Qs from 'qs'
const fetch = axios.create({
	baseURL: 'http://www.larjwt.test/api',
	timeout: 1000,
	headers: {
		'Content-Type':'application/x-www-form-urlencoded'
	}
})
// 请求拦截器
fetch.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	let token= localStorage.getItem('token');
	if(token) config.params['token']= token;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
fetch.interceptors.response.use(function(response) {
	return response;
}, function(error) {
	return Promise.reject(error);
});

// 封装get方法
export function get(url,params={}){
	return new Promise((resolve,reject)=>{
		fetch.get(url,{params:params})
		.then(res=>{
			resolve(res);
		})
		.catch(err=>{
			reject(err)
		})
	})
}

// 封装post方法
export function post(url,params={}){
	return new Promise((resolve,reject)=>{
		fetch.post(url,Qs.stringify(params))
		.then(res=>{
			// console.log('post success');
			resolve(res)
		})
		.catch(err=>{
			reject(err)
			// console.log('error post');
			// console.log(err)
		})
	})
}