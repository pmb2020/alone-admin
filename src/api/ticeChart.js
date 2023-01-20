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