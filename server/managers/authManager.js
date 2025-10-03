import bcrypt from 'bcryptjs';
import { JwtManager } from "~/server/managers/jwtManager";
import { UserManager } from "~/server/managers/userManager";

export const AuthManager = {
	async login(event, email, password) {
		const user = await UserManager.get(event, email);

		if (!user) {
			throw createError({
				statusCode: 401,
				data: {
					code: 'AUTH_INVALID_CREDENTIALS',
					message: 'Неверный email или пароль',
					fields: ['email', 'password']
				}
			});
		}

		if(!await bcrypt.compare(password, user.password)) {
			throw createError({
				statusCode: 401,
				data: {
					code: 'AUTH_INVALID_CREDENTIALS',
					message: 'Неверный email или пароль',
					fields: ['email', 'password']
				}
			});
		}

		return user;
	},
	async unlogin() {
		JwtManager.clear();
	}
};