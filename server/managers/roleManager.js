import { Role } from "~/server/models";

export const RoleManager = {
	async getAll() {
		try {
			const list = await Role.find()
									.select('_id name');	
	
			return list;
		} catch (error) {
			throw createError({
				statusCode: 500,
				data: {
					code: 'INTERNAL_ERROR',
					message: 'Внутренняя ошибка сервера!'
				}
			});
		}
	},
};