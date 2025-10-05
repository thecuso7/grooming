import { defineStore } from "pinia";

export const useAppointmentStore = defineStore('appointment', () => {
    const isSaved = ref(JSON.parse(localStorage.getItem('appointment') !== null));
    const stepsData = reactive(JSON.parse(localStorage.getItem('appointment'))?.stepsData || {choose: {}, service: {}, client: {}});
    const currentStep = ref(JSON.parse(localStorage.getItem('appointment'))?.step || '1');
    const steps = {
        1: 'Питомец',
        2: 'Услуги',
        3: 'Данные',
        4: 'Подтверждение',
    };

    let timeout;

    const sheduleSave = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            localStorage.setItem('appointment', JSON.stringify({stepsData: stepsData, step: currentStep.value}));
            isSaved.value = true;
        }, 1000);
    };

    const updateData = (type, data) => {
        Object.assign(stepsData[type], data);
        sheduleSave();
    }

    const clearData = () => {
        stepsData.choose = {};
        stepsData.service = {};
        stepsData.client = {};

        isSaved.value = false;
        localStorage.removeItem('appointment');
    }

    const setStep = (step) => {
        currentStep.value = step;
    }

    const nextStep = () => {
        const stepsKey = Object.keys(steps);
        const currentIndex = stepsKey.indexOf(currentStep.value);

        if (currentIndex === -1 || currentIndex === stepsKey.length - 1) {
            return null;
        }

        setStep(stepsKey[currentIndex + 1]);
    }

    const prevStep = () => {
        const stepsKey = Object.keys(steps);
        const currentIndex = stepsKey.indexOf(currentStep.value);

        setStep(stepsKey[currentIndex - 1]);
    }

    return { stepsData, steps, currentStep, isSaved, updateData, nextStep, prevStep, sheduleSave, clearData, setStep };
});