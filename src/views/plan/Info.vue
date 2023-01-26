<template>
	<div>
		<div class="ty-box">
			<h3 class="title">体测计划详情</h3>
			<el-row>
				<el-col :span="10">
					<div class="text-lr">
						<span>计划编号</span>
						<span class="value">{{infoData.plan_number}}</span>
					</div>
					<div class="text-lr">
						<span>计划名称</span>
						<span class="value">{{infoData.name}}</span>
					</div>
					<div v-if="userType=='edu'" class="text-lr">
						<span>学校学段</span>
						<span class="value">{{infoData.school_type}}</span>
					</div>
					<div class="text-lr">
						<span>体测对象</span>
						<span class="value">{{infoData.school_type}}</span>
					</div>
					<div class="text-lr">
						<span>体测项目</span>
						<span class="value">{{infoData.name}}</span>
					</div>
					<div v-if="userType=='shool'" class="text-lr">
						<span>备注</span>
						<span class="value">{{infoData.remark}}</span>
					</div>
				</el-col>
				<el-col :span="10">
					<div class="text-lr">
						<span>计划状态</span>
						<span class="value" v-if="infoData.status==-1">已取消</span>
						<span class="value" v-else-if="infoData.status==0">待发布</span>
						<span class="value" v-else-if="infoData.status==1">已发布</span>
						<span class="value" v-else-if="infoData.status==2">执行中</span>
						<span class="value" v-else-if="infoData.status==3">已完成</span>
					</div>
					<div class="text-lr">
						<span>计划创建时间</span>
						<span class="value">{{infoData.create_at}}</span>
					</div>
					<div class="text-lr">
						<span>执行开始时间</span>
						<span class="value">{{infoData.start_date}}</span>
					</div>
					<div class="text-lr">
						<span>执行结束时间</span>
						<span class="value">{{infoData.end_date}}</span>
					</div>
					<div v-if="userType=='edu'" class="text-lr">
						<span>备注</span>
						<span class="value">{{infoData.remark}}</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div v-if="userType=='school'" class="ty-box">
			<h3 class="title">参与班级列表</h3>
			<el-table :data="tableData">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="year" label="学级" align="center" />
				<el-table-column prop="grade_name" label="年级" align="center" />
				<el-table-column prop="class_name" label="班级" align="center" />
				<el-table-column label="主管老师" align="center">
					<template #default="scope">
						<span v-for="tea in scope.row.teachers">{{tea.name}}，</span>
					</template>
				</el-table-column>
				<el-table-column label="查收情况" align="center">
					<template #default="scope">
						<span v-if="scope.row.is_read==0">未查看</span>
						<span v-else-if="scope.row.is_read==1">已查看</span>
					</template>
				</el-table-column>
				<el-table-column label="执行情况" align="center">
					<template #default="scope">
						<span v-if="scope.row.perform_status==0">待执行</span>
						<span v-else-if="scope.row.perform_status==1">已执行</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="180">
					<template #default="scope">
						<el-button link @click="">再次通知</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-if="userType=='edu'" class="ty-box">
			<h3 class="title">学校信息列表</h3>
			<el-table :data="tableData">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="school_name" label="学校名称" align="center" />
				<el-table-column prop="period" label="学段类别" align="center" />
				<el-table-column prop="area" label="所属片区" align="center" />
				<el-table-column prop="edu_group" label="所属集团" align="center" />
				<el-table-column label="查收情况" align="center">
					<template #default="scope">
						<span v-if="scope.row.is_read==0">未查看</span>
						<span v-else-if="scope.row.is_read==1">已查看</span>
					</template>
				</el-table-column>
				<el-table-column label="执行情况" align="center">
					<template #default="scope">
						<span v-if="scope.row.perform_status==0">待执行</span>
						<span v-else-if="scope.row.perform_status==1">已执行</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="180">
					<template #default="scope">
						<el-button link @click="">再次通知</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup>
	import {getPlanInfo,getPlanClass,getPlanSchool} from '@/api/plan'
	import {useRoute} from 'vue-router';
	const route = useRoute()
	const userType = ref(localStorage.getItem('usertype'))
	const id = ref('')
	const infoData = ref({})
	const tableData = ref([])
	onMounted(()=>{
		id.value = route.query.id
		if(!id.value) return 
		initData()
	})
	const initData = ()=>{
		let params = {id:id.value} 
		getPlanInfo(params).then(res=>{
			infoData.value = res
		})
		if(userType.value=='school'){
			getPlanClass(params).then(res=>{
				tableData.value = res.list
			})
		}else if(userType.value=='edu'){
			getPlanSchool(params).then(res=>{
				tableData.value = res.list
			})
		}
		
	}
</script>

<style lang="scss">
	.text-lr {
		font-family: PingFangSC-Regular, PingFang SC;
		color: #666;
		font-size: 14px;
		margin-bottom: 20px;

		.value {
			margin-left: 20px;
			color: #222426;
		}
	}

	.tip-text {
		font-size: 14px;
		color: #979797;
		margin: 30px 30px;
	}
</style>