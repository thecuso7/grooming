<template>
	<div>
		<div class="tw-mb-8">
			<div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
				<template v-for="(step, index) in appointStore.steps">
					<div
						class="tw-flex-1 tw-text-center cursor-pointer">
						<div
							:class="{'!tw-bg-custom-olive': index <= appointStore.currentStep}"
							class="tw-w-8 tw-h-8 tw-mx-auto tw-rounded-full tw-bg-gray-300 tw-text-white tw-flex tw-items-center tw-justify-center">{{ index }}</div>
						<p class="tw-text-sm tw-mt-2 tw-font-medium">{{step}}</p>
					</div>
					<div 
						v-if="Object.keys(appointStore.steps).length > index"
						:class="{'!tw-bg-custom-olive': index <= appointStore.currentStep}"
						class="tw-h-1 tw-bg-gray-300 tw-flex-1"
					></div>
				</template>
			</div>
		</div>
	</div>
</template>


<script setup>
	const appointStore = useAppointmentStore();
</script>