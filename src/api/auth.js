import {get,post} from '@/untils/request.ts'

export const login = (data) =>{
	return post('login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}
