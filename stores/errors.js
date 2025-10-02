import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
    state: () => ({
        fieldErrors: {},
        globalErrors: '',
    }),
    actions: {
        setFieldError(field, message) {
            this.fieldErrors[field] = message;
        },
        setGlobalErrors(error) {
            this.globalErrors = error;

            setTimeout(() => {
                this.globalErrors = '';
            }, 2000);
        },
        clearErrors() {
            this.fieldErrors = {};
            this.globalErrors = [];
        }
    },
});