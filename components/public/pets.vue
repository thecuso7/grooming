<template>
	<div>
		<h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-font-heading">Мои питомцы</h2>  
		<div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-2 tw-gap-6">
			<!-- Карточка питомца 1 -->
			<div v-for="item in petList" class="tw-bg-custom-purple tw-rounded-xl tw-shadow-lg tw-p-6 hover:tw-shadow-lg tw-transition-shadow">
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
						<button @click="openForm($event, item.id)" class="tw-py-2 tw-text-gray-400 hover:tw-text-blue-500 tw-transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-fill-gray-300" fill="black" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
						</button>
						<button @click="delete(item.id)" class="tw-py-2 tw-text-gray-400 hover:tw-text-red-500 tw-transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-fill-gray-300" fill="black" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button>
					</div>
				</div>
				<h3 class="tw-font-semibold tw-text-gray-800">{{ item.name }}</h3>
				<p class="tw-text-gray-600 tw-text-sm">{{ item.breed }} - {{ item.age }}</p>
			</div>
			<div @click="openForm($event)" class="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-border-2 tw-border-dashed tw-border-gray-300 hover:tw-border-[#A5B8A3] hover:tw-border-solid tw-transition-colors">
				<button class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-[#A5B8A3] tw-transition-colors">
					<div class="tw-w-16 tw-h-16 tw-border-2 tw-border-dashed tw-border-current tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
						<i class="fas fa-plus tw-text-2xl"></i>
					</div>
					<span class="tw-font-semibold">Добавить питомца</span>
				</button>
			</div>
		</div>

		<div v-if="showFormAdd" id="default-modal" tabindex="-1" aria-hidden="true" class="tw-overflow-y-auto tw-overflow-x-hidden tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-z-50 tw-justify-center tw-items-center tw-w-full md:tw-inset-0 tw-h-[calc(100%-1rem)] tw-max-h-full">
			<div class="tw-relative tw-p-4 tw-w-full tw-max-w-2xl tw-max-h-full tw-m-auto tw-mt-32 tw-shadow-[0px 0px 61px 20px rgba(0, 0, 0, 0.2)]">
				<div class="tw-bg-custom-main tw-relative tw-rounded-lg tw-shadow-[0px_0px_60px_30px_rgba(0,_0,_0,_0.1)]">
					<div class="tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded-t tw-border-gray-200">
						<button @click="closeForm" type="button" class="tw-text-gray-400 tw-bg-transparent hover:tw-bg-gray-200 hover:tw-text-gray-900 tw-rounded-lg tw-text-sm tw-w-8 tw-h-8 tw-ms-auto tw-inline-flex tw-justify-center tw-items-center" data-modal-hide="default-modal">
							<svg class="tw-w-3 tw-h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
							</svg>
							<span class="tw-sr-only">Close modal</span>
						</button>
					</div>
					<div class="tw-max-w-2xl tw-mx-auto tw-p-4 tw-pt-0">
						<div class="tw-flex tw-items-center justify-center">
							<a href="#" class="tw-mr-4 tw-text-gray-500 hover:tw-text-blue-500">
								<i class="fas fa-arrow-left"></i>
							</a>
						</div>
						<div class="tw-bg-custom-main tw-rounded-xl tw-p-6 tw-pt-0">
							<!-- <v-sheet class="tw-flex tw-bg-custom-main!" max-width="600"> -->
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

									<div class="sm:tw-flex sm:tw-gap-4">
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
									</div>
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
										<span>Сохранить</span>
									</v-btn>
								</v-form>
							<!-- </v-sheet> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
	import { onMounted } from 'vue';
	const { $api } = useNuxtApp();
	const { validate } = useValidation();

	const props = defineProps(['ids']);

	const petIds = ref(props.ids);
	const selectedFile = ref('');
	const fileInput = ref(null);

	const petList = ref([]);
	const showFormAdd = ref(false);
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
		image: '',
        age: '',
		weight: '',
        breed: '',
        features: ''
    });
	const file = ref('');

	const { v$, updateValidateFromApi } = validate(data);

	const triggerInput = () => {
		fileInput.value.$el.querySelector('input[type="file"]').click();
	}

	const onFileSelected = (event) => {
		file.value = event.target.files[0];
		if (!file.value) return;
		
		const reader = new FileReader();
		
		reader.onload = (e) => {
			data.image = e.target.result;
		}
		
		reader.onerror = () => {
			data.image = null;
		}
		
		reader.readAsDataURL(file.value);
	}

	const submit = () => {
		const formData = new FormData();
		if(file.value) {
			formData.append('image', file.value);
		}
		formData.append('id', data.id);
		formData.append('name', data.name);
		formData.append('age', data.age);
		formData.append('weight', data.weight);
		formData.append('breed', data.breed);
		formData.append('features', data.features);

		if(data.id) {
			updatePet(formData);
		} else {
			addPet(formData);
		}
	}

	const updatePet = async (formData) => {
		if(v$.value.$anyDirty) {
            try {
                const resp = await $api(`/api/pets/${data.id}`, {
                    method: 'PUT',
                    body: formData,
                });

                showFormAdd.value = false;
				await fetchPetsList();
            } catch(error) {
                updateValidateFromApi();
            }
        }
	}

	const addPet = async (formData) => {
		try {
			const resPet = await $api('/api/pets', {
				method: 'POST',
				body: formData,
			});

			petIds.value.push(resPet.id);

			await $api(`/api/users/me`, {
				method: 'PUT',
				body: {pets: petIds.value},
			});

			showFormAdd.value = false;
			
			await fetchPetsList();
		} catch(error) {
			updateValidateFromApi();
		}
	}

	const openForm = (event, id = null) => {
		
		showFormAdd.value = true;
		if(id) {
			const currentPet = petList.value.filter(item => item.id == id);
			console.log('currentPet', currentPet);
			Object.assign(data, currentPet[0]);
		} else {
			Object.assign(data, initialState);
		}
	}

	const closeForm = () => {
		showFormAdd.value = false;
		v$.value.$reset();
	}

	const fetchPetsList = async () => {
		const { list } = await $api(`/api/pets?id=${petIds.value}`);
		petList.value = list;
	}

	onMounted(async() => {
		await fetchPetsList();
	});
</script>