import {
	get
} from './request.js'
import axios from 'axios'
// export const login= params=>post('/login',params);
// export const getAdminList = params => get('/admin/list',params);
export const admin = params => get('/admins/admin.json', params)
export const users=params =>get('http://www.alone.test/api/alone',params)
// export const article = params => get('/articles/article.json',params)
export const article = params => {
	console.log(params.id)
	return get('/articles/article.json', params).then(res => {
		console.log(res)
		return res
	}).catch(err=>{
		return err
	})
}
// console.log(process.env.NODE_ENV)
