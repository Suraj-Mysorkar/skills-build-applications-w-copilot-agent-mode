import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models';

// Seed the octofit_db database with test data
async function seed() {
  const connectionString = 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(connectionString);
  console.log('Connected to MongoDB for seeding octofit_db.');

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Ava Sinclair',
      email: 'ava.sinclair@example.com',
      passwordHash: 'hashed-password-1',
      role: 'member',
      joinedAt: new Date('2025-11-01T09:10:00Z')
    },
    {
      name: 'Mateo Ramos',
      email: 'mateo.ramos@example.com',
      passwordHash: 'hashed-password-2',
      role: 'coach',
      joinedAt: new Date('2025-10-15T14:22:00Z')
    },
    {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      passwordHash: 'hashed-password-3',
      role: 'member',
      joinedAt: new Date('2025-12-05T07:40:00Z')
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      passwordHash: 'hashed-password-4',
      role: 'admin',
      joinedAt: new Date('2024-04-20T08:25:00Z')
    }
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Sunrise Sprinters',
      description: 'A high-energy team focused on interval training and morning runs.',
      createdAt: new Date('2025-10-20T08:00:00Z'),
      memberIds: [users[0]._id, users[2]._id]
    },
    {
      name: 'Core Champions',
      description: 'Dedicated to strength, mobility, and balanced recovery routines.',
      createdAt: new Date('2024-11-05T16:30:00Z'),
      memberIds: [users[1]._id]
    }
  ]);

  await UserModel.updateMany(
    { _id: { $in: [users[0]._id, users[2]._id] } },
    { $set: { teamId: teams[0]._id } }
  );
  await UserModel.updateOne(
    { _id: users[1]._id },
    { $set: { teamId: teams[1]._id } }
  );

  const workouts = await WorkoutModel.insertMany([
    {
      title: 'Morning HIIT Blast',
      description: 'A 20-minute interval workout to kickstart energy and burn calories.',
      difficulty: 'intermediate',
      estimatedDuration: 20,
      createdAt: new Date('2025-11-10T06:00:00Z'),
      coachId: users[1]._id
    },
    {
      title: 'Strength & Mobility Flow',
      description: 'Focused muscle-building and mobility exercises for full-body balance.',
      difficulty: 'beginner',
      estimatedDuration: 35,
      createdAt: new Date('2025-10-25T12:00:00Z'),
      coachId: users[1]._id
    }
  ]);

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'Running',
      durationMinutes: 32,
      caloriesBurned: 360,
      performedAt: new Date('2026-06-14T06:30:00Z'),
      notes: 'Morning interval session with a strong finish.'
    },
    {
      userId: users[2]._id,
      type: 'Yoga',
      durationMinutes: 45,
      caloriesBurned: 190,
      performedAt: new Date('2026-06-13T18:15:00Z'),
      notes: 'Recovery yoga focused on hips and shoulders.'
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      durationMinutes: 50,
      caloriesBurned: 520,
      performedAt: new Date('2026-06-12T07:00:00Z'),
      notes: 'Outdoor endurance ride with some sprints.'
    }
  ]);

  await LeaderboardModel.insertMany([
    {
      teamId: teams[0]._id,
      score: 4320,
      rank: 1,
      updatedAt: new Date('2026-06-15T10:00:00Z')
    },
    {
      teamId: teams[1]._id,
      score: 3780,
      rank: 2,
      updatedAt: new Date('2026-06-15T10:00:00Z')
    }
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded workouts:', workouts.length);
  console.log('Seeded activities:', await ActivityModel.countDocuments());
  console.log('Seeded leaderboard entries:', await LeaderboardModel.countDocuments());

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding.');
}

seed().catch((error) => {
  console.error('Failed to seed octofit_db database with test data', error);
  process.exit(1);
});
