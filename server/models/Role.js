import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Role = mongoose.models.Role || mongoose.model('Role ', roleSchema);

export default Role;