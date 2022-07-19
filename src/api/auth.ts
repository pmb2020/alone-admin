import {get,post} from '@/untils/request'

export const login = (data:Object) =>{
	return post('login',data)
}

export const loginOut = (data:Object) =>{
	return get('logout',data)
}
