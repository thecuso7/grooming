import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        role: null,
    }),
    actions: {
        async checkAuth() {
            console.log('cccccc');
            try {
                const token = useCookie('accessToken').value;

                console.log('accessToken', token);
                const data = await $fetch('/api/auth/check-auth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.isAuthenticated = true;
                this.role = data.payload.role;
            } catch(err) {
                try {
                    console.log('refresh');

                    const { refreshToken } = useRefreshToken();
                    const { payload } = await refreshToken();

                    this.role = payload.role;
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