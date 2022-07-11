<template>
	<div>
		<el-row :gutter="40">
			<el-col :xs="8" :sm="6" :lg="4">
				<div class="al-icon-box al-bg1">dd</div>
			</el-col>
			<el-col :xs="8" :sm="6" :lg="4">
				<div class="al-icon-box" style="background-color: #E5F8EB">dd</div>
			</el-col>
			<el-col :xs="8" :sm="6" :lg="4" style="background-color: rgba(60, 33, 247, 0.1)">
				<div class="al-icon-box">
					ff
				</div>
			</el-col>
			<el-col :xs="8" :sm="6" :lg="4" style="background: #3C21F7;">
				<div class="al-icon-box">dd</div>
			</el-col>
			<el-col :xs="8" :sm="6" :lg="4" style="background: #E6FFFF;">
				<div class="al-icon-box">dd</div>
			</el-col>
			<el-col :xs="8" :sm="6" :lg="4" style="background: #EAEFFF;">
				<div class="al-icon-box">dd</div>
			</el-col>
		</el-row>
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
	.al-icon-box{
		padding: 25px 20px;
		border-radius: 10px;
		cursor: pointer;
		position: relative;
		display: flex;
		flex-wrap: wrap;
	}
	.al-bg1{
		background-color: rgba(255, 188, 3, 0.1);
		/* box-shadow: 0 9px 9px -1px rgb(255 188 3 / 30%); */
	}
</style>
