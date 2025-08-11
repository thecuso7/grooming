import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/grooming');
        console.log('connect');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Остановите приложение, если подключение не удалось
    }
});