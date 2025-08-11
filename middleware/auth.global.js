
// import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const protectedRoutes = ['/dashboard', '/profile', '/settings', '/login'];
    
    if(protectedRoutes.includes(to.path)) {
        // const { $pinia } = useNuxtApp();
        // const authStore = useAuthStore($pinia); // почему так

        const { data, error } = await useFetch('/api/auth/check-auth');
        
        if (error.value || !data.value?.isAuthenticated) {
            return navigateTo('/login');
        } else {
             if(to.path == '/login') {
                return navigateTo('/profile');
            }
        }
    }
});
