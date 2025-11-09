import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { list, pagenParams } = await ServiceManager.getAll(query);

	return { list, pagenParams };
});