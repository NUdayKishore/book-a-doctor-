import mongoose from 'mongoose';

/**
 * Connect to MongoDB (local or Atlas)
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-a-doctor';

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('\n========================================');
    console.error('MongoDB Connection Failed');
    console.error('========================================');
    console.error(error.message);
    console.error('\nFix options:');
    console.error('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.error('2. Use MongoDB Atlas (free): https://www.mongodb.com/atlas');
    console.error('   Then set MONGODB_URI in server/.env');
    console.error('3. Make sure the backend is started: npm run dev (from project root)');
    console.error('========================================\n');
    process.exit(1);
  }
};

export default connectDB;
