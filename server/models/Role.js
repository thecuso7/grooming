import mongoose from 'mongoose';

export const defaultRoles = [
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f7a',
    code: 'admin', 
    level: 1,
    permissions: ['all']
  },
  { 
    _id: '661c0a1b8f1a2b3c4d5e6f7b',
    code: 'user', 
    level: 2,
    permissions: ['read', 'write']
  }
];

const roleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  permissions: {
    type: [String]
  }
});

export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);