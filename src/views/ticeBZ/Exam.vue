<template>
	<div class="ty-box">
		<h3 class="title" style="text-align: center;">考试项目标准表</h3>
		<table border="1" class="exam-table">
			<tbody>
				<tr>
					<th>学校类别</th>
					<th>年级</th>
					<th colspan="9">体测项目（权重）</th>
				</tr>
				<tr v-for="(item,index) in data.小学" :key="index">
					<td class="bg1" style="font-weight: 600;" v-if="index==0" :rowspan="data.小学.length">小学</td>
					<td class="grade">{{item.name}}</td>
					<template v-for="it in item.list">
						<td>
							<p style="margin-bottom: 5px;">
								{{it.project_name}}
								<span v-if="it.gender != '所有'">({{it.gender}})</span>
							</p>
							<p>{{it.weight}}%</p>
						</td>
					</template>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr v-for="(item,index) in data.初中" :key="index">
					<td class="bg1" style="font-weight: 600;" v-if="index==0" :rowspan="data.初中.length">初中</td>
					<td class="grade">{{item.name}}</td>
					<template v-for="it in item.list">
						<td>
							<p style="margin-bottom: 5px;">
								{{it.project_name}}
								<span v-if="it.gender != '所有'">({{it.gender}})</span>
							</p>
							<p>{{it.weight}}%</p>
						</td>
					</template>
				</tr>
				<tr v-for="(item,index) in data.高中" :key="index">
					<td class="bg1" style="font-weight: 600;" v-if="index==0" :rowspan="data.高中.length">高中</td>
					<td class="grade">{{item.name}}</td>
					<template v-for="it in item.list">
						<td>
							<p style="margin-bottom: 5px;">
								{{it.project_name}}
								<span v-if="it.gender != '所有'">({{it.gender}})</span>
							</p>
							<p>{{it.weight}}%</p>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import {getExam} from '@/api/ticeBZ'
	const data = ref({})
	onMounted(()=>{
		initData()
	})
	
	const initData = ()=>{
		getExam().then(res=>{
			data.value = res
		})
	}
</script>

<style lang="scss">
	.exam-table{
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		border: none;
		background-color: #fff;
		font-size: 14px;
		color: #666666;
		th{
			background-color: #F5F5F5;
			color: #222426;
			font-size: 15px;
			padding: 10px 15px;
		}
		tbody{
			& tr:nth-child(odd){
				background-color: #ebf3ff;
			}
			& tr:nth-child(even) .grade{
				background-color: #F5F5F5;
			}
		}
	}
	.exam-table tr{
		padding: 10px 5px;
		border: 1px solid #F5F5F5;
	}
	.exam-table td,th{
		padding: 10px 5px;
	}
	.bg1{
		background-color: #FAFAFA;
	}
</style>