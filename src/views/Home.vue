<template>
	<div>
		<el-row :gutter="40">
			<template v-for="(item,index) in boxLists" :key="index">
				<el-col :xs="8" :sm="6" :lg="4">
					<IconBox :bg-color="item.bgColor" :name="item.name" :icon="item.icon"></IconBox>
				</el-col>
			</template>
		</el-row>
		<el-row :gutter="40" style="margin-top: 10px;">
			<el-col :span="16">
				<div class="al-box">
					s
				</div>
			</el-col>
			<el-col :span="8">
				<div class="al-box">12</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import IconBox from '@/components/alone/IconBox.vue'
	import {reactive,ref} from 'vue'
	const boxLists = reactive([
		{bgColor:'rgba(255, 188, 3, 0.1)',name:'信息',icon:'ElemeFilled'},
		{bgColor:'#E5F8EB',name:'客户',icon:'Drizzling'},
		{bgColor:'rgba(60, 33, 247, 0.1)',name:'线索',icon:'FolderChecked'},
		{bgColor:'#E6FFFF',name:'老板',name:'线索',icon:'GoodsFilled'},
		{bgColor:'#FFF2E5',name:'未读',name:'线索',icon:'IceDrink'},
		{bgColor:'#FEE9ED',name:'信息',name:'线索',icon:'Lightning'},
	])
</script>

<style>
	
</style>
