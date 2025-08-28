import { useAuthStore } from "~/stores/auth";

//Доработать!!!

export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAdminRoute = to.path.startsWith('/admin/') || to.path === '/admin';
    const protectedRoutes = ['/dashboard', '/profile', '/settings', '/login'];

    if(protectedRoutes.includes(to.path) || isAdminRoute) {
        const { $pinia } = useNuxtApp();
        const authStore = useAuthStore($pinia);
        
        if (authStore.isAuthenticated) return;
        try {
            const success = await authStore.checkAuth();

            if(success) {
                if(authStore.role == 'user') {
                    if(to.path == '/login' || isAdminRoute) {
                        return navigateTo('/profile');
                    }
                    return;
                }

                if(authStore.role == 'admin') {
                    if(to.path == '/login') {
                        return navigateTo('/admin');
                    }
                    return;
                }
            } else {
                return to.path == '/login' ? true : navigateTo('/login');
            }
        } catch (error) {
            return navigateTo('/login');
        }
    }
});
