import mongoose from 'mongoose';

export const defaultShedule = [
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1a',
    workDate: '2025-11-23',
    beginAt: '08:30',
    finishAt: '09:00',
    beginAtMinutes: 510,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1b',
    workDate: '2025-11-25',
    beginAt: '09:00',
    finishAt: '11:15',
    beginAtMinutes: 540,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1c',
    workDate: '2025-11-25',
    beginAt: '11:30',
    finishAt: '14:00',
    beginAtMinutes: 690,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1d',
    workDate: '2025-11-26',
    beginAt: '14:30',
    finishAt: '16:00',
    beginAtMinutes: 870,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1e',
    workDate: '2025-11-26',
    beginAt: '08:30',
    finishAt: '10:45',
    beginAtMinutes: 510,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f2a',
    workDate: '2025-11-27',
    beginAt: '13:30',
    finishAt: '15:15',
    beginAtMinutes: 810,
    data: {},
    user: null,
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f2b',
    workDate: '2025-11-28',
    beginAt: '08:30',
    finishAt: '10:30',
    beginAtMinutes: 510,
    data: {},
    user: null,
  },
];

const sheduleSchema = new mongoose.Schema({
  workDate: {
    type: String,
  },
  beginAt: {
    type: String,
  },
  beginAtMinutes: {
    type: Number,
  },
  finishAt: {
    type: String,
  },
  data: {
    type: Object,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

export const Shedule = mongoose.models.Shedule || mongoose.model('Shedule', sheduleSchema);