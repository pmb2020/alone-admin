import {
	get,
	post,
	put,
	del
} from './request.js'
import axios from 'axios'
export const login= params=>post('/login',params);
// export const admin = params => get('/admins/admin.json', params)
// export const users = params => get('http://www.alone.test/api/alone', params)
// export const userDel = params => del('http://www.alone.test/api/alone', params)
export const userPost = params => post('http://www.alone.test/api/alone', params)
export const users = (method,params) => {
	// return sendHttp('http://www.alone.test/api/alone',params,method)
	return sendHttp('/user',params,method)
}
export const article = (method,params) => {
	return sendHttp('/article',params,method)
}
// export const userPost=params =>put('http://www.alone.test/api/alone',params)
// export const article = params => get('/articles/article.json',params)
// export const article = params => {
// 	console.log(params.id)
// 	return get('/articles/article.json', params).then(res => {
// 		console.log(res)
// 		return res
// 	}).catch(err => {
// 		return err
// 	})
// }
// console.log(process.env.NODE_ENV)
/**
 * @param {Object} url
 * @param {Object} params
 * @param {Object} method
 * 封装的restful风格的http请求
 */
function sendHttp(url,params,method){
	switch (method) {
		case 'POST':
			return post(url, params);
		case 'PUT':
			return put(url, params);
		case 'DELETE':
			return del(url, params);
		default:
			return get(url, params);
	}
}
