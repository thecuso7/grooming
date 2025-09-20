<template>
    <div>
        <div class="tw-container tw-mx-auto tw-px-4 tw-py-8 tw-max-w-4xl">
            <!-- Заголовок -->
            <div class="tw-text-center tw-mb-8">
                <h1 class="tw-text-3xl tw-font-bold tw-text-gray-800 tw-font-heading">Запись на груминг</h1>
                <p class="tw-text-gray-600 tw-mt-2 ">Заполните форму ниже чтобы записать вашего питомца</p>
            </div>
            <appointment></appointment>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
import Appointment from '~/components/public/appointment/appointment.vue';
    
    onMounted(async() => {
       
    });
</script>