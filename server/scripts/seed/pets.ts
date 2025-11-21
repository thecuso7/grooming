import { Pet } from "~/server/models/Pet";

const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: Number(i) + 1,
    name: `Pet ${i + 1}`,
    weight: `20`,
  }))
}

export default async function seedPets() {
    const defaultPets = generateItems(10);

    for (const petItem of defaultPets) {
        const exists = await Pet.findOne({ id: petItem.id });
        if (!exists) {
            await Pet.create(petItem);
        }
    }
}