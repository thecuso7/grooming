import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const service = await ServiceManager.getById(event, id);
	
	return service;
});