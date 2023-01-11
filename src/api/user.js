import {get,post} from '@/utils/request.js'

export const getSelectOption = (params)=>{
	return get('/user/options/',params)
}

export const getUserInfo = (params)=>{
	return get('/user/userinfo/',params)
}

export const updateUserPassword = (data)=>{
	return post('/user/resetpass/',data)
}

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
// 学校
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
//角色
export const getRole = (params)=>{
	return get('/role/list/',params)
}

export const addRole = (data)=>{
	return post('/role/add/',data)
}

export const updateRole = (data)=>{
	return post('/role/edit/',data)
}

export const deleteRole = (params)=>{
	return get('/role/delete/',params)
}