<template>
    <div class="app tw-flex">
        <aside class="tw-relative tw-bg-custom-purple tw-h-screen tw-w-64 tw-hidden sm:tw-block tw-shadow-xl">
            <div class="tw-p-6">
                <RouterLink class="tw-text-custom-dark tw-text-3xl tw-font-semibold tw-uppercase hover:tw-text-gray-300" to="/">Grooming</RouterLink>
            </div>
            <nav class="tw-text-custom-dark tw-text-base tw-font-semibold tw-pt-3">
                <RouterLink class="tw-flex tw-items-center tw-text-custom-dark tw-py-4 tw-pl-6 tw-nav-item" to="/admin">Главная</RouterLink>
                <RouterLink class="tw-flex tw-items-center tw-text-custom-dark tw-opacity-75 hover:tw-opacity-100 tw-py-4 tw-pl-6 tw-nav-item" to="/admin/users">Пользователи</RouterLink>
                <RouterLink class="tw-flex tw-items-center tw-text-custom-dark tw-opacity-75 hover:tw-opacity-100 tw-py-4 tw-pl-6 tw-nav-item" to="/admin/pets">Питомцы</RouterLink>
                <RouterLink class="tw-flex tw-items-center tw-text-custom-dark tw-opacity-75 hover:tw-opacity-100 tw-py-4 tw-pl-6 tw-nav-item" to="/admin/services">Услуги</RouterLink>
                <!-- <RouterLink class="tw-flex tw-items-center tw-text-custom-dark tw-opacity-75 hover:tw-opacity-100 tw-py-4 tw-pl-6 tw-nav-item" to="/admin/orders">Заказы</RouterLink> -->
            </nav>
        </aside>
        <div class="tw-w-full tw-flex tw-flex-col tw-h-screen tw-overflow-y-hidden">
            <div class="tw-w-full tw-items-center tw-bg-white tw-py-2 tw-px-6 tw-hidden sm:tw-flex">
                <div class="tw-w-1/2"></div>
                <div class=" tw-w-1/2 tw-flex tw-justify-end">
                    <div class="profile tw-relative tw-flex tw-items-center">
                        <div class="tw-mr-4">{{ user?.name }}</div>
                        <button @click="isMenuOpen = !isMenuOpen" class="tw-realtive tw-z-10 tw-w-12 tw-h-12 tw-rounded-full tw-overflow-hidden tw-border-solid tw-border-2 tw-border-gray-400 hover:tw-border-gray-300 focus:tw-border-gray-300 focus:tw-outline-none">
                            <!-- <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"> -->
                        </button>
                        <div class="profile-dropdown tw-hidden tw-absolute tw-w-32 tw-bg-white tw-right-0 tw-rounded-lg tw-shadow-lg tw-top-full tw-overflow-hidden">
                            <RouterLink class="tw-block tw-px-4 tw-py-2 tw-account-link hover:tw-bg-custom-purple" to="/profile">Профиль</RouterLink>
                            <RouterLink class="tw-block tw-px-4 tw-py-2 tw-account-link hover:tw-bg-custom-purple" to="/logout">Выйти</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-w-full tw-overflow-x-hidden tw-border-t tw-flex tw-flex-col">
                <main class="tw-w-full tw-flex-grow tw-p-6">
                    <NuxtPage />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from "~/stores/auth";
    import { computed } from 'vue';

    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);
    const isMenuOpen = ref(false);

    const user = computed(() => {
        return authStore.user;
    });
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

    .profile:hover > .profile-dropdown,
    .profile-dropdown:hover {
        display: block;
        z-index: 11;
    }
</style>
