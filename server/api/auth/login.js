import { AuthService } from "~/server/services/authService";
import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler(async (event) => {
	try {
		const {email, password} = await readBody(event)
		const user = await AuthService.login(event, email, password);
		const { token, refresh } = JwtService.create(user);

		if(!token || !refresh) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Ошибка создания токена',
			});
		}

		setCookie(event, 'refreshToken', refresh, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/api/auth/refresh',
			maxAge: 60*60*24*30
		});

		 return { redirect: user.role == 'user' ? '/profile' : '/admin', token: token };
	} catch(error) {
		throw error;
	}
});