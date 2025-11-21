import { ServiceManager } from "~/server/managers/serviceManager";
import { type Service } from "~/types/Service";

export default defineEventHandler(async (event) => {
	const body = await readBody<Service>(event);
	const { id } = await ServiceManager.create(event, body);
	
	return id;
});