const Hack = require('../models/Hack');

// List hacks (optionally filter by category)
exports.list = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const hacks = await Hack.find(filter).sort({ createdAt: -1 });
    res.json(hacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create hack (no auth for now; relies on frontend to send authorName)
exports.create = async (req, res) => {
  try {
    const { title, content, category, authorName } = req.body;
    console.log('Received hack submission:', { title, content, category, authorName });
    
    if (!title || !content || !authorName) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const hack = await Hack.create({ 
      title, 
      content, 
      category: category || 'general', 
      authorName 
    });
    
    console.log('Hack saved to database:', hack);
    res.status(201).json(hack);
  } catch (err) {
    console.error('Error creating hack:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle like
exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIdentifier } = req.body; // email or id
    if (!userIdentifier) return res.status(400).json({ message: 'Missing user identifier' });
    const hack = await Hack.findById(id);
    if (!hack) return res.status(404).json({ message: 'Hack not found' });
    const index = hack.likes.indexOf(userIdentifier);
    if (index === -1) {
      hack.likes.push(userIdentifier);
    } else {
      hack.likes.splice(index, 1);
    }
    await hack.save();
    res.json(hack);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
