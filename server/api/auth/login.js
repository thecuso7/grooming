import { AuthService } from "~/server/services/authService";
import { JwtService } from "~/server/services/jwtService";

export default defineEventHandler(async (event) => {
	try {
		const {email, password} = await readBody(event)
		const user = await AuthService.login(event, email, password);

		const { token, refresh } = JwtService.create(user);

		console.log('create', refresh);

		if(!token || !refresh) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Ошибка создания токена',
			});
		}

		//Как работает кука в сервере node
		setCookie(event, 'accessToken', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/',
			maxAge: 60*60*24*30
		})

		setCookie(event, 'refreshToken', refresh, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/',
			maxAge: 60*60*24*30
		})

		// где-то мы должны проверять роль пользователя на сайте


		 return { redirect: '/profile' };

		return {
			access: token,
		}
	} catch(error) {
		throw error;
	}
});