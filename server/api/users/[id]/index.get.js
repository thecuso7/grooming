export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	console.log(id);
	// Получаем данные пользователя и проверяем запрос с куками или ещё чем-то
});