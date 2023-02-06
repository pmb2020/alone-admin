<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>老师姓名</span>
						<span class="value">{{teaInfo.name}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>工龄</span>
						<span class="value">{{teaInfo.working_years}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>职务</span>
						<span class="value">{{teaInfo.job_title}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>教师ID</span>
						<span class="value">{{teaInfo.id}}</span>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="text-lr">
						<span>所带班级</span>
						<span class="value">
							<span v-for="item in teaInfo.joined_classes">{{item.name}}，</span>
						</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box" style="position: relative;margin-top: 80px;">
			<!-- <h3 class="title">学生体测数据展示</h3> -->
			<div class="ty-tabs">
				<div class="tab-item" :class="{'active':tabIndex==index}" v-for="(item,index) in teaInfo.joined_classes"  
				@click="daTabClick(index,item.id)">
					{{item.name}}
				</div>
			</div>
			<TiCeChart :class-id="classId" :ticePlanOption="ticePlanOption" :projects="projects" />
		</div>
	</div>
</template>

<script setup>
	import {getTeaInfo,getClassData,getClassTCPlan} from '@/api/base'
	import TiCeChart from './TiCeChart.vue'
	import { useRoute } from 'vue-router';
	const route = useRoute()
	const teaInfo = ref({})
	const id = ref('')
	const tabIndex = ref(0)
	const queryParams = ref({})
	const classId = ref('')
	const ticePlanOption = ref([])
	const projects = ref([])
	const planQuery = ref({
		plan_start_id: '',
		plan_end_id: ''
	})
	const daTabClick = (index,id)=>{
		tabIndex.value=index;
		classId.value=id
		getPlanList()
	}
	onMounted(()=>{
		id.value = route.query.id
		if(!id.value) return
		getTeaInfo({teacher_id:id.value}).then(res=>{
			teaInfo.value=res[0]
			if(res[0].joined_classes.length >0){
				classId.value = res[0].joined_classes[0].id
				getPlanList()
				getTiceData()
			}
		})
	})
	const getTiceData = ()=>{
		let params = {
			class_id: classId.value
		}
		getClassData({
			...params,
			...planQuery.value
		}).then(res=>{
			projects.value = res.projects
		})
	}
	//查体测计划期数
	const getPlanList = () => {
		getClassTCPlan({
			class_id: classId.value
		}).then(res => {
			ticePlanOption.value = res
		})
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
	.tip-text{
		font-size: 14px;
		color: #979797;
		margin: 30px 30px;
	}
</style>
