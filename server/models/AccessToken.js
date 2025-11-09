import mongoose from 'mongoose';

const accessTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true, unique: true },
  jti: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const AccessToken = mongoose.models.Role || mongoose.model('AccessToken ', accessTokenSchema);

export default AccessToken;