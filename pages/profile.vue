<template>
    <div>
        <h1 class="mb-8">Страница пользователя</h1>
        <div class="flex gap-4 relative">
            <div class="w-8/12 font-bold">
                Активные записи

                 <!--
                
                Сюда выводим активные записи

                Справа подтягиваем данные пользователя (где хранить) и как будут выглядеть активные записи

                Написать логику для редактирования своих данных и записи (удаление, смена даты)
                 -->
            </div>
            <div class="top-[15px] bg-white rounded-lg shadow w-4/12 border-1 border-gray-400 py-4 px-4 sticky h-fit">
                <div class="space-y-4">
                    <!-- Поле Фамилия -->
                    <div class="relative group">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                        <div class="flex items-center justify-between">
                            <span id="lastNameValue"
                             class="text-gray-900 font-medium py-2 pr-8"
                             :class="{ 'hidden' : showFields.lastName }"
                             >Иванов</span>
                            <input 
                                id="lastNameInput" 
                                type="text" 
                                v-model="valueFields.lastName"
                                :class="{ 'hidden' : !showFields.lastName }"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                            <button 
                                @click="editData('lastName')"
                                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <svg class="w-5 h-5 text-gray-500 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Поле Имя -->
                    <div class="relative group">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                        <div class="flex items-center justify-between">
                            <span id="firstNameValue" class="text-gray-900 font-medium py-2 pr-8"
                            :class="{ 'hidden' : showFields.firstName }"
                            >Иван</span>
                            <input 
                                id="firstNameInput" 
                                type="text" 
                                v-model="valueFields.firstName"
                                :class="{ 'hidden' : !showFields.firstName }"
                                class=" w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                            <button 
                                @click="editData('firstName')"
                                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <svg class="w-5 h-5 text-gray-500 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Поле Email -->
                    <div class="relative group">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div class="flex items-center justify-between">
                            <span id="emailValue" class="text-gray-900 font-medium py-2 pr-8"
                            :class="{ 'hidden' : showFields.email }"
                            >{{ valueFields.email }}</span>
                            <input 
                                id="emailInput" 
                                type="email" 
                                v-model="valueFields.email"
                                :class="{ 'hidden' : !showFields.email }" 
                                class=" w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                            <button 
                                @click="editData('email')"
                                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <svg class="w-5 h-5 text-gray-500 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button v-if="showBtn" @click="saveData" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    const { $api } = useNuxtApp();
    const authStore = useAuthStore();

    const showFields = reactive({
        email: false,
        firstName: false,
        lastName: false,
    });

    const valueFields = reactive({
        email: '',
        firstName: '',
        lastName: '',
    })

    const showBtn = computed(() => Object.values(showFields).some(value => value));

    const editData = (field) => {
        showFields[field] = true;
    } 

    const saveData = () => {

    }

    onMounted(async() => {
        // Здесь нужно сделать запрос /api/users/me
        // а в админке уже делать запрос на всех или конкретного пользователя
        // Получаем данные пользователя
       const resp = await $api('/api/users/me');
       console.log('resp', resp);
    })
</script>