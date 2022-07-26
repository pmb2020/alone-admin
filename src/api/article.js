import {get,post} from '@/until/request.js'

export const getArticle = (params)=>{
	return get('https://alone.usemock.com/api/article',params)
}

export const login = (data)=>{
	return post('https://alone.usemock.com/api/login',data)
}
