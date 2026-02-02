import { Pet, User } from "~/server/models";
import { getNextSequence, minusSequence } from "~/server/utils/dbConnect";

export const resolvers = {
    Query: {
        pets: async() => {
            const list = await Pet.find().select('');
            return list;
        },
        pet: async(_, { id }) => {
            const pet = await Pet.findOne({id: id}).select('');
            return pet;
        },
        user: async(_, { id }) => {
            const user = await User.findOne({_id: id}).select('');
            return user;
        },
        petsByUid: async(_, { uid }) => {
            const petList = await Pet.find({userId: uid}).select('');
            return petList;
        },
        usersByIds: async(_, { ids }) => {
            const userList = await User.find({_id: ids}).select('');
            return userList;
        }
    },
    Mutation: {
        createPet: async (_, { input }) => {
            // Загрузку картинок отложил

            // if(Object.keys(files).length) {
            //     const timestamp = Date.now();
            //     const extension = files.image.filename.split('.').pop();
            //     const filename = `${timestamp}.${extension}`;
            //     const filePath = `public/uploads/${filename}`;

            //     await writeFile(filePath, files.image.data);

            //     fields.image = `/uploads/${filename}`;
            // }

            const petData = { ...input };
            petData.id = await getNextSequence('pet_id');

            const pet = await Pet.create(petData);
            return pet;
        },
        updatePet: async (_, { id, input }) => {
            // if(Object.keys(files).length) {
            //     const timestamp = Date.now();
            //     const extension = files.image.filename.split('.').pop();
            //     const filename = `${timestamp}.${extension}`;
            //     const filePath = `public/uploads/${filename}`;

            //     await writeFile(filePath, files.image.data);

            //     fields.image = `/uploads/${filename}`;
            // }

            const pet = await Pet.findOneAndUpdate({id: id}, input, {new: true});
    
            if (!pet?._id.toString()) {
                return null;
            }
    
            return pet;
        }
    },
    User: {
        pets: async(user) => {
            const petList = await Pet.find({userId: user._id}).select('');
            return petList;
        }
    },
};
