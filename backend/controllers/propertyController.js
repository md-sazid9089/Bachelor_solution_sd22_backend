const Property = require('../models/Property');

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    console.log('📍 Fetching properties from database...');
    const properties = await Property.find().maxTimeMS(15000); // 15 second timeout
    console.log(`✅ Found ${properties.length} properties`);
    res.json(properties);
  } catch (err) {
    console.error('❌ Error fetching properties:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ error: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Add a new property
exports.addProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
