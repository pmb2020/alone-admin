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
							<li :class="{'active':index==singleIndex}" v-for="(item,index) in singleItems" :key="index"
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
							<li>1分钟跳绳备份</li>
						</ul>
					</el-collapse-item>
				</el-collapse>
			</div>
		</el-col>
		<el-col :span="19">
			<div class="ty-box">
				<div style="position: relative;margin-bottom: 20px;">
					<p style="text-align: center;line-height: 35px;">{{tableTitle}}</p>
					<ul class="ty-tab" style="position: absolute;right: 0;top: 0;">
						<li :class="{'active':tabIndex==0}" @click="gTabClick(0)">男生</li>
						<li :class="{'active':tabIndex==1}" @click="gTabClick(1)">女生</li>
					</ul>
				</div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="name" label="等级" width="80" />
					<el-table-column prop="name" label="单项得分" />
					<el-table-column prop="name" label="一年级" />
					<el-table-column prop="name" label="二年级" />
					<el-table-column prop="name" label="三年级" />
					<el-table-column prop="name" label="四年级" />
					<el-table-column prop="name" label="五年级" />
					<el-table-column prop="name" label="六年级" />
					<!-- <el-table-column prop="address" label="Address" /> -->
				</el-table>
			</div>
		</el-col>
	</el-row>
</template>

<script setup>
	import {
		getProject,getScore
	} from '@/api/ticeBZ'
	const gradeType = ref('小学')
	const activeNames = ref(['1'])
	const singleIndex = ref(0)
	const tabIndex = ref(0)
	const singleItems = ref([])
	const tableTitle = ref('')
	const tableData = ref([{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	}, ])
	onMounted(() => {
		getProject({grade_type:gradeType.value}).then(res=>{
			singleItems.value = res.single
			console.log(res)
		})
		getScoreData(15)
	})
	const getScoreData = (id)=>{
		getScore({grade_type:gradeType.value,project_id:id}).then(res=>{
			tableTitle.value = res.project.title
			console.log(res.data['男生'])
		})
	}
	const singleClick = (index) => {
		singleIndex.value = index
		// console.log(singleItems.value[index].project_id)
		getScoreData(singleItems.value[index].project_id)
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
