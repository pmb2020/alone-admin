<template>
	<div class="account" style="padding: 30px;background-color: #fff;">
		<el-table :data="adminList" style="width: 100%;margin-bottom: 15px;">
			<el-table-column type="index" label="#" width="50">
			</el-table-column>
			<el-table-column prop="date" label="日期" width="180">
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
		<el-pagination background layout="prev, pager, next" :total="total" :page-size="2">
		</el-pagination>
	</div>
</template>

<script>
	import {test} from '../others/apis.js'
	export default {
		data() {
			return {
				total:1,
				adminList:[],
			}
		},
		mounted() {
			test().then(res=>{
				console.log(res)
				this.adminList=res.data
				this.total=this.adminList.length
				console.log(this.total)
			})
		},
		methods: {			
				handleEdit(index, row) {
						console.log(index, row);
					},
					handleDelete(index, row) {
						console.log(index, row);
						this.$confirm('你确定要删除吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
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
