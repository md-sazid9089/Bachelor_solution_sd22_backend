const Maid = require('../models/Maid');

exports.getMaids = async (req, res) => {
  try {
    const maids = await Maid.find();
    res.json(maids);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
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