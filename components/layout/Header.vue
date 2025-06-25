<template>
    <div class="app max-w-screen-xl mx-auto px-5 w-full">
        <header class="flex flex-col lg:flex-row justify-between items-center my-5"> 
            <div class="flex w-full lg:w-auto items-center justify-between">
                <a href="/" class="text-lg">
                    <span class="font-bold text-slate-800">Astro</span>
                    <span class="text-slate-500">ship</span>
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
                            <!-- <li class="relative"> 
                                <menu class="astronav-dropdown group" aria-expanded="false"> 
                                    <button class="flex items-center gap-1 w-full lg:w-auto lg:px-3 py-2 text-gray-600 hover:text-gray-900"> 
                                        <span>Features</span> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 mt-0.5 group-open:rotate-180"> 
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                            </svg>
                                    </button>
                                    <div class="astronav-dropdown dropdown-toggle hidden" aria-expanded="false"> 
                                        <div class="lg:absolute w-full lg:w-48 z-10 lg:left-0 origin-top-left">
                                            <div class="px-3 lg:py-2 lg:bg-white lg:rounded-md lg:shadow lg:border flex flex-col">
                                                <a href="/" class="py-1 text-gray-600 hover:text-gray-900"> Action </a>
                                                <a href="#" class="py-1 text-gray-600 hover:text-gray-900"> Another action </a>
                                                <a href="#" class="py-1 text-gray-600 hover:text-gray-900"> Dropdown Submenu </a>
                                                <a href="/404" class="py-1 text-gray-600 hover:text-gray-900"> 404 Page </a>
                                            </div>
                                        </div>
                                    </div>
                                </menu>
                            </li> -->
                            <RouterLink class="b-menu__item flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900" to="/">Главная</RouterLink>
                            <!-- <li>
                                <a href="/pricing" class="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900">
                                <span> Pricing</span>
                                </a>
                            </li> -->
                            <RouterLink class="b-menu__item flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900" to="/services">Услуги</RouterLink>
                            <RouterLink class="b-menu__item flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900" to="/about">Чат</RouterLink>
                            <!-- <li> 
                                <a href="/blog" class="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900"> 
                                    <span> Blog</span> 
                                </a>
                            </li>
                            <li> 
                                <a href="/contact" class="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900"> 
                                    <span> Contact</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://astroship-pro.web3templates.com/" class="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900"> 
                                    <span> Pro Version</span> 
                                    <span class="ml-1 px-2 py-0.5 text-[10px] animate-pulse font-semibold uppercase text-white bg-indigo-600 rounded-full"> New</span>
                                </a>
                            </li> -->
                        </ul>
                        <div class="lg:hidden flex items-center mt-3 gap-4"> 
                            <a href="#" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200   border-2 border-transparent">Войти</a>
                            <a href="#" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-4 py-2 bg-black text-white hover:bg-gray-800  border-2 border-transparent">Зарегистрироваться</a>
                        </div> 
                    </nav>
                <div>
                <div class="hidden lg:flex items-center gap-4">
                    <RouterLink to="/login">Войти</RouterLink>
                    <RouterLink to="/register" class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-4 py-2 bg-black text-white hover:bg-gray-800  border-2 border-transparent">Регистрация</RouterLink>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
    // import {ref, onMounted} from 'vue'
</script>

<style>

</style>
