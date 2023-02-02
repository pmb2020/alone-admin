import {get,post} from '@/utils/request.js'

export const getSchoolOpt = (params)=>{
	return get('/score/school_list',params)
}

export const getYearOpt = (params)=>{
	return get('/score/school_year_list',params)
}

export const getGradeOpt = (params)=>{
	return get('/score/school_grade_list',params)
}

export const getClassOpt = (params)=>{
	return get('/score/school_class_list',params)
}
//获取所有基础选项
export const getBaseOpt = (params)=>{
	return get('/score/project_analysis_basedata',params)
}
//获取所有基础图表数据
export const getBaseChart = (params)=>{
	return get('/score/project_analysis_chart',params)
}