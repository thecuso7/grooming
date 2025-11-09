import { SheduleManager } from "~/server/managers/sheduleManager";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const shedule = await SheduleManager.create(event, body);
	
	return shedule;
});