import { Pet as PetModel } from "~/server/models";
import { type QueryObject } from "ufo";
import { type Pet } from "~/types/Pet";
import type { H3Event, EventHandlerRequest } from 'h3';
import { writeFile } from 'fs/promises';
import { type ParsedFile } from "~/types/ParsedData";

export const PetManager = {
	async getById(event: H3Event, id: string, fields = '') {
		try {
			const pet = await PetModel.findOne({id: id})
								.select(fields);
	
			if (!pet?._id.toString()) {
				return null;
			}
	
			return pet;
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
	async getAll(params: QueryObject, select = ''): Promise<{list: Pet[], pagenParams: any}> {
		try {
			let pagenParams = {};
			let query = PetModel.find();
			if(Object.keys(params).length && params?.id && typeof params.id === 'string') {
				query = query.where('id').in(params.id.split(','));
			};

			// if(Object.keys(params).length && params?.page) {
			// 	const page = parseInt(params.page);
			// 	const limit = 10;
			// 	const skip = (page - 1) * limit;

			// 	query = query.skip(skip)
			// 				 .limit(limit);

			// 	const totalCount = await Pet.countDocuments({});

			// 	pagenParams = {
			// 		totalCount: totalCount,
			// 		totalPages: Math.ceil(totalCount / limit)
			// 	};
			// }

			const list = await query.select(select);

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
	async create(event: H3Event, fields: Pet, files: Record<string, ParsedFile>) {
		try {
			fields.id = await getNextSequence('pet_id');
			if(Object.keys(files).length) {
				const timestamp = Date.now();
				const extension = files.image.filename.split('.').pop();
				const filename = `${timestamp}.${extension}`;
				const filePath = `public/uploads/${filename}`;

				await writeFile(filePath, files.image.data);

				fields.image = `/uploads/${filename}`;
			}

			const pet = await PetModel.create(fields);
	
			return { id: pet.id };
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
	async update(event: H3Event, fields: Pet, files: Record<string, ParsedFile>) {
		try {
			if(Object.keys(files).length) {
				const timestamp = Date.now();
				const extension = files.image.filename.split('.').pop();
				const filename = `${timestamp}.${extension}`;
				const filePath = `public/uploads/${filename}`;

				await writeFile(filePath, files.image.data);

				fields.image = `/uploads/${filename}`;
			}

			const pet = await PetModel.findOneAndUpdate({id: fields.id}, fields);
	
			if (!pet?._id.toString()) {
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
	async delete(event: H3Event, id: string) {
		try {
			await PetModel.deleteOne({id: id});
			await minusSequence('pet_id');
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