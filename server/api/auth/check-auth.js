import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const token = getCookie(event, 'accessToken');
    let isValid = false;

    if(token) {
        try {
            isValid = JwtService.verifyAccess(token);
        } catch(err) {
            // deleteCookie(event, 'accessToken');

            // Обновить токен по refresh
            const refresh = getCookie(event, 'refreshToken');
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

            isValid = true;
        }
    }

    return { isAuthenticated: isValid }
})