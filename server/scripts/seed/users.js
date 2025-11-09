import { User } from "~/server/models";
import { defaultUsers } from "~/server/models/User";

export default async function seedUsers() {
    for (const userData of defaultUsers) {
        const exists = await User.findById(userData._id);
        if (!exists) {
            await User.create(userData);
        }
    }
}