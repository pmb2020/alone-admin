import {get,post} from '@/until/request.js'

export const getUser = (params)=>{
	return get('user',params)
}

export const login = (data)=>{
	return post('login',data)
}

export const getTable = (params)=>{
	return get('table')
}