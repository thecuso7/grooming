import mongoose from 'mongoose';

let dbConn;

async function connectToDatabase() {
    await mongoose.connect('mongodb://127.0.0.1:27017/grooming');
}

export { connectToDatabase };