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

console.log('[Init] Routes mounted: /api/auth, /api/maids, /api/properties, /api/shops, /api/hacks, /api/health, /api/admin, /api/proxy');

// Serve built frontend assets (images) so the frontend can reference http://localhost:5000/assets/*.jpg
const assetsDir = path.join(__dirname, '../frontend/dist/assets');
app.use('/assets', express.static(assetsDir));
console.log('[Init] Static assets served from', assetsDir, 'at /assets');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
