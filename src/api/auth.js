import {get,post} from '@/until/request.js'

export const login = (data) =>{
	return post('https://api.gold404.cn/api/alone-admin/login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}
