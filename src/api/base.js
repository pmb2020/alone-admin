import {get,post} from '@/utils/request.js'

export const getStudent = (params)=>{
	return get('/student/list/',params)
}

export const addStudent = (data)=>{
	return post('/student/add/',data)
}
export const updateStudent = (data)=>{
	return post('/student/add/',data)
}

// 班级管理
export const getClass = (params)=>{
	return get('/class/list/',params)
}
export const addClass = (data)=>{
	return post('/class/add/',data)
}
export const updateClass = (data)=>{
	return post('/class/amend/',data)
}

export const getClassOptions = (params)=>{
	return get('/class/options/',params)
}

// 年级管理
export const getGrade = (params)=>{
	return get('/grade/list/',params)
}
export const addGrade = (data)=>{
	return post('/grade/add/',data)
}
export const updateGrade = (data)=>{
	return post('/grade/amend/',data)
}
export const getGradeOptions = (params)=>{
	return get('/grade/options/',params)
}

// 老师管理
export const getTeacher = (params)=>{
	return get('/teacher/list/',params)
}

export const getTeacherOptions = (params)=>{
	return get('/teacher/options/',params)
}

export const updateTeaStatus = (data)=>{
	return post('/teacher/status/',data)
}