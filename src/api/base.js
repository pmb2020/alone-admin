import {get,post} from '@/utils/request.js'

export const getStudent = (params)=>{
	return get('/student/list/',params)
}

export const getStudentInfo = (params)=>{
	return get('/student/detail/',params)
}

export const addStudent = (data)=>{
	return post('/student/add/',data)
}
export const updateStudent = (data)=>{
	return post('/student/edit/',data)
}
export const getStuOptions = (params)=>{
	return get('/student/options/',params)
}
export const getStuPlanOpt = (params)=>{
	return get('/score/student_plans/',params)
}
export const getStuAddOptions = (params)=>{
	return get('/student/student_options/',params)
}
//学生体测数据
export const getStudentData = (params)=>{
	return get('/score/student_score/',params)
}
// 班级管理
export const getClass = (params)=>{
	return get('/class/list/',params)
}
export const getClassInfo = (params)=>{
	return get('/class/detail/',params)
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

export const getClassTCPlan = (params)=>{
	return get('/score/class_plans/',params)
}

//体测均值
export const getClassTCAvg = (params)=>{
	return get('/score/class_test_avg/',params)
}
//班级饼图
export const getClassProjectD = (params)=>{
	return get('/score/class_project_grade/',params)
}

//体测数据
export const getClassData = (params)=>{
	return get('/score/class_test_data/',params)
}

//详情-阶段数据分析
export const getClassPeriodAvg = (params)=>{
	return get('/score/class_period_avg/',params)
}

export const getClassPeriod = (params)=>{
	return get('/score/class_period_grade/',params)
}

// 年级管理
export const getGrade = (params)=>{
	return get('/grade/list/',params)
}
export const getGradeInfo = (params)=>{
	return get('/score/grade_plans/',params)
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
export const getGradeTable = (params)=>{
	return get('/score/grade_test_data/',params)
}
//体测均值
export const getGradeTCAvg = (params)=>{
	return get('/score/grade_test_avg/',params)
}
//年级班级饼图
export const getGradeProjectD = (params)=>{
	return get('/score/grade_project_grade/',params)
}
//关联老师用(老师列表)
export const getTeaList = (params)=>{
	return get('/grade/teachers/',params)
}

// 老师管理
export const getTeacher = (params)=>{
	return get('/teacher/list/',params)
}

export const getTeaInfo = (params)=>{
	return get('/teacher/teacherinfo/',params)
}

export const getTeacherOptions = (params)=>{
	return get('/teacher/options/',params)
}

export const updateTeaStatus = (data)=>{
	return post('/teacher/status/',data)
}

// 学校管理
export const getSchool = (params)=>{
	return get('/school/list/',params)
}
export const getSchoolOpt = (params)=>{
	return get('/school/options/',params)
}