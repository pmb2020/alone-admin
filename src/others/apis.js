import {
	get
} from './request.js'
import axios from 'axios'
// export const login= params=>post('/login',params);
// export const getAdminList = params => get('/admin/list',params);
export const test = params => get('/admins/admins.json', params)
// export const article = params => get('/articles/article.json',params)
console.log('你大爷的')
export const article = params => {
	console.log(params.id)
	return get('/articles/article.json', params).then(res => {
		console.log(res)
		return res
	}).catch(err=>{
		return err
	})
	// return new Promise((resolve, reject)=>{
	// 	get('/articles/article.json',params).then(res=>{
	// 		console.log(res)
	// 		resolve(res)
	// 	})
	// })
}
// console.log(process.env.NODE_ENV)
