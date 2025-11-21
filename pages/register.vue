<template>
    <div class="tw-flex tw-justify-center tw-mt-10">
        <div class="tw-w-full tw-max-w-xs">
            <div class="tw-mb-6 tw-font-bold tw-text-xl tw-text-center">Регистрация</div>
            <v-sheet class="mx-auto !tw-bg-inherit" max-width="300">
                <v-form fast-fail @submit.prevent="submit">
                    <v-text-field
                        class="mb-2"
                        v-model="data.name"
                        :error-messages="v$.name.$errors.map((e:any) => e.$message)"
                        @change="v$.name.$touch"
                        label="Имя *"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <v-text-field
                        class="mb-2"
                        v-model="data.lastName"
                        :error-messages="v$.lastName.$errors.map((e:any) => e.$message)"
                        @change="v$.lastName.$touch"
                        label="Фамилия *"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <v-text-field
                        class="mb-2"
                        v-model="data.email"
                        :error-messages="v$.email.$errors.map((e:any) => e.$message)"
                        @change="onChangeEmail"
                        @input="onChangeEmail"
                        label="Email *"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <v-text-field
                        v-model="data.password"
                        :error-messages="v$.password.$errors.map((e:any) => e.$message)"
                        @change="v$.password.$touch"
                        label="Пароль *"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>
                    <v-btn class="mt-2 !tw-bg-custom-olive !tw-text-white" type="submit" block dark>Регистрация</v-btn>
                </v-form>
            </v-sheet>
        </div>
        <div v-if="error">
            {{ error }}
        </div>
    </div>
 </template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuth } from '~/composables/useAuth';

    const { validate } = useValidation();
    let error = ref('');
    const data = reactive({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const rulesFields = {
        name: ['required'],
        lastName: ['required'],
        email: ['required'],
        password: ['required'],
    };

    const { v$, updateValidateFromApi } = validate(data, rulesFields);
    const { register } = useAuth({ updateValidateFromApi });

    const onChangeEmail = () => {
        v$.value.$clearExternalResults();
        v$.value.email.$touch();
    }

    const submit = async() => {
        if (v$.value.$invalid) {
            v$.value.$touch();
            return;
        }

        await register(data.name, data.name, data.name, data.name);
    };
</script>