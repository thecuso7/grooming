import { JwtManager } from "~/server/managers/jwtManager";

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

    // подумать, что с jwt
    try {
        payload = JwtManager.verifyAccess(token);
    } catch(err) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Токен не валиден',
        });
    }

    return { isAuthenticated: true, payload };
})