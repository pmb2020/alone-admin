<template>
	<!-- 新增表单组件 -->
	<div>
		<el-table :data="tableData" height="25rem" style="width: 100%" align="center" scrollbar-always-on>
			<el-table-column type="index" label="序号" align="center" width="80" />
			<el-table-column label="姓名" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.name" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.name}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="性别" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.gender" placeholder="请选择">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
						</el-select>
					</div>
					<div v-else>
						<p>{{scope.row.gender}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="身份证号" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.id_card" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.id_card}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="学号" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-input v-model="scope.row.student_ID" placeholder="请输入" />
					</div>
					<div v-else>
						<p>{{scope.row.student_ID}}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="年级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.grade_id" @change="genderSel" placeholder="请选择">
							<el-option v-for="item in selOption.grades" :label="item.name" :value="item.id" />
						</el-select>
					</div>
					<div v-else>
						<el-select v-model="scope.row.grade_id" disabled placeholder="请选择">
							<el-option v-for="item in selOption.grades" :label="item.name" :value="item.id" />
						</el-select>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="班级" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-select v-model="scope.row.class_id" placeholder="请选择">
							<el-option v-for="item in classOp" :label="item.name" :value="item.id" />
						</el-select>
					</div>
					<div v-else>
						<el-select v-model="scope.row.class_id" disabled placeholder="请选择">
							<el-option v-for="item in classOp" :label="item.name" :value="item.id" />
						</el-select>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="入学时间" align="center">
				<template #default="scope">
					<div v-if="columnEdit[scope.$index]">
						<el-date-picker v-model="scope.row.enter_school_date" type="date" value-format="YYYY-MM-DD" placeholder="请选择" />
					</div>
					<div v-else>
						<p>{{scope.row.enter_school_date}}</p>
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
	import { addStudent,getStuAddOptions } from "@/api/base"
	const tableData = ref([])
	const columnShow = ref([{
		name: false,
		date: false
	}])
	const classOp = ref('')
	const selOption = ref([])
	const columnEdit = reactive([])
	onMounted(()=>{
		getStuAddOptions().then(res=>{
			console.log(res)
			selOption.value = res
		})
	})
	const columnSubmit = (index, row) => {
		console.log(index, row)
		columnEdit[index] = false
		console.log(tableData.value[index])
		// return 
		// let test = {
		// 	name:'name',
		// 	gender:'1',
		// 	id_card:'111',
		// 	student_id:'11',
		// 	grade_id:'1',
		// 	class_id:'2',
		// 	enter_school_date:'22',
		// 	edu_commission_id:'333',
		// 	school_id:'4'
		// }
		addStudent(tableData.value[index]).then(res=>{
			console.log(res)
			ElMessage.success('操作成功')
		})
	}
	const genderSel = (value)=>{
		let res=selOption.value.grades.filter(item=>{
			if(item.id==value){
				return true
			}
		})
		classOp.value = res[0].classes || []
	}
	const handleEdit = (index, row) => {
		console.log(index, row)
		columnEdit[index] = true
	}
	const handleReset = (row) =>{
		row.name = ''
		row.gender = ''
		row.id_card = ''
		row.student_ID = ''
		row.grade_id = ''
		row.class_id = ''
		row.enter_school_date = ''
		row.edu_commission_id = ''
	}
	const addItem = () => {
		tableData.value.push({})
	}
</script>

<style>
</style>
