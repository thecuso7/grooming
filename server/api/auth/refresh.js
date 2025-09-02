import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const token = getCookie(event, 'refreshToken');

    try {
        const { newToken, newRefresh, payload } = JwtService.refresh(token);

        setCookie(event, 'refreshToken', newRefresh, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/api/auth/refresh',
            maxAge: 60*60*24*30
        })

        return { newToken, payload };
    } catch(err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка создания токена',
        });
    }
})