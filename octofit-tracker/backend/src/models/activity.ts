import mongoose, { Document, Schema } from 'mongoose';

export interface Activity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
  notes?: string;
}

const activitySchema = new Schema<Activity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  performedAt: { type: Date, default: () => new Date(), required: true },
  notes: { type: String }
});

export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
