import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { id } = await UserManager.create(event, body, 'admin');
	return id;
});