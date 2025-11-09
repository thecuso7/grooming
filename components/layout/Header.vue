<template>
    <!-- <div class="app tw-max-w-screen-xl tw-mx-auto tw-px-5 tw-w-full tw-bg-custom-main"> -->
        <header class="tw-relative tw-max-w-screen-xl tw-w-full tw-mx-auto tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-center tw-my-5 tw-px-5"> 
            <div class="tw-flex tw-w-full lg:tw-w-auto tw-items-center tw-justify-between">
                <a href="/" class="tw-text-lg">
                    <span class="tw-text-2xl tw-font-bold tw-text-[#634f63]">Groo</span>
                    <span class="tw-text-slate-500">ming</span>
                </a>
                <div class="tw-block lg:tw-hidden">
                    <button @click="toggleMenu" id="astronav-menu" aria-label="Toggle Menu">
                        <svg fill="currentColor" 
                            class="tw-w-4 tw-h-4 tw-text-gray-800"
                            :class="{ 'tw-rotate-90': isMenuOpen }"
                            width="24" height="24" viewBox="0 0 24 24"> 
                            <title>Toggle Menu</title>
                            <path 
                                class="astronav-close-icon tw-transition-opacity tw-duration-300"
                                :class="isMenuOpen ? 'tw-opacity-100' : 'tw-opacity-0'"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                            ></path> 
                            <path 
                                class="astronav-open-icon tw-transition-opacity tw-duration-300"
                                :class="isMenuOpen ? 'tw-opacity-0' : 'tw-opacity-100'"
                                fill-rule="evenodd" 
                                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                            ></path> 
                        </svg> 
                    </button>
                </div> 
                    </div>
                    <nav class="astronav-items astronav-toggle tw-hidden tw-w-full lg:tw-w-auto tw-mt-2 lg:tw-flex lg:tw-mt-0"> 
                        <ul class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-3">
                            <RouterLink @click="closeMenu" class="tw-relative b-menu__item tw-flex lg:tw-px-3 tw-items-center hover:tw-text-gray-900" to="/">
                                <span>Главная</span>
                                <svg class="tw-absolute tw-w-[20px] tw-h-[20px] tw-bottom-[25px] tw-left-[50%] tw-translate-x-[-50%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 48.839 48.839" style="" xml:space="preserve">
                                    <g>
                                        <path style="fill:#d9cfd9;" d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252 c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373 c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742 c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181 C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0 S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971 s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878 c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414 S48.455,16.861,45.727,15.602z"/>
                                    </g>
                                </svg>
                            </RouterLink>
                            <!-- <RouterLink class="tw-relative b-menu__item tw-flex lg:tw-px-3 tw-items-center hover:tw-text-gray-900" to="/services">
                                <span>Услуги</span>
                                <svg class="tw-absolute tw-w-[20px] tw-h-[20px] tw-bottom-[25px] tw-left-[50%] tw-translate-x-[-50%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 48.839 48.839" style="" xml:space="preserve">
                                    <g>
                                        <path style="fill:#d9cfd9;" d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252 c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373 c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742 c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181 C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0 S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971 s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878 c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414 S48.455,16.861,45.727,15.602z"/>
                                    </g>
                                </svg>
                            </RouterLink> -->
                            <RouterLink @click="closeMenu" class="tw-relative b-menu__item tw-flex lg:tw-px-3 tw-items-center hover:tw-text-gray-900" to="/appointment">
                                <span>Запись</span>
                                <svg class="tw-absolute tw-w-[20px] tw-h-[20px] tw-bottom-[25px] tw-left-[50%] tw-translate-x-[-50%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 48.839 48.839" style="" xml:space="preserve">
                                    <g>
                                        <path style="fill:#d9cfd9;" d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252 c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373 c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742 c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181 C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0 S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971 s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878 c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414 S48.455,16.861,45.727,15.602z"/>
                                    </g>
                                </svg>
                            </RouterLink>
                        </ul>
                        <div class="lg:tw-hidden tw-flex tw-items-center tw-mt-3 tw-gap-4">
                            <a href="#" class="tw-rounded tw-text-center tw-transition focus-visible:tw-ring-2 tw-ring-offset-2 tw-ring-gray-200 tw-w-full tw-px-4 tw-py-2 tw-bg-gray-100 hover:tw-bg-gray-200   tw-border-2 tw-border-transparent">Войти</a>
                            <a href="#" class="tw-rounded tw-text-center tw-transition focus-visible:tw-ring-2 tw-ring-offset-2 tw-ring-gray-200 tw-w-full tw-px-4 tw-py-2 tw-bg-black tw-text-white hover:tw-bg-gray-800  tw-border-2 tw-border-transparent">Зарегистрироваться</a>
                        </div> 
                    </nav>
                <div>
                <div class="tw-hidden lg:tw-flex tw-items-center tw-gap-4">
                    <template v-if="isAuth">
                        <div class="profile tw-relative tw-flex tw-items-center">
                            <div class="tw-mr-4">{{ user.name }}</div>
                            <button @click="isOpen = !isOpen" class="tw-realtive tw-z-10 tw-w-12 tw-h-12 tw-rounded-full tw-overflow-hidden tw-border-solid tw-border-2 tw-border-gray-400 hover:tw-border-gray-300 focus:tw-border-gray-300 focus:tw-outline-none">
                                <!-- <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"> -->
                            </button>
                            <div class="profile-dropdown tw-hidden tw-absolute tw-w-32 tw-bg-white tw-right-0 tw-rounded-lg tw-shadow-lg tw-top-full tw-overflow-hidden">
                                <!--Если роль - админ-->
                                <RouterLink @click="closeMenu" v-if="user.role == 'admin'" class="tw-block tw-px-4 tw-py-2 tw-account-link hover:tw-bg-custom-purple" to="/admin">Админка</RouterLink>
                                <RouterLink @click="closeMenu" class="tw-block tw-px-4 tw-py-2 tw-account-link hover:tw-bg-custom-purple" to="/profile">Профиль</RouterLink>
                                <RouterLink @click="closeMenu" class="tw-block tw-px-4 tw-py-2 tw-account-link hover:tw-bg-custom-purple" to="/logout">Выйти</RouterLink>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <RouterLink to="/login">Войти</RouterLink>
                    <RouterLink to="/register" class="tw-rounded tw-text-center tw-transition focus-visible:tw-ring-2 tw-ring-offset-2 tw-ring-gray-200 tw-px-4 tw-py-2 tw-bg-custom-olive tw-text-white tw-border-2 tw-border-transparent">Регистрация</RouterLink>
                    </template>
                </div>
            </div>
            <div
                class="tw-absolute lg:tw-static tw-left-0 tw-w-full tw-bg-white tw-z-40 tw-shadow-lg lg:tw-shadow-none tw-transition-all tw-duration-300 tw-ease-in-out tw-overflow-hidden lg:tw-hidden"
                :class="isMenuOpen ? 'menu-is-open tw-opacity-100' : 'tw-max-h-0 tw-opacity-0 lg:tw-max-h-none lg:tw-opacity-100'"
            >
                <nav class="tw-p-6 lg:tw-p-0"> 
                    <ul class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-3 tw-space-y-4 lg:tw-space-y-0">
                        <RouterLink 
                            class="tw-relative b-menu__item tw-flex lg:tw-px-3 tw-items-center tw-justify-center hover:tw-text-gray-900 tw-py-2 lg:tw-py-0 tw-text-lg lg:tw-text-base tw-font-bold"
                            to="/"
                            @click="closeMenu"
                        >
                            <span>Главная</span>
                            <svg class="tw-absolute tw-w-[20px] tw-h-[20px] tw-bottom-[31px] tw-left-[50%] tw-translate-x-[-50%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 48.839 48.839" style="" xml:space="preserve">
                                <g>
                                    <path style="fill:#d9cfd9;" d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252 c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373 c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742 c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181 C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0 S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971 s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878 c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414 S48.455,16.861,45.727,15.602z"/>
                                </g>
                            </svg>
                        </RouterLink>
                        
                        <RouterLink 
                            class="tw-relative b-menu__item tw-flex lg:tw-px-3 tw-items-center tw-justify-center hover:tw-text-gray-900 tw-py-2 lg:tw-py-0 tw-text-lg lg:tw-text-base tw-font-bold"
                            to="/appointment"
                            @click="closeMenu"
                        >
                            <span>Запись</span>
                            <svg class="tw-absolute tw-w-[20px] tw-h-[20px] tw-bottom-[31px] tw-left-[50%] tw-translate-x-[-50%]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 48.839 48.839" style="" xml:space="preserve">
                                <g>
                                    <path style="fill:#d9cfd9;" d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252 c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373 c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742 c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181 C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0 S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971 s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878 c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414 S48.455,16.861,45.727,15.602z"/>
                                </g>
                            </svg>
                        </RouterLink>
                    </ul>
                    
                    <!-- Мобильные кнопки авторизации -->
                    <div class="lg:tw-hidden tw-flex tw-flex-col tw-items-center tw-mt-8 tw-gap-4">
                        <template v-if="isAuth">
                            <div class="tw-w-full tw-text-center tw-py-2 tw-border-b tw-border-gray-200">
                                <span class="tw-text-gray-700">{{ user.name }}</span>
                            </div>
                            <RouterLink
                                v-if="user.role == 'admin'"
                                to="/admin" 
                                class="tw-w-full tw-text-center tw-py-3 tw-px-4 tw-rounded tw-transition hover:tw-bg-gray-100"
                                @click="closeMenu"
                            >
                                Админка
                            </RouterLink>
                            <RouterLink 
                                to="/profile" 
                                class="tw-w-full tw-text-center tw-py-3 tw-px-4 tw-rounded tw-transition hover:tw-bg-gray-100"
                                @click="closeMenu"
                            >
                                Профиль
                            </RouterLink>
                            <RouterLink 
                                to="/logout" 
                                class="tw-w-full tw-text-center tw-py-3 tw-px-4 tw-rounded tw-transition hover:tw-bg-gray-100"
                                @click="closeMenu"
                            >
                                Выйти
                            </RouterLink>
                        </template>
                        <template v-else>
                            <RouterLink
                                to="/login" 
                                class="tw-w-full tw-text-center tw-py-3 tw-px-4 tw-rounded tw-transition hover:tw-bg-gray-100 tw-border tw-border-gray-200"
                                @click="closeMenu"
                            >
                                Войти
                            </RouterLink>
                            <RouterLink 
                                to="/register" 
                                class="tw-w-full tw-text-center tw-py-3 tw-px-4 tw-rounded tw-transition tw-bg-custom-olive tw-text-white"
                                @click="closeMenu"
                            >
                                Регистрация
                            </RouterLink>
                        </template>
                    </div> 
                </nav>
            </div>
        </header>
    <!-- </div> -->
</template>

<script setup>
    import { useAuthStore } from "~/stores/auth";
    import { computed } from 'vue';

    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);

    const isAuth = computed(() => {
        return authStore.isAuthenticated;
    });

    const user = computed(() => {
        return authStore.user;
    });

    const isMenuOpen = ref(false);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;

        if (isMenuOpen.value) {
            document.documentElement.classList.add('tw-overflow-hidden');
        } else {
            document.documentElement.classList.remove('tw-overflow-hidden');
        }
    }

    const closeMenu = () => {
        isMenuOpen.value = false;
        document.documentElement.classList.remove('tw-overflow-hidden');
    }
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

    .profile:hover > .profile-dropdown,
    .profile-dropdown:hover {
        display: block;
        z-index: 11;
    }

    .astronav-close-icon,
    .astronav-open-icon {
        transition: opacity 0.3s ease;
    }

    body:has(.menu-is-open) {
        overflow: hidden;
    }

    .menu-is-open {
        height: calc(100vh - 56px);
        top: 56px;
    }
</style>
