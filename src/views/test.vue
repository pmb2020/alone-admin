<template>
	<div>测试</div>
</template>

<script>
	import { io } from "socket.io-client";
	import Echo from 'laravel-echo'
	// window.io = require('socket.io-client');
	window.Echo = new Echo({
		broadcaster: io,
		host: window.location.hostname + ':6001',
		auth: {
			headers: {
				Authorization: 'Bearer ' + 'WVP25lQfJFTpCcuA1rmdadgeXQplMOtobWjL4TvkDD8dMbjOX5pBF4kBwiC9'
			},
		},
	});

	window.Echo.private('user.3590')
		.listen('PrivateEvent', (e) => {
			alert(11);
			console.log(1111);
			console.log(e);
		});
</script>

<style>
</style>
