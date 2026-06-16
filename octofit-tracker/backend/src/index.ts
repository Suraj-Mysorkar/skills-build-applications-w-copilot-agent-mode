import mongoose from 'mongoose';
import { createApp } from './app';

const app = createApp();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
