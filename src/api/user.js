import {get,post} from '@/until/request.js'

export const getUser = (params)=>{
	return get('user',params)
}

export const login = (params)=>{
	return post('login',params)
}