import { defineStore } from "pinia";
import type { User } from "~/types/user";

interface State {
    user: User | null,
    isAuthenticated: boolean,
    token: string | null
};

type CheckAuthResponse = {
    isAuthenticated: boolean,
    payload: {
        name: string,
        uid: string,
        role: string
    }
}

export const useAuthStore = defineStore('auth', {
        state: (): State => ({
            user: null,
            isAuthenticated: false,
            token: null, // client token
        }),
    actions: {
        async checkAuth(): Promise<boolean> {
            const { refreshToken } = useRefreshToken();
            
            try {
                if(this.token === null) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'Токен не валиден',
                    });
                }

                const data = await $fetch<CheckAuthResponse>('/api/auth/check-auth', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                this.isAuthenticated = data.isAuthenticated;
                this.user = {
                    name: data.payload.name,
                    id: data.payload.uid,
                    role: data.payload.role
                };
            } catch(err) {
                try {
                    const { newToken, payload } = await refreshToken();
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
            this.token = null;
        },
        setAccessToken(token: string) {
            this.token = token;
        }
    },
})