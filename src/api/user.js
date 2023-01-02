import http,{get,post} from '@/utils/request.js'

export const getSchool = (params)=>{
	return http.get('/school/list/',params)
}

export const getUser = (params)=>{
	return http.get('/user/list/',params)
}

export const login = (data)=>{
	return post('https://alone.usemock.com/api/login',data)
}

export const getTable = (params)=>{
	return get('https://alone.usemock.com/api/table')
}