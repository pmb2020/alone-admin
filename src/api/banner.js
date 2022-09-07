// import {get,post,apiHttp} from '@/utils/request.js'
import http,{apiHttp} from '@/utils/request.js'

export const getBanner = (params)=>{
	return http.get('banners',{params})
}

export const banner = (params,method)=>{
	return apiHttp('banners',params,method)
}