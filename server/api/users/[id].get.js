import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const fields = 'id name lastName email createdAt updatedAt roleId pets';

	const user = await UserManager.getByNumId(event, id, fields);
	return user;
});