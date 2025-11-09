import { RegManager } from "~/server/managers/regManager";

export default defineEventHandler(async (event) => {
	const credentials = await readBody(event)
	const result = await RegManager.register(event, credentials);

	return result;
})