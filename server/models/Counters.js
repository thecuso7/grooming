import mongoose from 'mongoose';

export const defaultCounters = [
  { 
    _id: 'user_id',
    seq: 1,
  },
  { 
    _id: 'service_id',
    seq: 12,
  },
  {
    _id: 'pet_id',
    seq: 0,
  },
];

const countersSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
});

export const Counters = mongoose.models.Counters || mongoose.model('Counters', countersSchema);