import { useAuthStore } from "~/stores/auth";

//Доработать!!!

// Всегда проверять на валидность и наличие токена, потому что в шапке
export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAdminRoute = to.path.startsWith('/admin/') || to.path === '/admin';
    const protectedRoutes = ['/dashboard', '/profile', '/settings', '/login'];

    const { $pinia } = useNuxtApp();
    const authStore = useAuthStore($pinia);
    
    if (authStore.isAuthenticated) return;
    try {
        const success = await authStore.checkAuth();

        if(protectedRoutes.includes(to.path) || isAdminRoute) {
            if(success) {
                if(authStore.user.role == 'user') {
                    if(to.path == '/login' || isAdminRoute) {
                        return navigateTo('/profile');
                    }
                    return;
                }

                if(authStore.user.role == 'admin') {
                    if(to.path == '/login') {
                        return navigateTo('/admin');
                    }
                    return;
                }
            } else {
                return to.path == '/login' ? true : navigateTo('/login');
            }
        }
    } catch (error) {
        if(protectedRoutes.includes(to.path) || isAdminRoute) {
            return navigateTo('/login');
        }
    }
});
