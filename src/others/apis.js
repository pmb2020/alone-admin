import {
	get,
	post,
	put,
	del
} from './request.js'
import axios from 'axios'

export const login= params=>post('/login',params);
export const logout= params=>get('/logout');
export const adminInfo = params => get('/admin', params)
export const userPost = params => post('http://www.alone.test/api/alone', params)
/**
 * 关于用户实体的四种操作（post增、get查、put改、删除delete）
 */
export const users = (method,params) => {
	return sendHttp('/user',params,method)
}
/**
 * 关于文章实体的四种操作
 */
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
