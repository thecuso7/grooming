<template>
	<div>
		<div class="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8 tw-mt-8" id="step-4">
            <h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Подтверждение записи</h2>
            <div class="tw-bg-green-50 tw-border-2 tw-border-green-200 tw-rounded-lg tw-p-6 tw-mb-6">
                <div class="tw-flex tw-items-center">
                    <h3 class="tw-text-lg tw-font-semibold tw-text-green-600">Готово! Запись подтверждена</h3>
                </div>
            </div>

            <div class="tw-space-y-4 tw-mb-6">
                <div class="tw-flex tw-justify-between tw-py-3">
                    <span class="tw-text-gray-600">Питомец:</span>
                    <span class="tw-font-medium">{{pet.name}} ({{pet.breed}}, {{ pet.age }} года)</span>
                </div>
                
                <div class="tw-flex tw-justify-between tw-py-3">
                    <span class="tw-text-gray-600">Услуги:</span>
                    <div class="tw-text-right">
                        <div class="tw-font-medium">{{ serviceText }}</div>
                        <div class="tw-text-sm tw-text-gray-600">{{ totalPartsTime }}</div>
                    </div>
                </div>
                
                <div class="tw-flex tw-justify-between tw-py-3">
                    <span class="tw-text-gray-600">Дата и время:</span>
                    <span class="tw-font-medium">{{ dateToShow }}</span>
                </div>
                
                <div class="tw-flex tw-justify-between tw-py-3">
                    <span class="tw-text-gray-600">Клиент:</span>
                    <span class="tw-font-medium">{{ client.user.name }} {{ client.user.lastName }}</span>
                </div>
                
                <div class="tw-flex tw-justify-between tw-py-3">
                    <span class="tw-text-gray-600">Телефон:</span>
                    <span class="tw-font-medium">{{ formatPhone }}</span>
                </div>

                <div class="tw-flex tw-justify-between tw-py-3 tw-border-t tw-border-gray-200 tw-pt-4">
                    <span class="tw-text-lg tw-font-semibold">Итого к оплате:</span>
                    <span class="tw-text-lg tw-text-green-600 tw-font-bold">{{ services.summ.price }} ₽</span>
                </div>
            </div>

            <div class="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
                <h4 class="tw-font-semibold tw-mb-2">Что делать дальше?</h4>
                <ul class="tw-text-sm tw-text-gray-600 tw-space-y-2">
                    <li class="tw-flex tw-items-start">
                        <span>Ожидайте SMS-напоминание за день до визита</span>
                    </li>
                    <li class="tw-flex tw-items-start">
                        <span>Приходите за 10 минут до записи</span>
                    </li>
                    <li class="tw-flex tw-items-start">
                        <span>Возьмите с собой ветеринарный паспорт</span>
                    </li>
                </ul>
            </div>

            <div class="tw-flex tw-justify-between">
                <button 
                @click="appointStore.setStep('1')"
                class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors">
                    Новая запись
                </button>
            </div>
        </div>
	</div>
</template>


<script setup>
    const emit = defineEmits(['prev-step']);

    const appointStore = useAppointmentStore();
    const authStore = useAuthStore();
    const { $api } = useNuxtApp();

    const services = appointStore.stepsData.service;
    const client = appointStore.stepsData.client;
    const pet = appointStore.stepsData.choose.pet;

    const formatDate = (val) => {
		const date = new Date(val);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

    const createShedule = async () => {
        try {
            const resp = await $api('/api/shedule', {
                method: 'POST',
                body: {
                    workDate: formatDate(client.date.day),
                    beginAt: client.date.slot.beginAt,
                    finishAt: client.date.slot.finishAt,
                    data: appointStore.stepsData,
                    user: authStore.isAuthenticated ? authStore.user.id : null,
                },
            });

            appointStore.clearData();
        } catch(error) {
            console.log(error);
        }
    }

    await createShedule();

    const totalPartsTime = computed(() => {
		const [hours, minutes] = getPartsTime(services.summ.time);
		return hours ? `${hours} час(а) ${minutes} минут` : `${minutes} минут`;
	});

    const getPartsTime = (time) => {
        const hours = Math.trunc(time / 60);
        const minutes = time - hours * 60;

        return [hours, minutes ? (minutes < 10 ? '0' + minutes : minutes) : '00'];
    }

    const formatPhone = computed(() => {
        const phone = client.user.phone;
        return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} - ${phone.slice(6, 10)}`
    });

    const dateToShow = computed(() => {
        const date = new Date(client.date.day);
        const day = date.toLocaleString('default', { month: 'long', day: 'numeric' });

        return `${day}, ${client.date.slot.beginAt} - ${client.date.slot.finishAt}`;
    });

    const serviceText = computed(() => {
        const text = services.selected.reduce((sumText, item, index) => {
            if(index == services.selected.length - 1) {
                return sumText + `${item.title}`;
            } else {
                return sumText + ` ${item.title} + `;
            }
        }, '');

        return text;
    });
</script>