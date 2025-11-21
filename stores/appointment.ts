import { defineStore } from "pinia";
import { type ServiceStep } from "~/types/ServiceStep";
import { type StepsData } from "~/types/StepsData";
import { type Choose } from "~/types/Choose";
import { type Client } from "~/types/Client";

interface LoadedData {
    isSaved: Boolean,
    steps: StepsData,
    step: string,
}

const getStepsData = (): LoadedData => {
    try {
        const data = localStorage.getItem('appointment');
        if (!data || !JSON.parse(data)?.stepsData) {
            return {
                isSaved: false,
                steps: {choose: null, service: null, client: null},
                step: '1',
            };
        }
        
        return JSON.parse(data)?.stepsData;
    } catch {
        return {
            isSaved: false,
            steps: {choose: null, service: null, client: null},
            step: '1',
        };
    }
}

export const useAppointmentStore = defineStore('appointment', () => {
    const loadedData = getStepsData();
    const isSaved = ref(loadedData.isSaved);
    const stepsData = reactive(loadedData.steps);
    const currentStep = ref(loadedData.step);

    const steps = {
        1: 'Питомец',
        2: 'Услуги',
        3: 'Данные',
        4: 'Подтверждение',
    };

    let timeout: NodeJS.Timeout;

    const sheduleSave = () => {
        clearTimeout(timeout);  
        timeout = setTimeout(() => {
            localStorage.setItem('appointment', JSON.stringify({stepsData: stepsData, step: currentStep.value}));
            isSaved.value = true;
        }, 1000);
    };

    const updateData = <T extends keyof StepsData>(type: T, data: StepsData[T]) => {
        if(data) {
            if(stepsData[type] === null) {
                stepsData[type] = data;
            } else {
                Object.assign(stepsData[type], data);
            }       
            
            sheduleSave();
        }
    }

    const clearData = () => {
        stepsData.choose = null;
        stepsData.service = null;
        stepsData.client = null;

        isSaved.value = false;
        localStorage.removeItem('appointment');
    }

    const setStep = (step: string) => {
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

    return {
        stepsData,
        steps, 
        currentStep, 
        isSaved, 
        updateData, 
        nextStep, 
        prevStep, 
        sheduleSave, 
        clearData, 
        setStep 
    };
});