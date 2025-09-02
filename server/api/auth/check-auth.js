import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const header = getHeader(event, 'Authorization');
    const token = header?.replace('Bearer ', '');
    let payload = {};

    if(!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Токен не валиден',
        });
    }

    try {
        payload = JwtService.verifyAccess(token);
    } catch(err) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Токен не валиден',
        });
    }

    return { isAuthenticated: true, payload };
})