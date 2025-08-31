import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const header = getHeader(event, 'Authorization');
    const token = header?.replace('Bearer', '');

    console.log('token', token);

    try {
        
        const { newToken, newRefresh, payload } = JwtService.refresh(token);

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
        
    return { newToken, payload };
})