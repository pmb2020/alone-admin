<template>
	<div class="al-box banner">
		<el-table :ref="tableRef" :data="tableData" style="width: 100%;" size="large"
			@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
			<el-table-column type="selection" width="50" />
			<el-table-column type="index" label="#" />
			<el-table-column prop="title" label="标题" align="center" />
			<el-table-column label="图片" align="center" width="150">
				<template #default="scope">
					<el-image style="width: 120px; height: 80px" :src="scope.row.image" fit="fill" />
				</template>
			</el-table-column>
			<el-table-column prop="type" align="center" label="类型" />
			<el-table-column prop="sort" align="center" label="排序" />
			<el-table-column label="状态" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.type ===0" type="success">已完成</el-tag>
					<el-tag v-else-if="scope.row.type ===2" type="warning">未支付</el-tag>
					<el-tag v-else type="info">已取消</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="created_at" align="center" label="时间" width="165" />
			<el-table-column label="操作" align="center" width="170">
				<template #default="scope">
					<el-button size="default" color="#626aef" @click="handleEdit(scope.$index, scope.row)">编辑
					</el-button>
					<el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive,
		getCurrentInstance
	} from 'vue'
	import {getBanner,banner} from '@/api/banner.js'
	const tableForm = reactive({})
	const tableRef = ref([])
	const tableData = ref([])
	onMounted(()=>{
		getBanners()
		const {proxy}=getCurrentInstance()
		console.log(getCurrentInstance().proxy.shortcuts)
	})
	const handleSelectionChange = (val) => {
		console.log(val)
	}
	const getBanners=()=>{
		banner({limit:3}).then(res=>{
			tableData.value = res.data
		})
	}
	const handleDelete = (row) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			console.log('删除', row)
			banner({id:row.id},'delete').then(res=>{
				console.log(res)
			})
		})
	}
</script>

<style>
</style>