import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');

  try {
    await mongoose.connect(uri); // clean, modern connection
    console.log(`[✓] MongoDB connected at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error('[✗] Initial MongoDB connection failed:', err.message);
    process.exit(1); // exit process if DB fails to connect
  }

  // Optional: log disconnections and reconnections
  mongoose.connection.on('disconnected', () => {
    console.warn('[!] MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[↻] MongoDB reconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[!] MongoDB error:', err.message);
  });
}