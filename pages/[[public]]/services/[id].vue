<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6">Детальная страница услуги</h1>
        
    </div>
</template>

<script setup>
    // чпу адресация как правильно
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const service = ref([]);

    onMounted(async() => {
        service.value = await $api('/api/services/' + id);
    });
 
</script>