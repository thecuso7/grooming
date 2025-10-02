<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Данные пользователя {{ user.id }}</h1>
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

                <!-- Её нельзя менять -->
                <v-select
                    v-model="data.pets"
                    @change="v$.pets.$touch"
                    :error-messages="v$.pets.$errors.map(e => e.$message)"
                    label="Питомцы"
                    :items="petsList"
                    variant="outlined"
                    density="comfortable"
                    multiple
                    disabled
                ></v-select>

                <v-select
                    v-model="data.roleId._id"
                    @change="v$.roleId.$touch"
                    :error-messages="v$.roleId.$errors.map(e => e.$message)"
                    label="Роль"
                    :items="roleList"
                    variant="outlined"
                    density="comfortable"
                ></v-select>

                <v-btn class="mt-2 bg-blue-lighten-1" type="submit" block dark>
                    <span v-if="savedStatus">Сохранено</span>
                    <span v-else>Сохранить</span>
                </v-btn>
                <v-btn @click="deleteUser" class="mt-2 bg-red-lighten-1" type="button" block dark>
                    <span>Удалить</span>
                </v-btn>
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
    const petsList = ref([]);
    
    const data = reactive({
        name: '',
        lastName: '',
        email: '',
        password: '',
        roleId: {},
        pets: []
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
                const resp = await $api('/api/users/' + id, {
                    method: 'PUT',
                    body: data,
                });

                savedStatus.value = true;
                setTimeout(() => savedStatus.value = false, 2000);
            } catch(error) {
                updateValidateFromApi();
            }
        }
    }

    const deleteUser = async () => {
        try {
            await $api('/api/users/' + id, {
                method: 'DELETE',
            });

            navigateTo('/api/users');
        } catch(error) {
            updateValidateFromApi();
        }
    }

    onMounted(async() => {
        user.value = await $api('/api/users/' + id);
        const resRoles = await $api('/api/roles/');
        const resPets = await $api('/api/pets?id=' + user.value.pets);

        resRoles.forEach(role => {
            roleList.value.push({title: role.name, value: role._id.toString() });
        });

        //Передать правильный _id
        resPets.list.forEach(pet => {
            petsList.value.push({title: pet.name, value: pet.id });
        });

        for(const key in user.value) {
            data[key] = user.value[key];
        }
    });
 
</script>