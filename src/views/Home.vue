<template>
	<div>
		<el-card class="box-card">
			<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
		</el-card>
		<el-button type="primary">Primary</el-button>
	</div>
</template>

<script>
	import {get} from '../until/request.js'
	export default{
		mounted() {
			get('login').then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style>
</style>
