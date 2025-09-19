const Maid = require('../models/Maid');

exports.getMaids = async (req, res) => {
  try {
    console.log('📍 Fetching maids from database...');
    const maids = await Maid.find().maxTimeMS(15000); // 15 second timeout
    console.log(`✅ Found ${maids.length} maids`);
    res.json(maids);
  } catch (err) {
    console.error('❌ Error fetching maids:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ error: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
};

exports.addMaid = async (req, res) => {
  try {
    const maid = new Maid(req.body);
    await maid.save();
    res.status(201).json(maid);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};