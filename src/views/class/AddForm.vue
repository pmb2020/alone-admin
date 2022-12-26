<template>
	<!-- 新增表单组件 -->
	<div>
		<el-table :data="tableData" height="25rem" style="width: 100%" align="center" scrollbar-always-on>
			<el-table-column type="index" label="序号" align="center" width="80" />
			<el-table-column label="日期" align="center" width="180" @click="columnShow[scope.$index].date=true">
				<template #default="scope">
					<div v-if="!columnShow[scope.$index] ? columnShow[scope.$index]={date:false} : true"  @click="columnShow[scope.$index].date=true" @mouseleave="" style="min-height: 28px;">
						<p v-show="!columnShow[scope.$index].date">{{ scope.row.date }}</p>
						<el-input v-show="columnShow[scope.$index].date" v-model="scope.row.date" placeholder="Please input" @blur="columnShow[scope.$index].date=false" />
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="Name" align="center" />
			<el-table-column prop="address" label="地址" align="center" />
			<el-table-column fixed="right" label="操作" align="center" width="120">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="">确定</el-button>
					<el-button link type="primary" size="small">清空</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-button style="width: 100%;border: 1px solid #979797;" @click="addItem">添加</el-button>
	</div>
</template>

<script setup>
	const tableData = ref([{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	])
	const columnShow = ref([{
		name:false,
		date:false
	}])
	// const columnShow = ref([
	// 	{key:'name',show:false},
	// 	{key:'date',show:false},
	// 	{key:'address',show:false},
	// ])
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
