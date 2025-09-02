import { getUserList } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	const usersData = await getUserList(event);

	let userList = [];
	
	usersData.forEach(user => {
		userList.push({
			id: user._id,
			name: user.name,
			lastName: user.lastName,
			email: user.email,
		})
	});

	return userList;
});