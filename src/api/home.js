import {get,post} from '@/utils/request.js'

export const getHomeData = (params)=>{
	return get('/score/school_home/',params)
}

export const getHomeDataEdu = (params)=>{
	return get('/score/edu_home/',params)
}

//等级分析
export const getGradeChartEdu = (params)=>{
	return get('/score/edu_project_grade/',params)
}
export const getGradeChart = (params)=>{
	return get('/score/school_project_grade/',params)
}


//均值分析
export const getProjectChatEdu = (params)=>{
	return get('/score/edu_project_chart/',params)
}
export const getProjectChat = (params)=>{
	return get('/score/school_project_chart/',params)
}