import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        role: null,
        token: '', // client token
    }),
    actions: {
        async checkAuth() {
            const { refreshToken } = useRefreshToken();
            
            try {
                if(!this.token) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'Токен не валиден',
                    });
                }
                const data = await $fetch('/api/auth/check-auth', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                this.isAuthenticated = true;
                this.role = data.payload.role;
                this.user = {
                    name: data.payload.name,
                    id: data.payload.uid,
                    role: data.payload.role
                };
            } catch(err) {
                try {
                    const { newToken, payload } = await refreshToken();
                    this.role = payload.role;
                    this.isAuthenticated = true;
                    this.token = newToken;
                    this.user = {
                        name: payload.name,
                        id: payload.uid,
                        role: payload.role
                    };
                } catch(refreshError) {
                    this.logout();

                    return false;
                }
            }

            return true;
        },
        async logout() {
            await $fetch('/api/auth/logout');

            this.user = null;
            this.isAuthenticated = false;
            this.token = '';
        },
        setAccessToken(token) {
            this.token = token;
        }
    },
})