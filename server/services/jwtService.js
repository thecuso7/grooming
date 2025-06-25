import jwt from 'jsonwebtoken'

// зделать проверку при авторизации и сделать разлогин.
// Добавить админку
// начать делать вывод статей через ssr

export const JwtService = {
	create(user) { // если функция объявлена ассинхронной, то она возвращает promise
		const runtimeConfig = useRuntimeConfig()
	
		const token = jwt.sign(
			{ userId: user._id.toString() },
			runtimeConfig.jwtAccessSecret,
			{ expiresIn: runtimeConfig.jwtAccessLife }
		)
	
		const refresh = jwt.sign(
			{ userId: user._id.toString() },
			runtimeConfig.jwtRefreshSecret,
			{ expiresIn: runtimeConfig.jwtRefreshLife }
		)

		return { token, refresh };
	},
	refresh(data) {
		 // Логика для создания токена
		const newToken = data.token; // Пример получения токена из переданных данных
		// Здесь вы можете добавить логику, например, сохранение токена в БД
		return { message: 'Token refreshed', token: newToken };

		// Добавляем сущность refresh токенов, которые связываем с пользователем, по связи (хотя её вроде нет), или по id в записи
		// Получаем токен и проверяем, есть ли он среди доступных для пользователя токенов. Если есть, то всё ок
	},
	async clear(data) {
		// Логика для создания токена
		const newToken = data.token; // Пример получения токена из переданных данных
		// Здесь вы можете добавить логику, например, сохранение токена в БД
		return { message: 'Token cleared', token: newToken };

		// Удаляем токены из базы, что делать с
	},
	verify(token) {
		const runtimeConfig = useRuntimeConfig();
		const decoded = jwt.verify(token, runtimeConfig.jwtAccessSecret);

		return decoded;
	}
};