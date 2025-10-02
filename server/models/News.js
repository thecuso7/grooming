import mongoose from 'mongoose';

export const defaultNews = [
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1a',
    workDate: '2025-09-29',
    beginAt: '08:30',
    finishAt: '09:00',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1b',
    workDate: '2025-09-30',
    beginAt: '09:00',
    finishAt: '11:15',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1c',
    workDate: '2025-09-30',
    beginAt: '11:30',
    finishAt: '14:00',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1d',
    workDate: '2025-10-01',
    beginAt: '14:30',
    finishAt: '16:00',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f1e',
    workDate: '2025-10-02',
    beginAt: '08:30',
    finishAt: '10:45',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f2a',
    workDate: '2025-10-02',
    beginAt: '13:30',
    finishAt: '15:15',
    data: {},
  },
  {
    _id: '661c0a1b8f1a2b3c4d4e6f2b',
    workDate: '2025-10-05',
    beginAt: '08:30',
    finishAt: '10:30',
    data: {},
  },
];

const newsSchema = new mongoose.Schema({
  workDate: {
    type: String,
  },
  beginAt: {
    type: String,
  },
  finishAt: {
    type: String,
  },
  data: {
    type: Object,
  },
});

export const News = mongoose.models.News || mongoose.model('News', newsSchema);