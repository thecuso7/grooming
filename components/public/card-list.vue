<template>
	<div class="b-list flex justify-between gap-2.5">
		<!-- <Card :data="item" :key="key" v-for="item, key in list"/> -->
		 <button @click="clickBtn">Кнопка {{ text }}</button>
	</div>
</template>

<script setup>
	const text = ref('')

	function clickBtn() {
		text.value = 'test';
	}
	// import {ref} from 'vue'
	// import Card from './card-item.vue'
	// import axios from 'axios';

	// const list = ref([])

	// axios({
	// 	method: 'get',
	// 	url: '/api/services/list',
	// 	responseType: 'json'
	// }).then(function (response) {
	// 	console.log(response);
	// 	// response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
	// 	list.value = response.data.list;
	// });


</script>

<style>
    @import url("~/assets/scss/list.scss");
</style>