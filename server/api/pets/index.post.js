import { PetManager } from "~/server/managers/petManager";

export default defineEventHandler(async (event) => {
	const parts = await readMultipartFormData(event);
	if (!parts) {
		throw createError({ statusCode: 400, message: 'No form data' })
	}

	const { fields, files } = parseFormData(parts);
	const pet = await PetManager.create(event, fields, files);
	
	return { id: pet.id };
});