<template>
	<div>
		<el-card class="box-card">
			<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
		</el-card>
		<el-button type="primary">Primary</el-button>
	</div>
</template>

<script>
	import {get} from '@/until/request.js'
	import {getUser,login} from '@/api/user.js'
	export default{
		mounted() {
			login({username:'admin',password:'vaa123456'}).then(res=>{
				console.log(res)
			})
			getUser({user_id:100555}).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style>
</style>
