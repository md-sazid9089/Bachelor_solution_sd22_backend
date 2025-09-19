const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const maidRoutes = require('./routes/maid');
const propertyRoutes = require('./routes/property');
const shopRoutes = require('./routes/shop');
const hackRoutes = require('./routes/hack');
const healthRoutes = require('./routes/health');
const adminRoutes = require('./routes/admin');
const proxyRoutes = require('./routes/proxy');
app.use('/api/auth', authRoutes);
app.use('/api/maids', maidRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/hacks', hackRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/proxy', proxyRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Bachelor Solution API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      maids: '/api/maids',
      properties: '/api/properties',
      shops: '/api/shops',
      hacks: '/api/hacks',
      health: '/api/health',
      admin: '/api/admin',
      proxy: '/api/proxy'
    }
  });
});

console.log('[Init] Routes mounted: /api/auth, /api/maids, /api/properties, /api/shops, /api/hacks, /api/health, /api/admin, /api/proxy');
console.log('[Info] Environment:', process.env.NODE_ENV || 'development');
console.log('[Info] MongoDB URI configured:', process.env.MONGODB_URI ? 'Yes' : 'No');

// Serve built frontend assets (images) so the frontend can reference http://localhost:5000/assets/*.jpg
const assetsDir = path.join(__dirname, '../frontend/dist/assets');
app.use('/assets', express.static(assetsDir));
console.log('[Init] Static assets served from', assetsDir, 'at /assets');

const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('MongoDB connection error:', err));
let isConnected = false;

// Handle mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
  isConnected = false;
});

async function connectMongoDB() {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionRetryDelayMS: 1000, // Retry every second
      heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
}

// Add middleware to check connection before handling requests
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      console.log('🔄 Attempting to connect to MongoDB...');
      await connectMongoDB();
    }
    // Test the connection
    if (mongoose.connection.readyState !== 1) {
      console.log('🔄 Reconnecting to MongoDB...');
      isConnected = false;
      await connectMongoDB();
    }
    next();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    res.status(503).json({ 
      error: 'Database connection failed', 
      message: 'Unable to connect to MongoDB. Please try again in a moment.',
      details: error.message
    });
  }
});
//do not use app.listen inside mongoose.connect callback
module.exports = app;