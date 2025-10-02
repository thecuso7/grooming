import { defaultShedule, Shedule } from "~/server/models/Shedule";

export default async function seedShedule() {
    let exists = null;

    for (const record of defaultShedule) {
        exists = await Shedule.findById(record._id);
        if (!exists) {
            await Shedule.create(record);
        }
    }
}