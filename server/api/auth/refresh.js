import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const refresh = getCookie(event, 'refreshToken');

    try {
        const { newToken, newRefresh } = JwtService.refresh(refresh);

        setCookie(event, 'accessToken', newToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60*60*24*30
        })

        setCookie(event, 'refreshToken', newRefresh, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60*60*24*30
        })
    } catch(err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка создания токена',
        });
    }
        
    return { isAuthenticated: true }
})