import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler((event) => {
    console.log('middleware api');
    // сделать исключение для  обновления refresh
    if (!event.node.req.url?.startsWith('/api/')) {
        return
    }

    if(event.node.req.url == '/api/auth/refresh' || event.node.req.url == '/api/auth/login') {
        return;
    }

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