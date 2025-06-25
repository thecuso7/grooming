import { getUser } from "~/server/utils/user";
import bcrypt from 'bcryptjs';

// отдельные методы есть для пользователя типа get create delete update

// логические которые связаны с сущностью auth: login, destroy, unlogin

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
};