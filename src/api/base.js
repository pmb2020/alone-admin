import {get,post} from '@/utils/request.js'

export const getStudent = (params)=>{
	return get('/student/select/',params)
}

export const addStudent = (data)=>{
	return post('/student/add/',data)
}
export const updateStudent = (data)=>{
	return post('/student/add/',data)
}

// 班级管理
export const getClass = (params)=>{
	return get('/class/select/',params)
}
export const addClass = (data)=>{
	return post('/class/add/',data)
}
export const updateClass = (data)=>{
	return post('/class/amend/',data)
}

// 年级管理
export const getGrade = (params)=>{
	return get('/grade/select/',params)
}
export const addGrade = (data)=>{
	return post('/grade/add/',data)
}
export const updateGrade = (data)=>{
	return post('/grade/amend/',data)
}

// 老师管理
export const getTeacher = (params)=>{
	return get('/teacher/list/',params)
}