import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	console.log('create method');
	const body = await readBody(event);
	const service = await ServiceManager.create(event, body);
	console.log('service crate', service);
	
	return { id: service.id };
});