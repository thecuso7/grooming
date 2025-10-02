import mongoose from 'mongoose';
import seedRoles from "~/server/scripts/seed/roles";
import seedCounters from "~/server/scripts/seed/counters";
import seedService from "~/server/scripts/seed/services";
import seedShedule from "~/server/scripts/seed/shedule";
import seedNews from "~/server/scripts/seed/news";

const isConnected = () => {
    return mongoose.connection.readyState === 1;
}

export default defineNitroPlugin(async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/grooming');
        
        if(isConnected()) {
            return;
        }

        await seedRoles();
        await seedCounters();
        await seedService();
        await seedShedule();
        await seedNews();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
});