<template>
    <div id="default-modal" tabindex="-1" aria-hidden="true" class="tw-overflow-y-auto tw-overflow-x-hidden tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-z-50 tw-justify-center tw-items-center tw-w-full md:tw-inset-0 tw-h-[calc(100%-1rem)] tw-max-h-full">
        <div class="tw-relative tw-p-4 tw-w-full tw-max-w-2xl tw-max-h-full tw-m-auto tw-mt-32 tw-shadow-[0px 0px 61px 20px rgba(0, 0, 0, 0.2)]">
            <div class="tw-bg-custom-main tw-relative tw-rounded-lg tw-shadow-[0px_0px_60px_30px_rgba(0,_0,_0,_0.1)]">
                <div class="modal-header  tw-p-2 tw-rounded-t tw-border-gray-200">
                    <div class="tw-flex tw-items-center tw-justify-end">
                        <button @click="$emit('close')" type="button" class="close-form tw-text-gray-400 tw-bg-transparent hover:tw-bg-gray-200 hover:tw-text-gray-900 tw-rounded-lg tw-text-sm tw-w-8 tw-h-8 tw-ms-auto tw-inline-flex tw-justify-center tw-items-center" data-modal-hide="default-modal">
                            <svg class="tw-w-3 tw-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    <slot name="title">
                        <h3 class="text-center">Форма питомца</h3>
                    </slot>
                </div>
                <div class="modal-body tw-max-w-2xl tw-mx-auto tw-p-4 tw-pt-0">
                    <div class="tw-flex tw-items-center justify-center">
                        <a href="#" class="tw-mr-4 tw-text-gray-500 hover:tw-text-blue-500">
                            <i class="fas fa-arrow-left"></i>
                        </a>
                    </div>
                    <div class="tw-bg-custom-main tw-rounded-xl tw-p-6 tw-pt-0">
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
                                    class="mt-4 tw-rounded-full tw-w-[120px] tw-h-[120px] tw-mb-8 tw-m-auto"
                                ></v-img>
                                <v-file-input
                                    ref="fileInput"
                                    v-model="selectedFile"
                                    @change="onFileSelected"
                                    accept="image/png, image/jpeg, image/bmp"
                                    label="Фото"
                                    placeholder="Upload your photos"
                                    :prepend-inner-icon="mdiCamera"
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

                            <div class="sm:tw-flex sm:tw-gap-4">
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
                            </div>

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
                            <v-btn class="mt-2 !tw-bg-custom-olive !tw-text-white" type="submit" block dark>
                                <span>Сохранить</span>
                            </v-btn>
                        </v-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { mdiCamera } from '@mdi/js';
    import { type Pet } from '~/types/Pet';
    import { useFileUpload } from '~/composables/useFileUpload';

    interface Props {
        initialData: Pet
    }

    interface Emits {
        (e: 'submit', data: { formData: Pet; file: File | null | undefined }): void
        (e: 'close'): void
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const { fileLink, onFileSelected } = useFileUpload();
    const formData = reactive<Pet>({...props.initialData});
    const selectedFile = ref<File | null>();
    const fileInput = ref<HTMLInputElement | null>();
    const { validate } = useValidation();
    const data = reactive<Pet>({...props.initialData});

    Object.assign(formData, props.initialData);

    // const rulesFields = {
	// 	name: ['required'],
	// 	age: ['required'],
	// 	weight: ['required'],
	// 	breed: ['required'],
	// 	features: ['required'],
	// };

    const { v$ } = validate(data);

    const triggerInput = () => {
		fileInput.value?.click();
	}

    const submit = () => {
        // Проверка на обязательные поля (временно убрана)
        
		// const formData = new FormData();
		// if(data.file) {
		// 	formData.append('image', data.file);
		// }

        emit('submit', {
            formData: { ...formData },
            file: selectedFile.value,
        });
    }

    watch(fileLink, (value) => {
		data.image = value ?? '';
	});

</script>