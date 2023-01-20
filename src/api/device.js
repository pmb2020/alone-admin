import {get,post} from '@/utils/request.js'
export const getDevice = (params)=>{
	return get('/device/list/',params)
}

export const addDevice = (data)=>{
	return post('/device/add/',data)
}

export const updateDevice = (data)=>{
	return post('/device/edit/',data)
}
export const getDeviceOption = (params)=>{
	return get('/device/device_options/',params)
}