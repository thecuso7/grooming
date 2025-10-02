<template>
	<div>
		<div id="step-2" class="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8">
			<h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Выбор услуг для Мурка</h2>
			<!-- Комплексы -->
			<div class="tw-space-y-6">
				<div v-for="type in typeList">
					<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">{{ type.title }}</h3>
					<template v-if="type.code == 'complex'">
						<div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
							<div v-for="service in groupedServiceList.complex"
								@click="chooseComplex(service)"
								class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-[#7D9E89] tw-border-blue-400 tw-bg-custom-purple"
								:class="{'!tw-border-[#7D9E89]': state.complex.id == service._id}"
								>
								<div class="tw-flex tw-justify-between tw-items-start tw-mb-2">
									<h4 class="tw-font-semibold">{{ service.title }}</h4>
									<span class="tw-text-green-600 tw-font-bold">{{ service.price }} ₽</span>
								</div>
								<p class="tw-text-sm tw-text-gray-600 tw-mb-3">{{ service.description }}</p>
								<div class="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
									<i class="fas fa-clock tw-mr-1"></i>
									<span>{{ service.duration }}</span>
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="tw-space-y-3">
							<div 
								v-for="service in groupedServiceList[type.code]" 
								class="tw-flex tw-items-center tw-space-x-3 tw-justify-between"
							>
								<v-checkbox
									@change="selectService($event, service)"
									class="test-checkbox"
									v-model="state.selectedIds"
									:label="service.title"
									:value="service._id"
									:disabled="service._id == reqService && state.selectedIds.includes(service._id) && state.selectedIds.length > 1"
									hide-details
								></v-checkbox>

								<!-- ну или перечеркнуть -->
								<span
									v-if="!state.complex.parts.includes(service._id)"
									class="tw-text-green-600 tw-font-bold"
								>{{ service.price }} ₽</span>
							</div>
						</div>
					</template>
				</div>
			</div>

			<!-- Итоговая стоимость -->
			<div class="tw-bg-custom-purple tw-rounded-lg tw-p-4 tw-mt-6">
				<div class="tw-flex tw-justify-between tw-items-center">
					<span class="tw-font-semibold">Общая стоимость:</span>
					<span class="tw-text-xl tw-text-green-600 tw-font-bold">{{ state.summ.price }} ₽</span>
				</div>
				<div class="tw-flex tw-justify-between tw-items-center tw-mt-2">
					<span class="tw-text-sm tw-text-gray-600">Общее время:</span>
					<span class="tw-text-sm tw-font-medium">{{ totalPartsTime }}</span>
				</div>
			</div>

			<div class="tw-flex tw-justify-between tw-mt-6">
				<button
					@click="emit('prev-step')" 
					class="tw-px-6 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-700 hover:tw-bg-gray-50 tw-transition-colors">
					<i class="fas fa-arrow-left tw-mr-2"></i>Назад
				</button>
				<button
					@click="emit('next-step')"
					:disabled="state.selectedIds.length == 0"
					:class="{'tw-opacity-60': state.selectedIds.length == 0}"
					class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors">
					Далее: Данные <i class="fas fa-arrow-right tw-ml-2"></i>
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
	import { onMounted, watch } from 'vue';

	const { $api } = useNuxtApp();
	const appointStore = useAppointmentStore();

	const emit = defineEmits(['next-step', 'prev-step']);

	const typeList = ref([]);
	const serviceList = ref([]);
	const groupedServiceList = ref({});
	const reqService = ref({});

	const state = reactive({
		selectedIds: [],
		selected: [],
		complex: {
			parts: [],
			summ: 0,
			id: ''
		},
		summ: {
			price: 0,
			time: ''
		}
	});

	const selectService = (event, service) => {
		if(event.target.checked) {
			state.selected.push({id: service._id, title: service.title});
		} else {
			state.selected = state.selected.filter(item => item.id !== service._id);
		}
	}

	const chooseComplex = (service) => {
		state.complex.summ = true;
		state.complex.id = service._id;
		state.selectedIds = [];

		service.bundle.forEach(id => {
			state.selectedIds.push(id);
			state.complex.parts.push(id);
		});
	};

	const calcSumm = (newVal, price = 0, time = 0) => {
		state.summ.price = Number(price);
		state.summ.time = Number(time);
		let mustRequired = false;

		serviceList.value.forEach(service => {
			if(newVal.includes(service._id)) {
				if(['main', 'additional'].includes(service.type.code) && service._id !== reqService.value._id) {
					mustRequired = true;
				}
				state.summ.price += Number(service.price);
				state.summ.time += Number(service.duration);
			}
		});

		if(mustRequired && !state.selectedIds.includes(reqService.value._id)) {
			state.selectedIds = [...state.selectedIds, reqService.value._id]
			selectService({target: {checked: true}}, reqService.value);
		}
	}

	const getPartsTime = (time) => {
        const hours = Math.trunc(time / 60);
        const minutes = time - hours * 60;

      	return [hours, minutes ? (minutes < 10 ? '0' + minutes : minutes) : '00'];
    }

	const totalPartsTime = computed(() => {
		const [hours, minutes] = getPartsTime(state.summ.time);
		return hours ? `${hours} час(а) ${minutes} минут` : `${minutes} минут`;
	});

	watch(
		() => state.selectedIds, 
		(newVal) => {
		if(state.complex.summ) {
			let containsAll = state.complex.parts.every(item => state.selectedIds.includes(item));
			if(!containsAll) {
				state.complex.summ = false;
				state.complex.parts = [];
				state.complex.id = 0;
				calcSumm(newVal);
			} else {
				const complexService = serviceList.value.filter(service => service.bundle.length && service._id == state.complex.id)[0];
				const diffService = state.selectedIds.filter(id => !state.complex.parts.includes(id));
				calcSumm(diffService, complexService.price, complexService.duration);
			}
		} else {
			calcSumm(newVal);
		}
	});

	watch(() => state, (newValue) => {
		appointStore.updateData('service', newValue);
	}, {deep: true});

	onMounted(async () => {
		typeList.value = await $api('/api/common/types'); // сгруппировать по сортировке
        const { list: list } = await $api(`/api/services`);
		serviceList.value = list;
		typeList.value.forEach(type => {
			let group = serviceList.value.map(service => {
				const serviceCopy = {...service};

				if(serviceCopy.required) {
					reqService.value = serviceCopy;
				}

				const [hours, minutes] = getPartsTime(serviceCopy.duration);
				serviceCopy.duration = hours ? `${hours} час(a) ${minutes} минут` : `${minutes} минут`;

				return serviceCopy;
			}).filter(serviceCopy => {
				if(serviceCopy.required) {
					reqService.value = serviceCopy;
				}

				return serviceCopy.type.code == type.code;
			});
			groupedServiceList.value[type.code] = group;
		});

		if(appointStore.isSaved) {
			Object.assign(state, appointStore.stepsData.service);
		}
	});
</script>

<style>
.test-checkbox .v-selection-control {
	gap: 10px;
}
.test-checkbox .v-selection-control__input,
.test-checkbox .v-selection-control__wrapper {
	width: max-content;
	height: max-content;
}

.test-checkbox .v-input__control .v-selection-control {
	min-height: auto;
}

</style>