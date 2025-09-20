import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const fields = await readBody(event);
	const resUpdate = ServiceManager.update(event, fields);
	return true;
});