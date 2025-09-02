import { User } from "~/server/models";
import bcrypt from 'bcryptjs';

export async function getUser(event, email) {
    try {
        const data = await User.findOne({email}).populate('roleId');

        if (!data?._id.toString()) {
            return null;
        }

        const user = {
            id: data._id.toString(),
            role: data.roleId.code,
            password: data.password
        };

        return user;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
        });
    }
}

export async function getUserById(event, id) {
    try {
        const data = await User.findOne({_id: id});

        if (!data?._id.toString()) {
            return null;
        }

        const user = {
            id: data._id.toString(),
            role: data.roleId.code,
            password: data.password
        };

        return user;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
        });
    }
}

export async function getUserList(event) {
    try {
        const data = await User.find();

        return data;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
        });
    }
}

export async function createUser(event, data) {
    try {
        const { name, lastName, email } = data;
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await User.create({ name, lastName, email, password: hashedPassword });

        if(!result) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Ошибка создания пользователя',
            });
        }

        return result;

    } catch(error) {
        if (error.statusCode) {
            throw error;
        }
    }
}