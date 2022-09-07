import { defineStore } from 'pinia'

export const userLoginStore = defineStore('isLogin',{
	state: ()=>{
		return {isLogin:0}
	},
	actions:{
		increment(){
			this.isLogin++
		}
	}
})