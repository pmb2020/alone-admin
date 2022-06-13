import axios from 'axios'
const instance = axios.create({
	baseURL:'https://alone.usemock.com/api/',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	},
})

// 响应拦截器
instance.interceptors.response.use(function(response){
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

export function post(url, params = {}){
	return new Promise((resolve, reject)=>{
		instance.post(url,{params}).then(res=>{
			resolve(res.data.data);
		}).catch(err=>{
			reject(err)
		})
	})
}
