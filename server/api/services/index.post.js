import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { id } = await ServiceManager.create(event, body);
	
	return id;
});