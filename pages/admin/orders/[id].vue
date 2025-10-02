<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6">Данные пользователя {{ user.id }}</h1>
        <v-sheet class="tw-flex" max-width="600">
            <v-form fast-fail @submit.prevent="submit">
                <v-text-field
                    v-model="formData.name"
                    @change="v$.name.$touch"
                    label="Имя"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="formData.lastName"
                    @change="v$.lastName.$touch"
                    label="Фамилия"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="formData.email"
                    @change="v$.email.$touch"
                    label="email"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="formData.password"
                    @change="v$.password.$touch"
                    label="Пароль"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-select
                    v-model="formData.roleId._id"
                    @change="v$.roleId.$touch"
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
    const route = useRoute();
    const id = route.params.id;
    const savedStatus = ref(false);
    
    const formData = reactive({
        name: '',
        lastName: '',
        email: '',
        password: '',
        roleId: {}
    });

    const roleList = ref([]);
    const { v$ } = validate(formData);

    const submit = async () => {
        if(v$.value.$anyDirty) {
            const resp = await $api('/api/admin/users/' + id, {
                method: 'POST',
                body: formData,
            });

            savedStatus.value = true;
            setTimeout(() => savedStatus.value = false, 2000);

            // Обработать ошибки
        }
    }

    onMounted(async() => {
        user.value = await $api('/api/admin/users/' + id);
        const resRoles = await $api('/api/admin/roles/');

        resRoles.forEach(role => {
            roleList.value.push({title: role.name, value: role._id.toString() });
        });

        for(const key in user.value) {
            formData[key] = user.value[key];
        }
    });
 
</script>