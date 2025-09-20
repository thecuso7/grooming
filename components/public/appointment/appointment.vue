<template>
	<div>
		<progress-bar></progress-bar>
		<choose-pet v-if="appointStore.currentStep == 'choose'"></choose-pet>
		<service v-if="appointStore.currentStep == 'service'"></service>
		<client v-if="appointStore.currentStep == 'client'"></client>
		<applying v-if="appointStore.currentStep == 'applying'"></applying>
	</div>
</template>


<script setup>
	const appointStore = useAppointmentStore();
	/**
	 * 
	 * Как сохранять состояние шагов при его обновлении, тоже посмотреть
	 */
</script>