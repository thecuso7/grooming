<template>
    <div class="flex justify-center mt-10">
        <div class="w-full max-w-xs">
            <div class="mb-6 font-bold text-xl text-center">Авторизация</div>
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Логин
                </label>
                <input v-model="formData.email" class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email">
                <!-- <p class="text-red-500 text-xs italic">Введите логин</p> -->
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Пароль
                </label>
                <input v-model="formData.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                <!-- <p class="text-red-500 text-xs italic">Введите пароль</p> -->
                </div>
                <div class="flex items-center justify-between">
                <button @click="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Войти
                </button>
                </div>
            </form>
        </div>
    </div> 
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

export default {
    setup() {
        const formData = ref({
            email: '',
            password: ''
        })

        const authStore = useAuthStore();

        const submit = async() => {

            $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: formData.value.email,
                    password: formData.value.password
                }
            }).then(res => {
                console.log('res', res.redirect);
                // authStore.setAccessToken(res.access); // стоит ли хранить его в сторе?

                navigateTo(res.redirect);
            }).catch(err => {
                console.log('error', err);
            })
        };

        /**
         * Как сдесь лучше всего обрабатывать ошибки, как должен быть обработчик?
         * 
         */

        const validate = (formData) => {
            // Перебираем
        }

        return { formData, submit };
    },
};
</script>