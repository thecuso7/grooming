import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
    state: () => ({
        fieldErrors: {},
        globalErrors: 'Системная ошибка'
    }),
    actions: {
        setFieldError(field, message) {
            this.fieldErrors[field] = message;
        },
        setGlobalErrors(error) {
            this.globalErrors = error;
        },
        clearErrors() {
            this.fieldErrors = {};
            this.globalErrors = [];
        }
    },
});