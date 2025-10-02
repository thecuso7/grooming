export default defineNuxtPlugin((event) => {
  let isRefreshing = false;
  let refreshPromise = null;
  const { refreshToken } = useRefreshToken();

  const $api = $fetch.create({
    onRequest: ({ request, options, error }) => {
        const authStore = useAuthStore();
        const token = authStore.token;

        if(token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }
    },
    async onResponseError({ request, response, options }) {
        if(response.status == 401 && useCookie('refreshToken').value) {
            if(isRefreshing && refreshPromise) {
                try {
                    const { newToken } = await refreshPromise;
                    return $fetch(request.toString(), {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${newToken}`
                        }
                    });
                } catch(error) {
                    throw error;
                }
            } else if (!isRefreshing) {
                refreshPromise = refreshToken();
                isRefreshing = true;
                
                try {
                    const { newToken } = await refreshPromise;
                    return $fetch(request.toString(), {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${newToken}`
                        }
                    });
                } catch(error) {
                    throw error;
                }
            }
        }
        
        const errorStore = useErrorStore();

        if(response._data.data.code == 'INTERNAL_ERROR') {
            errorStore.setGlobalErrors(response._data.data.message);
        }

        const error = new Error(response._data.data?.message || 'Неизвестная ошибка');
        error.statusCode = response.status;
        error.data = response._data.data;
        
        throw error;
    }
  })

  return {
    provide: {
        api: $api
    }
  };
});