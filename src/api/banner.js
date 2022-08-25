import {get,post} from '@/utils/request.js'

export const getBanner = (params)=>{
	return get('admin/banners',params)
}