<template>
	<div>
		<h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-font-heading">Мои питомцы</h2>  
		<div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-2 tw-gap-6">
			<div v-for="item in petList" class="tw-bg-custom-purple tw-rounded-xl tw-shadow-lg tw-p-6 hover:tw-shadow-lg tw-transition-shadow">
				{{ item.id }}
				<div class="tw-flex tw-justify-between tw-items-start tw-mb-4">
					<div class="tw-w-16 tw-h-16 tw-bg-custom-main tw-rounded-full tw-flex tw-items-center tw-justify-center">
						<v-img
							v-if="item.image"
							:src="item.image"
							max-width="300"
							max-height="300"
							cover
							class="mt-4 tw-rounded-full tw-w-[60px] tw-h-[60px] tw-mb-4 tw-m-auto"
						></v-img>
					</div>
					<div class="tw-flex tw-space-x-2">
						<button @click="openForm(item.id)" class="tw-py-2 tw-text-gray-400 hover:tw-text-blue-500 tw-transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-fill-gray-300" fill="black" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
						</button>
						<!-- <button @click="delete(item.id)" class="tw-py-2 tw-text-gray-400 hover:tw-text-red-500 tw-transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-fill-gray-300" fill="black" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button> -->
					</div>
				</div>
				<h3 class="tw-font-semibold tw-text-gray-800">{{ item.name }}</h3>
				<p class="tw-text-gray-600 tw-text-sm">{{ item.breed }} - {{ item.age }}</p>
			</div>
			<div @click="showForm = true; formMode = 'add';" class="open-form tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-border-2 tw-border-dashed tw-border-gray-300 hover:tw-border-[#A5B8A3] hover:tw-border-solid tw-transition-colors">
				<button class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-[#A5B8A3] tw-transition-colors">
					<div class="tw-w-16 tw-h-16 tw-border-2 tw-border-dashed tw-border-current tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
						<i class="fas fa-plus tw-text-2xl"></i>
					</div>
					<span class="tw-font-semibold">Добавить питомца</span>
				</button>
			</div>
		</div>

		<PetForm
			v-if="showForm"
			:v$="v$" 
			:initial-data="data"
			@close="closeForm" 
			@submit="submitForm"
		>
			<template #title>
				<h3 class="text-center">{{ formMode == 'add' ? 'Добавить питомца' : 'Редактивровать данные питомца' }}</h3>
			</template>
			<template #default="{ data, v$ }">
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
			</template>
		</PetForm>
	</div>
</template>


<script setup lang="ts">
	import { mdiCamera } from '@mdi/js';
	import { onMounted, ref, reactive } from 'vue';
	import { type Pet } from '~/types/Pet';
	const { $api } = useNuxtApp();
	const { validate } = useValidation();

	const props = defineProps(['ids']);

	const petIds = ref(props.ids);
	const selectedFile = ref<File | null>();
	const fileInput = ref<HTMLInputElement | null>();
	const formMode = ref('');
	const petList = ref<Pet[]>();
	const showForm = ref(false);
	const initialState = {
		id: '',
        name: '',
		image: '',
        age: '',
		weight: '',
        breed: '',
        features: ''
	};

	const data = reactive({
        id: '',
        name: '',
		image: '' as string | null,
        age: '',
		weight: '',
        breed: '',
        features: ''
    });
	const file = ref<File | null>();

	const { v$, updateValidateFromApi } = validate(data);

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

	const submitForm = (data: { formData: Pet; file: File | null | undefined }) => {
		const formData = new FormData();
		if(data.file) {
			formData.append('image', data.file);
		}
		formData.append('id', data.formData.id ?? '');
		formData.append('name', data.formData.name ?? '');
		formData.append('age', data.formData.age ?? '');
		formData.append('weight', data.formData.weight ?? '');
		formData.append('breed', data.formData.breed ?? '');
		formData.append('features', data.formData.features ?? '');

		if(data.formData.id) {
			updatePet(formData);
		} else {
			addPet(formData);
		}
	}

	const resetForm = () => {
		Object.assign(data, initialState);
	}

	const updatePet = async (formData: FormData) => {
		if(v$.value.$anyDirty) {
            try {
                const resp = await $api(`/api/pets/${data.id}`, {
                    method: 'PUT',
                    body: formData,
                });

                showForm.value = false;
				await fetchPetsList();
            } catch(error) {
                updateValidateFromApi(error);
            }
        }
	}

	const addPet = async (formData: FormData) => {
		try {
			const id = await $api('/api/pets', {
				method: 'POST',
				body: formData,
			});

			petIds.value.push(id);

			await $api(`/api/users/me`, {
				method: 'PUT',
				body: {pets: petIds.value},
			});

			showForm.value = false;
			
			await fetchPetsList();
		} catch(error) {
			updateValidateFromApi(error);
		}
	}

	const openForm = (id:string | undefined) => {
		showForm.value = true;
		formMode.value = 'edit';
		if(id) {
			const currentPet = petList.value?.filter(item => item.id == id);
			Object.assign(data, currentPet?.[0]);
		} else {
			Object.assign(data, initialState);
		}
	}

	const closeForm = () => {
		showForm.value = false;
		v$.value.$reset();
		resetForm();
	}

	const fetchPetsList = async () => {
		if(petIds.value.length > 0) {
			const { list } = await $api(`/api/pets?id=${petIds.value}`);
			petList.value = list;
		}
	}

	onMounted(async() => {
		await fetchPetsList();
	});
</script>