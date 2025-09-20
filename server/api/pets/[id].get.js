import { PetManager } from "~/server/managers/petManager";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const pet = await PetManager.getById(event, id);

	return pet;
});