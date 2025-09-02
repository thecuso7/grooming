export const useRefreshToken = () => {
    const refreshToken = async () => {
        const { newToken, payload } = await $fetch('/api/auth/refresh');
        return { newToken, payload };
    }

    return { refreshToken };
}
