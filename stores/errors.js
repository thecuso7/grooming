import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
    state: () => ({
        globalErrors: '',
    }),
    actions: {
        setGlobalErrors(error) {
            this.globalErrors = error;

            setTimeout(() => {
                this.globalErrors = '';
            }, 5000);
        },
        clearErrors() {
            this.globalErrors = [];
        }
    },
});