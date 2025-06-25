<template>
    <div class="flex justify-center mt-10">
        <div class="w-full max-w-xs">
            <div class="mb-6 font-bold text-xl text-center">Регистрация</div>
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Имя
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="formData.name" id="name" type="text" placeholder="Имя">
                    <!-- <p class="text-red-500 text-xs italic">Введите логин</p> -->
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
                    Фамилия
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="formData.lastName" id="lastName" type="text" placeholder="Фамилия">
                    <!-- <p class="text-red-500 text-xs italic">Введите логин</p> -->
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="login">
                    Логин
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="formData.email" id="email" type="text" placeholder="Email">
                    <!-- <p class="text-red-500 text-xs italic">Введите логин</p> -->
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Пароль
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" v-model="formData.password" id="password" type="text" placeholder="******************">
                    <!-- <p class="text-red-500 text-xs italic">Введите пароль</p> -->
                </div>
                <div class="flex items-center justify-between">
                    <button @click="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
        <div v-if="error">
            {{ error }}
        </div>
    </div>
 </template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        console.log('regvue');
        
        const formData = ref({
            name: '',
            lastName: '',
            email: '',
            password: ''
        })

        let error = ref('')

        // Если делать проверку на стороне клиента, нужно ли делать проверку ещё на бэке

        const submit = async() => {

            console.log('submit');

            $fetch('/api/auth/register', {
                method: 'POST',
                body: {
                    name: formData.value.name,
                    lastName: formData.value.lastName,
                    email: formData.value.email,
                    password: formData.value.password,
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response);
                error = err.response._data.message;
            })
        };

        return { formData, error, submit };
    },
};
</script>