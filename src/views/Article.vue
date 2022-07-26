<template>
	<div class="article">
		<el-card>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<ul class="list_ul">
						<li v-for="item in articleList" :key="item.id">
							<h2 class="list_title"><a target="_blank" href="#">{{item.title}}</a></h2>
							<div class="list_info">
								<div class="list_info_left">
									<span>原创</span>
									<span>{{item.keywords}}</span>
									<span>{{item.created_at}}</span>
									<span><i class="el-icon-view"></i>{{item.read_num}}</span>
								</div>
								<div class="list_info_right">
									<a class="d-none" href="#">编辑</a>
									<a class="del_a" href="#"
										onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
								</div>
							</div>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="等审核" name="second">Config</el-tab-pane>
				<el-tab-pane label="草稿箱" name="third">Role</el-tab-pane>
				<el-tab-pane label="回收站" name="fourth">Task</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>
<script setup>
	import {getArticle} from '@/api/article'
	import {ref} from 'vue'
	const activeName = ref('first')
	const articleList = ref([])
	getArticle().then(res=>{
		articleList.value=res.data
	})
	const handleClick = (tab, event) => {
		console.log(tab, event)
	}
</script>
<style>
	.list_ul li {
		text-align: left;
		margin-bottom: 20px;
		border-bottom: 1px solid #e9e9e9;
		padding-bottom: 15px;
	}
	
	.list_ul li:last-child {
		border-bottom: none;
	}
	
	.list_title {
		font-weight: normal;
		font-size: 18px;
	}
	
	.list_title a {
		color: #2c3e50;
	}
	
	.list_info {
		margin-top: 10px;
	}
	
	.list_info:after {
		content: '';
		clear: both;
		display: block;
	}
	
	.list_info_left {
		color: #999;
		font-size: 12px;
		float: left;
	}
	
	.list_info_left span {
		margin-right: 20px;
	}
	
	.list_info_left span i {
		margin-right: 5px;
	}
	
	.list_info_right {
		float: right;
		font-size: 14px;
	}
	
	.list_info_right a {
		color: #349EDF;
		margin-left: 10px;
		display: inline-block;
	}
	
</style>
