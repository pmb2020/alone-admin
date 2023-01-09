import {get,post} from '@/utils/request.js'

export const getUser = (params)=>{
	return get('/user/list/',params)
}

export const addUser = (data)=>{
	return post('/user/add/',data)
}

export const updateUser = (data)=>{
	return post('/user/edit/',data)
}

export const deleteUser = (params)=>{
	return get('/user/delete/',params)
}

export const login = (data)=>{
	return post('https://alone.usemock.com/api/login',data)
}

export const getTable = (params)=>{
	return get('https://alone.usemock.com/api/table')
}

export const getSchool = (params)=>{
	return get('/school/list/',params)
}

export const addSchool = (data)=>{
	return post('/school/add/',data)
}

export const updateSchool = (data)=>{
	return post('/school/edit/',data)
}

export const deleteSchool = (params)=>{
	return get('/school/delete/',params)
}