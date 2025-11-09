<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6">Услуги</h1>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    const { $api } = useNuxtApp();

    const services = ref([]);
    const totalCount = ref(0);
    const totalPages = ref(0);
    
    const loadServices = async (params) => {
        const response = await $api(`/api/services?page=${params.page}`);

        services.value = response.userList;
        totalCount.value = response.totalCount;
        totalPages.value = response.totalPages;
    }

    onMounted(async() => {
        await loadServices({page: 1});

        if(savedShowData) {
            showCols.value = savedShowData;
        }
    });
</script>