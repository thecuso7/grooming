<template>
	<div id="modal" class="tw-inset-0 tw-flex tw-items-center tw-justify-center tw-p-4">
        <div class="tw-bg-white tw-rounded-2xl tw-shadow-xl tw-max-w-md tw-w-full tw-overflow-hidden">
            <!-- Заголовок -->
            <div class="tw-p-6 tw-bg-custom-purple">
                <div class="tw-flex tw-items-center tw-space-x-3">
                    <div class="tw-bg-custom-accent tw-p-2 tw-rounded-full">
                        <svg class="tw-w-6 tw-h-6 tw-text-[#634f63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                    </div>
                    <h2 class="tw-text-xl tw-font-semibold tw-text-gray-900">Продолжить запись?</h2>
                </div>
            </div>

            <!-- Контент -->
            <div class="tw-p-6">
                <p class="tw-text-gray-600 tw-leading-relaxed">
                    Мы заметили, что вы уже пытались записаться на груминг для вашего питомца. 
                    Хотите продолжить с того места, где остановились, или начать запись заново?
                </p>
                
                <!-- Прогресс предыдущей записи -->
                <div class="tw-mt-6 tw-bg-gray-50 tw-rounded-lg tw-p-4">
                    <div class="tw-flex tw-justify-between tw-text-sm tw-text-gray-600">
                        <span>Прогресс записи:</span>
                        <span>{{ stepProgress.text }}</span>
                    </div>
                    <div class="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2 tw-mt-2">
                        <div class="tw-bg-[#634f63] tw-h-2 tw-rounded-full" :style="`width: ${stepProgress.percent}%`"></div>
                    </div>
                </div>
            </div>

            <!-- Кнопки -->
            <div class="tw-p-6 tw-bg-gray-50 tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
                <button @click="continueShedule()" class="tw-bg-custom-olive tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-flex-1">
                    Продолжить запись
                </button>
                <button @click="startNewShedule()" class="tw-border tw-border-gray-300 tw-text-gray-700 tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium hover:tw-bg-gray-100 tw-transition-colors tw-flex-1">
                    Начать заново
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
    const appointStore = useAppointmentStore();
    const emit = defineEmits(['hide-ask']);

    const continueShedule = () => {
        emit('hide-ask');
    };

    const stepProgress = computed(() => {
        const lenStep = Object.keys(appointStore.steps).length;
        return {text: `${appointStore.currentStep} из ${lenStep}`, percent: appointStore.currentStep/lenStep*100};
    })

    const startNewShedule = () => {
        appointStore.clearData();
        appointStore.setStep('1');
        emit('hide-ask');
    };  
</script>