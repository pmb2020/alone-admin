import {get,post} from '@/utils/request.js'

export const login = (data) =>{
	return post('login',data)
}

export const loginOut = (data) =>{
	return get('logout',data)
}

export const getRouter = (data) =>{
	return get('https://mock.apifox.cn/m1/2160073-0-default/api/router',data)
}
