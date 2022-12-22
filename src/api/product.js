// import {get,post,apiHttp} from '@/utils/request.js'
import http,{apiHttp} from '@/utils/request.js'

export const getProduct = (params)=>{
	return http.get('http://127.0.0.1:85/admin/product',{params})
}

/**
 * 更新banner信息
 * 因put、patch方法不支持form-data（文件上传），所以单独拿出来用post代替put
 */
// export const updateBanner = (params)=>{
// 	return apiHttp('banners/'+ params.get('id') ,params,'post')
// }

export const apiProduct = (params,method)=>{
	return apiHttp('http://127.0.0.1:85/admin/product',params,method)
}