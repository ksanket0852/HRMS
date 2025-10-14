const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

module.exports = { prisma, connectMongoDB };
