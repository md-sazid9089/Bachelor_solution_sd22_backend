const Shop = require('../models/Shop');

// Get all shops
exports.getShops = async (req, res) => {
  try {
    console.log('📍 Fetching shops from database...');
    const shops = await Shop.find().maxTimeMS(15000); // 15 second timeout
    console.log(`✅ Found ${shops.length} shops`);
    res.json(shops);
  } catch (err) {
    console.error('❌ Error fetching shops:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ error: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Add a new shop
exports.addShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single shop
exports.getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a shop
exports.updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json({ message: 'Shop deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};