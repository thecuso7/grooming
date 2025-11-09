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
                            <slot
                                :data="formData"
                                :v$="props.v$"
                            >
                            </slot>
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
    interface Pet {
		id: string,
        name: string,
		image: string | null,
        age: string,
		weight: string,
        breed: string,
        features: string
	}

    interface Props {
        initialData: Pet
        v$?: any
    }

    interface Emits {
        (e: 'submit', data: { formData: Pet; file: File | null | undefined }): void
        (e: 'close'): void
    }

    const emit = defineEmits<Emits>();

    const props = defineProps<Props>();
    const formData = reactive<Pet>({...props.initialData});
    const selectedFile = ref<File | null>();

    Object.assign(formData, props.initialData);

    const submit = () => {
        emit('submit', {
            formData: { ...formData },
            file: selectedFile.value,
        });
    }
</script>