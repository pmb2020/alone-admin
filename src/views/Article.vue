<template>
	<div class="article">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label='全部(42)' name="1"></el-tab-pane>
			<el-tab-pane label="待审核(4)" name="2"></el-tab-pane>
			<el-tab-pane label="草稿箱(2)" name="3"></el-tab-pane>
		</el-tabs>
		<!-- <p>{{activeName}}</p> -->
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
						<a class="del_a" href="#" onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
					</div>
				</div>
			</li>
		</ul>
		<el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" :page-size="pageSize">
		</el-pagination>
	</div>
</template>

<script>
	import {article} from '../others/apis.js'
	export default {
		data() {
			return {
				activeName: '1',
				total:1,
				page:1,
				pageSize:15,
				articleList:[],
			};
		},
		mounted() {
			this.getArticle(this.page)
		},
		methods: {
			handleClick(tab, event) {
				this.getArticle(this.activeName)
				// this.activeName='sad'+tab.label
			},
			handleCurrentChange(val){
				this.page=val
				this.getArticle(this.page)
			},
			getArticle(page){
				article('GET',{page:page}).then(res=>{
					this.articleList=res.data
					this.total=res.total
				})
			}
		}
	};
</script>

<style>
</style>
