import mongoose from 'mongoose';
import seedRoles from './roles.js';
import seedCounters from './counters.js';
import seedService from './services.js';
import seedShedule from './shedule.js';
import seedUsers from './users.js';

async function runSeed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grooming');
        
        console.log('🌱 Starting database seeding...');
        
        await seedRoles();
        console.log('✅ Roles seeded');
        
        await seedCounters();
        console.log('✅ Counters seeded');
        
        await seedUsers();
        console.log('✅ Users seeded');
        
        await seedService();
        console.log('✅ Services seeded');
        
        await seedShedule();
        console.log('✅ Schedule seeded');
        
        console.log('🎉 All seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

runSeed();