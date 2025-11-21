import { JwtManager } from "~/server/managers/jwtManager";

const publicRoutes = {
    '/api/services':['GET'],
    '/api/common/types':['GET'],
    '/api/shedule':['GET', 'POST'],
    '/api/auth/logout':['GET'],
};

export default defineEventHandler((event) => {
    const { url, method } = event.node.req;
    if (!url?.startsWith('/api/')) {
        return
    }

    const isPublicRoute = Object.entries(publicRoutes).some(([path, methods]) => {
        const regex = new RegExp('^' + path.replace(/:\w+/g, '[^/]+') + '$');
        return regex.test(url) && methods.includes(method);
    });

    if(isPublicRoute) return;

    if(
        url == '/api/auth/refresh' ||
        url == '/api/auth/login' ||
        url == '/api/auth/register' ||
        url == '/api/auth/check-auth' ||
        url == '/api/config/test' ||
        url == '/api/pets'
    ) {
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
        const payload = JwtManager.verifyAccess(token);
        event.context.auth = payload;
    } catch(err) {
        throw createError({
            statusCode: 401,
            data: {
                message: 'Токен не валиден',
            }
        });
    }

    return;
})