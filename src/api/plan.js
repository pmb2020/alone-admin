import {get,post} from '@/utils/request.js'

export const getPlan = (params) =>{
	return get('/plan/list/',params)
}

export const getPlanOption = (params) =>{
	return get('/plan/options/',params)
}

export const addPlan = (data) =>{
	return post('/plan/add/',data)
}

export const updatePlan = (data) =>{
	return post('/plan/edit/',data)
}

export const getPlanInfo = (params) =>{
	return get('/plan/detail/',params)
}

export const getPlanClass = (params) =>{
	return get('/plan/class_list/',params)
}

export const getPlanSchool = (params) =>{
	return get('/plan/school_list/',params)
}