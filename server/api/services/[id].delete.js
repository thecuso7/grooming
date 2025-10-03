import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	await ServiceManager.delete(event, id);
	
	return;
});