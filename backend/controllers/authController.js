const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('📝 Registration attempt:', req.body.email);
    const { name, email, phone, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email }).maxTimeMS(15000);
    if (existingUser) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    
    console.log('✅ User registered successfully:', email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ message: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    console.log('🔐 Login attempt:', req.body.email);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).maxTimeMS(15000);
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('✅ Login successful:', email);
    res.json({ token, user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ message: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log('🔄 Update user attempt:', req.body.userId);
    const { userId } = req.body;
    const updateFields = {};
    
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.phone) updateFields.phone = req.body.phone;
    if (req.body.password) {
      updateFields.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true }).maxTimeMS(15000);
    if (!user) {
      console.log('❌ User not found for update:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('✅ User updated successfully:', userId);
    res.json({ message: 'User updated successfully', user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error('❌ Update user error:', err.message);
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
      res.status(503).json({ message: 'Database connection timeout. Please try again.' });
    } else {
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
};
