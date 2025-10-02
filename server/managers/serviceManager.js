import { Service } from "~/server/models";
import { TypeService } from "~/server/models";

export const ServiceManager = {
	async getById(event, id, select = '') {
		try {
			const service = await Service.findOne({id: id})
								.select(select);
	
			if (!service?._id.toString()) {
				return null;
			}
	
			return service;
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
	async getAll(params, select = '') {
		try {
			let pagenParams = {};

			let query = Service.find()
							   .select(select)
							   .populate('type');

			if(Object.keys(params).length && params?.page) {
				const page = parseInt(query.page);
				const limit = 10;
				const skip = (page - 1) * limit;

				query = query.skip(skip)
							 .limit(limit);

				const totalCount = await Service.countDocuments({});

				pagenParams = {
					totalCount: totalCount,
					totalPages: Math.ceil(totalCount / limit)
				};
			}

			const list = await query;

			return { list, pagenParams };
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
	async getTypes() {
		try {
			const list = await TypeService.find().sort('sort');
	
			return list;
		} catch (error) {
			throw createError({
				statusCode: 500,
				data: {
					code: 'INTERNAL_ERROR',
					message: 'Внутренняя ошибка сервера!',
				}
			});
		}
	},
	async create(event, data) {
		try {
			data.id = await getNextSequence('service_id');
			const service = await Service.create(data);
	
			return { id: service.id };
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
	async update(event, fields) {
		try {
			const service = await Service.findOneAndUpdate({id: fields.id}, fields);
	
			if (!service?._id.toString()) {
				return null;
			}
	
			return true;
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