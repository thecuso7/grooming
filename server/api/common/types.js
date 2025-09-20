import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	const typeList = await ServiceManager.getTypes();

	return typeList;
});