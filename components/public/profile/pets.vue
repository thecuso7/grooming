<template>
	<div>
		<h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-font-heading">Мои питомцы</h2>  
		<div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-2 tw-gap-6">
			<div v-if="loading">Загрузка...</div>
			<div v-else-if="ErrorPets">{{ ErrorPets.message }}</div>
				<template v-else>
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
			</template>
			
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
			:initial-data="initialState"
			@close="closeForm" 
			@submit="submitForm"
		>
			<template #title>
				<h3 class="text-center">{{ formMode == 'add' ? 'Добавить питомца' : 'Редактивровать данные питомца' }}</h3>
			</template>
		</PetForm>
	</div>
</template>


<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { type Pet } from '~/types/Pet';
	import apolloClient from '~/plugins/apollo.client';
    import { useQuery, provideApolloClient, useMutation } from '@vue/apollo-composable';
	import { ADD_PET, UPDATE_PET, GET_PETS } from '@/graphql/queries';
	import { useErrorHandler } from '~/composables/useErrorHandler';

	const props = defineProps(['uid']);
	const { handleError } = useErrorHandler();

	provideApolloClient(apolloClient);

	const formMode = ref('');
	const petList = ref<Pet[]>();
	const showForm = ref(false);
	const initialState = reactive<Pet>({});

	const submitForm = async (data: { formData: Pet; file: File | null | undefined }) => {
		if(data.formData.id) {
			await updatePet({id: data.formData.id, input: data.formData});
		} else {
			await addPet({input: data.formData});
		}
	}

	const openForm = (id:string | undefined) => {
		showForm.value = true;
		formMode.value = 'edit';

		if(id) {
			const currentPet = petList.value?.find(item => item.id == id);
			Object.assign(initialState, currentPet);
		}
	}

	const closeForm = () => {
		showForm.value = false;
		formMode.value = '';
	}

	const { mutate: addPet, onDone: finishAddPet, onError: errorCreatePet } = useMutation(ADD_PET);
	const { mutate: updatePet, onDone: finishUpdatePet, onError: errorUpdatePet } = useMutation(UPDATE_PET);

	finishUpdatePet((result) => {
		const index = petList.value?.findIndex(p => p.id === result.data.id);

		if(index !== -1 && index !== undefined) {
			petList.value?.splice(index, 1, {...result.data});
		}
	});

	finishAddPet((result) => {
		petList.value?.push(result.data);
	});

    const { result: petsResult, loading, error: ErrorPets, onError: errorLoadPets } = useQuery(
		GET_PETS,
		{ uid: props.uid },
		{ 
			context: { 
				batch: true,
				headers: { 'X-Test': 'batch-test' }
			}
		}
	);

    watch(petsResult, (data) => {
		console.log('petsResult', data);
		if (data?.petsByUid) {
			petList.value = data.petsByUid;
		}
    });

	errorLoadPets((error) => handleError(error));
	errorCreatePet((error) => handleError(error));
	errorUpdatePet((error) => handleError(error));
</script>