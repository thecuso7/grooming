import { RegService } from "~/server/services/regService";

export default defineEventHandler(async (event) => {
	try {
		const credentials = await readBody(event)
		const result = await RegService.register(event, credentials);

		return result;
	} catch(error) {
		throw error;
	}
})