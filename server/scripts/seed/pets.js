import { Pet } from "~/server/models/Pet";

const generateItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Pet ${i + 1}`,
    weight: `20`,
  }))
}

export default async function seedPets() {
    const defaultPets = generateItems(10000);

    for (const petItem of defaultPets) {
        const exists = await Pet.findById(petItem._id);
        if (!exists) {
            await Pet.create(petItem);
        }
    }
}