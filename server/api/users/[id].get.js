import { getUserList } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	console.log('event.content.auth', event.content.auth);
	console.log('id get', id);

	const userList = await getUserList(event);
	console.log(userList);
	// Получаем данные пользователя и проверяем запрос с куками или ещё чем-то
});