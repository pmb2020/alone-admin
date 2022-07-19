import {get,post} from '@/untils/request'

export const getUser = (params:any)=>{
	return get('https://alone.usemock.com/api/user',params)
}

export const login = (data:any)=>{
	return post('https://alone.usemock.com/api/login',data)
}

export const getTable = (params:any)=>{
	return get('https://alone.usemock.com/api/table')
}