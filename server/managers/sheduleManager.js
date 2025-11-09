import { Shedule } from "~/server/models";

export const SheduleManager = {
	async getAll(params, select = '') {
		try {
			const list = await Shedule.find().select(select).sort({ beginAtMinutes: 1 });

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