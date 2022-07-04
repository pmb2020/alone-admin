import {get,post} from '@/until/request.js'

export const getUser = (params)=>{
	return get('https://alone.usemock.com/api/user',params)
}

export const login = (data)=>{
	return post('https://alone.usemock.com/api/login',data)
}

export const getTable = (params)=>{
	return get('https://alone.usemock.com/api/table')
}