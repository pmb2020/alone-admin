import {get,post} from '@/utils/request.js'

export const getProject = (params)=>{
	return get('/standards/projects',params)
}

export const getScore = (params)=>{
	return get('/standards/score',params)
}

export const getBonus = (params)=>{
	return get('/standards/bonus_score',params)
}

//考试项目标准
export const getExam = (params)=>{
	return get('/standards/weight',params)
}