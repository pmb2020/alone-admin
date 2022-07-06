import {get,post} from '@/until/request.js'

export const login = (data) =>{
	return post('login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}
