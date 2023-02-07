import {defineStore} from 'pinia'

export const useTabStore = defineStore('tab',{
	state: () => {
	  return {
		  count: 1,
		  tabList:[]
	  }
	},
	actions: {
	  increment() {
	    this.count++
	  },
	  addTabData(data={}){
		  if(this.tabList.length > 9) return
		  let res=this.tabList.findIndex(item=>{
			  return item.name == data.name
		  })
		  if(res==-1){
			  this.tabList.push(data)
		  }
	  },
	  removeTabData(name){
		  this.tabList = this.tabList.filter(item=>{
			  return item.name != name
		  })
		  return this.tabList
	  }
	},
})