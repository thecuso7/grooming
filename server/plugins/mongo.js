import mongoose from 'mongoose';
import seedRoles from "~/server/scripts/seed/roles";
import seedCounters from "~/server/scripts/seed/counters";
import seedService from "~/server/scripts/seed/services";
import seedShedule from "~/server/scripts/seed/shedule";
import seedUsers from "~/server/scripts/seed/users";

let isLoadedSeed = false;

export default defineNitroPlugin(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/grooming');

        if(!isLoadedSeed) {
            await seedRoles();
            await seedCounters();
            await seedUsers();
            await seedService();
            await seedShedule();

            isLoadedSeed = true;
        }
        
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
});