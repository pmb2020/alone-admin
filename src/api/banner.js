// import {get,post,apiHttp} from '@/utils/request.js'
import http,{apiHttp} from '@/utils/request.js'

export const getBanner = (params)=>{
	return http.get('banners',{params})
}

/**
 * 更新banner信息
 * 因put、patch方法不支持form-data（文件上传），所以单独拿出来用post代替put
 */
export const updateBanner = (params)=>{
	return apiHttp('banners/'+ params.get('id') ,params,'post')
}

export const banner = (params,method)=>{
	return apiHttp('banners',params,method)
}

export const apiBanner = (params,method)=>{
	return apiHttp('banners',params,method)
}