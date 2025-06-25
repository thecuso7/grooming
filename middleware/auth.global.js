
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
    
    if(protectedRoutes.includes(to.path) && process.server) {
        const { $pinia } = useNuxtApp();
        const authStore = useAuthStore($pinia); // почему так
        // const token = useRequestHeader('authorization')?.split(' ')[1];
        // console.log('token', token);
        
        if (!authStore.accessToken) {
            return navigateTo('/login');
        }

        try {
            const decoded = require(JwtService).verify(authStore.accessToken);

            console.log('decoded', decoded);
            
            // Проверяем не просрочен ли
            // event.context.user = decoded; // Сохраните декодированные данные пользователя в контексте
        } catch (err) {
            return navigateTo('/login');
            // throw createError({ statusCode: 401, statusMessage: 'Неверный токен' });
        }
    }
});
