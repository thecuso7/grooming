export default defineNuxtPlugin((event) => {
  let isRefreshing = false;
  let refreshPromise = null;
  const { refreshToken } = useRefreshToken();

  const $api = $fetch.create({
    onRequest: ({ request, options, error }) => {
        const token = useCookie('accessToken').value;

        console.log('кастомный api');

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
    }
  })
})