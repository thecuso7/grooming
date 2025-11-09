<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Новый питомец</h1>
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
                    :error-messages="v$.name.$errors.map((e:any) => e.$message)"
                    label="Кличка"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.age"
                    @change="v$.age.$touch"
                    :error-messages="v$.age.$errors.map((e:any) => e.$message)"
                    label="Возраст"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.weight"
                    @change="v$.weight.$touch"
                    :error-messages="v$.weight.$errors.map((e:any) => e.$message)"
                    label="Вес"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.breed"
                    @change="v$.breed.$touch"
                    :error-messages="v$.breed.$errors.map((e:any) => e.$message)"
                    label="Порода"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.features"
                    @change="v$.features.$touch"
                    :error-messages="v$.features.$errors.map((e:any) => e.$message)"
                    label="Особенности"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>
                <v-btn class="mt-2 bg-blue-lighten-1" type="submit" block dark><span v-if="savedStatus">Сохранено</span><span v-else>Сохранить</span></v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const { validate } = useValidation();
    const savedStatus = ref(false);

    const selectedFile = ref<File | null>();
	const fileInput = ref<HTMLInputElement | null>();
    const file = ref<File | null>();
    
    const data = reactive({
        name: '',
        age: '',
        breed: '',
        features: '',
        weight: '',
        image: '' as string | null,
    });

    const rulesFields = {
        name: ['required'],
        breed: ['required'],
    };

    const { v$, updateValidateFromApi } = validate(data, rulesFields);

    const triggerInput = () => {
		fileInput.value?.click();
	}

	const onFileSelected = (event: Event) => {
		file.value = (event.target as HTMLInputElement).files?.[0];
		if (!file.value) return;
		
		const reader = new FileReader();
		
		reader.onload = (e) => {
			data.image = e.target?.result as string | null;
		}
		
		reader.onerror = () => {
			data.image = null;
		}
		
		reader.readAsDataURL(file.value);
	}

    const submit = async () => {
        if(v$.value.$anyDirty) {
            try {
                const id = await $api('/api/pets', {
                    method: 'POST',
                    body: data,
                });

                navigateTo(`/admin/pets/${id}`);
            } catch(error) {
                updateValidateFromApi(error);
            }
        }
    }

    onMounted(async() => {
    });
 
</script>