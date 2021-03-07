<template>
	<div class="account" style="padding: 30px;background-color: #fff;">
		<el-table :data="adminList" v-loading="loading" style="width: 100%;margin-bottom: 15px;">
			<el-table-column type="index" label="#" width="50">
			</el-table-column>
			<el-table-column prop="created_at" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="nickname" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" :page-size="pageSize">
		</el-pagination>
	</div>
</template>

<script>
	import {
		admin,
		users,userDel
	} from '../others/apis.js'
	export default {
		data() {
			return {
				total: 1,
				page:1,
				pageSize:10,
				adminList: [],
				loading:true
			}
		},
		mounted() {
			this.getListData(this.page)
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleCurrentChange(val){
				this.page=val
				this.getListData(this.page)
			},
			getListData(page){
				users('GET',{page:page,pageSize:this.pageSize}).then(res=>{
					this.adminList = res.data.data
					this.total = res.data.total
					this.loading=false
				})
			},
			handleDelete(index, row) {
				console.log(index, row.id);
				this.$confirm('你确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					users('DELETE',{id:row.id}).then(res=>{
						this.getListData(this.page)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					// userDel({id:row.id}).then(res=>{
					// 	this.getListData(this.page)
					// 	this.$message({
					// 		type: 'success',
					// 		message: '删除成功!'
					// 	});
					// })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
			}
		}
	}
</script>
