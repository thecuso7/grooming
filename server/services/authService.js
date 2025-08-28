import { getUser } from "~/server/utils/user";
import bcrypt from 'bcryptjs';
import { useAuthStore } from "~/stores/auth";
import { JwtService } from "~/server/services/jwtService";

export const AuthService = {
	async login(event, email, password) {
		try {
			const user = await getUser(event, email);

			if (!user) {
				throw createError({
					statusCode: 404,
					statusMessage: 'Такого пользователя не существует',
				});
			}

			if(!await bcrypt.compare(password, user.password)) {
				throw createError({
					statusCode: 401,
					statusMessage: 'Неверный пароль',
				});
			}

			return user;
		} catch(error) {
			if (error.statusCode) {
				setResponseStatus(event, error.statusCode);
				throw error;
			}

			throw createError({
				statusCode: 500,
				statusMessage: 'Ошибка при входе',
			});
		}
	},
	async unlogin(event, userId) {
		const authStore = useAuthStore($pinia);
		authStore.logout();
		JwtService.clear();
	}
};