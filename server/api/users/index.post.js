import { UserManager } from "~/server/managers/userManager";

// Создание пользователя

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const resUpdate = UserManager.update(event, body, 'admin');
	return true;
});