import { createApp } from './app';
import { connectDatabase } from './config/database';

const app = createApp();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
