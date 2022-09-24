<template>
	<div class="order">
		<!-- 筛选 -->
		<div class="al-container">
			<el-form class="al-flex" inline :model="filterForm" ref="filterFormRef" size="large">
				<el-form-item label="名称" prop="title">
					<el-input v-model="filterForm.title" placeholder="要搜索的名称" />
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="filterForm.type" placeholder="请选择">
						<el-option label="已完成" value="1" />
						<el-option label="未支付" value="2" />
						<el-option label="已取消" value="3" />
					</el-select>
				</el-form-item>
			</el-form>
			<div class="al-flex-between">
				<div>
					<el-button size="default" type="primary" @click="getList">搜索</el-button>
					<el-button size="default" plain @click="resetFilterForm(filterFormRef)">重置</el-button>
				</div>
				<el-button size="default" type="primary" @click="handleAdd">+ 新增</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref,reactive} from 'vue'
	/**
	 * 筛选搜索相关
	 */
	const filterForm = ref({
		title: '',
		status: '',
		type: '',
		sort: '',
		link: '',
		image: '',
		note: '',
	})
	const filterFormRef = ref({})
	//重置搜索条件
	const resetFilterForm = (formEl) => {
		if (!formEl) return
		formEl.resetFields()
	}
</script>

<style>
</style>