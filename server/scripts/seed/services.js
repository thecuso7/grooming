import { TypeService, defaultTypeServices } from "~/server/models/TypeService";
import { Service, defaultServices } from "~/server/models/Service";

export default async function seedService() {
    let exists = null;
    for (const type of defaultTypeServices) {
        exists = await TypeService.findById(type._id);
        if (!exists) {
            await TypeService.create(type);
        }
    }

    for (const service of defaultServices) {
        exists = await Service.findById(service._id);
        if (!exists) {
            await Service.create(service);
        }
    }
}