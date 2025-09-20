import mongoose from 'mongoose';

/**
 * Продумать взаимосвязи между питомцами и пользователем
 * 
 */
const petSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  breed: {
    type: String,
  },
  weight: {
    type: String,
  },
  features: {
    type: String,
  },
});

export const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);