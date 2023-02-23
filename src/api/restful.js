import { apiHttp } from '@/utils/request'

export const apiUser = (params,method)=>{
	return apiHttp('user',params,method)
}