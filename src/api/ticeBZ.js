import {get,post} from '@/utils/request.js'

export const getProject = (params)=>{
	return get('/standards/projects',params)
}

export const getScore = (params)=>{
	return get('/standards/score',params)
}