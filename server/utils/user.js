import User from "~/server/models/User";
import bcrypt from 'bcryptjs';

export async function getUser(event, email) {
    try {
        const user = await User.findOne({email});
        // Какие ошибкии возвращает mongoose

        return user;
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
        console.log('data', data);
        const hashedPassword = await bcrypt.hash(data.password, 10);

        console.log('hashedPassword', hashedPassword);
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