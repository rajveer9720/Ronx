import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'ronx';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log(`Using cached MongoDB connection to database: ${DB_NAME}`);
    return { db: cached.conn.connection.db };  // Return the actual db object
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/${DB_NAME}`).then((mongoose) => {
      console.log(`Successfully connected to MongoDB database: ${DB_NAME}`);
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return { db: cached.conn.connection.db };  // Return the actual db object
}

export { connectToDatabase, DB_NAME };
