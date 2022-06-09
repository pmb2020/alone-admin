import axios from 'axios'
const fetch = axios.create({
	timeout: 1000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	}
})

// 封装get方法
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		fetch.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data.data);
			}).catch(err => {
				Message("请求错误！");
			})
	})
}
