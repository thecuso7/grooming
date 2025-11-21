interface UseAuthOptions {
  updateValidateFromApi?: (errors: any) => void;
}

export const useAuth = (options:UseAuthOptions = {}) => {
    const authStore = useAuthStore();
	const updateValidateFromApi = options.updateValidateFromApi ?? (() => {});

    const login = async (email: string, password: string) => {
		try {
            const res = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: email,
                    password: password
                }
            });

            authStore.setAccessToken(res.token);
            navigateTo(res.redirect);
        } catch(error: any) {
            updateValidateFromApi(error.data);
        }
	}

    const register = async (name: string, lastName: string, email: string, password: string) => {
        try {
            await $fetch('/api/auth/register', {
                method: 'POST',
                body: {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                }
            });

            navigateTo('/login');
        } catch(error: any) {
            updateValidateFromApi(error.data);
        }
    }

	return { login, register };
}