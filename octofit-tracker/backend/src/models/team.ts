import mongoose, { Document, Schema } from 'mongoose';

export interface Team extends Document {
  name: string;
  description: string;
  createdAt: Date;
  memberIds: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<Team>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const TeamModel = mongoose.model<Team>('Team', teamSchema);
