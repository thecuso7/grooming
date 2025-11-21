import { type QueryObject } from "ufo";
import { Service as ServiceModel } from "~/server/models";
import { TypeService as TypeServiceModel } from "~/server/models";
import type { H3Event, EventHandlerRequest } from 'h3';
import { type Service } from "~/types/Service";
import { type TypeService } from "~/types/TypeService";

export const ServiceManager = {
	async getById(event: Event, id: string, select = '') {
		try {
			const service = await ServiceModel.findOne({id: id})
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
	async getAll(params: QueryObject, select = ''): Promise<{list: Service[], pagenParams: any}> {
		try {
			let pagenParams = {};

			let query = ServiceModel.find()
							   .select(select)
							   .populate('type');

			if(Object.keys(params).length && params?.page) {
				
				const page = parseInt(params.page as string);
				const limit = 10;
				const skip = (page - 1) * limit;

				query = query.skip(skip)
							 .limit(limit);

				const totalCount = await ServiceModel.countDocuments({});

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
	async getTypes(): Promise<TypeService[]> {
		try {
			const list = await TypeServiceModel.find().sort('sort');
	
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
	async create(event: H3Event<EventHandlerRequest>, data: Service) {
		try {
			data.id = await getNextSequence('service_id');
			const service = await ServiceModel.create(data);
	
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
	async update(event: H3Event<EventHandlerRequest>, fields: Service) {
		try {
			const service = await ServiceModel.findOneAndUpdate({id: fields.id}, fields);
	
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
	async delete(event: H3Event<EventHandlerRequest>, id: string) {
		try {
			await ServiceModel.deleteOne({id: id});
			await minusSequence('service_id');
		} catch(error) {
			throw createError({
				statusCode: 500,
				data: {
					code: 'INTERNAL_ERROR',
					message: 'Внутренняя ошибка сервера!'
				}
			});
		}
	}
};