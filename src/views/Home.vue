<template>
	<div class="home">
		<el-row :gutter="20">
			<el-col :span="6">
				<div shadow="hover"
					style="padding: 30px;background: linear-gradient(to right, #90caf9, #047edf 99%);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-user-solid" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">今日访客</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">
								<countTo :startVal='0' :endVal='483' :duration='3000'></countTo>
							</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt=""
						style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover"
					style="padding: 30px;background: linear-gradient(to right, #ffbf96, #fe7096);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-s-custom" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">昨日访客</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">
								<countTo :startVal='0' :endVal='2456' :duration='3000'></countTo>
							</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt=""
						style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover"
					style="padding: 30px;background: linear-gradient(to right, #84d9d2, #07cdae);border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-reading" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">文章总数</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 40px;margin: 0;">
								<countTo :startVal='0' :endVal='215' :duration='3000'></countTo>
							</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="6">
				<div shadow="hover"
					style="padding: 30px;background: linear-gradient(to right, rgb(217, 132, 191), rgb(205, 199, 7));border-radius: 5px;position: relative;color: #fff;">
					<el-row type="flex" class="" style="margin-bottom: 0;align-items: center;">
						<el-col :span="12">
							<i class="el-icon-chat-dot-round" style="font-size: 80px;color: #fff;"></i>
							<p style="margin-left: 6px;">用户留言</p>
						</el-col>
						<el-col :span="12">
							<p style="font-size: 60px;margin: 0;">
								<countTo :startVal='0' :endVal='83' :duration='3000'></countTo>
							</p>
						</el-col>
					</el-row>
					<img src="../assets/icon/circle.svg" alt=""
						style="position: absolute;top: 0;right: 0;height: 100%;">
				</div>
			</el-col>
			<el-col :span="15" style="margin-top: 30px;">
				<div class="alone-card" style="padding: 10px 15px;">
					<table id="my-table">
						<colgroup>
							<col width="30%">
							<col width="70%">
						</colgroup>
						<tr>
							<th colspan="2"><i class="el-icon-tickets" style="margin-right: 5px;"></i>程序信息</th>
						</tr>
						<tr>
							<td>程序名称</td>
							<td>alone-admin后台管理系统</td>
						</tr>
						<tr>
							<td>当前版本</td>
							<td>v1.01(免费版)</td>
						</tr>
						<tr>
							<td>操作系统</td>
							<td>windows10</td>
						</tr>
						<tr>
							<td>主机地址</td>
							<td>lochost1270.0.1</td>
						</tr>
						<tr>
							<td>PHP版本</td>
							<td>7.4.1</td>
						</tr>
						<tr>
							<td>数据库</td>
							<td>MySQL5.7</td>
						</tr>
						<tr>
							<td>WEB服务器</td>
							<td>nginx/1.18.0</td>
						</tr>
						<tr>
							<td>数据库</td>
							<td>MySQL5.7</td>
						</tr>
					</table>
				</div>
			</el-col>
			<el-col :span="9" style="margin-top: 30px;">
				<div class="alone-card" style="">
					<h4 class="card-title"><i class="el-icon-bell" style="margin-right: 5px;"></i>通知消息</h4>
					<el-timeline>
						<el-timeline-item timestamp="2021/3/14" placement="top">
							<h4>alone-admin要不先上线试试？</h4>
							<!-- <p>王小虎 提交于 2018/4/12 20:46</p> -->
						</el-timeline-item>
						<el-timeline-item timestamp="2021/2/3" placement="top">
							<h4>一直感觉少点感觉，也不知道是啥感觉。</h4>
							<!-- <p>王小虎 提交于 2018/4/3 20:46</p> -->
						</el-timeline-item>
						<el-timeline-item timestamp="2021/1/2" placement="top">
							<h4>怎么让alone-admin更好看一点呢？哪怕一点也好</h4>
							<!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
						</el-timeline-item>
						<el-timeline-item timestamp="2021/1/2" placement="top">
							<h4>其实这个地方我还没想好放啥！</h4>
							<!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
						</el-timeline-item>
					</el-timeline>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import countTo from 'vue-count-to';
	import {
		adminInfo
	} from '../others/apis.js'
	export default {
		components: {
			countTo
		},
		data() {
			return {
				activities: [{
					content: '添加了哆啦网友情链接',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					icon: 'el-icon-more'
				}, {
					content: '发表了文章：《苦无音乐破解版下载》苦无音乐破解版下载苦无音乐破解版下载',
					timestamp: '2018-04-03 20:46',
					color: '#aa0000',
					icon: 'el-icon-more'
				}]
			}
		},
		mounted() {
			let adInfo = JSON.parse(localStorage.getItem('adInfo'));
			adminInfo().then(res => {
				// console.log(res)
			})
			// console.log(adInfo)
		}
	}
</script>

<style scoped>
	#my-table {
		font-family: Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
		text-align: left;
	}

	#my-table td,
	#my-table th {
		/* border: 1px solid #eee; */
		border-bottom: 1px solid #eee;
		padding: 18px 15px;
	}

	/* #my-table tr:nth-child(odd) {
		background-color: #f9f9f9;
	} */
	#my-table tr td:first-child {
		text-align: right;
		font-weight: 600;
		border-right: 1px solid #eee;
	}

	/* #my-table tr:hover {
		background-color: #f9f9f9;
	} */

	#my-table th {
		padding: 20px 15px;
		border: none;
		/* background-color: #f9f9f9; */
		border-bottom: 1px solid #eee;
		margin-bottom: 15px;
		text-align: left;
		color: #454545;
		font-size: 15px;
	}

	.alone-card {
		padding: 15px;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		text-align: left;
		color: #454545;
		font-size: 14px;
	}

	.alone-card .card-title {
		margin: 0;
		padding: 15px 0 15px 0;
		margin-bottom: 25px;
		border-bottom: 1px solid #eee;
		font-size: 15px;
	}

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
