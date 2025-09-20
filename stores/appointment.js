import { defineStore } from "pinia";

export const useAppointmentStore = defineStore('appointment', () => {
    const isSaved = ref(JSON.parse(localStorage.getItem('appointment') !== null));
    const stepsData = reactive(JSON.parse(localStorage.getItem('appointment')) || {choose: {}, service: {}, client: {}});
    const currentStep = ref('choose');
    const steps = ['choose', 'service', 'client', 'applying'];

    let timeout;

    const sheduleSave = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Почему и как это работает? Почему ассинхронная операция кладется в стек  выполенния на ожидание, а console.log выполняется сразу
            localStorage.setItem('appointment', JSON.stringify(stepsData));
        }, 3000);
    };

    const updateData = (type, data) => {
        Object.assign(stepsData[type], data);
        sheduleSave();
    }

    const setStep = (step) => {
        console.log('step', step);
        currentStep.value = step;

        console.log('step', currentStep.value);
    }

    const nextStep = () => {
        const currentIndex = steps.indexOf(currentStep.value);
        if (currentIndex === -1 || currentIndex === steps.length - 1) {
            return null
        }

        console.log('currentIndex', steps[currentIndex + 1]);
        setStep(steps[currentIndex + 1]);
    }

    return { stepsData, currentStep, isSaved, updateData, nextStep };
});