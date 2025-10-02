import { SheduleManager } from "~/server/managers/sheduleManager";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { list } = await SheduleManager.getAll(query);

	return { list };
});