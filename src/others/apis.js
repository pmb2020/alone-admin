import {
	get
} from './request.js'
import axios from 'axios'
// export const login= params=>post('/login',params);
// export const getAdminList = params => get('/admin/list',params);
export const test = params => get('/admins/admins.json',params)
export const article = params => get('/articles/article.json',params)
// console.log(process.env.NODE_ENV)
