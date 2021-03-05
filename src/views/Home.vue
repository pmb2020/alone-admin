<template>
	<div class="home">
		<el-row :gutter="20">
			<el-col :span="6">
				<div shadow="hover" style="padding: 30px;background: linear-gradient(to right, #90caf9, #047edf 99%);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-user-solid" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">今日访客</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">450</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt="" style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover" style="padding: 30px;background: linear-gradient(to right, #ffbf96, #fe7096);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-s-custom" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">昨日访客</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">1550</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt="" style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover" style="padding: 30px;background: linear-gradient(to right, #84d9d2, #07cdae);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-reading" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">文章总数</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">210</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover" style="padding: 30px;background: linear-gradient(to right, rgb(217, 132, 191), rgb(205, 199, 7));border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-chat-dot-round" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">用户留言</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 60px;margin: 0;">50</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt="" style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="16" style="margin-top: 30px;">
				<div class="alone-card">
					<el-calendar v-model="value">
						<template slot="dateCell" slot-scope="{date, data}">
							<p :class="data.isSelected ? 'is-selected' : ''">
								{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
							</p>
						</template>
					</el-calendar>
				</div>
			</el-col>
			<el-col :span="8" style="margin-top: 30px;">
				<div class="alone-card" style="background-color: #fff;text-align: left;padding: 15px;">
					<h4 class="card-title">活动信息</h4>
					<el-timeline>
						<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
							{{activity.content}}
						</el-timeline-item>
					</el-timeline>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {adminInfo} from '../others/apis.js'
	export default {
		data() {
			return {
				value: new Date(),
				activities: [{
					content: '添加了哆啦网友情链接',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					type: 'primary',
					icon: 'el-icon-more'
				}, {
					content: '发表了文章：《苦无音乐破解版下载》',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87',
					type: 'primary',
					icon: 'el-icon-more'
				}, {
					content: '支持自定义尺寸',
					timestamp: '2018-04-03 20:46',
					icon: 'el-icon-more',
					type: 'danger',
					size: 'large'
				}, {
					content: '默认样式的节点',
					timestamp: '2018-04-03 20:46'
				}, {
					content: '支持自定义尺寸',
					timestamp: '2018-04-03 20:46',
					icon: 'el-icon-more',
					type: 'danger',
					size: 'large'
				}, {
					content: '支持自定义尺寸',
					timestamp: '2018-04-03 20:46',
					icon: 'el-icon-more',
					type: 'warning',
					size: 'large'
				}, {
					content: '支持自定义尺寸',
					timestamp: '2018-04-03 20:46',
					icon: 'el-icon-more',
					type: 'success',
					size: 'large'
				}]
			}
		},
		mounted() {
			let adInfo=JSON.parse(localStorage.getItem('adInfo'));
			adminInfo().then(res=>{
				console.log(res)
			})
			console.log(adInfo)
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}


	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
