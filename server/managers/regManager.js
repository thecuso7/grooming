import { UserManager } from "~/server/managers/userManager";

export const RegManager = {
	async register(event, credentials) {
		const user = await UserManager.get(event, credentials.email);

		if (user) {
			throw createError({
				statusCode: 409,
				data: {
					code: 'DUPLICATE_ENTRY',
					message: 'Данный email уже используется',
					fields: ['email']
				}
			});
		}

		const result = await UserManager.create(event, credentials, 'register');

		return {
			register: 'success',
			id: result.id,
		}
	},
};