<template>
	<div class="al-icon-box" :style="{backgroundColor:props.bgColor}">
		<div class="icon-bg al-bg1">
			<el-icon color="#fff" :size="24">
				<component :is="props.icon" ></component>
			</el-icon>
		</div>
		<div class="icon-text">
			<p style="margin-bottom: 10px;">{{props.name}}</p>
			<p style="color: #FFBB01;font-size: 22px;">425</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps({
		bgColor:{
			type:String,
			default:'#fff'
		},
		name:{
			type:String,
			default:'无'
		},
		icon:{
			type:String,
			default:'HomeFilled'
		}
	})
</script>

<style>
	.al-icon-box{
		padding: 25px 20px;
		border-radius: 10px;
		margin-bottom: 15px;
		cursor: pointer;
		position: relative;
		display: flex;
		flex-wrap: wrap;
	}
	.al-bg1{
		background: linear-gradient(to bottom, #FFBB00 0%, #FFF574 100%);
		/* background-color: rgba(255, 188, 3, 0.1); */
		/* box-shadow: 0 9px 9px -1px rgb(255 188 3 / 30%); */
	}
	.al-bg2{
		background-color: #E5F8EB;
		/* box-shadow: 0 9px 9px -1px rgb(255 188 3 / 30%); */
	}
	.icon-bg{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-text{
		margin-left: 15px;
		font-size: 15px;
		font-weight: 600;
		color: #222943;
	}
	.icon-text p{
		margin: 0;
	}
</style>