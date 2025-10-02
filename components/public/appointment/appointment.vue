<template>
	<div>
		<template v-if="showAsk">
			<ask @hide-ask="showAsk = false"></ask>
		</template>
		<template v-else>
			<progress-bar></progress-bar>
			<choose-pet @next-step="nextStep" v-if="appointStore.currentStep == '1'"></choose-pet>
			<service @next-step="nextStep" @prev-step="prevStep" v-if="appointStore.currentStep == '2'"></service>
			<client @next-step="nextStep" @prev-step="prevStep" v-if="appointStore.currentStep == '3'"></client>
			<applying @prev-step="prevStep" v-if="appointStore.currentStep == '4'"></applying>
		</template>
	</div>
</template>


<script setup>
/**
 * Если в localStorage есть данные, то может быть показать окно с вопросом о продолжении заполнения
 * доработать цвета у кнопок, поля в профиле
 * пагинацию и выбор полей для показа в админке
 * 
 */
import { onMounted } from 'vue';
	const appointStore = useAppointmentStore();
	const showAsk = ref(false);
	
	const nextStep = () => {
		appointStore.nextStep();
	};

	const prevStep = () => {
		appointStore.prevStep();
	};

	onMounted(() => {
		if(!localStorage.getItem('appointment')) {
			appointStore.setStep('1');
		}

		if(appointStore.isSaved) {
			showAsk.value = true;
		}
	});
</script>