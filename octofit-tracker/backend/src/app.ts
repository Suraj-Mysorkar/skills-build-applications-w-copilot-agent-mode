import express from 'express';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models';

export function createApp() {
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
    try {
      const users = await UserModel.find().select('-passwordHash').lean();
      res.json({ data: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      const created = user.toObject();
      delete created.passwordHash;
      res.status(201).json({ data: created });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  app.get('/api/teams', async (_, res) => {
    try {
      const teams = await TeamModel.find().populate('memberIds', 'name email role').lean();
      res.json({ data: teams });
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  });

  app.post('/api/teams', async (req, res) => {
    try {
      const team = await TeamModel.create(req.body);
      res.status(201).json({ data: team });
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Failed to create team' });
    }
  });

  app.get('/api/activities', async (_, res) => {
    try {
      const activities = await ActivityModel.find().populate('userId', 'name email').lean();
      res.json({ data: activities });
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  app.post('/api/activities', async (req, res) => {
    try {
      const activity = await ActivityModel.create(req.body);
      res.status(201).json({ data: activity });
    } catch (error) {
      console.error('Error creating activity:', error);
      res.status(500).json({ error: 'Failed to create activity' });
    }
  });

  app.get('/api/leaderboard', async (_, res) => {
    try {
      const leaderboard = await LeaderboardModel.find().sort('rank').populate('teamId', 'name').lean();
      res.json({ data: leaderboard });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  app.get('/api/workouts', async (_, res) => {
    try {
      const workouts = await WorkoutModel.find().populate('coachId', 'name email').lean();
      res.json({ data: workouts });
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ error: 'Failed to fetch workouts' });
    }
  });

  app.post('/api/workouts', async (req, res) => {
    try {
      const workout = await WorkoutModel.create(req.body);
      res.status(201).json({ data: workout });
    } catch (error) {
      console.error('Error creating workout:', error);
      res.status(500).json({ error: 'Failed to create workout' });
    }
  });

  return app;
}
