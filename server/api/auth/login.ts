import { AuthManager } from "~/server/managers/authManager";
import { JwtManager } from "~/server/managers/jwtManager";

export default defineEventHandler(async (event) => {
	const {email, password} = await readBody(event)
	const user = await AuthManager.login(event, email, password);
	const { token, refresh } = JwtManager.create(user);

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
});