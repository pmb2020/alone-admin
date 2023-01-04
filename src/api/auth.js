import {get,post} from '@/utils/request.js'

export const login = (data) =>{
	return post('login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}

export const getRouter = (data) =>{
	return get('http://127.0.0.1:3000/json/router.json',data)
}
