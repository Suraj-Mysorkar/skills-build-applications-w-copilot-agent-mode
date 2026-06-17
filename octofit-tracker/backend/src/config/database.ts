import mongoose from 'mongoose';

const DATABASE_NAME = 'octofit_db';
const DEFAULT_PORT = 27017;
const DEFAULT_HOST = '127.0.0.1';

export function getDatabaseUrl(): string {
  const mongoUrl =
    process.env.MONGODB_URI || `mongodb://${DEFAULT_HOST}:${DEFAULT_PORT}/${DATABASE_NAME}`;
  return mongoUrl;
}

export async function connectDatabase(): Promise<void> {
  const mongoUrl = getDatabaseUrl();
  
  try {
    await mongoose.connect(mongoUrl);
    console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB at ${mongoUrl}`, error);
    throw error;
  }
}

export function disconnectDatabase(): Promise<void> {
  return mongoose.disconnect();
}

export default {
  getDatabaseUrl,
  connectDatabase,
  disconnectDatabase
};
