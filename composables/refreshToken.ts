interface RefreshTokenResponse {
  newToken: string;
  payload: {
    uid: string;
    role: string;
    name: string;
  };
}

interface UseRefreshTokenReturn {
  refreshToken: () => Promise<RefreshTokenResponse>;
}

export const useRefreshToken = (): UseRefreshTokenReturn => {
    const refreshToken = async (): Promise<RefreshTokenResponse> => {
        const { newToken, payload } = await $fetch<RefreshTokenResponse>('/api/auth/refresh');
        return { newToken, payload };
    }

    return { refreshToken };
}
