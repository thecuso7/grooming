import { getUserList } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { list, totalCount, totalPages } = await getUserList(query);

	let userList = [];
	
	list.forEach(user => {
		userList.push({
			id: user._id,
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			role: user.roleId.code,
			// пароли не показываем
		})
	});

	return { userList, totalCount, totalPages };
});