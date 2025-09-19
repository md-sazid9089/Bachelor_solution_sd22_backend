const mongoose = require('mongoose');

const hackSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['cooking', 'money', 'dating', 'moving', 'general'], default: 'general' },
  authorName: { type: String, required: true, trim: true },
  likes: { type: [String], default: [] }, // store user emails or ids (for now emails from frontend state)
}, { timestamps: true });

module.exports = mongoose.model('Hack', hackSchema);
