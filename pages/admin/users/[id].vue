<template>
    <div>
        <h1 class="text-3xl text-black pb-6">Пользователь</h1>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const users = ref([]);

    // Как-то надо отделить логику работы с данными от работы модуля ui
    /**
     * Делаем запрос на получение данных по пользователям
     * по полученным данным заполняем данные компонента с ui. И управляем через него показом столбцов в таблице
     * 
     * 
     */
    onMounted(async() => {
        users.value = await $api('/api/users');

        
    });
 
</script>