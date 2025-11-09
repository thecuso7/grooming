<template>
	<div>
		<div>
			<h2 class="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-font-heading">Активные записи</h2>
		</div>
		<div v-if="sheduleList.length" class="tw-space-y-4">
			<div v-for="shedule in sheduleList" class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-border-l-4 tw-border-custom-olive">
				<div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between md:tw-items-start tw-gap-4">
					<div class="tw-flex-1">
						<div class="tw-text-md tw-font-semibold tw-text-gray-900 tw-mb-2">
							{{ serviceText(shedule.data.service.selected) }}
						</div>
						<div class="tw-grid tw-grid-cols-1 tw-gap-2 tw-text-sm">
							<div class="tw-flex tw-items-center tw-gap-2">
								<svg class="tw-w-4 tw-h-4 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
								</svg>
								<span class="tw-font-medium">Питомец:</span>
								<span>{{ shedule.data.choose.pet.name }} ({{ shedule.data.choose.pet.breed }})</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-2">
								<svg class="tw-w-4 tw-h-4 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
								<span class="tw-font-medium">Дата:</span>
								<span>{{ formatDate(shedule.workDate) }}</span>
							</div>
							<div class="tw-flex tw-items-center tw-gap-2">
								<svg class="tw-w-4 tw-h-4 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								<span class="tw-font-medium">Время:</span>
								<span>{{ shedule.data.client.date.slot.beginAt }} - {{ shedule.data.client.date.slot.finishAt }}</span>
							</div>
						</div>
					</div>
					<div class="tw-flex tw-flex-col tw-items-end tw-gap-3">
						<div class="tw-text-right">
							<div class="tw-text-xl tw-font-bold tw-text-gray-900">{{ shedule.data.service.summ.price }} ₽</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="tw-text-center tw-py-12">
			<svg class="tw-w-16 tw-h-16 tw-text-gray-300 tw-mx-auto tw-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
			</svg>
			<h3 class="tw-text-lg tw-font-medium tw-text-gray-900 tw-mb-2">Нет активных записей</h3>
			<p class="tw-text-gray-500 tw-mb-6">У вас пока нет записей на груминг</p>
			<RouterLink class="tw-bg-custom-btn tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium" to="/appointment">Записаться</RouterLink>
		</div>
	</div>
</template>


<script setup>
	import { onMounted } from 'vue';

	const { $api } = useNuxtApp();
	const authStore = useAuthStore();

	const sheduleList = ref([]);

	const formatDate = (dateString) => {
        const date = new Date(dateString);
		const year = date.getFullYear();
		const day = date.toLocaleString('default', { month: 'long', day: 'numeric' });

		return `${day} ${year}`;
    }

	const serviceText = (services) => {
        const text = services.reduce((sumText, item, index) => {
            if(index == services.length - 1) {
                return sumText + `${item.title}`;
            } else {
                return sumText + ` ${item.title} + `;
            }
        }, '');

        return text;
    };

	onMounted(async() => {
		const { list: list } = await $api(`/api/shedule?user=${authStore.user.id}`);
        sheduleList.value = list;
	});
</script>