import mongoose from 'mongoose';
import { defaultRoles } from './Role';

export const defaultUsers = [
  {
    "_id": "68dd3b4bf6fe557d9ba79c4b",
    "id": 1,
    "name": "Иван",
    "lastName": "Иванов",
    "email": "admin@admin.ru",
    "password": "$2a$10$e6OKHzQBVSRyLOKfrUy04er62N.RDEWLtlQNBg4UvdM4MZkLWXDGe",
    "roleId": "661c0a1b8f1a2b3c4d5e6f7a",
    "pets": [],
  }
];

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    default: defaultRoles[1]._id
  },
  pets: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);