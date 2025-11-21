import { ServiceManager } from "~/server/managers/serviceManager";
import { type Service } from "~/types/Service";

export default defineEventHandler(async (event) => {
	const fields = await readBody<Service>(event);
	const resUpdate = ServiceManager.update(event, fields);
	return true;
});