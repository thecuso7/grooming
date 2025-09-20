import { UserManager } from "~/server/managers/userManager";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const fields = 'id name lastName email roleId';
	const { userList, totalCount, totalPages } = await UserManager.getList(query, fields);

	// let userList = [];
	
	// list.forEach(user => {
	// 	userList.push({
	// 		id: user._id,
	// 		name: user.name,
	// 		lastName: user.lastName,
	// 		email: user.email,
	// 		role: user.roleId.code,
	// 		// пароли не показываем
	// 	})
	// });

	return { userList, totalCount, totalPages };
});