import { defaultNews, News } from "~/server/models/News";

export default async function seedShedule() {
    let exists = null;

    for (const newItem of defaultNews) {
        exists = await News.findById(newItem._id);
        if (!exists) {
            await News.create(newItem);
        }
    }
}