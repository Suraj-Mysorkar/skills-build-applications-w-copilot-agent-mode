import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'member' | 'coach' | 'admin';
  joinedAt: Date;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, default: () => new Date() },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export const UserModel = mongoose.model<User>('User', userSchema);
