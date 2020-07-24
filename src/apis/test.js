import {get,post} from '../server/axios.js'
// 登录
export const login= params=>post('/login',params);
export const getUserInfo = params=>get('user');
// import axios from 'axios'

// const testdata=fetch.get('').then(res=>{
	// console.log(res.data)
// }).catch(err=>{
	// console.log(err.response.data);
	// return Promise.reject('请求错误了')
// })
// testdata.then(res=>{
// 	console.log(res)
// })
// const ttada=get('/user',{id:'sssssss',token}).then(res=>{
// 	console.log(res)
// })
// post('/login',{email:'wqeqw@qq.com',password:'123456'}).then(res=>{
// 	console.log(res)
// }).catch(err=>{
// 	console.log(err)
// })
// console.log(get(''))
export const getcity = params => {
	return 'ghfgh'
}