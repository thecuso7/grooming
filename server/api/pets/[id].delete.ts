import { PetManager } from "~/server/managers/petManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	if(id) {
		await PetManager.delete(event, id);
	}
	

	return;
});