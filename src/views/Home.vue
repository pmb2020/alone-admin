<template>
	<div>
		<el-card class="box-card">
			<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
		</el-card>
		<el-button type="primary">Primary{{store.count}}</el-button>
	</div>
</template>

<script>
	import {get} from '@/until/request.js'
	import {getUser,login} from '@/api/user.js'
	import {useStore} from '@/store/index'
	export default{
		setup(){
			let store = useStore()
			console.log(store.count)
			return {
				store
			}
		},
		mounted() {
			// getUser({user_id:100555}).then(res=>{
			// 	console.log(res)
			// })
		}
	}
</script>

<style>
</style>
