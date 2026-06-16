import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardEntry extends Document {
  teamId: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardEntry>({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export const LeaderboardModel = mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
