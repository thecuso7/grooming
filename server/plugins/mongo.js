import mongoose from 'mongoose';
import seedRoles from "~/server/scripts/seed/roles";

// сиды ещё в какой-то централизованный сервис вынести

export default defineNitroPlugin(async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/grooming');
        console.log('connect');

        await seedRoles();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Остановите приложение, если подключение не удалось
    }
});