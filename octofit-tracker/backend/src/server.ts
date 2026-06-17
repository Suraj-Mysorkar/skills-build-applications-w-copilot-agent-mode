import express from 'express';
import { connectDatabase } from './config/database';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models';

export function createServer() {
  const app = express();
  app.use(express.json());

  const port = process.env.PORT ? Number(process.env.PORT) : 8000;
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/', (_, res) => {
    res.send('OctoFit Tracker backend is running.');
  });

  app.get('/api/config', (_, res) => {
    res.json({ apiUrl, codespaceName: codespaceName || null });
  });

  app.get('/api/users', async (_, res) => {
    const users = await UserModel.find().select('-passwordHash').lean();
    res.json({ data: users });
  });

  app.post('/api/users', async (req, res) => {
    const user = await UserModel.create(req.body);
    const created = user.toObject();
    delete created.passwordHash;
    res.status(201).json({ data: created });
  });

  app.get('/api/teams', async (_, res) => {
    const teams = await TeamModel.find().populate('memberIds', 'name email role').lean();
    res.json({ data: teams });
  });

  app.post('/api/teams', async (req, res) => {
    const team = await TeamModel.create(req.body);
    res.status(201).json({ data: team });
  });

  app.get('/api/activities', async (_, res) => {
    const activities = await ActivityModel.find().populate('userId', 'name email').lean();
    res.json({ data: activities });
  });

  app.post('/api/activities', async (req, res) => {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json({ data: activity });
  });

  app.get('/api/leaderboard', async (_, res) => {
    const leaderboard = await LeaderboardModel.find().sort('rank').populate('teamId', 'name').lean();
    res.json({ data: leaderboard });
  });

  app.get('/api/workouts', async (_, res) => {
    const workouts = await WorkoutModel.find().populate('coachId', 'name email').lean();
    res.json({ data: workouts });
  });

  app.post('/api/workouts', async (req, res) => {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json({ data: workout });
  });

  return app;
}

export async function startServer() {
  const app = createServer();
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;

  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on http://0.0.0.0:${port}`);
  });
}
