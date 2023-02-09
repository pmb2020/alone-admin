<template>
	<div>
		<div class="ty-box">
			<el-row>
				<el-col :span="5">
					<div class="text-lr">
						<span>学校</span>
						<span class="value">{{homeData.school_info.name}}</span>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="text-lr">
						<span>片区</span>
						<span class="value">{{homeData.school_info.area}}</span>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="text-lr">
						<span>集团</span>
						<span class="value">{{homeData.school_info.edu_group}}</span>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="text-lr">
						<span>教委</span>
						<span class="value">{{homeData.school_info.edu_commission_name}}</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box">
			<h3 class="title">学校情况</h3>
			<el-row :gutter="20">
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.teacher_num || 0}}</span>人</p>
						<p>老师数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.class_num || 0}}</span>个</p>
						<p>班级数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.student_num || 0}}</span>人</p>
						<p>学生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.boy_num || 0}}</span>人</p>
						<p>男生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.girl_num || 0}}</span>人</p>
						<p>女生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.device_num || 0}}</span>台</p>
						<p>设备数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">{{homeData.area_data.test_num || 0}}</span>次</p>
						<p>检测次数</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box">
			<h3 class="title">学校学生体重指数占比</h3>
			<WeightChart1 :home-data="homeData" />
		</div>
		<!-- 全区各项体测指标分析 -->
		<div class="ty-box">
			<TiCeChart1 :home-data="homeData" :userType="userType" />
		</div>
		<div class="ty-box">
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">学校各项体测指标最优记录</h3>
				<!-- <ul class="ty-tab">
					<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">小学</li>
					<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">初中</li>
					<li :class="{'active':gTabIndex==2}" @click="gTabClick(2)">高中</li>
				</ul> -->
			</div>
			<div>
				<el-table :data="ticeTable" stripe style="width: 100%">
					<el-table-column prop="project_name" label="体测项目" />
					<el-table-column prop="name" label="姓名" width="180" />
					<el-table-column prop="achievement" label="成绩" />
					<el-table-column prop="score" label="得分" />
					<el-table-column prop="end_time" label="记录时间" />
					<el-table-column prop="school_name" label="所属学校" />
					<el-table-column prop="year" label="所属学年" />
					<el-table-column prop="grade_name" label="所属年级" />
					<el-table-column prop="class_name" label="所属班级" />
				</el-table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {getHomeData} from '@/api/home'
	import WeightChart1 from './WeightChart1.vue'
	import TiCeChart1 from './TiCeChart1.vue'
	import {useRoute} from 'vue-router';
	const route = useRoute()
	const gTabIndex = ref(0)
	const id = ref('')
	const userType = ref(localStorage.getItem('usertype'))
	const homeData = ref({
		school_info:{},
		area_data:{},
		highest_record:[],
		BMI_chart:{},
		BMI_chart_boy:{},
		BMI_chart_girl:{},
		projects:[]
	})
	const ticeTable = reactive([])
	const gTabClick = (index)=>{
		ticeTable.length =0 
		gTabIndex.value = index
		if(index==0){
			ticeTable.push(...homeData.value.xiaoxue)
		}else if(index==1){
			ticeTable.push(...homeData.value.chuzhong)
		}else if(index==2){
			ticeTable.push(...homeData.value.gaozhong)
		}
	}
	onBeforeMount(()=>{
		// gTabIndex.value=9922
		// provide('homeData','ssssss')
	})
	onMounted(()=>{
		id.value = route.query.id
		if(!id.value) return 
		getInitData()
	})
	const getInitData = async ()=>{
		console.log(id.value)
		await getHomeData({school_id:id.value}).then(res=>{
			console.log(res)
			homeData.value = res;
			homeData.value.area_data = res.school_data
			ticeTable.push(...res.highest_record)
		})
		
	}
</script>

<style lang="scss">
	.tx-text-num {
		color: #666;
		font-size: 14px;

		& p:first-child {
			margin-bottom: 10px;
		}

		.num {
			font-size: 18px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			margin-right: 2px;
			color: #005EFF;
		}
	}
	.text-lr {
		font-family: PingFangSC-Regular, PingFang SC;
		color: #666;
		font-size: 14px;
		.value {
			margin-left: 20px;
			color: #222426;
		}
	}
</style>
