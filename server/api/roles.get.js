import { RoleManager } from "~/server/managers/roleManager";

export default defineEventHandler(async (event) => {
    const roles = await RoleManager.getAll();
    
    return roles;
});