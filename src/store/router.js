import { defineStore } from 'pinia'

const modules = import.meta.glob("../views/*/*.vue")
import Layout from '@/layout/index.vue'
import router from '../router'

export const useRouterStore = defineStore('router',{
	state: ()=>{
		return {
			isRefresh:localStorage.getItem('isRefresh') || 1,
			routes: JSON.parse(localStorage.getItem('routes')) || [],
		}
	},
	getters: {
		getList: (state)=>{
			return state.list = JSON.parse(localStorage.getItem('routerList')) || []
		}
	},
	actions: {
		addRoutes(data){
			if(data.length <1) return false
			this.routes = []
			data.forEach(item=>{
				let arr = {
					name: item.name,
					redirect : item.redirect,
					path: item.path,
					component : Layout,
					children: []
				};
				if(item.meta){
					arr.meta = item.meta
				}
				item.children.forEach(cItem=>{
					arr.children.push({
						path: cItem.path,
						meta:cItem.meta,
						component:modules[`../views/${cItem.component}.vue`]
					})
				})
				router.addRoute(arr)
				this.routes.push(arr)
			})
			// localStorage.setItem('isRefresh',JSON.stringify(data))
			localStorage.setItem('routes',JSON.stringify(data))
		},
		updateRefresh(status){
			if(status==1){
				console.log('需要刷新')
				localStorage.removeItem('routes')
				localStorage.removeItem('routerList')
			}
			localStorage.setItem('isRefresh',status)
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