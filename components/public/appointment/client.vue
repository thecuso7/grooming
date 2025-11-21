<template>
	<div>
		<div id="step-3" class="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8">
			<h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Контактные данные</h2>
			
			<div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
				<v-text-field
					v-model="user.name"
					@change="v$.name.$touch"
					:error-messages="v$.name.$errors.map(e => e.$message)"
					label="Имя *"
					variant="outlined"
					density="comfortable"
				></v-text-field>

				<v-text-field
					v-model="user.lastName"
					@change="v$.lastName.$touch"
					:error-messages="v$.lastName.$errors.map(e => e.$message)"
					label="Фамилия *"
					variant="outlined"
					density="comfortable"
				></v-text-field>

				<v-mask-input
					label="Телефон *"
					v-model="user.phone"
					@change="v$.phone.$touch"
					:error-messages="v$.phone.$errors.map(e => e.$message)"
					mask="+7 (###) ### - ####"
					placeholder="+7 (999) 999 - 9999"
					variant="outlined"
					density="comfortable"
				></v-mask-input>

				<v-text-field
					v-model="user.email"
					@change="v$.email.$touch"
					:error-messages="v$.email.$errors.map(e => e.$message)"
					label="Email *"
					variant="outlined"
					density="comfortable"
				></v-text-field>
			</div>

			<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">Выбор даты и времени</h3>
			<div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-6">
				<v-container>
					<v-row>
						<v-date-picker
							v-model="state.date.day"
							:allowed-dates="allowedDates"
							max="2025-12-20"
							:min="state.date.min"
							color="#BCADC3"
						></v-date-picker>
					</v-row>
				</v-container>
				<div v-if="state.date.day">
					<div v-if="state.date.day" class="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-3">
						<div 
							v-for="(slot, key) in timeSlots[dateChoosenFormated]"
							@click="chooseSlot(key, slot)"
							:class="{ '!tw-border-custom-accent !tw-shadow-md !tw-border-2': key === state.date.slot.key }"
							class="tw-bg-white tw-rounded-lg tw-border tw-border-gray-300 tw-p-2 tw-text-center tw-box-border hover:tw-border-custom-accent hover:tw-shadow-md tw-transition-all tw-cursor-pointer">	
							<span class="tw-text-sm tw-font-semibold tw-text-gray-900">{{ slot.format }}</span>
						</div>
					</div>

					<div v-if="state.date.slot.key !== null" className="tw-mt-8 tw-p-4 tw-bg-custom-purple tw-border tw-rounded-lg">
						<h3 className="tw-text-md tw-font-semibold tw-mb-2">Выбранная запись</h3>
						<div className="tw-flex tw-items-center tw-justify-between">
							<span className="tw-text-lg tw-font-bold">{{ state.date.slot.beginAt }} - {{ state.date.slot.finishAt }}</span> <!-- посчитать -->
						</div>
					</div>
				</div>
			</div>

			<div class="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
				<h4 class="tw-font-semibold tw-mb-2">Комментарий к записи</h4>
				<textarea class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" rows="3" placeholder="Особые пожелания или примечания..."></textarea>
			</div>

			<div class="tw-flex tw-justify-between">
				<button
					@click="emit('prev-step')"
					class="tw-px-6 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-700 hover:tw-bg-gray-50 tw-transition-colors">
					<i class="fas fa-arrow-left tw-mr-2"></i>Назад
				</button>
				<button
					@click="emit('next-step')"
					:disabled="!allowNext"
					:class="{'tw-opacity-60': !allowNext}"
					class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors"
				>
					Записаться
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
	import { onMounted, watch } from 'vue';
	import { VMaskInput } from 'vuetify/labs/VMaskInput';
	import { formatDate, getPartsTime } from '../../../utils/formatters';

	const emit = defineEmits(['next-step', 'prev-step']);

	const { $api } = useNuxtApp();
	const authStore = useAuthStore();
	const appointStore = useAppointmentStore();
	const { validate } = useValidation();
	const shedule = ref([]);
	const sheduleInterval = ref(15);
	const beginTimeWorkDay = ref(8*60+30);
	const finishTimeWorkDay = ref(17*60+30);
	const timeSlots = reactive({});
	const isInitialized = ref(false);
	
	const state = reactive({
		date: {
			day: null,
			min: new Date(),
			max: '',
			slot: { key: null, beginAt: '', finishAt: '', beginAtMinutes: 0, finishAtMinutes: 0}
		}
	});

	const user = reactive({
		name: '',
		lastName: '',
		phone: '',
		email: ''
	});


	const firstDay = new Date();
	firstDay.setDate(1);

	state.date.min = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		day: '2-digit', 
		month: '2-digit'
	}).format(firstDay);

	const rulesFields = {
        name: ['required'],
        lastName: ['required'],
        phone: ['required'],
		email: ['required', 'email'],
    };

	const { v$ } = validate(user, rulesFields);

	const allowedDates = (val) => {
		let allowRecord = false;
		const formatedDate = formatDate(val);

			const dayShedule = shedule.value.filter((rec) => {
				return rec.workDate == formatedDate;
			});

			if(dayShedule.length) {
				let lastFinishRecord = 0;
				timeSlots[formatedDate] = [];
				dayShedule.forEach((rec, index) => {
					const beginTime = new Date(`${rec.workDate}T${rec.beginAt}:00+03:00`);
					const finishTime = new Date(`${rec.workDate}T${rec.finishAt}:00+03:00`);

					const beginTimeMinutes = beginTime.getHours() * 60 + beginTime.getMinutes();
					const finishTimeMinutes = finishTime.getHours() * 60 + finishTime.getMinutes();

					let diff, gap, count = 0;

					if(index == 0) {
						lastFinishRecord = beginTimeWorkDay.value;
					}

					if(
						lastFinishRecord + appointStore.stepsData.service.summ.time + sheduleInterval.value <= beginTimeMinutes &&
						lastFinishRecord + appointStore.stepsData.service.summ.time + sheduleInterval.value <= finishTimeWorkDay.value
					) {
						diff = beginTimeMinutes - lastFinishRecord;
						gap = diff - appointStore.stepsData.service.summ.time - sheduleInterval.value;
						count = Math.floor(gap/sheduleInterval.value);

						for(let i = 1; i <= count; i++) {
							let [hours, minutes] = getPartsTime(lastFinishRecord + i*sheduleInterval.value);
							timeSlots[formatedDate].push({format: `${hours}:${minutes}`, minutes: lastFinishRecord + i*sheduleInterval.value });
						}

						allowRecord = true;
					}
					
					lastFinishRecord = finishTimeMinutes;

					if(
						index == dayShedule.length - 1 &&
						lastFinishRecord + appointStore.stepsData.service.summ.time + sheduleInterval.value <= finishTimeWorkDay.value
					) {
						diff = finishTimeWorkDay.value - lastFinishRecord;
						gap = diff - appointStore.stepsData.service.summ.time - sheduleInterval.value;
						count = Math.floor(gap/sheduleInterval.value);

						for(let i = 1; i <= count; i++) {
							let [hours, minutes] = getPartsTime(lastFinishRecord + i*sheduleInterval.value);
							timeSlots[formatedDate].push({format: `${hours}:${minutes}`, minutes: lastFinishRecord + i*sheduleInterval.value });
						}

						allowRecord = true;
					}
				});
			}
		

		return allowRecord;
	};

	const chooseSlot = (key, slot) => {
		state.date.slot.key = key;
		const [hours, minutes] = getPartsTime(slot.minutes + appointStore.stepsData.service.summ.time);
		state.date.slot.beginAt = slot.format;
		state.date.slot.finishAt = `${hours}:${minutes}`;
		state.date.slot.beginAtMinutes = slot.minutes;
	};

	const dateChoosenFormated = computed(() => state.date.day ? formatDate(state.date.day) : null);

	const allowNext = computed(() => {
		return !v$.value.$invalid && Object.values(user).every(val => val !== '') && state.date.slot.key !== null;
	});

	watch(() => state.date.day, () => {
		if(!isInitialized.value) return;
		state.date.slot = {key: null, text: ''};
	});

	watch(() => state.date, (newValue) => {
		if(!isInitialized.value) return;
		appointStore.updateData('client', {
			date: {...newValue},
			user: user
		});
	}, {deep: true});

	watch(() => user, (newValue) => {
		if(!isInitialized.value) return;
		appointStore.updateData('client', {
			date: state.date,
			user: { ...newValue }
		});
	}, {deep: true});

	onMounted(async () => {
		const { list: list } = await $api(`/api/shedule`);
		shedule.value = list;

		if(authStore.isAuthenticated) {
			const response = await $api('/api/users/me');
			Object.assign(user, response);
		}

		if(appointStore.stepsData.client) {
			const saveData = appointStore.stepsData.client;
			Object.assign(state.date, saveData.date);
			Object.assign(user, saveData.user);
		}

		isInitialized.value = true;
	});
</script>