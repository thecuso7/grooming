// import dbConnect from '../../utils/dbConnect'; // Импортируйте функцию подключения к базе данных
// import { User } from '../../models/User'; // Импортируйте вашу модель пользователя
// import authMiddleware from '../../middleware/auth'; // Импортируйте ваше middleware

// export default defineEventHandler(async (event) => {
//     await dbConnect(); // Подключение к базе данных

//     await authMiddleware(event); // Примените middleware для проверки аутентификации

//     // Теперь, если аутентификация прошла успешно, вы можете обработать запрос
//     const userId = event.context.user.id; // Получите ID пользователя из контекста
//     const user = await User.findById(userId); // Получите пользователя из базы данных

//     if (!user) {
//         throw createError({ statusCode: 404, statusMessage: 'Пользователь не найден' });
//     }

//     return { message: 'Доступ к защищенному ресурсу', user };
// });
