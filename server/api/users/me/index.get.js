import { getUserById } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	const id = event.context.auth.uid;
	//Обернуть как-то

	const user = await getUserById(event, id);
	return user;
	// Получаем данные пользователя и проверяем запрос с куками или ещё чем-то
});