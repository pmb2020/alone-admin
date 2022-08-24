<template>
	<div class="al-box banner">
		
	</div>
</template>

<script setup>
	import {getBanner} from '@/api/banner.js'
	getBanner().then(res=>{
		console.log(res)
	})
</script>

<style>
</style>