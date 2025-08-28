import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        role: null,
    }),
    actions: {
        async checkAuth() {
            try {
                const token = useCookie('accessToken').value;
                const data = await $fetch('/api/auth/check-auth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.isAuthenticated = true;
                this.role = data.payload.role;
            } catch(err) {
                try {
                    // Здесь заменяем на вызов composable
                    const data = await $fetch('/api/auth/refresh');

                    this.role = data.payload.role;
                    this.isAuthenticated = true;
                } catch(refreshError) {
                    this.logout();

                    return false;
                }
            }

            return true;
        },
        logout() {
            this.user = null;
            this.isAuthenticated = false;
        }
    },
})