<template>
    <div>
        <h1>Страница администратора</h1>
    </div>
</template>

<script setup>
    definePageMeta({
		middleware: ["auth"]
		// or middleware: 'auth'
	})
</script>