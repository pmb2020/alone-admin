import axios from 'axios'
// import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css';

const http = axios.create({
	baseURL:import.meta.env.VITE_API_HOST,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	timeout: 5000,
})

//请求拦截器
http.interceptors.request.use(function(config){
	if(import.meta.env.MODE==='development' && config.baseURL===import.meta.env.VITE_API_HOST){
		config.baseURL='/api/'
	}
	let token = localStorage.getItem('token')
	if(token){
		// config.headers['Authorization'] = 'Bearer '+ token;
		config.headers['token'] = token;
	}
	return config
})

// 响应拦截器
http.interceptors.response.use(function(response){
	if(response.data.responseCode != 0){
		if(response.status == 401 || response.data.code == 10001){
			localStorage.removeItem('token')
		}
		ElMessage.error(response.data.responseCode+'：'+response.data.responseMsg)
		return Promise.reject(response.data)
	}
	return response.data.data
},function(error){
	return Promise.reject(error)
})

// 封装get方法
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		http.get(url, {params}).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err)
			})
	})
}

export function post(url, data = {}){
	return new Promise((resolve, reject)=>{
		http.post(url,data).then(res=>{
			resolve(res);
		}).catch(err=>{
			reject(err)
		})
	})
}

export function apiHttp(url,params ={},method='get'){
	let options={method,url}
	switch (method){
		case 'get':
			options.params=params
			break
		case 'post':
			options.data=params
			break
		case 'put':
			options.data=params
			options.url +='/'+params.id
			break
		case 'delete':
			options.url +='/'+params.id
			break
	}
	return new Promise((resolve, reject)=>{
		http.request(options).then(res=>{
			resolve(res);
		}).catch(err=>{
			reject(err)
		})
	})
}

export default http 

