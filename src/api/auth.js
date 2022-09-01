import {get,post} from '@/utils/request.js'

export const login = (data) =>{
	return post('https://alone.usemock.com/api/login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}
