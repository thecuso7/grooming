import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const fields = 'id name lastName email roleId';
	const { userList, totalCount, totalPages } = await UserManager.getList(query, fields);

	return { userList, totalCount, totalPages };
});