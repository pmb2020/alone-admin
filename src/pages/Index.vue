<template>
	<div class="index">
		<el-row :gutter="20">
			<el-col :span="6">
				<div shadow="always" style="background-color: #fff;padding: 30px;">
					<i class="el-icon-edit"></i>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="24" style="margin-top: 30px;">
				<el-card class="box-card" shadow="always">
					<div slot="header" class="clearfix">
						<span>系统信息</span>
					</div>
					<div v-for="o in 4" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>
			</el-col>
			<el-col :span="24" style="margin-top: 30px;">
				<el-card class="box-card" shadow="always">
					<div slot="header" class="clearfix">
						<span>系统信息</span>
					</div>
					<div v-for="o in 4" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>
			</el-col>
			<el-col :span="24" style="margin-top: 30px;">
				<el-card class="box-card" shadow="always">
					<div slot="header" class="clearfix">
						<span>系统信息</span>
					</div>
					<div v-for="o in 4" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
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
