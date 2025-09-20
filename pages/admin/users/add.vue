<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Новый пользователь</h1>
        <v-sheet class="tw-flex" max-width="600">
            <v-form fast-fail @submit.prevent="submit">
                <v-text-field
                    v-model="data.name"
                    @change="v$.name.$touch"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Имя *"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.lastName"
                    @change="v$.lastName.$touch"
                    :error-messages="v$.lastName.$errors.map(e => e.$message)"
                    label="Фамилия *"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.email"
                    @change="v$.email.$touch"
                    :error-messages="v$.email.$errors.map(e => e.$message)"
                    label="Email *"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.password"
                    @change="v$.password.$touch"
                    :error-messages="v$.password.$errors.map(e => e.$message)"
                    label="Пароль *"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-select
                    v-model="data.roleId._id"
                    @change="v$.roleId.$touch"
                    :error-messages="v$.roleId.$errors.map(e => e.$message)"
                    label="Роль"
                    :items="roleList"
                    variant="outlined"
                    density="comfortable"
                ></v-select>

                <v-btn class="mt-2 bg-blue-lighten-1" type="submit" block dark><span v-if="savedStatus">Сохранено</span><span v-else>Сохранить</span></v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const user = ref([]);
    const { validate } = useValidation();
    const savedStatus = ref(false);
    
    // Поле пароля обязательное и здесь это надо поставить
    const data = reactive({
        name: '',
        lastName: '',
        email: '',
        password: '',
        roleId: {}
    });

    const rulesFields = {
        name: ['required'],
        lastName: ['required'],
        email: ['required', 'email'],
        password: ['required']
    };

    const roleList = ref([]);
    const { v$, updateValidateFromApi } = validate(data, rulesFields);

    const submit = async () => {
        if(v$.value.$anyDirty) {
            try {
                const resp = await $api('/api/users', {
                    method: 'POST',
                    body: data,
                });

                savedStatus.value = true;
                setTimeout(() => savedStatus.value = false, 2000);
            } catch(error) {
                updateValidateFromApi();
            }
        }
    }

    onMounted(async() => {
        const resRoles = await $api('/api/roles');

        resRoles.forEach(role => {
            roleList.value.push({title: role.name, value: role._id.toString() });
        });
    });
 
</script>