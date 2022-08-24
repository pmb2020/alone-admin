import {get,post} from '@/until/request.js'

export const getBanner = (params)=>{
	return get('admin/banners',params)
}