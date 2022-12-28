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
								{{item.name}}
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
					<p style="text-align: center;line-height: 35px;">男生体重指数（BMI）单项评分表（单位：千克/米2）</p>
					<ul class="ty-tab" style="position: absolute;right: 0;top: 0;">
						<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">男生</li>
						<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">女生</li>
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
		ref
	} from 'vue';
	const activeNames = ref(['1'])
	const singleIndex = ref(0)
	const singleItems = ref([{
			id: 1,
			name: '体重指数(BMI)'
		},
		{
			id: 2,
			name: '肺活量'
		},
		{
			id: 3,
			name: '50m跑'
		},
		{
			id: 4,
			name: '坐位体前屈'
		},
		{
			id: 5,
			name: '1分钟跳绳'
		},
		{
			id: 6,
			name: '1分钟仰卧起坐'
		},
		{
			id: 7,
			name: '50*8往返跑'
		},
	])
	const tableData = ref([{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	}, ])
	const singleClick = (index) => {
		singleIndex.value = index
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
