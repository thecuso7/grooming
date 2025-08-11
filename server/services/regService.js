import { getUser, createUser } from "~/server/utils/user";


export const RegService = {
	async register(event, credentials) {
		try {
			const user = await getUser(event, credentials.email)

			if (user?._id.toString()) {
				throw createError({
					statusCode: 400,
					statusMessage: 'Такой пользователь уже существует',
				});
			}

			const result = await createUser(event, credentials);

			return {
				register: 'success',
				id: result._id.toString(),
			}
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