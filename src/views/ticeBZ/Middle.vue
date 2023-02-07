<template>
	<el-row :gutter="30">
		<el-col :span="5">
			<div class="ty-box" style="padding: 0;overflow: hidden;padding-bottom: 50px;">
				<el-collapse v-model="activeNames">
					<el-collapse-item class="ty-collapse" style="" name="1">
						<template #title>
							<div style="padding: 0 30px;color: #222426;font-size: 15px;">单项指标评分表</div>
						</template>
						<ul class="single-ul">
							<li :class="{'active':index==singleIndex}" v-for="(item,index) in items.single" :key="index"
								@click="singleClick(index)">
								{{item.project_name}}
							</li>
						</ul>
					</el-collapse-item>
					<el-collapse-item class="ty-collapse" style="" name="2">
						<template #title>
							<div style="padding: 0 30px;color: #222426;font-size: 15px;">加分项指标评分表</div>
						</template>
						<ul class="single-ul">
							<li :class="{'active':index==singleIndex}" v-for="(item,index) in items.bonus" :key="index"
								@click="bonusClick(index)">
								{{item.project_name}}
							</li>
						</ul>
					</el-collapse-item>
				</el-collapse>
			</div>
		</el-col>
		<el-col :span="19">
			<div class="ty-box">
				<div style="position: relative;margin-bottom: 20px;">
					<p style="text-align: center;line-height: 35px;">{{tabIndex==1 ? '女生':'男生'}}{{tableTitle}}</p>
					<ul class="ty-tab" style="position: absolute;right: 0;top: 0;">
						<li :class="{'active':tabIndex==0}" @click="tabClick(0)">男生</li>
						<li :class="{'active':tabIndex==1}" @click="tabClick(1)">女生</li>
					</ul>
				</div>
				<el-table class="ticet" :data="tableData" stripe border size="large" style="width: 100%">
					<el-table-column v-if="!isBonus" prop="score_grade" label="等级" align="center" />
					<el-table-column class-name="tity-bg" prop="score" label="单项得分" align="center" />
					<el-table-column prop="初一年级" label="初一年级" align="center" />
					<el-table-column class-name="tity-bg" prop="初二年级" label="初二年级" align="center" />
					<el-table-column prop="初三年级" label="初三年级" align="center" />
				</el-table>
			</div>
		</el-col>
	</el-row>
</template>

<script setup>
	import {
		getProject,
		getScore,
		getBonus
	} from '@/api/ticeBZ'
	const gradeType = ref('初中')
	const activeNames = ref(['1'])
	const singleIndex = ref(0)
	const bonusIndex = ref(0)
	const tabIndex = ref(0)
	const isBonus = ref(false)
	const singleItems = ref([])
	const items = ref([])
	const tableTitle = ref('')
	const originData = reactive({
		'boy': [],
		'girl': []
	})
	const tableData = reactive([])
	const objectSpanMethod = ({
		row,
		column,
		rowIndex,
		columnIndex
	}) => {
		if (columnIndex === 0) {
			if (rowIndex % 2 === 0) {
				return {
					rowspan: 2,
					colspan: 1,
				}
			} else {
				return {
					rowspan: 0,
					colspan: 0,
				}
			}
		}
	}
	onMounted(() => {
		getProject({
			grade_type: gradeType.value
		}).then(res => {
			singleItems.value = res.single
			items.value = res
			console.log(res)
		})
		getScoreData(15)
	})
	const tabClick = (index)=>{
		tabIndex.value=index
		tableData.length = 0
		if(index===0){
			tableData.push(...originData.boy)
		}else{
			tableData.push(...originData.girl)
		}
	}
	//单项
	const getScoreData = (id) => {
		getScore({
			grade_type: gradeType.value,
			project_id: id
		}).then(res => {
			tableTitle.value = res.project.title
			tableData.length = 0
			originData.boy = handleTableData(res.data['男生'])
			originData.girl = handleTableData(res.data['女生'])
			tableData.push(...originData.boy)
			console.log(res)
			// console.log(res.data['男生'])
		})
	}
	// 加分项
	const getBonusData = (id) => {
		getBonus({
			grade_type: gradeType.value,
			project_id: id
		}).then(res => {
			tableTitle.value = res.project.title
			tableData.length = 0
			originData.boy = res.data['男生']
			originData.girl = res.data['女生']
			tableData.push(...originData.boy)
		})
	}
	const bonusClick = (index) => {
		isBonus.value = true
		tabIndex.value = 0
		bonusIndex.value = index
		getBonusData(items.value.bonus[index].project_id)
	}
	const singleClick = (index) => {
		isBonus.value = false
		tabIndex.value = 0
		singleIndex.value = index
		getScoreData(items.value.single[index].project_id)
	}
	const handleTableData = (arr)=>{
		var d = []
		Object.keys(arr).map(key => {
			Object.keys(arr[key]).map(key1 => {
				arr[key][key1].score_grade = key
				d.push(arr[key][key1])
			})
		})
		return d
	}
</script>

<style lang="scss">
	.ty-collapse {
		// padding: 5px 20px;
		background-color: #F5F5F5;

		.el-collapse-item__header {
			background-color: #F5F5F5;
		}

		.el-collapse-item__wrap {
			background-color: #fff;
		}
	}

	.single-ul {
		color: #222426;
		font-size: 14px;

		li {
			cursor: pointer;
			margin: 10px 25px;
			padding: 10px 20px;
		}

		.active {
			box-shadow: 4px 6px 28px 0px rgba(10, 57, 255, 0.16);
			border-radius: 12px;
		}
	}
</style>
