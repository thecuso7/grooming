export const useRefreshToken = () => {
    const refreshToken = async () => {
        
        console.log('process', process);
        const token = useCookie('refreshToken').value;
        console.log('composable', useCookie('refreshToken'));

        const { newToken, payload } = await $fetch('/api/auth/refresh', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return { newToken, payload };
    }

    return { refreshToken };
}
