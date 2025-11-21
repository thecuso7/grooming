import { JwtManager } from "~/server/managers/jwtManager";

export default defineEventHandler((event) => {
	JwtManager.clear(event);
	return true;
});