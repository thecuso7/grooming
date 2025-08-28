import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if(!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Доступ запрещен',
        });
    }

    try {
        payload = JwtService.verifyAccess(token);
        event.content.auth = payload;
    } catch(err) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Токен не валиден',
        });
    }
})