<template>
	<div>
		<transition
			enter-active-class="tw-transform tw-ease-out tw-duration-300 tw-transition"
			enter-from-class="tw-translate-y-8 tw-opacity-0"
			enter-to-class="tw-translate-y-0 tw-opacity-100"
			leave-active-class="tw-transition tw-ease-in tw-duration-200"
			leave-from-class="tw-opacity-100"
			leave-to-class="tw-opacity-0"
		>
			<div class="tw-fixed tw-bottom-4 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-z-50">
				<div class="tw-flex tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded tw-relative tw-min-w-64" role="alert">
					<span class="tw-block">{{ errorStore.globalErrors }}</span>
					<span @click="close" class="tw-px-4 tw-flex tw-items-center">
						<svg class="tw-fill-current tw-h-5 tw-w-5 tw-text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
						</svg>
					</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
	const errorStore = useErrorStore();

	const close = () => {
		errorStore.setGlobalErrors('');
	}
</script>