import {defineStore} from 'pinia'

export const useStore = defineStore('main',{
	state: () => {
	  return { count: 1 }
	},
	actions: {
	  increment() {
	    this.count++
	  },
	},
})