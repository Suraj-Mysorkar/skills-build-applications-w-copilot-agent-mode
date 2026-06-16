import mongoose, { Document, Schema } from 'mongoose';

export interface Workout extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  createdAt: Date;
  coachId?: mongoose.Types.ObjectId;
}

const workoutSchema = new Schema<Workout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  estimatedDuration: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
  coachId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);
