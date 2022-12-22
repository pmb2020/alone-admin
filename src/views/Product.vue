<template>
	<div class="table" style="height: 100%;">
		<div class="filter-box al-box" style="display: flex;">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline" size="large">
				<el-form-item label="名称">
					<el-input v-model="queryForm.title" placeholder="要搜索的名称" />
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="queryForm.type" placeholder="请选择">
						<el-option label="正常" value="0" />
						<el-option label="禁用" value="1" />
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="queryForm.date" type="daterange" unlink-panels range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
				</el-form-item>
				<el-form-item>
					<el-button size="default" type="primary" @click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="al-box filter">
			<div class="al-flex" style="display: flex;margin-bottom: 30px;font-size: 12px;">
				<el-button color="#626aef" @click="handleAdd">
					<el-icon style="margin-right: 5px;">
						<CirclePlus />
					</el-icon>新增产品
				</el-button>
				<el-button>批量删除</el-button>
				<el-button>批量导出</el-button>
				<el-button>导出全部</el-button>
			</div>
			<el-table :ref="tableRef" :data="tableData" style="width: 100%;" size="large"
				@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
				<el-table-column type="selection" width="50" />
				<el-table-column type="index" label="#" />
				<el-table-column prop="title" label="名称" align="center" />
				<el-table-column label="状态" align="center" width="80px">
					<template #default="scope">
						<el-tag v-if="scope.row.status ===0" type="success">正常</el-tag>
						<el-tag v-else-if="scope.row.status ===1" type="warning">禁用</el-tag>
						<el-tag v-else type="info">未知</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="分类" align="center">
					<template #default="scope">
						<el-tag type="warning">无</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="图片" align="center">
					<template #default="scope">
						<el-image style="width: 120px; height: 80px" :src="scope.row.main_pic" fit="fill" />
					</template>
				</el-table-column>
				<el-table-column prop="created_at" align="center" label="创建时间" />
				<el-table-column prop="updated_at" align="center" label="更新时间" />
				<el-table-column label="操作" align="center" width="170">
					<template #default="scope">
						<el-button size="default" color="#626aef" @click="handleEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="default" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: flex-end;">
				<el-pagination v-model:currentPage="page" background v-model:page-size="pageSize"
					:page-sizes="[20, 50, 100, 500]" layout="total, sizes, prev, pager, next, jumper" :total="100" />
			</div>
		</div>
		<!-- 弹框表单 -->
		<el-dialog v-model="dialogFormVisible" :title="isEdit ? '编辑产品' : '新增产品'">
			<el-form :model="tableForm" :label-width="80" size="large">
				<el-form-item label="标题：">
					<el-input v-model="tableForm.title" autocomplete="off" />
				</el-form-item>
				<el-form-item label="分类：">
					<el-select v-model="tableForm.type" placeholder="请选择">
						<el-option label="虚拟商品" value="shanghai" />
						<el-option label="实物商品" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="图片：" style="font-weight: bold;">
					<el-upload class="al-uploader" name="file" action="http://127.0.0.1:85/admin/upload/file"
						:show-file-list="false" :on-success="handleImageSuccess" :before-upload="beforeImageUpload">
						<el-image v-if="tableForm.main_pic"  style="width: 400px; height: 200px" :src="tableForm.main_pic" />
						<el-icon v-else class="al-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="详情：" style="font-weight: bold;">
					<WangEditor ref="editorRef" :initValue="tableForm.content"></WangEditor>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="submitForm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import WangEditor from '@/components/WangEditor.vue'
	import {apiProduct} from '@/api/product.js'
	import {ref,onMounted,reactive} from 'vue'
	const queryForm = ref({
		'name': '',
		'date': ''
	})
	const shortcuts = [{
			text: '最近一周',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
				return [start, end]
			},
		},
		{
			text: '最近一月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
				return [start, end]
			},
		},
		{
			text: '最近三个月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
				return [start, end]
			},
		},
	]
	const tableForm = ref({})
	const dialogFormVisible = ref(false)
	const tableRef = ref([])
	const tableData = ref([])
	const isEdit = ref(false)
	const page = ref(1)
	const pageSize = ref(20)
	const getList = () => {
		console.log('筛选参数：', queryForm.value)
		apiProduct(queryForm.value,'get').then(res=>{
			tableData.value = res.data
		})
	}
	const handleSelectionChange = (val) => {
		console.log(val)
	}
	//编辑
	const handleEdit = (index, row) => {
		tableForm.value=row
		isEdit.value = true
		dialogFormVisible.value = true
	}
	//删除
	const handleDelete = (id) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			apiProduct({id},'delete').then(res=>{
				getList()
				ElMessage.success('删除成功!')
			})
		})
	}
	const handleAdd = () => {
		isEdit.value=false
		dialogFormVisible.value = true
	}
	const editorRef = ref(null)
	const test = ref(null)
	const submitForm = () =>{
		tableForm.value.content = editorRef.value.valueHtml
		console.log(tableForm.value)
		if(isEdit){
			apiProduct(tableForm.value,'put').then(res=>{
				ElMessage.success('操作成功!')
				getList()
				dialogFormVisible.value = false
			})
		}else{
			apiProduct(tableForm.value,'post').then(res=>{
				ElMessage.success('操作成功!')
				getList()
				dialogFormVisible.value = false
			})
		}
	}
	onMounted(() => {
		getList()
	})
	const uploadUrl=ref('http://127.0.0.1:188/admin/upload')
	//图片上传成功
	const handleImageSuccess = (response,uploadFile)=>{
		tableForm.value.main_pic = response.data.url
	}
	//图片上传前检查
	const beforeImageUpload = (rawFile)=>{
		console.log(rawFile.type)
		if(rawFile.type != 'image/jpeg' && rawFile.type != 'image/png'){
			ElMessage.error('不支持该图片格式!')
			return false
		}else if(rawFile.size / 1024 / 1024 > 5){
			ElMessage.error('图片大小不能超过5M！')
			return false
		}
	}
</script>

<style scoped>
	.filter-box .el-form{
		display: flex;
		justify-content: start;
	}
	.filter-box .el-form-item {
		margin-bottom: 0;
	}

	.el-input {
		width: 300px;
	}
</style>
