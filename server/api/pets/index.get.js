import { PetManager } from "~/server/managers/petManager";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { list, pagenParams } = await PetManager.getAll(query);

	return { list, pagenParams };
});