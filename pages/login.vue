<template>
    <div class="tw-flex tw-justify-center tw-mt-10">
        <div class="tw-w-full tw-max-w-xs">
            <div class="tw-mb-6 tw-font-bold tw-text-xl tw-text-center">Авторизация</div>
            <v-sheet class="mx-auto !tw-bg-inherit" max-width="300">
                <v-form fast-fail @submit.prevent="submit">
                    <v-text-field
                        class="mb-2"
                        v-model="data.email"
                        :error-messages="v$.email.$errors.map(e => e.$message)"
                        @change="v$.email.$touch"
                        label="Email"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <v-text-field
                        v-model="data.password"
                        :error-messages="v$.password.$errors.map(e => e.$message)"
                        @change="v$.password.$touch"
                        label="Пароль"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>
                    <v-btn class="mt-2 !tw-bg-custom-olive !tw-text-white" type="submit" block dark>Войти</v-btn>
                </v-form>
            </v-sheet>
        </div>
    </div> 
</template>

<script setup>
    import { reactive } from 'vue';
    import { useAuthStore } from '~/stores/auth';

    const { validate } = useValidation();
    const authStore = useAuthStore();

    const data = reactive({
        email: '',
        password: ''
    });

    const rulesFields = {
        email: ['required', 'email'],
        password: ['required'],
    };

    const { v$, updateValidateFromApi } = validate(data, rulesFields);

    const submit = async() => {
        if (v$.value.$invalid) {
            v$.value.$touch();
            return;
        }

        try {
            const res = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password
                }
            });

            authStore.setAccessToken(res.token);
            navigateTo(res.redirect);
        } catch(error) {
            updateValidateFromApi(error.data);
        }
    };
</script>