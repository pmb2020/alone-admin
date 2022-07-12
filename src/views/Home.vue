<template>
	<div>
		<el-row :gutter="40">
			<template v-for="(item,index) in boxLists" :key="index">
				<el-col :xs="8" :sm="6" :lg="4">
					<IconBox :bg-color="item.bgColor" :name="item.name"></IconBox>
				</el-col>
			</template>
		</el-row>
	</div>
</template>

<script setup>
	import IconBox from '@/components/alone/IconBox.vue'
	import {reactive,ref} from 'vue'
	const boxLists = reactive([
		{bgColor:'rgba(255, 188, 3, 0.1)',name:'信息'},
		{bgColor:'#E5F8EB',name:'客户'},
		{bgColor:'rgba(60, 33, 247, 0.1)',name:'线索'},
		{bgColor:'#E6FFFF',name:'老板'},
		{bgColor:'#FFF2E5',name:'未读'},
		{bgColor:'#FEE9ED',name:'信息'},
	])
</script>

<style>
	
</style>
