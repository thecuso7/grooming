import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function create(data) {
    const token = jwt.sign(
        { userId: 12 }, // как из mongo получить идентификтор записи
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_LIFE }
    )

    const tokenRefresh = jwt.sign(
        { userId: 12 }, // как из mongo получить идентификтор записи
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_LIFE }
    )

    // Здесь вы можете добавить логику, например, сохранение токена в БД
    return { access: token, refresh: tokenRefresh };
}

export async function refresh(data) {
    // Логика для создания токена
    const newToken = data.token; // Пример получения токена из переданных данных
    // Здесь вы можете добавить логику, например, сохранение токена в БД
    return { message: 'Token refreshed', token: newToken };

    // Добавляем сущность refresh токенов, которые связываем с пользователем, по связи (хотя её вроде нет), или по id в записи
    // Получаем токен и проверяем, есть ли он среди доступных для пользователя токенов. Если есть, то всё ок
}

export async function clear(data) {
    // Логика для создания токена
    const newToken = data.token; // Пример получения токена из переданных данных
    // Здесь вы можете добавить логику, например, сохранение токена в БД
    return { message: 'Token cleared', token: newToken };

    // Удаляем токены из базы, что делать с
}