<template>
	<div class="manage">
		<el-table v-loading="loading" :data="tableData" style="width: 100%;margin-bottom: 15px;">
			<el-table-column type="index" :index="indexMethod" label="#" width="50">
			</el-table-column>
			<el-table-column prop="name" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="id" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="email" label="地址">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" @current-change="changePage" :current-page="nowPage" :page-size="pageSize" :total="totalNum">
		</el-pagination>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="50px" label-position="left" hide-required-asterisk>
				<el-form-item label="账号:" prop="id">
					<el-input v-model="editForm.id"></el-input>
				</el-form-item>
				<el-form-item label="昵称:" prop="nickname">
					<el-input v-model="editForm.nickname"></el-input>
				</el-form-item>
				<!-- <el-button type="primary" @click="submitForm('editForm')">登录</el-button> -->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getAdminList,
		adminNumber,
		adminDel
	} from '../apis/test.js';
	export default {
		data() {
			return {
				nowPage:1,
				pageSize: 10,
				totalNum: 1,
				tableData: [],
				loading: true,
				dialogVisible: false,
				editForm: {
				},
				rules: {
					id: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
					],
					password:[{
						required:true,
						message:'密码不能为空'
					}]
				
				}
			}
		},
		mounted() {
			this.initList(1);
			this.initTotalPage();
		},
		methods: {
			/**
			 * 初始化列表,获取第几页的数据
			 * @param {Object} page
			 */
			initList(page) {
				getAdminList({
					page: page,
					size: this.pageSize
				}).then(res => {
					this.tableData = res.data.data
					this.loading = false
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 初始化总页码
			 */
			initTotalPage() {
				adminNumber().then(res => {
					if(res.data.code==200){
						this.totalNum = res.data.data;
					}
					
				}).catch(err => {
					console.log('获取总页码失败')
				})
			},
			/**
			 * 点击页码时的方法
			 * @param {Object} val
			 */
			changePage(val) {
				this.loading = true
				this.initList(val);
				this.nowPage=val;
			},

			handleEdit(index, row) {
				this.dialogVisible = true;
				this.editForm=this.tableData[index];
				// console.log(index, row);
			},
			/**
			 * 编辑的提交表单
			 * @param {Object} form
			 */
			submitForm(editForm) {
				this.$refs[editForm].validate((valid) => {
					if (valid) {
						// this.toLogin();
						console.log(this.editForm)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleDelete(id) {
				this.$confirm('确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(id)
					adminDel({
						id: id
					}).then(res => {
						console.log(res)
						if(res.data.code==200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.initList(1);
							this.initTotalPage();
						}else {
							this.$message('sad')
						}
						
					}).catch(err => {
						console.log(err)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})

			},
			/**
			 * 表格索引1,2,3,4
			 * @param {Object} index
			 */
			indexMethod(index){
				return index+1 + this.pageSize * (this.nowPage -1)
			}
		}
	}
</script>

<style>
	.manage {
		padding: 30px;
		background-color: #FFFFFF;
		min-height: 500px;
	}
</style>
