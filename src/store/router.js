import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router',{
	state: ()=>{
		return {
			isRefresh:true,
			list:JSON.parse(localStorage.getItem('routerList')) || []
		}
	},
	getters: {
		getList: (state)=>{
			return state.list = JSON.parse(localStorage.getItem('routerList')) || []
		}
	},
	actions: {
		updateRefresh(status){
			if(status){
				console.log('需要刷新')
				localStorage.removeItem('routerList')
			}
			this.isRefresh = status
		},
		savaList(data=[]){
			console.log('保存路由数据')
			this.isRefresh = false
			localStorage.setItem('routerList',JSON.stringify(data))
			this.list = data
		}
	}
})