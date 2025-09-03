import { updateUser } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const id = event.context.auth.uid;
	const role = event.context.auth.role;

	const resUpdate = updateUser(event, id, role, body);
});