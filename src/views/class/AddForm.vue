<template>
	<!-- 新增表单组件 -->
	<div>
		<el-table :data="tableData" height="25rem" style="width: 100%" align="center" scrollbar-always-on>
			<el-table-column type="index" label="序号" align="center" width="80" />
			<el-table-column label="年级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.base_grade_id" placeholder="请选择">
							<el-option v-for="(item,index) in selOption.grades" :label="item.name"
								:value="item.id" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.base_grade_id}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="班级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.name" placeholder="请选择">
							<el-option v-for="(item,index) in selOption.classes" :label="item"
								:value="item" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.name}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="别称" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.another_name" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.another_name}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="学级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.year" placeholder="请选择">
							<el-option v-for="(item,index) in selOption.years" :label="item"
								:value="item" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.year}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="所属老师" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.teacher_id" placeholder="请选择">
							<el-option v-for="(item,index) in selOption.teachers[0].teachers" :label="item.name"
								:value="item.id" />
						</el-select>
					</div>
					<div v-else>
						<el-select disabled v-model="scope.row.teacher_id" placeholder="请选择">
							<el-option v-for="(item,index) in selOption.teachers[0].teachers" :label="item.name"
								:value="item.id" />
						</el-select>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="自动升学" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-switch v-model="scope.row.auto_promotion" style="--el-switch-off-color: #979797" :active-value="1" :inactive-value="0" />
					</div>
					<div v-else>
						<el-switch disabled v-model="scope.row.auto_promotion" style="--el-switch-off-color: #979797" :active-value="1" :inactive-value="0" />
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="120">
				<template #default="scope">
					<el-button v-if="columnEdit[scope.$index]" link type="primary" size="small"
						@click="columnSubmit(scope.$index, scope.row)">确定</el-button>
					<el-button v-else link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑
					</el-button>
					<el-button link type="primary" size="small" @click="handleReset(scope.row)">清空</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-button style="width: 100%;border: 1px solid #979797;" @click="addItem">添加</el-button>
	</div>
</template>

<script setup>
	import { addClass,getClassAddOptions} from "@/api/base"
	const tableData = ref([])
	const columnShow = ref([{
		name: false,
		date: false
	}])
	const columnEdit = reactive([])
	const selOption = ref({})
	onMounted(()=>{
		getClassAddOptions().then(res=>{
			console.log(res)
			selOption.value = res
		})
	})
	const columnSubmit = (index, row) => {
		console.log(index, row)
		columnEdit[index] = false
		console.log(tableData.value[index])
		addClass(tableData.value[index]).then(res=>{
			console.log(res)
			ElMessage.success('操作成功')
		})
	}
	const handleEdit = (index, row) => {
		console.log(index, row)
		columnEdit[index] = true
	}

	const addItem = () => {
		tableData.value.push({
			name: '',
			year: '',
			auto_promotion:0
		})
	}
	//清空
	const handleReset = (row) =>{
		row.name = ''
		row.base_grade_id = ''
		row.another_name = ''
		row.year = ''
		row.teacher_id = ''
		row.auto_promotion = 0
	}
</script>

<style>
</style>
