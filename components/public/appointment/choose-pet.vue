<template>
	<div>
		<div id="step-1" class="tw-bg-custom-main tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8">
			<h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Выбор питомца</h2>
			
			<div v-if="petList.length" class="tw-grid md:tw-grid-cols-2 tw-gap-6 tw-mb-6 tw-p-4">
				<!-- Существующие питомцы -->
				<div v-for="pet in petList" @click="choose(pet.id)" :class="{'!tw-border-solid !tw-border-[#7D9E89]': pet.id === state.pet.id}" class="tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-p-4 tw-text-center tw-cursor-pointer hover:tw-border-solid hover:tw-border-[#7D9E89] tw-transition-colors">
					<v-img
						v-if="pet.image"
						:src="pet.image"
						max-width="300"
						max-height="300"
						cover
						class="mt-4 tw-rounded-full tw-w-[60px] tw-h-[60px] tw-mb-4 tw-m-auto"
					></v-img>
					<div v-else class="tw-w-16 tw-h-16 tw-bg-custom-purple tw-rounded-full tw-flex tw-items-center tw-justify-center tw-m-auto tw-mb-4"><!--v-if--></div>
					<h3 class="tw-font-medium tw-text-gray-800">{{ pet.name }}</h3>
					<p class="tw-text-sm tw-text-gray-600">{{ pet.breed }}, {{ pet.age }}</p>
				</div>
			</div>

			<!-- Кнопка добавления нового питомца -->
			<button @click="add" v-if="!isNew" class="tw-w-full tw-py-3 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-600 hover:tw-border-solid hover:tw-border-[#7D9E89] tw-transition-colors tw-mb-6">
				<i class="fas fa-plus tw-mr-2"></i>Добавить нового питомца
			</button>

			<!-- Форма добавления питомца -->
			<div v-if="isNew" class="tw-bg-custom-purple tw-rounded-lg tw-p-6 tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)]">
				<h3 class="tw-font-medium tw-text-gray-800 tw-mb-4">Данные нового питомца</h3>
				
				<div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
					<v-text-field
						v-model="pet.name"
						@change="v$.name.$touch"
						:error-messages="v$.name.$errors.map(e => e.$message)"
						label="Кличка *"
						variant="outlined"
						density="comfortable"
					></v-text-field>

					<v-text-field
						v-model="pet.age"
						@change="v$.age.$touch"
						:error-messages="v$.age.$errors.map(e => e.$message)"
						label="Возраст *"
						variant="outlined"
						density="comfortable"
					></v-text-field>

					<v-text-field
						v-model="pet.breed"
						@change="v$.breed.$touch"
						:error-messages="v$.breed.$errors.map(e => e.$message)"
						label="Порода *"
						variant="outlined"
						density="comfortable"
					></v-text-field>

					<v-text-field
						v-model="pet.weight"
						:error-messages="v$.weight.$errors.map(e => e.$message)"
						label="Вес (кг)"
						variant="outlined"
						density="comfortable"
					></v-text-field>

					<v-text-field
						v-model="pet.features"
						:error-messages="v$.features.$errors.map(e => e.$message)"
						label="Особые отметки"
						variant="outlined"
						density="comfortable"
					></v-text-field>
				</div>
			</div>

			<div class="tw-flex tw-justify-end tw-mt-6">
				<button 
					@click="nextStep"
					class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors">
					Далее: Услуги <i class="fas fa-arrow-right tw-ml-2"></i>
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
	import { onMounted, watch } from 'vue';

	const emit = defineEmits(['next-step']);

	const appointStore = useAppointmentStore();
	const authStore = useAuthStore();
	const { $api } = useNuxtApp();
	const { validate } = useValidation();
	const petList = ref([]);

	const initialData = reactive({
        isNew: false,
        pet: {
			id: '',
			name: '',
			age: '',
			weight: '',
			breed: '',
			features: '',
		},
    });

	const pet = reactive({
		id: '',
		name: '',
		age: '',
		weight: '',
		breed: '',
		features: '',
	});

	const isNew = ref(false);

	const rulesFields = {
        name: ['required'],
        age: ['required'],
		breed: ['required'],
    };

	const { v$ } = validate(pet, rulesFields);

	const choose = (id) => {
		isNew.value = false;
		state.pet.id = id;
		state.pet = petList.value.filter(pet => pet.id === id)[0];
	};

	const add = () => {
		Object.assign(pet, initialData.pet);
		isNew.value = true;
	};

	const nextStep = () => {
		if(isNew) {
			v$.value.$touch();
			if(v$.value.$invalid) {
				return;
			}
		} else if(!state.pet.id) {
			return;
		}

		emit('next-step');
	};

	watch(() => pet, (newValue, oldValue) => {
		appointStore.updateData('choose', {
			isNew: isNew.value,
			pet: { ...newValue }
		});
	}, {deep: true});

	onMounted(async () => {
		if(authStore.isAuthenticated) {
			const { pets } = await $api('/api/users/me');
			if(pets.length) {
				const { list } = await $api(`/api/pets?id=${pets}`);
				petList.value = list;
			}
		}

		if(appointStore.isSaved) {
			const saveData = appointStore.stepsData.choose;
			isNew.value = saveData.isNew;
			Object.assign(pet, saveData.pet);
		}
	});
</script>