import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	await UserManager.delete(event, id);

	return;
});