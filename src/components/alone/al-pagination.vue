<template>
	<div class="al-pagination">
		<el-pagination :current-page="page" :page-size="pageSize"
			:page-sizes="[20, 50, 100, 200, 500]" :small="false" background
			layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
	</div>
</template>

<script setup>
	const props = defineProps({
		total:{
			type:Number,
			default: 0
		}
	})
	const emit = defineEmits(['pageChange'])
	const page = ref(1)
	const pageSize = ref(20)
	const handleSizeChange = (val)=>{
		page.value = 1
		pageSize.value = val
		emit('pageChange',page.value,pageSize.value)
	}
	const handleCurrentChange = (val)=>{
		page.value = val
		emit('pageChange',page.value,pageSize.value)
	}
</script>

<style scoped>
	.al-pagination{
		display: flex;
		justify-content: end;
		margin-top: 30px;
	}
</style>
