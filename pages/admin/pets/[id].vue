<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Данные питомца {{ pet.name }}</h1>
        <v-sheet class="tw-flex" max-width="600">
            <v-form fast-fail @submit.prevent="submit">
                <div class="tw-relative">
                    <div v-if="!data.image" class="tw-mb-6">
                        <div @click="triggerInput" class="tw-flex tw-items-center tw-justify-center tw-w-32 tw-h-32 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-full tw-mx-auto tw-cursor-pointer hover:tw-border-blue-400 tw-transition-colors">
                            <div class="tw-text-center">
                                <i class="fas fa-camera tw-text-gray-400 tw-text-xl tw-mb-1"></i>
                                <p class="tw-text-xs tw-text-gray-500">Добавить фото</p>
                            </div>
                            <input type="file" class="tw-hidden" accept="image/*">
                        </div>
                    </div>
                    <v-img
                        @click="triggerInput"
                        v-if="data.image"
                        :src="data.image"
                        max-width="300"
                        max-height="300"
                        cover
                        class="mt-4 tw-rounded-full tw-w-[120px] tw-h-[120px] tw-mb-4 tw-m-auto"
                    ></v-img>
                    <v-file-input
                        ref="fileInput"
                        v-model="selectedFile"
                        @change="onFileSelected"
                        accept="image/png, image/jpeg, image/bmp"
                        label="Фото"
                        placeholder="Upload your photos"
                        prepend-icon="mdi-camera"
                        hide-input
                        class="tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2"
                        style="top: 69%;"
                    ></v-file-input>
                </div>
                <v-text-field
                    v-model="data.name"
                    @change="v$.name.$touch"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Кличка"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.age"
                    @change="v$.age.$touch"
                    :error-messages="v$.age.$errors.map(e => e.$message)"
                    label="Возраст"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.weight"
                    @change="v$.weight.$touch"
                    :error-messages="v$.weight.$errors.map(e => e.$message)"
                    label="Вес"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.breed"
                    @change="v$.breed.$touch"
                    :error-messages="v$.breed.$errors.map(e => e.$message)"
                    label="Порода"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.features"
                    @change="v$.features.$touch"
                    :error-messages="v$.features.$errors.map(e => e.$message)"
                    label="Особенности"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-btn class="mt-2 bg-blue-lighten-1" type="submit" block dark>
                    <span v-if="savedStatus">Сохранено</span>
                    <span v-else>Сохранить</span>
                </v-btn>
                <v-btn @click="deletePet" class="mt-2 bg-red-lighten-1" type="button" block dark>
                    <span>Удалить</span>
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const pet = ref([]);
    const { validate } = useValidation();
    const route = useRoute();
    const id = route.params.id;
    const savedStatus = ref(false);
    
    const data = reactive({
        id: '',
        name: '',
        age: '',
        breed: '',
        features: '',
        weight: '',
        image: ''
    });

    const rulesFields = {
        name: ['required'],
        breed: ['required'],
    };

    const { v$, updateValidateFromApi } = validate(data, rulesFields);

    const submit = async () => {
        if(v$.value.$anyDirty) {
            try {
                const resp = await $api('/api/pets/' + id, {
                    method: 'PUT',
                    body: data,
                });

                savedStatus.value = true;
                setTimeout(() => savedStatus.value = false, 2000);
            } catch(error) {
                updateValidateFromApi(error);
            }
        }
    }

    const deletePet = async () => {
        try {
            await $api('/api/pets/' + id, {
                method: 'DELETE',
            });

            navigateTo('/admin/pets');
        } catch(error) {
            updateValidateFromApi(error);
        }
    }

    onMounted(async() => {
        pet.value = await $api('/api/pets/' + id);

        for(const key in pet.value) {
            data[key] = pet.value[key];
        }
    });
 
</script>