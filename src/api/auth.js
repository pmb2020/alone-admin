import {get,post} from '@/utils/request.js'

export const login = (data) =>{
	return post('/user/login/',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}
