<template>
	<!-- 新增表单组件 -->
	<div>
		<el-table :data="tableData" height="25rem" style="width: 100%" align="center" scrollbar-always-on>
			<el-table-column type="index" label="序号" align="center" width="80" />
			<el-table-column label="年级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.gender" placeholder="请选择">
							<el-option label="1" value="男" />
							<el-option label="2" value="女" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.gender}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="班级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.gender" placeholder="请选择">
							<el-option label="1" value="男" />
							<el-option label="2" value="女" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.gender}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="别称" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.name" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.name}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="学级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.name" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.name}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="所属老师" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.gender" placeholder="请选择">
							<el-option label="1" value="一年级" />
							<el-option label="2" value="二年级" />
							<el-option label="2" value="三年级" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.gender}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="自动升学" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.gender" placeholder="请选择">
							<el-option label="1" value="一年级" />
							<el-option label="2" value="二年级" />
							<el-option label="2" value="三年级" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.gender}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="120">
				<template #default="scope">
					<el-button v-if="columnEdit[scope.$index]" link type="primary" size="small"
						@click="columnSubmit(scope.$index, scope.row)">确定</el-button>
					<el-button v-else link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑
					</el-button>
					<el-button link type="primary" size="small">清空</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-button style="width: 100%;border: 1px solid #979797;" @click="addItem">添加</el-button>
	</div>
</template>

<script setup>
	import { addStudent } from "@/api/base"
	const tableData = ref([])
	const columnShow = ref([{
		name: false,
		date: false
	}])
	const columnEdit = reactive([])

	const columnSubmit = (index, row) => {
		console.log(index, row)
		columnEdit[index] = false
		let test = {
			name:'name',
			gender:'1',
			id_card:'111',
			student_id:'11',
			grade_id:'1',
			class_id:'2',
			enter_school_date:'22',
			edu_commission_id:'333',
			school_id:'4'
		}
		addStudent(test).then(res=>{
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
			date: '',
			name: '',
			address: '',
		})
	}
</script>

<style>
</style>
