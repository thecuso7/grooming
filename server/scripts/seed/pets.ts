import { Pet, defaultPets } from "~/server/models/Pet";

export default async function seedPets() {
	for (const petItem of defaultPets) {
		const exists = await Pet.findOne({ id: petItem.id });
		if (!exists) {
			await Pet.create(petItem);
		}
	}
}