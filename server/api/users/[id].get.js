import { getUserList } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	console.log('[id]');
	const id = getRouterParam(event, 'id');
	console.log('event.content.auth', event.context.auth);
	console.log('id get', id);


	//Обернуть как-то

	const userList = await getUserList(event);
	// Получаем данные пользователя и проверяем запрос с куками или ещё чем-то
});