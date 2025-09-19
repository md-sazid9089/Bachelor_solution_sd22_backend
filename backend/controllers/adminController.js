const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Property = require('../models/Property');
const Hack = require('../models/Hack');
const Shop = require('../models/Shop');
const Maid = require('../models/Maid');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin email
const ADMIN_EMAIL = 'sazid.cse.20230104062@aust.edu';

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email is admin email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Unauthorized: Admin access only' });
    }
    
    // Find user with admin email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate admin token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        isAdmin: true 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      appointments: await Appointment.countDocuments(),
      properties: await Property.countDocuments(),
      hacks: await Hack.countDocuments(),
      shops: await Shop.countDocuments(),
      maids: await Maid.countDocuments(),
      doctors: await Doctor.countDocuments(),
      recentAppointments: await Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email'),
      recentUsers: await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email createdAt')
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

// Manage content (properties, shops, maids, etc.)
exports.getContentStats = async (req, res) => {
  try {
    const stats = {
      properties: {
        count: await Property.countDocuments(),
        data: await Property.find().sort({ createdAt: -1 }).limit(10)
      },
      shops: {
        count: await Shop.countDocuments(),
        data: await Shop.find().sort({ createdAt: -1 }).limit(10)
      },
      maids: {
        count: await Maid.countDocuments(),
        data: await Maid.find().sort({ createdAt: -1 }).limit(10)
      },
      hacks: {
        count: await Hack.countDocuments(),
        data: await Hack.find().sort({ createdAt: -1 }).limit(10)
      },
      doctors: {
        count: await Doctor.countDocuments(),
        data: await Doctor.find().sort({ createdAt: -1 }).limit(10)
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content stats', error: error.message });
  }
};

// ==== PROPERTY MANAGEMENT ====
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

// ==== SHOP MANAGEMENT ====
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error: error.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shop', error: error.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByIdAndUpdate(id, req.body, { new: true });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop', error: error.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shop', error: error.message });
  }
};

// ==== MAID MANAGEMENT ====
exports.getAllMaids = async (req, res) => {
  try {
    const maids = await Maid.find().sort({ createdAt: -1 });
    res.json(maids);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maids', error: error.message });
  }
};

exports.createMaid = async (req, res) => {
  try {
    const maid = new Maid(req.body);
    await maid.save();
    res.status(201).json(maid);
  } catch (error) {
    res.status(500).json({ message: 'Error creating maid', error: error.message });
  }
};

exports.updateMaid = async (req, res) => {
  try {
    const { id } = req.params;
    const maid = await Maid.findByIdAndUpdate(id, req.body, { new: true });
    res.json(maid);
  } catch (error) {
    res.status(500).json({ message: 'Error updating maid', error: error.message });
  }
};

exports.deleteMaid = async (req, res) => {
  try {
    const { id } = req.params;
    await Maid.findByIdAndDelete(id);
    res.json({ message: 'Maid deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maid', error: error.message });
  }
};

// ==== HACK MANAGEMENT ====
exports.getAllHacks = async (req, res) => {
  try {
    const hacks = await Hack.find().sort({ createdAt: -1 });
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hacks', error: error.message });
  }
};

exports.createHack = async (req, res) => {
  try {
    const hack = new Hack(req.body);
    await hack.save();
    res.status(201).json(hack);
  } catch (error) {
    res.status(500).json({ message: 'Error creating hack', error: error.message });
  }
};

exports.updateHack = async (req, res) => {
  try {
    const { id } = req.params;
    const hack = await Hack.findByIdAndUpdate(id, req.body, { new: true });
    res.json(hack);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hack', error: error.message });
  }
};

exports.deleteHack = async (req, res) => {
  try {
    const { id } = req.params;
    await Hack.findByIdAndDelete(id);
    res.json({ message: 'Hack deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hack', error: error.message });
  }
};

// ==== DOCTOR MANAGEMENT ====
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating doctor', error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};

// ==== USER MANAGEMENT ====
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id, 
      { name, email }, 
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// ==== APPOINTMENT MANAGEMENT ====
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};