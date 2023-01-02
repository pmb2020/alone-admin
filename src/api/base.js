import http from '@/utils/request.js'

export const getStudent = (params)=>{
	return http.get('/student/list/',{params})
}