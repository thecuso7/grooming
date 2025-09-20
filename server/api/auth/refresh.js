import { JwtManager } from "~/server/managers/jwtManager";

export default defineEventHandler((event) => {
    const token = getCookie(event, 'refreshToken');
    const { newToken, newRefresh, payload } = JwtManager.refresh(token);

    setCookie(event, 'refreshToken', newRefresh, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/api/auth/refresh',
        maxAge: 60*60*24*30
    })

    return { newToken, payload };
});