import mongoose from 'mongoose';
import seedRoles from "~/server/scripts/seed/roles";
import seedCounters from "~/server/scripts/seed/counters";
import seedService from "~/server/scripts/seed/services";

// сиды ещё в какой-то централизованный сервис вынести

export default defineNitroPlugin(async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/grooming');
        
        await seedRoles();
        await seedCounters();
        await seedService();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Остановите приложение, если подключение не удалось
    }
});