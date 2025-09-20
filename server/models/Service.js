import mongoose from 'mongoose';
import { defaultTypeServices } from './TypeService';

export const defaultServices = [
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f1a',
    id: 1,
    title: 'Услуга 1',
    bundle: [],
    description: '',
    duration: '30 минут',
    price: '5000',
    type: '661c0a1b8f1a2b3c4d5e6f6a',
    required: false,
  },
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f1b',
    id: 2,
    title: 'Услуга 2',
    bundle: [],
    description: '',
    duration: '35 минут',
    price: '5500',
    type: '661c0a1b8f1a2b3c4d5e6f6a',
    required: false,
  },
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f1c',
    id: 3,
    title: 'Услуга 3',
    bundle: [],
    description: '',
    duration: '40 минут',
    price: '6000',
    type: '661c0a1b8f1a2b3c4d5e6f6a',
    required: false,
  }
];

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bundle: { // если выбран комплекс
    type: Array,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeService',
    required: true,
    default: defaultTypeServices[0]._id
  },
  required: {
    type: Boolean,
    default: false,
  }
});

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);