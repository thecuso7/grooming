import { Counters, defaultCounters } from "~/server/models/Counters";

export default async function seedCounters() {
    for (const counter of defaultCounters) {
        const exists = await Counters.findById(counter._id);
        if (!exists) {
            await Counters.create(counter);
        }
    }
}