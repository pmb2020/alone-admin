import {get,post} from '@/utils/request.js'

export const getHomeData = (params)=>{
	return get('/score/edu_home/',params)
}

export const getBarChat = (params)=>{
	return get('/score/edu_project_chart/',params)
}