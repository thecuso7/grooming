<template>
    <div class="app max-w-screen-xl mx-auto px-5 w-full">
        <header class="flex flex-col lg:flex-row justify-between items-center my-5"> 
            <div class="flex w-full lg:w-auto items-center justify-between">
                <a href="/" class="text-lg">
                    <span class="font-bold text-slate-800">Groo</span>
                    <span class="text-slate-500">ming</span>
                </a>
                <div class="block lg:hidden"> 
                    <button id="astronav-menu" aria-label="Toggle Menu"> 
                        <svg fill="currentColor" class="w-4 h-4 text-gray-800" width="24" height="24" viewBox="0 0 24 24"> 
                            <title>Toggle Menu</title>
                            <path class="astronav-close-icon astronav-toggle hidden" fill-rule="evenodd" clip-rule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path> <path class="astronav-open-icon astronav-toggle" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z">
                            </path> 
                        </svg> 
                    </button>
                </div> 
                    </div>
                    <nav class="astronav-items astronav-toggle hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0"> 
                        <ul class="flex flex-col lg:flex-row lg:gap-3">
                            <RouterLink class="b-menu__item flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900" to="/">Главная</RouterLink>
                            <RouterLink class="b-menu__item flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900" to="/services">Услуги</RouterLink>
                        </ul>
                        <div class="lg:hidden flex items-center mt-3 gap-4">
                            <a href="#" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200   border-2 border-transparent">Войти</a>
                            <a href="#" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-4 py-2 bg-black text-white hover:bg-gray-800  border-2 border-transparent">Зарегистрироваться</a>
                        </div> 
                    </nav>
                <div>
                <div class="lg:flex items-center gap-4">
                    <template v-if="isAuth">
                        <div x-data="{ isOpen: false }" class="relative w-1/2 flex justify-end">
                            <button class="profile realtive z-10 min-w-[48px] w-[48px] h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                                <!-- <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"> -->
                            </button>
                            <div class="profile-dropdown absolute hidden w-32 bg-white rounded-lg shadow py-2 mt-16">
                                <template v-if="role == user">
                                    <RouterLink to="/profile" class="block px-4 py-2 account-link hover:text-white hover:bg-gray-600">Кабинет</RouterLink>
                                </template>
                                <template v-else>
                                    <RouterLink to="/admin" class="block px-4 py-2 account-link hover:text-white hover:bg-gray-600">Панель</RouterLink>
                                </template>
                                
                                <a href="#" class="block px-4 py-2 account-link hover:text-white hover:bg-gray-600">Выйти</a>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <RouterLink to="/login">Войти</RouterLink>
                    <RouterLink to="/register" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-4 py-2 bg-black text-white hover:bg-gray-800  border-2 border-transparent">Регистрация</RouterLink>
                    </template>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
    import { useAuthStore } from "~/stores/auth";
    import { computed } from 'vue';

    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);

    const isAuth = computed(() => {
        return authStore.isAuthenticated;
    });

    const role = computed(() => {
        return authStore.role;
    });
</script>

<style>
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
