import { Shedule } from "~/server/models";

export const SheduleManager = {
	async getAll(params, select = '') {
		try {
			let query = Shedule.find();

			if(Object.keys(params).length && params?.user) {
				query = query.where('user').equals(params.user);
			};

			const list = await query.select(select);

			return { list };
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
	async create(event, fields) {
		try {
			const shedule = await Shedule.create(fields);
	
			return shedule;
		} catch(error) {
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