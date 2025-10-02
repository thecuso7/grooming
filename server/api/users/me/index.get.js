import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const id = event.context.auth.uid;
	const select = 'id name lastName email pets';

	const user = await UserManager.getById(event, id, select);
	return user;
});