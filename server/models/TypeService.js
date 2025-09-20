import mongoose from 'mongoose';

export const defaultTypeServices = [
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f6a',
    title: 'Основные',
    code: 'main',
    description: '',
  },
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f6b',
    title: 'Дополнительные',
    code: 'additional',
    description: '',
  },
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f6c',
    title: 'Комплекс',
    code: 'complex',
    description: '',
  }
];

const typeServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export const TypeService = mongoose.models.TypeService || mongoose.model('TypeService', typeServiceSchema);