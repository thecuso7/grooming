<template>
    <div class="app flex">
        <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
            <div class="p-6">
                <RouterLink class="text-white text-3xl font-semibold uppercase hover:text-gray-300" to="/">Grooming</RouterLink>
            </div>
            <nav class="text-white text-base font-semibold pt-3">
                <RouterLink class="flex items-center text-white py-4 pl-6 nav-item" to="/admin">Главная</RouterLink>
                <RouterLink class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item" to="/admin/users">Пользователи</RouterLink>
                <RouterLink class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item" to="/admin/tables">Таблицы</RouterLink>
                <RouterLink class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item" to="/">Заказы</RouterLink>
            </nav>
        </aside>
        <div class="w-full flex flex-col h-screen overflow-y-hidden">
        <!-- Desktop Header -->
            <div class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                <div class="w-1/2"></div>
                <div x-data="{ isOpen: false }" class="relative w-1/2 flex justify-end">
                    <button @click="isOpen = !isOpen" class="profile realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                        <!-- <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"> -->
                    </button>
                    <!-- <button x-show="isOpen" @click="isOpen = false" class="h-full w-full fixed inset-0 cursor-default"></button> -->
                    <div x-show="isOpen" class="profile-dropdown hidden absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                        <a href="#" class="block px-4 py-2 account-link hover:text-white hover:bg-gray-600">Выйти</a>
                    </div>
                </div>
            </div>

            <!-- Mobile Header & Nav -->
        
            <div class="w-full overflow-x-hidden border-t flex flex-col">
                <main class="w-full flex-grow p-6">
                    <NuxtPage />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAuthStore } from "~/stores/auth";
    import { computed } from 'vue';

    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);

    const isAuth = computed(() => {
        return authStore.isAuthenticated;
    })
</script>

<style>
    .bg-sidebar {
        background: #3d68ff;
    }

    .profile-dropdown::before {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        top: -40px;
        padding-top: 40px;
        z-index: 11;
        cursor: pointer;
    }

    .profile:hover + .profile-dropdown,
    .profile-dropdown:hover {
        display: block;
        z-index: 11;
    }
</style>
