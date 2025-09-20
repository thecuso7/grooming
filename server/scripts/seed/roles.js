import { Role } from "~/server/models";
import { defaultRoles } from "~/server/models/Role";

export default async function seedRoles() {
    for (const roleData of defaultRoles) {
        const exists = await Role.findById(roleData._id);
        if (!exists) {
            await Role.create(roleData)
        }
    }
}