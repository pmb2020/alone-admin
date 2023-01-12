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