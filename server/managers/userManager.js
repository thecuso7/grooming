import { User } from "~/server/models";
import { getNextSequence } from "~/server/utils/dbConnect";
import bcrypt from 'bcryptjs';

export const UserManager = {
	async get(event, email) { //по email
		try {
			const data = await User.findOne({email}).populate('roleId');
	
			if (!data?._id.toString()) {
				return null;
			}
	
			const user = {
				id: data._id,
				role: data.roleId.code,
				name: data.name,
				password: data.password
			};
	
			return user;
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
	async getById(event, id, select) {
		try {
			let query = User.findOne({_id: id})
								.select(select);
			
			if(select.includes('roleId')) {
				query = query.populate({
					path: 'roleId',
					select: '_id'
				});
			}
	
			const user = await query;
	
			if (!user?._id.toString()) {
				return null;
			}

			return user;
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
	async update(event, data, source) {
		try {
			let user;

			if(source == 'profile') {
				if(data?.password) {
					const hashedPassword = await bcrypt.hash(data.password, 10);
					data.password = hashedPassword;
				}
				
				user = await User.findOneAndUpdate({_id: event.context.auth.uid}, data);
			}
	
			if(source == 'admin') {
				const updateData = {
					name: data.name,
					lastName: data.lastName,
					email: data.email,
					role: data.roleId._id
				};
	
				if(data.password) {
					updateData.password = await bcrypt.hash(data.password, 10);
				}
	
				user = await User.findOneAndUpdate({id: data.id}, updateData);
			}
	
			if (!user?._id.toString()) {
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
	async getList(query, select = '') {
		try {
			let pagenParams = {};

			const page = parseInt(query.page);
			const limit = 10;
			const skip = (page - 1) * limit;
			
			const list = await User.find()
								   .select(select)
								   .skip(skip)
								   .limit(limit)
								   .populate('roleId');
	
			const totalCount = await User.countDocuments({});

			pagenParams = {
				totalCount: totalCount,
				totalPages: Math.ceil(totalCount / limit)
			};
	
			return { userList: list, pagenParams }; // подумать над деструктуризацией
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
	async create(event, data, source) {
		try {
			const id = await getNextSequence('user_id');
			const { name, lastName, email } = data;
			const hashedPassword = await bcrypt.hash(data.password, 10);

			let result = null;
	
			if(source == 'register') {
				result = await User.create({ id, name, lastName, email, password: hashedPassword });
			}

			if(source == 'admin') {
				result = await User.create({ id, name, lastName, email, password: hashedPassword, role: data.roleId._id });
			}

			return result;
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