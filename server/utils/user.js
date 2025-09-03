import { User } from "~/server/models";
import bcrypt from 'bcryptjs';

export async function getUser(event, email) { //по email
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
        const userData = await User.findOne({_id: id}).populate('roleId');

        if (!userData?._id.toString()) {
            return null;
        }

        const user = {
            id: userData._id.toString(),
            role: userData.roleId.code,
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email
        };

        return user;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при запросе к базе данных',
        });
    }
}

// Проверяем роль пользователя на сайте, чтобы пропустить его или нет

export async function updateUser(event, id, role, data) {
    try {
        let user;

        if(role == 'user') {
            user = await User.findOneAndUpdate({_id: id}, {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
            });
        }

        if(role == 'admin') {
            // Здесь в дате роль будет передаваться автоматически
            // Роль передаем записываем и пароль перехешируем, потому что пришел обычный
            user = await User.findOneAndUpdate({_id: id}, {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                password: '123',
                role: data.role
            });
        }
        

        if (!user?._id.toString()) {
            return null;
        }

        return true;
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