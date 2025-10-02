import { Pet } from "~/server/models";
import { writeFile } from 'fs/promises'

export const PetManager = {
	async getById(event, id, fields = '') {
		try {
			const pet = await Pet.findOne({id: id})
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
	async getAll(params, select = '') {
		try {
			let pagenParams = {};

			// передаем сюда правильне id в массиве
			let query = Pet.find();
			if(Object.keys(params).length && params?.id) {
				query = query.where('id').in(params.id.split(','));
			};

			if(Object.keys(params).length && params?.page) {
				const page = parseInt(params.page);
				const limit = 10;
				const skip = (page - 1) * limit;

				query = query.skip(skip)
							 .limit(limit);

				const totalCount = await Pet.countDocuments({});

				pagenParams = {
					totalCount: totalCount,
					totalPages: Math.ceil(totalCount / limit)
				};
			}

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
	async create(event, fields, files) {
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

			const pet = await Pet.create(fields);
	
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
	async update(event, fields, files) {
		try {
			if(Object.keys(files).length) {
				const timestamp = Date.now();
				const extension = files.image.filename.split('.').pop();
				const filename = `${timestamp}.${extension}`;
				const filePath = `public/uploads/${filename}`;

				await writeFile(filePath, files.image.data);

				fields.image = `/uploads/${filename}`;
			}

			const pet = await Pet.findOneAndUpdate({id: fields.id}, fields);
	
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
};